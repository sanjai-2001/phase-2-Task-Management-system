namespace TaskMS.Models
{
    public class TasksampleForm
    {
        
        public string TaskDescription { get; set; } = null!;

        public DateTime AssignedDate { get; set; }

        public DateTime CompletedDate { get; set; }
        public DateTime DueDate { get; set; }

        public string Status { get; set; } = null!;

        public string Priority { get; set; } = null!;

        public string EmpName { get; set; } = null!;




    }
}
