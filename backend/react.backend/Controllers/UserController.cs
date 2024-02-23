using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using react.backend.Data.Models;
using react.backend.Dto;
using react.backend.Repository;
using System;
using System.Reflection.Metadata.Ecma335;

namespace react.backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly RepoUser _userrepo;
		private readonly PasswordHasher _hashpassword;

		public UserController(RepoUser repoUser, PasswordHasher hashpassword)
		{
			_userrepo = repoUser;
			_hashpassword = hashpassword;
		}


		[HttpPost("login")]
		public async Task<IActionResult> login(UserDto userDto)
		{
			try
			{

				return Ok(await _userrepo.GetUserByEmail(userDto));
			}
			catch (Exception ex)
			{
				return StatusCode(500, "Failed to Login user: " + ex.Message);
			}
		}

		[HttpPost("signup")]
		public async Task<IActionResult> InsertUser(UserDto userDto)
		{

			try
			{
				var user = await _userrepo.InsertUser(userDto);
				return Ok(user);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "Failed to insert user: " + ex.Message);
			}

		}

		[HttpPut("update/{id}")]
		public async Task<IActionResult> updateUser(UserDto userDto,string id)
		{

			try
			{
				User user = await _userrepo.getUserById(id);

/*
				user.Name = userDto.Name;
				user.Email = userDto.Email;
				user.Password = _hashpassword.HashPassword(userDto.Password);
*/
				var result =   await _userrepo.UpdateUser(user);	
				return Ok(user);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "Failed to update user: " + ex.Message);
			}

		}
		[HttpGet("users")]
		public async Task<IActionResult> GetAllUsers()
		{

			try
			{
				var user = await _userrepo.GetAllUsers();
				return Ok(user);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "Failed to insert user: " + ex.Message);
			}


		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> deleteuser(int id)
		{

			try
			{
				var user = await _userrepo.DeleteUser(id);
				return Ok(user);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "Failed to insert user: " + ex.Message);
			}


		}


		[HttpGet("userById/{id}")]

		public async Task<IActionResult> getUserById(string id)
		{
			try
			{
				var user = await _userrepo.getUserById(id);

				if (user == null)
				{
					return NotFound(); 
				}

				UserDto userdto = new UserDto
				{
					Name = user.Name,
					Email = user.Email,
					//Password=user.Password
				};


				return Ok(userdto);



			}
			catch (Exception ex)
			{
				throw new Exception("Faild to get User");
			} 
		}
	} 





}



		

	


