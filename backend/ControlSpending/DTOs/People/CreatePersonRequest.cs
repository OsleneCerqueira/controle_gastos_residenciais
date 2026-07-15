using System.ComponentModel.DataAnnotations;

namespace ControlSpending.DTOs.People;

public class CreatePersonRequest
{
    public string? Name { get; set; }

    public int Age { get; set; }
}