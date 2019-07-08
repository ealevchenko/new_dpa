namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.ProjectManager")]
    public partial class ProjectManager
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectManager()
        {
            ListProjects = new HashSet<ListProjects>();
            ProjectManager1 = new HashSet<ProjectManager>();
            TemplatesStagesProject = new HashSet<TemplatesStagesProject>();
        }

        public int id { get; set; }

        public int id_user { get; set; }

        [Required]
        [StringLength(150)]
        public string email { get; set; }

        public long? phone_work { get; set; }

        public long? phone_mobile { get; set; }

        [StringLength(150)]
        public string adress { get; set; }

        public int? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ListProjects> ListProjects { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectManager> ProjectManager1 { get; set; }

        public virtual ProjectManager ProjectManager2 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TemplatesStagesProject> TemplatesStagesProject { get; set; }
    }
}
