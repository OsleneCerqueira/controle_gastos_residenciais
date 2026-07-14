using ControlSpending.Database;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using System.Text.Json.Serialization;
using ControlSpending.Services;
using ControlSpending.Services.Interfaces;


Env.Load();
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }); // Configures controllers and represents enumeration values as text in JSON.

builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<ISummaryService, SummaryService>();// Registers the report service for dependency injection.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint(
            "/openapi/v1.json",
            "ControlSpendingAPIv1"
        );
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
