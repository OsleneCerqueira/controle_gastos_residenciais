using ControlSpending.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControlSpending.Controllers
{
    /// <summary>
    /// Provides endpoints for individual and consolidated financial summaries.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SummaryController(ISummaryService service) : ControllerBase
    {
        private readonly ISummaryService _service = service;
        /// <summary>
        /// Returns revenue, expenses, and balance for every registered person.
        /// </summary>
        [HttpGet("people")]
        public async Task<IActionResult> GetSummaryByPerson()
        {
            var result = await _service.GetSummaryByPersonAsync();

            return Ok(result);
        }

        /// <summary>
        /// Returns consolidated revenue, expenses, and net balance.
        /// </summary>
        [HttpGet("overall")]
        public async Task<IActionResult> GetOverallSummary()
        {
            var result = await _service.GetOverallSummaryAsync();

            return Ok(result);
        }
    }
}