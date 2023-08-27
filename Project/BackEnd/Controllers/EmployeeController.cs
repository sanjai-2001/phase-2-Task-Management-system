using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskMS.Models;
using TaskMS.Services.Interfaces;

namespace TaskMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        public IEmployee _employee;

        public EmployeeController(IEmployee employee)
        {
            _employee = employee;
        }

        [HttpGet("EmployeeDetails")]
        public async Task<ActionResult<List<ManagerEmployee>>> GetEmployeeDetails(int EmployeeId)
        {
            var EmpDetail = await _employee.GetEmployeeDetails(EmployeeId);//controller wait for services for response
            if (EmpDetail == null)
            {
                return NotFound("Not Found");
            }
            return Ok(EmpDetail);
        }


        [HttpGet("GetCount")]

        public async Task<ActionResult<CountTask>> GetCount(int EmployeeId)
        {
            var countdetails = await _employee.GetEmployeeCount(EmployeeId);//controller wait for services for response
            if (countdetails == null)
            {
                return NotFound("No Found");
            }
            return Ok(countdetails);
        }

        [HttpGet("GetTaskDetails")]
        public async Task<ActionResult<List<TasksampleForm>>> GetAllTaskDetails(int EmployeeId)//async - not depent on other thread(multithreadingtask)
        {
            var task = await _employee.GetAllTaskDetails(EmployeeId);
            if (task == null)
            {
                return NotFound("No Task found");
            }
            else
            {
                return Ok(task);
            }

        }

        [HttpPut("updateTaskDetails")]
        public async Task<ActionResult<TaskDetail>> UpdateTaskDetails(int task_id, TasksampleForm taskDetail)
        {
            TaskDetail? taskDetails;
            try
            {
                taskDetails = await _employee.UpdateTaskDetails(task_id, taskDetail);
                return Ok(taskDetails);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpGet("GetTaskByToDo")]
        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByToDo(int EmployeeId, string status)
        {
            try
            {
                var taskDetail = await _employee.GetTaskByToDo(EmployeeId, status);//controller wait for services for response
                return Ok(taskDetail);
            }
            catch (Exception ex)
            {
                return NotFound("No task found");
            }           

        }

        [HttpGet("GetTaskByOnProgress")]
        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByProgress(int EmployeeId, string status)
        {
            try
            {
                var taskDetail = await _employee.GetTaskByProgress(EmployeeId, status);//controller wait for services for response
                return Ok(taskDetail);
            }
            catch (Exception ex)
            {
                return NotFound("No task found");
            }

        }

        [HttpGet("GetTaskByCompleted")]
        public async Task<ActionResult<List<TasksampleForm>>> GetTaskByCompleted(int EmployeeId, string status)
        {
            try
            {
                var taskDetail = await _employee.GetTaskByCompleted(EmployeeId, status);//controller wait for services for response
                return Ok(taskDetail);
            }
            catch (Exception ex)
            {
                return NotFound("No task found");
            }

        }


    }
}
