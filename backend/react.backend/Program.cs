using Microsoft.EntityFrameworkCore;
using react.backend.Data;
using react.backend.Repository;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using react.backend.Data.Models;
var builder = WebApplication.CreateBuilder(args);





builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("constr")));
builder.Services.AddIdentity<User, IdentityRole>()
	.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<RepoUser, ReposUser>();
builder.Services.AddTransient<PasswordHasher>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowOrigin", builder =>
	{
		builder.WithOrigins("http://localhost:3000")
			   .AllowAnyHeader()
			   .AllowAnyMethod();
	});
});
var app = builder.Build();


app.UseCors(builder =>
{
	builder.WithOrigins("http://localhost:3000")
		   .AllowAnyHeader()
		   .AllowAnyMethod();
}); 

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

/*//builder.Services.AddTransient<PasswordHasher>();

*//*builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowOrigin", builder =>
	{
		builder.WithOrigins("http://localhost:3000")
			   .AllowAnyHeader()
			   .AllowAnyMethod();
	});
});
*//*




builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
*//*
app.UseCors(builder =>
{
	builder.WithOrigins("http://localhost:3000")
		   .AllowAnyHeader()
		   .AllowAnyMethod();
});*//*
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
*/