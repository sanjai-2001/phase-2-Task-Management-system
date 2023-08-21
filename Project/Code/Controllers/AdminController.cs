using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskMS.Models;
using TaskMS.Services.Interfaces;

namespace TaskMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public IAdmin _admin;

        public AdminController(IAdmin admin)
        {
            _admin = admin;
        }

        [HttpGet("EmployeeDetails")]
        public async Task<ActionResult<List<ManagerEmployee>>> GetAllEmployeeDetails(int managerid)
        {
            var employeeDetail = await _admin.GetAllEmployeeDetails(managerid);//controller wait for services for response
            if (employeeDetail == null)
            {
                return NotFound("No employee found");
            }
            return Ok(employeeDetail);
        }
        
        [HttpGet("TaskDetails")]
        public async Task<ActionResult<List<TasksampleForm>>> GetAllTaskDetails(int managerid)
        {
            var taskDetail = await _admin.GetAllTaskDetails(managerid);//controller wait for services for response
            if (taskDetail == null)
            {
                return NotFound("No task found");
            }
            return Ok(taskDetail);
        }

        
        [HttpPost("CreateTask")]

        public async Task<ActionResult<List<TaskDetail>>> CreateTask(TasksampleForm FetchDetail)
        {
            try
            {
                var taskDetails = await _admin.CreateTask(FetchDetail);
                return Ok("Created");
            }
            catch(Exception ex)
            {
                return NotFound("not created");
            }
           
        }

        [HttpPut("UpdateTaskDetails")]

        public async Task<ActionResult<TaskDetail>> UpdateProject(int task_id, TaskDetail taskDetail)
        {
            TaskDetail taskDetails;
            try
            {
                taskDetails = await _admin.UpdateTaskDetails(task_id, taskDetail);
                return Ok(taskDetails);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpDelete("DeleteTask")]
        public async Task<ActionResult<List<TaskDetail>>> DeleteTask(int task_id)
        {
            try
            {
                var taskDetails = await _admin.DeleteTask(task_id);
                return taskDetails;
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }







    }
}
