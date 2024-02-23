using Microsoft.AspNetCore.Identity;

namespace react.backend.Data.Models
{
	public class User :IdentityUser
	{

		public string Name { get; set; }

	}
}
