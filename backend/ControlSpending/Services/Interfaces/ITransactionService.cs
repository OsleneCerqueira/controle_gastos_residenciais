using ControlSpending.DTOs.Transactions;

namespace ControlSpending.Services.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponse> AddTransaction(CreateTransactionRequest request);

    Task<List<TransactionResponse>> GetTransactionsByPersonId(int personId);
}