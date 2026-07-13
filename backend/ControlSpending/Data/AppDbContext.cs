using Microsoft.EntityFrameworkCore;
namespace ControlSpending.Database;

/// <summary>
/// Creates the context responsible for communication with the database. 
/// Receives the connection settings and sends them to the DbContext
/// via base(options).
/// </summary>
/// <param name="options">
/// Settings used to access the database. 
/// /// </param>
public class AppDbContext : DbContext{
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}

    public DbSet<Person> People => Set<Person>();
}