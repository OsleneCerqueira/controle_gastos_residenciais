using ControlSpending.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlSpending.Controllers
{
    /// <summary>
    /// Provides endpoints for financial summarys.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SummaryController(ISummaryService service) : ControllerBase
    {
        private readonly ISummaryService _service = service;


        [HttpGet("people")]
        public async Task<IActionResult> GetSummaryByPerson()
        {
            var result = await _service.GetSummaryByPersonAsync();

            return Ok(result);
        }

        [HttpGet("overall")]
        public async Task<IActionResult>GetOverallSummary()
        {
            var result = await _service.GetOverallSummaryAsync();

            return Ok(result);
        }

    }
}