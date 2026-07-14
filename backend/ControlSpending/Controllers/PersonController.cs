using ControlSpending.Database;
using Microsoft.AspNetCore.Mvc;
using ControlSpending.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlSpending.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PersonController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        // The methods are implemented asynchronously because the system
        // needs to wait for the data to be retrieved from the database.

        // Since this operation can take some time to complete, using async/await
        // avoids runtime problems and prevents the application from freezing.
        [HttpPost]
        public async Task<IActionResult> AddPerson(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _appDbContext.People.Add(person);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPerson), new { id = person.Id },person);
        }



        /// <summary>
        // Searches for all people registered in the database.
        // </summary>
        // <returns>
        // A list of all registered people.
        // </returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerator<Person>>> GetPeople()
        {
            var people = await _appDbContext.People.AsNoTracking().ToListAsync();

            return Ok(people);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _appDbContext.People.FindAsync(id);

            if (person == null)
            {
                return NotFound("Pessoa não encontrada!");
            }

            return Ok(person);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _appDbContext.People.FindAsync(id);
            if (person == null)
            {
                return NotFound("Pessoa não encontrada!");
            }
            _appDbContext.People.Remove(person);

            await _appDbContext.SaveChangesAsync();

            return Ok($"Pessoa:{person.Name} deletada com sucesso");
        }


    }
}