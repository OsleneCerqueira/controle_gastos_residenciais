namespace ControlSpending.DTOs.Summarys;

/// <summary>
/// Represents the overall financial summary of all people registered in the system.
/// </summary>
public class OverallFinancialSummaryResponse
{
    public decimal TotalRevenue { get; set; }

    public decimal TotalExpenses { get; set; }

    public decimal NetBalance => TotalRevenue - TotalExpenses;
}