using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using StudentDetails.GlobalExceptions;
using System.Threading.Tasks;
using TaskMS.Models;
using TaskMS.Services.Interfaces;

namespace TaskMS.Services
{
    public class TaskAdminServices:IAdmin
    {
        public TaskMgmtContext? _taskContext;

        public TaskAdminServices(TaskMgmtContext Context)
        {
            this._taskContext = Context;
        }

        public async Task<List<TaskDetail>> CreateTask(TasksampleForm FetchDetail)
        {
            var task = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u=>u.EmpName == FetchDetail.EmpName);
            TaskDetail? taskDetail = new TaskDetail();
            if(FetchDetail ==null)
            {
                throw new Exception("Not found");
            }
            else
            {
                //taskDetail.TaskId = FetchDetail.TaskId;
                taskDetail.TaskDescription = FetchDetail.TaskDescription;
                taskDetail.AssignedDate = DateTime.Now;
                taskDetail.CompletedDate = DateTime.Now;
                taskDetail.DueDate = FetchDetail.DueDate;
                taskDetail.Status = FetchDetail.Status;
                taskDetail.Priority = FetchDetail.Priority;
                taskDetail.EmpId = task.EmpId;
                taskDetail.ProjectId = task.ProjectId;

                _taskContext.TaskDetails.Add(taskDetail);
                await _taskContext.SaveChangesAsync();

                return await _taskContext.TaskDetails.ToListAsync();

            }

        }

        public async Task<TaskDetail> UpdateTaskDetails(int TaskId, TaskDetail taskDetail)
        {
            TaskDetail? rtaskDetail = await _taskContext.TaskDetails.FindAsync(TaskId);
            if (rtaskDetail == null)
            {
                throw new Exception(StudentDetailsExceptions.ExceptionMessages[0]);
            }
            else
            {              
                rtaskDetail.TaskDescription = taskDetail.TaskDescription;
                rtaskDetail.AssignedDate = DateTime.Now;
                rtaskDetail.DueDate = taskDetail.DueDate;
                rtaskDetail.Priority = taskDetail.Priority;
                await _taskContext.SaveChangesAsync();

                var rtask = await _taskContext.TaskDetails.FindAsync(TaskId);

                return rtask;
            }
        }

        public async Task<List<TaskDetail>> DeleteTask(int task_id)
        {
            var task = await _taskContext.TaskDetails.FindAsync(task_id);
            if (task == null)
            {
                throw new Exception(StudentDetailsExceptions.ExceptionMessages[0]);
            }
            else
            {
                _taskContext.TaskDetails.Remove(task);
                await _taskContext.SaveChangesAsync();
                var response = await _taskContext.TaskDetails.ToListAsync();
                return response;
            }
        }
        public async Task<List<TasksampleForm>> GetAllTaskDetails(int Managerid)//async - not depent on other thread(multithreadingtask)
        {

            //var task = await _taskContext.TaskDetails.ToListAsync();
            //return task;
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.ManagerId == Managerid
                               select new TasksampleForm
                               {
                                   EmpName = employee.EmpName,
                                   TaskDescription=task.TaskDescription,
                                   Status=task.Status,
                                   Priority=task.Priority,
                                   CompletedDate=task.CompletedDate,
                                   AssignedDate =task.AssignedDate,
                                   DueDate = task.DueDate

                               };
            var result = await combinedData.ToListAsync();
            return result;
        }


        public async Task<List<ManagerEmployee>> GetAllEmployeeDetails(int Managerid)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join project in _taskContext.ProjectDetails
                               on employee.ProjectId equals project.ProjectId
                               where employee.ManagerId == Managerid
                               select new ManagerEmployee
                               {
                                   EmpId = employee.EmpId,
                                   EmpName = employee.EmpName,
                                   ProjectName = project.ProjectName
                               };
            var result = await combinedData.ToListAsync();
            return result;
        }


        public async Task<List<CountTask>> GetCount(int Managerid)
        {
            var count_todo = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u => u.EmpName == "ToDo");
            var task = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u => u.EmpName == FetchDetail.EmpName);

        }
    }
}
