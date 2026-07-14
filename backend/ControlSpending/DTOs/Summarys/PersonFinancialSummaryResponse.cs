namespace ControlSpending.DTOs.Summarys;

/// <summary>
/// Represents the financial summary of a person.
/// </summary>
public class PersonFinancialSummaryResponse
{
    public int PersonId { get; set; }

    public string? PersonName { get; set; }

    public decimal TotalRevenue { get; set; }

    public decimal TotalExpenses { get; set; }

    public decimal Balance => TotalRevenue - TotalExpenses;
}