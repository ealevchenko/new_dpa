namespace EFProjects.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFProjects.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=project")
        {
        }

        public virtual DbSet<DependenceStagesProject> DependenceStagesProject { get; set; }
        public virtual DbSet<ListProjects> ListProjects { get; set; }
        public virtual DbSet<ProjectManager> ProjectManager { get; set; }
        public virtual DbSet<StagesProject> StagesProject { get; set; }
        public virtual DbSet<TemplatesStagesProject> TemplatesStagesProject { get; set; }
        public virtual DbSet<TypeProject> TypeProject { get; set; }
        public virtual DbSet<WorkPerformers> WorkPerformers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ListProjects>()
                .Property(e => e.budget)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_engineering_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_equipment_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_construction_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_commissioning_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.contract_other_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.payment_engineering_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.payment_equipment_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.payment_construction_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.payment_commissioning_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .Property(e => e.payment_other_value)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ListProjects>()
                .HasMany(e => e.StagesProject)
                .WithRequired(e => e.ListProjects)
                .HasForeignKey(e => e.id_project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectManager>()
                .HasMany(e => e.ListProjects)
                .WithRequired(e => e.ProjectManager)
                .HasForeignKey(e => e.id_project_manager)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectManager>()
                .HasMany(e => e.ProjectManager1)
                .WithOptional(e => e.ProjectManager2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<ProjectManager>()
                .HasMany(e => e.TemplatesStagesProject)
                .WithOptional(e => e.ProjectManager)
                .HasForeignKey(e => e.id_project_manager);

            modelBuilder.Entity<StagesProject>()
                .HasMany(e => e.DependenceStagesProject)
                .WithRequired(e => e.StagesProject)
                .HasForeignKey(e => e.id_stage_project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<StagesProject>()
                .HasMany(e => e.DependenceStagesProject1)
                .WithRequired(e => e.StagesProject1)
                .HasForeignKey(e => e.id_dependent_project_stage)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TemplatesStagesProject>()
                .HasMany(e => e.StagesProject)
                .WithRequired(e => e.TemplatesStagesProject)
                .HasForeignKey(e => e.id_templates_stages_project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TemplatesStagesProject>()
                .HasMany(e => e.TemplatesStagesProject1)
                .WithOptional(e => e.TemplatesStagesProject2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<TypeProject>()
                .HasMany(e => e.ListProjects)
                .WithRequired(e => e.TypeProject)
                .HasForeignKey(e => e.id_type_project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkPerformers>()
                .HasMany(e => e.ListProjects)
                .WithOptional(e => e.WorkPerformers)
                .HasForeignKey(e => e.id_work_performer);
        }
    }
}
