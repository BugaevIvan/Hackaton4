using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FreetimeController(AppDbContext context) : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Freetime>>> GetFreetime()
        {
            if (context.Freetimes == null)
                return NotFound();
            return await context.Freetimes.ToListAsync();
        }
    }
}
