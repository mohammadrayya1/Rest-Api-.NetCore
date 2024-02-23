using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using react.backend.Data.Models;
using System.Data;

namespace react.backend.Data.Config
{
	public class UserConfig : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.Property(x => x.Name).HasColumnType("VARCHAR").HasMaxLength(50).IsRequired();
			builder.ToTable("users");


		}
	}
}
