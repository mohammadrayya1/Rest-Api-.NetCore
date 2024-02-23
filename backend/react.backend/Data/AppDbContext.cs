using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using react.backend.Data.Models;
using System.Data;

namespace react.backend.Data
{
	public class AppDbContext : IdentityDbContext<User>
	{

		public DbSet<User> users { get; set; }

		public AppDbContext(DbContextOptions<AppDbContext> options)
: base(options)
		{
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);




		}
	}
}
