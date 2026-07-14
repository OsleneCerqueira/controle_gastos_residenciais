using ControlSpending.Database;
using ControlSpending.DTOs.Summarys;
using ControlSpending.Enums;
using ControlSpending.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControlSpending.Services;

/// <summary>
/// Provides the business logic needed to generate financial summaries.
/// </summary>
public class SummaryService : ISummaryService
{
    private readonly AppDbContext _appDbContext;

    public SummaryService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<PersonFinancialSummaryResponse>> GetSummaryByPersonAsync(){
  
        var transactionTotals = await _appDbContext.Transactions.AsNoTracking().GroupBy(
                    transaction => transaction.PersonId).Select(group => new
                    {
                        PersonId = group.Key,

                        TotalRevenue = group.Sum(transaction => transaction.Type == TransactionType.Revenue? transaction.Value : 0m),

                        TotalExpenses = group.Sum(transaction => transaction.Type == TransactionType.Expense? transaction.Value : 0m)
                    }
                ).ToDictionaryAsync(total => total.PersonId);


        var people = await _appDbContext.People.AsNoTracking().Select(person => new {person.Id, person.Name}).ToListAsync();

        var summaries = people.Select(person =>{transactionTotals.TryGetValue(person.Id,out var totals);

            return new PersonFinancialSummaryResponse
            {
                PersonId = person.Id,
                PersonName = person.Name,
                TotalRevenue = totals?.TotalRevenue ?? 0m,
                TotalExpenses = totals?.TotalExpenses ?? 0m
            };
        });

        return summaries;
    }


    public async Task<OverallFinancialSummaryResponse>GetOverallSummaryAsync()
    {
        var summary = await _appDbContext.Transactions.AsNoTracking().GroupBy(transaction => 1).Select(group =>
                new OverallFinancialSummaryResponse
                {
                    TotalRevenue = group.Sum(transaction =>transaction.Type == TransactionType.Revenue ? transaction.Value : 0m),

                    TotalExpenses = group.Sum(transaction =>transaction.Type == TransactionType.Expense ? transaction.Value : 0m)
                }
            ).FirstOrDefaultAsync();

        // Returns zero values when no transaction has been registered yet.
        return summary ?? new OverallFinancialSummaryResponse();
    }
}