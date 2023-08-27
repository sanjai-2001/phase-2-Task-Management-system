namespace TaskMS.Models
{
    public class TasksampleForm
    {

        public int  TaskId { get; set; }
        public string TaskDescription { get; set; } = null!;

        public DateOnly AssignedDate { get; set; }

        public DateOnly CompletedDate { get; set; }
        public DateOnly DueDate { get; set; }

        public string Status { get; set; } = null!;

        public string Priority { get; set; } = null!;

        public string EmpName { get; set; } = null!;

    }
}
