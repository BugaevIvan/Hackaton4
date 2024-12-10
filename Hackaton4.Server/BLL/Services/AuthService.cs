using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rusal.Server.BLL.Interfaces;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;
using System.Security.Cryptography;
using System.Text;

namespace rusal.Server.BLL.Services
{
    public class AuthService(AppDbContext context, IMapper mapper, JwtService jwtService) : IAuthService
    {
        public async Task<IActionResult> CreateUser(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return new OkObjectResult("User successfully created!");
        }
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == userDto.Username);

            if (user == null)
                return new UnauthorizedObjectResult("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
                return new UnauthorizedObjectResult("Invalid password.");

            var jwt = jwtService.Generate(user.Id);

            //JsonResult
            return new OkObjectResult(new { jwt });
        }

        public string GetCurrnetUsername(Guid id)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            return user!.Username;
        }

    }
}
