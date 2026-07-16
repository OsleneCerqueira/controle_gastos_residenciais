namespace ControlSpending.DTOs.Common;

/// <summary>
/// Represents a page of items and the metadata required for navigation.
/// </summary>
/// <typeparam name="T">The type of item returned by the query.</typeparam>
public class PagedResponse<T>
{
    public required IReadOnlyList<T> Items { get; set; }

    public int CurrentPage { get; set; }

    public int TotalPages { get; set; }

    public int TotalItems { get; set; }
}
