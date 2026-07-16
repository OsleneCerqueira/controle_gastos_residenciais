using ControlSpending.DTOs.Transactions;
using ControlSpending.DTOs.Common;

namespace ControlSpending.Services.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponse> AddTransaction(CreateTransactionRequest request);

    Task<PagedResponse<TransactionResponse>> GetTransactionsByPersonId(int personId, int page);
}