using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TaskMS.Models;

public partial class TaskMgmtContext : DbContext
{
    public TaskMgmtContext()
    {
    }

    public TaskMgmtContext(DbContextOptions<TaskMgmtContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }

    public virtual DbSet<ProjectDetail> ProjectDetails { get; set; }

    public virtual DbSet<TaskDetail> TaskDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source = .\\SQLEXPRESS; initial catalog = TaskMgmt; integrated security=SSPI; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmployeeDetail>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK_EmpID");

            entity.ToTable("employee_details");

            entity.Property(e => e.EmpId).HasColumnName("emp_id");
            entity.Property(e => e.EmpName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("emp_name");
            entity.Property(e => e.ManagerId).HasColumnName("manager_id");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Project).WithMany(p => p.EmployeeDetails)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK__employee___proje__04E4BC85");
        });

        modelBuilder.Entity<ProjectDetail>(entity =>
        {
            entity.HasKey(e => e.ProjectId).HasName("PK__project___BC799E1FC9666B15");

            entity.ToTable("project_details");

            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.ProjectDescription)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("project_description");
            entity.Property(e => e.ProjectName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("project_name");
        });

        modelBuilder.Entity<TaskDetail>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__task_det__0492148DBE0B8C25");

            entity.ToTable("task_details");

            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.AssignedDate)
                .HasColumnType("datetime")
                .HasColumnName("assigned_date");
            entity.Property(e => e.CompletedDate)
                .HasColumnType("datetime")
                .HasColumnName("completed_date");
            entity.Property(e => e.DueDate)
                .HasColumnType("datetime")
                .HasColumnName("due_date");
            entity.Property(e => e.EmpId).HasColumnName("emp_id");
            entity.Property(e => e.Priority)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("priority");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("status");
            entity.Property(e => e.TaskDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("task_description");

            entity.HasOne(d => d.Emp).WithMany(p => p.TaskDetails)
                .HasForeignKey(d => d.EmpId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__task_deta__emp_i__08B54D69");

            entity.HasOne(d => d.Project).WithMany(p => p.TaskDetails)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__task_deta__proje__07C12930");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
