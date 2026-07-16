using ControlSpending.DTOs.Transactions;
using ControlSpending.DTOs.Common;
using ControlSpending.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ControlSpending.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpPost]
    public async Task<ActionResult<TransactionResponse>> AddTransaction(CreateTransactionRequest request)
    {
        try
        {
            TransactionResponse response = await _transactionService.AddTransaction(request);

            return StatusCode(StatusCodes.Status201Created, response);
        }
        catch (KeyNotFoundException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }



    /// <summary>
    /// Returns all transactions registered for a specific person.
    /// </summary>
    /// <param name="personId">The identifier of the person.</param>
    /// <returns>A list containing the person's transactions.</returns>
    [HttpGet("person/{personId:int}")]
    public async Task<ActionResult<PagedResponse<TransactionResponse>>> GetTransactionsByPersonId(
        int personId,
        [FromQuery, Range(1, int.MaxValue)] int page = 1)
    {
        try
        {
            PagedResponse<TransactionResponse> transactions = await _transactionService.GetTransactionsByPersonId(personId, page);

            return Ok(transactions);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}