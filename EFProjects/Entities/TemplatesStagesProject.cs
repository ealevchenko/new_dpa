namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.TemplatesStagesProject")]
    public partial class TemplatesStagesProject
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TemplatesStagesProject()
        {
            StagesProject = new HashSet<StagesProject>();
            TemplatesStagesProject1 = new HashSet<TemplatesStagesProject>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string stages_project_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string stages_project_en { get; set; }

        [StringLength(1000)]
        public string stages_project_description_ru { get; set; }

        [StringLength(1000)]
        public string stages_project_description_en { get; set; }

        public int? id_project_manager { get; set; }

        public int? parent_id { get; set; }

        public virtual ProjectManager ProjectManager { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StagesProject> StagesProject { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TemplatesStagesProject> TemplatesStagesProject1 { get; set; }

        public virtual TemplatesStagesProject TemplatesStagesProject2 { get; set; }
    }
}
