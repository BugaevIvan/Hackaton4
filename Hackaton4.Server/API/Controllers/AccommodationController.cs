using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using rusal.Server.DAL.Entities;

namespace rusal.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccommodationController(AppDbContext context) : Controller
    {
        [HttpPost]
        public async Task<IActionResult> PostAccommodation([FromBody] Accommodation accommodation)
        {
            // Generate passId
            // accommodation.AccommodationId = Guid.NewGuid();

            await context.Accommodations.AddAsync(accommodation);
            await context.SaveChangesAsync();
            return CreatedAtAction("PostAccommodation", accommodation);
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Accommodation>>> GetPasses()
        //{
        //    if (passContext.Passes == null)
        //        return NotFound();
        //    return await passContext.Passes.ToListAsync();
        //}

        //[HttpGet("{passId}")]
        //public async Task<ActionResult<Accommodation>> GetPass([FromRoute] Guid passId)
        //{
        //    if (passContext.Passes == null)
        //        return NotFound();
        //    var pass = await passContext.Passes.FirstOrDefaultAsync(pass => pass.PassId == passId);
        //    if (pass == null)
        //        return NotFound();
        //    return pass!;
        //}

        //[HttpPut]
        //public async Task<IActionResult> UpdatePass([FromBody] Accommodation pass)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var thatPass = await passContext.Passes.FirstOrDefaultAsync(p => p.PassId == pass.PassId);

        //    if (thatPass == null)
        //        return NotFound();

        //    thatPass.Status = pass.Status;
        //    thatPass.Type = pass.Type;
        //    thatPass.TypePeriod = pass.TypePeriod;
        //    thatPass.Organization = pass.Organization;
        //    thatPass.Comment = pass.Comment;
        //    thatPass.Dateto = pass.Dateto;
        //    thatPass.Datefrom = pass.Datefrom;

        //    await passContext.SaveChangesAsync();
        //    return Ok();
        //}
    }
}
