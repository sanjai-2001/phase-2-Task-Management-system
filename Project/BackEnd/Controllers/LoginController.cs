using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskMS.Models;
using TaskMS.Services.Interfaces;

namespace TaskMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public ILogin _login;

        public LoginController(ILogin login)
        {
            this._login = login;
        }

        [HttpGet("Login")]

        public async Task<ActionResult<ManagerEmployee>> Login(string username, string password)
        {
            ManagerEmployee? employee;
            try
            {
                employee = await _login.Logindetails(username,password);
                return Ok(employee);
            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }
        }



    }
}
