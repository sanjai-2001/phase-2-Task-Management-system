
using TaskMS.Models;

namespace TaskMS.Services.Interfaces
{
    public interface IAdmin
    {
        Task<List<ManagerEmployee>> GetAllEmployeeDetails(int Managerid);

        Task<List<CountTask>> GetCount(int Managerid);

        Task<List<TasksampleForm>> GetAllTaskDetails(int Managerid);

        Task<List<TaskDetail>> CreateTask(TasksampleForm FetchDetail);

        Task<TaskDetail> UpdateTaskDetails(int TaskID,TaskDetail taskDetail);

        Task<List<TaskDetail>> DeleteTask(int task_id);
    }
}
