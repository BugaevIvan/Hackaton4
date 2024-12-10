using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShiftController(AppDbContext context) : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shift>>> GetShift()
        {
            if (context.Shifts == null)
                return NotFound();
            return await context.Shifts.ToListAsync();
        }
    }
}
