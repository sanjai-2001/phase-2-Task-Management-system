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

        public AdminController(IAdmin admin)//DEPENDENCY INJECTION
        {
            _admin = admin;
        }

        [HttpGet("EmployeeDetails")]
        public async Task<ActionResult<List<string>>> GetAllEmployeeDetails(int managerid)
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
                return Ok();
            }
            catch(Exception ex)
            {
                return NotFound("not created");
            }
           
        }

        [HttpPut("UpdateTaskDetails")]

        public async Task<ActionResult<TaskDetail>> UpdateTaskDetails(int TaskId, TasksampleForm taskdetail)
        {
            TaskDetail? taskDetails;
            try
            {
                taskDetails = await _admin.UpdateTaskDetails(TaskId,taskdetail);
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

        [HttpGet("GetCount")]

        public async Task<ActionResult<CountTask>> GetCount(int managerid)
        {
            var countdetails = await _admin.GetCount(managerid);//controller wait for services for response
            if (countdetails == null)
            {
                return NotFound("No Found");
            }
            return Ok(countdetails);
        }

        [HttpGet("GetTaskByToDo")]

        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByToDo(int managerid, string status)
        {
            var taskDetail = await _admin.GetTaskByToDo(managerid,status);//controller wait for services for response
            if (taskDetail == null)
            {
                return NotFound("No task found");
            }
            return Ok(taskDetail);

        }


        [HttpGet("GetTaskByOnProgress")]

        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByProgress(int managerid, string status)
        {
            var taskDetail = await _admin.GetTaskByProgress(managerid, status);//controller wait for services for response
            if (taskDetail == null)
            {
                return NotFound("No task found");
            }
            return Ok(taskDetail);

        }


        [HttpGet("GetTaskByCompleted")]

        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByCompleted(int managerid, string status)
        {
            var taskDetail = await _admin.GetTaskByCompleted(managerid, status);//controller wait for services for response
            if (taskDetail == null)
            {
                return NotFound("No task found");
            }
            return Ok(taskDetail);

        }

    }
}
