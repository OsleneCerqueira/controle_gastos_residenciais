using ControlSpending.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControlSpending.DTOs.Transactions;

/// <summary>
/// Contains the information required to create a transaction.
/// </summary>
public class CreateTransactionRequest
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(200,ErrorMessage ="A descrição deve possuir no máximo 200 caracteres.")]
    public string Description { get; set; } = string.Empty;


    [Range(typeof(decimal),"0.01","9999999999999.99", ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Value { get; set; }


    [EnumDataType( typeof(TransactionType), ErrorMessage = "O tipo deve ser Receita ou Despesas.")]
    public TransactionType Type { get; set; }


    [Range(1,int.MaxValue, ErrorMessage = "O identificador da pessoa é obrigatório.")]
    public int PersonId { get; set; }
}