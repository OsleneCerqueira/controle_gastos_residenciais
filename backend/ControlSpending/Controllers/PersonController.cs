using ControlSpending.Database;
using Microsoft.AspNetCore.Mvc;
using ControlSpending.Models;
using Microsoft.EntityFrameworkCore;
using ControlSpending.DTOs.People;

namespace ControlSpending.Controllers
{
    /// <summary>
    /// Provides endpoints for creating, listing, retrieving, and deleting people.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PersonController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        /// <summary>
        /// Creates a person and returns the generated identifier.
        /// </summary>
        /// <param name="request">The person's name and age.</param>
        /// <returns>The created person.</returns>
        [HttpPost]
        public async Task<IActionResult> AddPerson(CreatePersonRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = new Person
            {
                Name = request.Name,
                Age = request.Age
            };
            _appDbContext.People.Add(person);
            await _appDbContext.SaveChangesAsync();

            var response = new PersonResponse
            {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age
            };

            return CreatedAtAction(nameof(GetPerson), new { id = person.Id }, response);
        }
        /// <summary>
        /// Returns all registered people without exposing persistence entities.
        /// </summary>
        /// <returns>A list of registered people.</returns>
        [HttpGet]
        public async Task<ActionResult<List<PersonResponse>>> GetPeople()
        {
            var people = await _appDbContext.People
                .AsNoTracking()
                .Select(person => new PersonResponse
                {
                    Id = person.Id,
                    Name = person.Name,
                    Age = person.Age
                })
                .ToListAsync();

            return Ok(people);
        }
        /// <summary>
        /// Returns a person by identifier.
        /// </summary>
        /// <param name="id">The person's identifier.</param>
        /// <returns>The person, or 404 when no matching record exists.</returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PersonResponse>> GetPerson(int id)
        {
            var person = await _appDbContext.People
                .AsNoTracking()
                .Where(person => person.Id == id)
                .Select(person => new PersonResponse
                {
                    Id = person.Id,
                    Name = person.Name,
                    Age = person.Age
                })
                .FirstOrDefaultAsync();

            if (person == null)
            {
                return NotFound(new { message = "Pessoa não encontrada." });
            }

            return Ok(person);
        }

        /// <summary>
        /// Deletes a person. Related transactions are deleted by the configured
        /// cascade relationship.
        /// </summary>
        /// <param name="id">The person's identifier.</param>
        /// <returns>A success response, or 404 when no matching record exists.</returns>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _appDbContext.People.FindAsync(id);
            if (person == null)
            {
                return NotFound(new { message = "Pessoa não encontrada." });
            }
            _appDbContext.People.Remove(person);

            await _appDbContext.SaveChangesAsync();

            return Ok($"Pessoa:{person.Name} deletada com sucesso");
        }
    }
}