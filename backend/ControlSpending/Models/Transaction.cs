using ControlSpending.Enums;

namespace ControlSpending.Models;

/// <summary>
/// Represents a financial transaction registered for a person.
/// </summary>
public class Transaction
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public decimal Value { get; set; }

    public TransactionType Type { get; set; }
    
    /// <summary>
    /// Gets the UTC date and time when the transaction was registered.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the identifier of the related person.
    /// </summary>
    public int PersonId { get; set; }

    /// <summary>
    /// Gets or sets the person related to the transaction.
    /// </summary>
    public Person Person { get; set; } = null!;
}