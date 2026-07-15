using ControlSpending.Database;
using ControlSpending.DTOs.Transactions;
using ControlSpending.Enums;
using ControlSpending.Models;
using ControlSpending.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControlSpending.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _appDbContext;

    public TransactionService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<TransactionResponse> AddTransaction(CreateTransactionRequest request)
    {
        var person = await _appDbContext.People.AsNoTracking().FirstOrDefaultAsync(person => person.Id == request.PersonId);

        if (person is null){
            throw new KeyNotFoundException("A pessoa informada não está cadastrada." );
        }

        if (person.Age < 18 && request.Type == TransactionType.Revenue){
            throw new InvalidOperationException("Pessoas menores de 18 anos podem cadastrar apenas despesas.");
        }

        var transaction = new Transaction
        {
            Description = request.Description,
            Value = request.Value,
            Type = request.Type,
            PersonId = request.PersonId
        };

        _appDbContext.Transactions.Add(transaction);

        await _appDbContext.SaveChangesAsync();

        return new TransactionResponse
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Value = transaction.Value,
            Type = transaction.Type,
            PersonId = transaction.PersonId,
            PersonName = person.Name
        };
    }


    public async Task<List<TransactionResponse>> GetTransactionsByPersonId(int personId)
    {
        bool personExists = await _appDbContext.People.AsNoTracking().AnyAsync(person => person.Id == personId);

        if (!personExists){
            throw new KeyNotFoundException("Pessoa não encontrada.");
        }

        return await GetTransactionResponses().Where(transaction => transaction.PersonId == personId).ToListAsync();
    }

    private IQueryable<TransactionResponse> GetTransactionResponses()
    {
        return _appDbContext.Transactions.AsNoTracking().Select(transaction => new TransactionResponse
            {
                Id = transaction.Id,
                Description = transaction.Description,
                Value = transaction.Value,
                Type = transaction.Type,
                PersonId = transaction.PersonId,
                PersonName = transaction.Person.Name
            });
    }
}