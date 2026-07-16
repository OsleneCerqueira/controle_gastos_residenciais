using ControlSpending.DTOs.Summarys;

namespace ControlSpending.Services.Interfaces;

/// <summary>
/// Defines the methods for generating financial summaries.
/// </summary>
public interface ISummaryService
{
    /// <summary>
    /// Calculates revenue, expenses, and balance for every registered person.
    /// People without transactions are included with zero totals.
    /// </summary>
    Task<IEnumerable<PersonFinancialSummaryResponse>> GetSummaryByPersonAsync();

    /// <summary>
    /// Calculates consolidated revenue, expenses, and net balance.
    /// </summary>
    Task<OverallFinancialSummaryResponse> GetOverallSummaryAsync();
}