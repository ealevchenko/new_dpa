namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.StagesProject")]
    public partial class StagesProject
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public StagesProject()
        {
            DependenceStagesProject = new HashSet<DependenceStagesProject>();
            DependenceStagesProject1 = new HashSet<DependenceStagesProject>();
        }

        public int id { get; set; }

        public int id_project { get; set; }

        public int id_templates_stages_project { get; set; }

        public int position { get; set; }

        public DateTime? start_stages { get; set; }

        public DateTime? stop_stages { get; set; }

        public int persent { get; set; }

        [StringLength(1000)]
        public string coment { get; set; }

        [StringLength(1000)]
        public string responsible { get; set; }

        public bool skip_stages { get; set; }

        public bool current_stages { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DependenceStagesProject> DependenceStagesProject { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DependenceStagesProject> DependenceStagesProject1 { get; set; }

        public virtual ListProjects ListProjects { get; set; }

        public virtual TemplatesStagesProject TemplatesStagesProject { get; set; }
    }
}
