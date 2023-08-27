using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using StudentDetails.GlobalExceptions;
using System.Threading.Tasks;
using TaskMS.Models;
using TaskMS.Services.Interfaces;


namespace TaskMS.Services
{
    public class EmployeeServices:IEmployee
    {
        public TaskMgmtContext? _taskContext;

        public EmployeeServices(TaskMgmtContext? taskContext)
        {
            this._taskContext = taskContext;
        }

        public async Task<List<ManagerEmployee>> GetEmployeeDetails(int EmployeeId)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join project in _taskContext.ProjectDetails
                               on employee.ProjectId equals project.ProjectId
                               where employee.EmpId == EmployeeId
                               select new ManagerEmployee
                               {
                                   EmpId = employee.EmpId,
                                   EmpName = employee.EmpName,
                                   ProjectName = project.ProjectName
                               };
            var result = await combinedData.ToListAsync();
            return result;
        }

        public async Task<CountTask> GetEmployeeCount(int EmployeeId)
        {
            CountTask countTask = new CountTask();
            var todo = await _taskContext.TaskDetails.CountAsync(u => u.Status == "ToDo" && u.EmpId==EmployeeId );

            var progress = await _taskContext.TaskDetails.CountAsync(u => u.Status == "On Progress" && u.EmpId == EmployeeId);

            var completed = await _taskContext.TaskDetails.CountAsync(u => u.Status == "Completed" && u.EmpId == EmployeeId);

            countTask.ToDoCount = Convert.ToInt32(todo);
            countTask.OnProgressCount = Convert.ToInt32(progress);
            countTask.CompletedCount = Convert.ToInt32(completed);

            //var result = await countTask.ToListAsync();
            return countTask;
        }

        public async Task<List<TasksampleForm>> GetAllTaskDetails(int EmployeeId)//async - not depent on other thread(multithreadingtask)
        {

            var response = await _taskContext.TaskDetails .Where(u => u.EmpId == EmployeeId).ToListAsync();
            List<TasksampleForm> taskList = new List<TasksampleForm>(); // Create a list to hold tasks

            foreach (var task in response)
            {
                var empname = await _taskContext.EmployeeDetails.FirstOrDefaultAsync(u => u.EmpId == EmployeeId);
                TasksampleForm details = new TasksampleForm
                {
                    TaskId=task.TaskId,
                    TaskDescription=task.TaskDescription,
                    AssignedDate = DateOnly.FromDateTime(task.AssignedDate),
                    DueDate = DateOnly.FromDateTime(task.DueDate),
                    CompletedDate = DateOnly.FromDateTime(task.CompletedDate),
                    Status=task.Status,
                    Priority=task.Priority,
                    EmpName=empname.EmpName

            };

                taskList.Add(details); // Add the task to the list
            }

            return taskList;

        }

        public async Task<TaskDetail> UpdateTaskDetails(int TaskId, TasksampleForm taskdetail)
        {
            var task = await _taskContext.TaskDetails.FirstOrDefaultAsync(u => u.TaskId == TaskId);
            //TaskDetail? rtaskDetail = new TaskDetail();
            if (task == null)
            {
                throw new Exception(StudentDetailsExceptions.ExceptionMessages[0]);
            }
            else
            {
                task.TaskId = task.TaskId;
                task.TaskDescription = task.TaskDescription;
                task.AssignedDate = task.AssignedDate;
                task.DueDate = task.DueDate;
                task.CompletedDate = DateTime.Now;
                task.Status = taskdetail.Status;
                task.Priority = task.Priority;
                task.EmpId = task.EmpId;
                task.ProjectId = task.ProjectId;
                await _taskContext.SaveChangesAsync();

                var rtask = await _taskContext.TaskDetails.FindAsync(TaskId);

                return rtask;
            }
        }

        public async Task<List<TasksampleForm>> GetTaskByToDo(int EmployeeId, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.EmpId == EmployeeId && task.Status == "ToDo"
                               select new TasksampleForm
                               {
                                   TaskId = task.TaskId,
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

        public async Task<List<TasksampleForm>> GetTaskByProgress(int EmployeeId, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.EmpId == EmployeeId && task.Status == "On progress"
                               select new TasksampleForm
                               {
                                   TaskId = task.TaskId,
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

        public async Task<List<TasksampleForm>> GetTaskByCompleted(int EmployeeId, string status)
        {
            var combinedData = from employee in _taskContext.EmployeeDetails
                               join task in _taskContext.TaskDetails
                               on employee.EmpId equals task.EmpId
                               where employee.EmpId == EmployeeId && task.Status == "Completed"
                               select new TasksampleForm
                               {
                                   TaskId = task.TaskId,
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
