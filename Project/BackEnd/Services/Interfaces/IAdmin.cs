
using TaskMS.Models;

namespace TaskMS.Services.Interfaces
{
    public interface IAdmin
    {
        Task<List<string>> GetAllEmployeeDetails(int Managerid);

        Task<CountTask> GetCount(int Managerid);

        Task<List<TasksampleForm>> GetAllTaskDetails(int Managerid);

        Task<List<TaskDetail>> CreateTask( TasksampleForm FetchDetail);

        Task<TaskDetail> UpdateTaskDetails(int TaskId,TasksampleForm taskdetail);

        Task<List<TaskDetail>> DeleteTask(int task_id);
        Task<List<TasksampleForm>> GetTaskByToDo(int managerid, string status);

        Task<List<TasksampleForm>> GetTaskByProgress(int managerid, string status);

        Task<List<TasksampleForm>> GetTaskByCompleted(int managerid, string status);
    }
}
