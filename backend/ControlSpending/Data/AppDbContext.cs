using Microsoft.EntityFrameworkCore;
using ControlSpending.Models;
namespace ControlSpending.Database;


/// <summary>
/// Creates the context responsible for communication with the database. 
/// Receives the connection settings and sends them to the DbContext
/// via base(options).
/// </summary>
/// <param name="options">
/// Settings used to access the database. 
/// /// </param>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    /// <summary>
    /// Represents the people stored in the database.
    /// </summary>
    public DbSet<Person> People => Set<Person>();

    /// <summary>
    /// Represents the transactions stored in the database.
    /// </summary>
    public DbSet<Transaction> Transactions => Set<Transaction>();


    /// <summary>
    /// Configures entity properties and relationships.
    /// </summary>
    /// <param name="modelBuilder">
    /// Builder used to configure the database model.
    /// </param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Defines a monetary column with up to 18 digits and 2 decimal places.
        modelBuilder.Entity<Transaction>().Property(transaction => transaction.Value).HasPrecision(13, 2);

        // Defines the relationship where each transaction belongs to one person and uses PersonId as the foreign key.
        modelBuilder.Entity<Transaction>().HasOne(transaction => transaction.Person)
            .WithMany(person => person.Transactions).HasForeignKey(transaction => transaction.PersonId).OnDelete(DeleteBehavior.Cascade);
    }
}