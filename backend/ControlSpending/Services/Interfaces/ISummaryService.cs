using ControlSpending.DTOs.Summarys;

namespace ControlSpending.Services.Interfaces;

/// <summary>
/// Defines the methods for generating financial summaries.
/// </summary>
public interface ISummaryService
{
    Task<IEnumerable<PersonFinancialSummaryResponse>>
        GetSummaryByPersonAsync();

    Task<OverallFinancialSummaryResponse>
        GetOverallSummaryAsync();
}