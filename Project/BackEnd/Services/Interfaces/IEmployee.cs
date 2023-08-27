using TaskMS.Models;

namespace TaskMS.Services.Interfaces
{
    public interface IEmployee
    {
        Task<List<ManagerEmployee>> GetEmployeeDetails(int EmployeeId);

        Task<CountTask> GetEmployeeCount(int EmployeeId);
        Task<List<TasksampleForm>> GetAllTaskDetails(int EmployeeId);

        Task<TaskDetail> UpdateTaskDetails(int TaskId, TasksampleForm taskDetail);

        Task<List<TasksampleForm>> GetTaskByToDo(int EmployeeId, string status);

        Task<List<TasksampleForm>> GetTaskByProgress(int EmployeeId, string status);

        Task<List<TasksampleForm>> GetTaskByCompleted(int EmployeeId, string status);

    }
}
