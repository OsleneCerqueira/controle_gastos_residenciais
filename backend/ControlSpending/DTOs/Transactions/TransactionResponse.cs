using ControlSpending.Enums;

namespace ControlSpending.DTOs.Transactions;

/// <summary>
/// Represents the transaction information returned by the API.
/// </summary>
public class TransactionResponse
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public decimal Value { get; set; }

    public TransactionType Type { get; set; }

    public DateTime CreatedAt { get; set; }

    public int PersonId { get; set; }

    public string? PersonName { get; set; }
}