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
        private readonly int hour;

        public TaskAdminServices(TaskMgmtContext Context)
        {
            this._taskContext = Context;
        }

        public async Task<List<TaskDetail>> CreateTask(TasksampleForm FetchDetail)
        {
            Console.WriteLine(FetchDetail);
            var task = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u=>u.EmpName == FetchDetail.EmpName);
            TaskDetail? taskDetail = new TaskDetail();
          
            if (FetchDetail ==null)
            {
                throw new Exception("Not found");
            }
            else
            {
                //taskDetail.TaskId = FetchDetail.TaskId;
               
                taskDetail.TaskDescription = FetchDetail.TaskDescription;
                taskDetail.AssignedDate = DateTime.Now;
                taskDetail.CompletedDate = DateTime.Now;
                DateOnly dateOnlyValue = FetchDetail.DueDate; // Assuming FetchDetail.DueDate is of type DateOnly
                DateTime dateTimeValue = new DateTime(dateOnlyValue.Year, dateOnlyValue.Month, dateOnlyValue.Day, 00,00,00); 
                taskDetail.DueDate = dateTimeValue;
                taskDetail.Status = "ToDo";
                taskDetail.Priority = FetchDetail.Priority;
                taskDetail.EmpId = task.EmpId;
                taskDetail.ProjectId = task.ProjectId;

                _taskContext.TaskDetails.Add(taskDetail);
                await _taskContext.SaveChangesAsync();

                return await _taskContext.TaskDetails.ToListAsync();

            }

        }

        public async Task<TaskDetail> UpdateTaskDetails(int TaskId,TasksampleForm taskdetail)
        {
            var task = await _taskContext.TaskDetails.FirstOrDefaultAsync(u => u.TaskId == TaskId);
            //TaskDetail? rtaskDetail = new TaskDetail();
            if (task == null)
            {
                throw new Exception(StudentDetailsExceptions.ExceptionMessages[0]);
            }
            else
            {      
                task.TaskId=task.TaskId;
                task.TaskDescription = taskdetail.TaskDescription;
                task.AssignedDate = DateTime.Now;
                DateOnly dateOnlyValue = taskdetail.DueDate; // Assuming FetchDetail.DueDate is of type DateOnly
                DateTime dateTimeValue = new DateTime(dateOnlyValue.Year, dateOnlyValue.Month, dateOnlyValue.Day, 00, 00, 00);
                task.DueDate = dateTimeValue;
                task.CompletedDate = task.CompletedDate;
                task.Status = task.Status;
                task.Priority = taskdetail.Priority;
                task.EmpId = task.EmpId;
                task.ProjectId= task.ProjectId;
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
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.ManagerId == Managerid
                               select new TasksampleForm
                               {
                                   TaskId= task.TaskId,
                                   EmpName = employee.EmpName,
                                   TaskDescription=task.TaskDescription,
                                   Status=task.Status,
                                   Priority=task.Priority,
                                   CompletedDate = DateOnly.FromDateTime(task.CompletedDate),
                                   AssignedDate = DateOnly.FromDateTime(task.AssignedDate),
                                   DueDate = DateOnly.FromDateTime(task.DueDate)

                               };
            var result = await combinedData.ToListAsync();
            return result;
        }


        public async Task<List<string>> GetAllEmployeeDetails(int Managerid)
        {
            var combinedData = await (from employee in _taskContext.EmployeeDetails
                               join project in _taskContext.ProjectDetails
                               on employee.ProjectId equals project.ProjectId
                               where employee.ManagerId == Managerid &&  employee.EmpId !=Managerid
                                select employee.EmpName)
                               .ToListAsync();
            // var result = await combinedData.ToListAsync();
            return combinedData;
        }


        public async Task<CountTask> GetCount(int Managerid)
        {
            CountTask countTask = new CountTask();
            var todo = await _taskContext.TaskDetails.CountAsync(u => u.Status == "ToDo");
           
            var progress = await _taskContext.TaskDetails.CountAsync(u => u.Status == "On Progress");

            var completed = await _taskContext.TaskDetails.CountAsync(u => u.Status == "Completed");

            countTask.ToDoCount = Convert.ToInt32(todo);
            countTask.OnProgressCount = Convert.ToInt32(progress);
            countTask.CompletedCount= Convert.ToInt32(completed);

            //var result = await countTask.ToListAsync();
            return countTask;

        }

        public async Task<List<TasksampleForm>> GetTaskByToDo(int managerid, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.ManagerId == managerid && task.Status== "ToDo"
                               select new TasksampleForm
                               {
                                   EmpName = employee.EmpName,
                                   TaskDescription = task.TaskDescription,
                                   Status = task.Status,
                                   Priority = task.Priority,
                                   CompletedDate = DateOnly.FromDateTime(task.CompletedDate),
                                   AssignedDate = DateOnly.FromDateTime(task.AssignedDate),
                                   DueDate = DateOnly.FromDateTime(task.DueDate)
                               };
            var result = await combinedData.ToListAsync();
            return result;

        }

        public async Task<List<TasksampleForm>> GetTaskByProgress(int managerid, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.ManagerId == managerid && task.Status == "On Progress"
                               select new TasksampleForm
                               {
                                   EmpName = employee.EmpName,
                                   TaskDescription = task.TaskDescription,
                                   Status = task.Status,
                                   Priority = task.Priority,
                                   CompletedDate = DateOnly.FromDateTime(task.CompletedDate),
                                   AssignedDate = DateOnly.FromDateTime(task.AssignedDate),
                                   DueDate = DateOnly.FromDateTime(task.DueDate)

                               };
            var result = await combinedData.ToListAsync();
            return result;

        }

        public async Task<List<TasksampleForm>> GetTaskByCompleted(int managerid, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.ManagerId == managerid && task.Status == "Completed"
                               select new TasksampleForm
                               {
                                   EmpName = employee.EmpName,
                                   TaskDescription = task.TaskDescription,
                                   Status = task.Status,
                                   Priority = task.Priority,
                                   CompletedDate = DateOnly.FromDateTime(task.CompletedDate),
                                   AssignedDate = DateOnly.FromDateTime(task.AssignedDate),
                                   DueDate = DateOnly.FromDateTime(task.DueDate)

                               };
            var result = await combinedData.ToListAsync();
            return result;

        }
    }
}
