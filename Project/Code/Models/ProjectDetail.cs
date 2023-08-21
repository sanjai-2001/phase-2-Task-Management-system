using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskMS.Models;

public partial class ProjectDetail
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string ProjectDescription { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<EmployeeDetail> EmployeeDetails { get; set; } = new List<EmployeeDetail>();
    [JsonIgnore]
    public virtual ICollection<TaskDetail> TaskDetails { get; set; } = new List<TaskDetail>();
}
