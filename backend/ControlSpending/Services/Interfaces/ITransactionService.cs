using ControlSpending.DTOs.Transactions;
using ControlSpending.DTOs.Common;

namespace ControlSpending.Services.Interfaces;

/// <summary>
/// Defines operations for creating and listing financial transactions.
/// </summary>
public interface ITransactionService
{
    /// <summary>
    /// Creates a transaction for an existing person.
    /// </summary>
    /// <param name="request">The transaction data.</param>
    /// <returns>The created transaction.</returns>
    /// <exception cref="KeyNotFoundException">Thrown when the person does not exist.</exception>
    /// <exception cref="InvalidOperationException">
    /// Thrown when a person under 18 attempts to register revenue.
    /// </exception>
    Task<TransactionResponse> AddTransaction(CreateTransactionRequest request);

    /// <summary>
    /// Returns a page of a person's transactions ordered from newest to oldest.
    /// </summary>
    /// <param name="personId">The person's identifier.</param>
    /// <param name="page">The requested page number.</param>
    /// <returns>A page containing up to ten transactions.</returns>
    /// <exception cref="KeyNotFoundException">Thrown when the person does not exist.</exception>
    Task<PagedResponse<TransactionResponse>> GetTransactionsByPersonId(int personId, int page);
}