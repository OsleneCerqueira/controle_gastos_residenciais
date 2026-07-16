using ControlSpending.Database;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using System.Text.Json.Serialization;
using ControlSpending.Services;
using ControlSpending.Services.Interfaces;


Env.Load();
var builder = WebApplication.CreateBuilder(args);
const string frontendCorsPolicy = "FrontendCorsPolicy";


builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }); // Configures controllers and represents enumeration values as text in JSON.

builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<ISummaryService, SummaryService>();// Registers the report service for dependency injection.
builder.Services.AddScoped<ITransactionService, TransactionService>();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

if (allowedOrigins.Length == 0)
{
    throw new InvalidOperationException("Configure ao menos uma origem em Cors:AllowedOrigins.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
        {
            policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
        }
    );
});


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

app.UseCors(frontendCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
