namespace ControlSpending.DTOs.Common;

public class PagedResponse<T>
{
    public required IReadOnlyList<T> Items { get; set; }

    public int CurrentPage { get; set; }

    public int TotalPages { get; set; }

    public int TotalItems { get; set; }
}
