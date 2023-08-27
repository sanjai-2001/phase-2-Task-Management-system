using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskMS.Models;

public partial class TaskDetail
{
    
    public int TaskId { get; set; }

    public string TaskDescription { get; set; } = null!;

    public DateTime AssignedDate { get; set; }

    public DateTime CompletedDate { get; set; } 

    public DateTime DueDate { get; set; }

    public string Status { get; set; } = null!;

    public string Priority { get; set; } = null!;

    public int ProjectId { get; set; }

    public int EmpId { get; set; }
    [JsonIgnore]
    public virtual EmployeeDetail Emp { get; set; } = null!;
    [JsonIgnore]
    public virtual ProjectDetail Project { get; set; } = null!;
}
