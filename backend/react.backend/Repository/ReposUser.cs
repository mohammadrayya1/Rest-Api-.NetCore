using react.backend.Data;
using react.backend.Data.Models;
using react.backend.Dto;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace react.backend.Repository
{
	public class ReposUser : RepoUser
	{
		private readonly AppDbContext _context;
		private readonly UserManager<User> _usermanager;
		private readonly PasswordHasher _hashpassword;
		private readonly IConfiguration _configuration;
		public ReposUser(AppDbContext db, PasswordHasher hashpassword, UserManager<User> usermanager,IConfiguration configuration)

        {
            this._context = db;
			this._hashpassword= hashpassword;
			this._usermanager = usermanager;
			_configuration = configuration;
		}

	
		public async Task<List<User>> GetAllUsers()
		{
			var users = await _context.users.ToListAsync();

		
			return users;
		}

		public async Task<Object> GetUserByEmail(UserDto userdto)
		{
			
				try
				{
					User existingUser = await _usermanager.FindByEmailAsync(userdto.Email);
				
				if (existingUser != null && await _usermanager.CheckPasswordAsync(existingUser, userdto.Password))
				{
					var token = await _usermanager.GetAuthenticationTokenAsync(existingUser, "JWT", "Token");
					return new { username = existingUser.UserName,Email = existingUser.Email, tokent = token };


				}
				else
				{
					return new { Error= "Not Authorized" };
				}

			
				}
				catch(Exception ex)
				{
	
					throw new Exception("An error occurred while retrieving user.", ex);
				}
			
		}

		public async Task<User> getUserById(string id)
		{
			var user = await _context.users.SingleOrDefaultAsync(x => x.Id == id);

			if (user == null)
			{
				throw new Exception("the User is not founded");
			}

			return user;
		}

		public async Task<Object> InsertUser(UserDto userDto)
		{
			using (var transaction = await _context.Database.BeginTransactionAsync())
			{

				try
				{
				
					//var existingUser = await _context.users.SingleOrDefaultAsync(x => x.Email == userDto.Email);

/*
					if (existingUser != null)
					{
					
						throw new Exception("Email already exists");
					}*/
					var user = new User { Name = userDto.Name, UserName = userDto.Name, Email = userDto.Email };
					var result = await _usermanager.CreateAsync(user, userDto.Password);

					if (result.Succeeded)
					{
						
						var token = GenerateJwtToken(user);
						var tokenStoreResult = await _usermanager.SetAuthenticationTokenAsync(user, "JWT", "Token", token);
					
						if (!tokenStoreResult.Succeeded)
						{
							throw new InvalidOperationException("Failed to store token");
						}
						await transaction.CommitAsync();
						return new { user = userDto.Email, token = token };
					}
					else
					{
						return result.Errors;
					}


				}
				catch (Exception ex)
				{
					if (ex.Message != null)
					{
						await transaction.RollbackAsync();
						throw ex;
					}
					else
					{
						await transaction.RollbackAsync();
						throw new Exception("Failed to insert user.");
					}
				}
			}
		}


		public async Task<Boolean> UpdateUser(User user)
		{
			using (var transaction = await _context.Database.BeginTransactionAsync())
			{

				try
				{
					
				

			              _context.users.Update(user);
					await _context.SaveChangesAsync();


					await transaction.CommitAsync();

					return true;
				}
				catch (Exception ex)
				{
					if (ex.Message != null)
					{
						await transaction.RollbackAsync();
						throw ex;
					}
					else
					{
						await transaction.RollbackAsync();
						throw new Exception("Failed to update user.");
					}
				}
			}

		}

		public async Task<User> DeleteUser(int id)
		{
			using (var transaction = await _context.Database.BeginTransactionAsync())
			{

				try
				{
					//	var existingUser = await _context.users.SingleOrDefaultAsync(x => x.Id == id);

					var existingUser = new User();
					if (existingUser != null)
					{

						_context.users.Remove(existingUser);
						await _context.SaveChangesAsync();

						await transaction.CommitAsync();

						return existingUser;
					}
					else
					{
						throw new Exception("The user is not found to delete ");
					}
				}
				catch (Exception ex)
				{
					if (ex.Message != null)
					{
						await transaction.RollbackAsync();
						throw ex;
					}
					else
					{
						await transaction.RollbackAsync();
						throw new Exception("Failed to delete user.");
					}
				}
			}
		}


		private string GenerateJwtToken(User user)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
				new Claim(JwtRegisteredClaimNames.Email, user.Email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var token = new JwtSecurityToken(
				issuer: _configuration["JWT:Issuer"],
				audience: _configuration["JWT:Audience"],
				claims: claims,
				expires: DateTime.Now.AddHours(2),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

	}
}
