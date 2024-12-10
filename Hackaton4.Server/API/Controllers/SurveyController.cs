using Hackaton4.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hackaton4.Server.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SurveyController(AppDbContext context) : Controller
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Survey>>> GetSurvey()
        {
            if (context.Surveys == null)
                return NotFound();
            return await context.Surveys.ToListAsync();
        }
    }
}
