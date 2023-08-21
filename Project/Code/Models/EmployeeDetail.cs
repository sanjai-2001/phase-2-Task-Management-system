using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskMS.Models;

public partial class EmployeeDetail
{
    public int EmpId { get; set; }

    public string EmpName { get; set; } = null!;

    public int ManagerId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int ProjectId { get; set; }
    [JsonIgnore]
    public virtual ProjectDetail? Project { get; set; }
    [JsonIgnore]
    public virtual ICollection<TaskDetail> TaskDetails { get; set; } = new List<TaskDetail>();
}
