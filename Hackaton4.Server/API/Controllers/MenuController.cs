using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MenuController(AppDbContext context) : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Menu>>> GetMenu()
        {
            if (context.Menus== null)
                return NotFound();
            return await context.Menus.ToListAsync();
        }
    }
}
