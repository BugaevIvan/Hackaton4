using Microsoft.AspNetCore.Mvc;
using rusal.Server.BLL.Interfaces;
using rusal.Server.BLL.Services;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;

namespace rusal.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(IAuthService authService, JwtService jwtService) : Controller
    {
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromQuery] UserDto userDto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = userDto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
            };
            return Created("Success", await authService.CreateUser(user));
        }

        [HttpGet]
        public async Task<IActionResult> Login([FromQuery] UserDto userDto)
        {
            var result = await authService.Login(userDto);

            if (result is OkObjectResult okResult)
            {
                var jwtObj = okResult.Value as dynamic;
                string jwt = jwtObj!.jwt;
                Response.Cookies.Append("jwt", jwt, new CookieOptions { HttpOnly = true });
                //return new OkObjectResult(new { okResult.Value, okResult.StatusCode });
                return new OkObjectResult(jwt);
            }
            else
                return new ObjectResult("User not found or invalid password") { StatusCode = 500 };
        }

        [HttpGet]
        public async Task<IActionResult> GetUSer()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                var user = authService.GetCurrnetUsername(userId);

                return new OkObjectResult(user);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        //private string GenerateJwtToken(User user)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes("your_secret_key_here"); // You should store this securely
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        //        Expires = DateTime.UtcNow.AddDays(7),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}
    }
}
