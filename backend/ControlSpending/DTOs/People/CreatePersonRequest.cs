using System.ComponentModel.DataAnnotations;

namespace ControlSpending.DTOs.People;

public class CreatePersonRequest
{
    [Required(ErrorMessage = "Informe o nome da pessoa.")]
    [MaxLength(50, ErrorMessage = "O nome deve ter no máximo 50 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Range(1, 120, ErrorMessage = "A idade deve estar entre 1 e 120 anos.")]
    public int Age { get; set; }
}
