using Microsoft.AspNetCore.Mvc;
using react.backend.Data.Models;
using react.backend.Dto;

namespace react.backend.Repository
{
	public interface RepoUser
	{
		public Task<List<User>> GetAllUsers();
		public Task<Object> GetUserByEmail(UserDto user);
		public Task<Object> InsertUser(UserDto product);

		public Task<User> getUserById(string id);
		public Task<User> DeleteUser(int id);
		public Task<Boolean> UpdateUser(User user);
	}
}
