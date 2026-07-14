using ControlSpending.Database;
using ControlSpending.DTOs.Transactions;
using ControlSpending.Enums;
using ControlSpending.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControlSpending.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TransactionController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        [HttpPost]
        public async Task<ActionResult<TransactionResponse>> AddTransaction(CreateTransactionRequest request)
        {
            // Searches for the person informed in the request.
            var person = await _appDbContext.People.AsNoTracking().FirstOrDefaultAsync(person => person.Id == request.PersonId);

            // Prevents transactions from being associated with a person who is not registered.
            if (person is null){
                return BadRequest("A pessoa informada não está cadastrada.");
            }

            // Business rule: Individuals under 18 years of age can only register expenses.
            if (person.Age < 18 && request.Type == TransactionType.Revenue){
                return BadRequest("Pessoas menores de 18 anos podem cadastrar apenas despesas.");
            }

            var transaction = new Transaction{
                Description = request.Description,
                Value = request.Value,
                Type = request.Type,
                PersonId = request.PersonId
            };

            _appDbContext.Transactions.Add(transaction);

            await _appDbContext.SaveChangesAsync();

            var response = new TransactionResponse{
                Id = transaction.Id,
                Description = transaction.Description,
                Value = transaction.Value,
                Type = transaction.Type,
                PersonId = person.Id,
                PersonName = person.Name
            };

            return CreatedAtAction(nameof(GetTransactions), response);
        }

        /// <summary>
        // Return all transactions recorded in the database.
        // </summary>
        // <returns>
        // A list containing all transactions.
        // </returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionResponse>>> GetTransactions()
        {

            var transactions = await _appDbContext.Transactions.AsNoTracking().Select(transaction => new TransactionResponse
                    {
                        Id = transaction.Id,
                        Description = transaction.Description,
                        Value = transaction.Value,
                        Type = transaction.Type,
                        PersonId = transaction.PersonId,
                        PersonName = transaction.Person.Name
                    }).ToListAsync();

            return Ok(transactions);
        }

    }
}