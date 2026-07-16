using Microsoft.EntityFrameworkCore;
using ControlSpending.Models;
namespace ControlSpending.Database;

/// <summary>
/// Represents the application's database session and configures entity relationships.
/// </summary>
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

        // Keeps monetary values within the precision supported by the database schema.
        modelBuilder.Entity<Transaction>().Property(transaction => transaction.Value).HasPrecision(13, 2);

        modelBuilder.Entity<Transaction>()
            .HasIndex(transaction => new { transaction.PersonId, transaction.CreatedAt, transaction.Id });

        // Cascade deletion enforces the rule that a person's transactions are removed with them.
        modelBuilder.Entity<Transaction>()
            .HasOne(transaction => transaction.Person)
            .WithMany(person => person.Transactions)
            .HasForeignKey(transaction => transaction.PersonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}