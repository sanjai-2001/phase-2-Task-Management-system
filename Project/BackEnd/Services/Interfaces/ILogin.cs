using TaskMS.Models;

namespace TaskMS.Services.Interfaces
{
    public interface ILogin
    {
       Task<ManagerEmployee> Logindetails(string username, string password);
    }
}
