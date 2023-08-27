using Microsoft.EntityFrameworkCore;
using StudentDetails.GlobalExceptions;
using System.Threading.Tasks;
using TaskMS.Models;
using TaskMS.Services.Interfaces;

namespace TaskMS.Services
{
    public class LoginServices : ILogin
    {

        public TaskMgmtContext? _taskContext;

        public LoginServices(TaskMgmtContext? taskContext)
        {
            _taskContext = taskContext;
        }

        public async Task<ManagerEmployee> Logindetails(string username,string password) 
        {
            ManagerEmployee employee = new ManagerEmployee();
            
            var credential = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
            
            if (credential!=null)
            {
                var project = await _taskContext.ProjectDetails.FirstOrDefaultAsync(u => u.ProjectId == credential.ProjectId);

                //manager
                if (credential.EmpId==credential.ManagerId)
                {

                    employee.EmpId = credential.EmpId;
                    employee.EmpName = credential.EmpName;
                    employee.ProjectName = project.ProjectName;
                    employee.RoleId = 1;

                    return employee;

                }
                else//employee
                {

                    employee.EmpId = credential.EmpId;
                    employee.EmpName = credential.EmpName;
                    employee.ProjectName = project.ProjectName;
                    employee.RoleId = 2;//employee

                    return employee;
                }
            }
            else
            {
                throw new Exception(StudentDetailsExceptions.ExceptionMessages[0]);
            }
        }
    }
}
