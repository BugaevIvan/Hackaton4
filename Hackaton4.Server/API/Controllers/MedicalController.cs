using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicalController(AppDbContext context) : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medical>>> GetMedical()
        {
            if (context.Medicals == null)
                return NotFound();
            return await context.Medicals.ToListAsync();
        }
    }
}
