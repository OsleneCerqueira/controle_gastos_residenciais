using ControlSpending.Database;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControlSpending.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20260715150000_AddTransactionCreatedAt")]
public partial class AddTransactionCreatedAt : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedAt",
            table: "Transactions",
            type: "datetime(6)",
            nullable: true);

        migrationBuilder.Sql(
            "UPDATE Transactions SET CreatedAt = UTC_TIMESTAMP(6) WHERE CreatedAt IS NULL");

        migrationBuilder.AlterColumn<DateTime>(
            name: "CreatedAt",
            table: "Transactions",
            type: "datetime(6)",
            nullable: false,
            oldClrType: typeof(DateTime),
            oldType: "datetime(6)",
            oldNullable: true);

        migrationBuilder.CreateIndex(
            name: "IX_Transactions_PersonId_CreatedAt_Id",
            table: "Transactions",
            columns: new[] { "PersonId", "CreatedAt", "Id" });

        migrationBuilder.DropIndex(
            name: "IX_Transactions_PersonId",
            table: "Transactions");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateIndex(
            name: "IX_Transactions_PersonId",
            table: "Transactions",
            column: "PersonId");

        migrationBuilder.DropIndex(
            name: "IX_Transactions_PersonId_CreatedAt_Id",
            table: "Transactions");

        migrationBuilder.DropColumn(
            name: "CreatedAt",
            table: "Transactions");
    }
}
