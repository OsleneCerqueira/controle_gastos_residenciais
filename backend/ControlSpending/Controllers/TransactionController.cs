using ControlSpending.DTOs.Transactions;
using ControlSpending.DTOs.Common;
using ControlSpending.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ControlSpending.Controllers;

/// <summary>
/// Provides endpoints for creating and listing financial transactions.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    /// <summary>
    /// Creates a transaction after validating the person and age restriction.
    /// </summary>
    /// <param name="request">The transaction data.</param>
    /// <returns>The created transaction.</returns>
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
    /// Returns a page of transactions for a person, ordered from newest to oldest.
    /// </summary>
    /// <param name="personId">The identifier of the person.</param>
    /// <param name="page">The page number, starting at one.</param>
    /// <returns>A page containing up to ten transactions.</returns>
    [HttpGet("person/{personId:int}")]
    public async Task<ActionResult<PagedResponse<TransactionResponse>>> GetTransactionsByPersonId(
        int personId,
        [FromQuery, Range(1, int.MaxValue)] int page = 1)
    {
        try
        {
            PagedResponse<TransactionResponse> transactions =
                await _transactionService.GetTransactionsByPersonId(personId, page);

            return Ok(transactions);
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}