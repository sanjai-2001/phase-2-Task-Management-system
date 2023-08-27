namespace TaskMS.Models
{
    public class ManagerEmployee
    {
        public int EmpId { get; set; }
        public string EmpName { get; set; } = null!;
        public string ProjectName { get; set; } = null!;

        public int RoleId { get; set; } = 0;


    }
}
