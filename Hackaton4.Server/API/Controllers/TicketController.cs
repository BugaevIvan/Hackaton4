using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TicketController(AppDbContext context) : Controller
    {
        [HttpPost]
        public async Task<IActionResult> PostTicket([FromBody] Ticket ticket)
        {
            await context.Tickets.AddAsync(ticket);
            await context.SaveChangesAsync();
            return CreatedAtAction("PostAccommodation", ticket);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            if (context.Tickets == null)
                return NotFound();
            return await context.Tickets.ToListAsync();
        }
    }
}
