using Microsoft.EntityFrameworkCore;
using TaskMS.Services;
using TaskMS.Services.Interfaces;
using TaskMS.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TaskMgmtContext>(
    optionsAction: options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("SQLServerConnection")
        ));
//adding services
builder.Services.AddScoped<IAdmin, TaskAdminServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
