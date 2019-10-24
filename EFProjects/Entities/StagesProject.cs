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
        public int id { get; set; }

        public int id_project { get; set; }

        public int id_templates_stages_project { get; set; }

        public int position { get; set; }

        public DateTime? start { get; set; }

        public DateTime? stop { get; set; }

        public bool current { get; set; }

        public bool skip { get; set; }

        public bool? mile { get; set; }

        [StringLength(100)]
        public string resource { get; set; }

        public int persent { get; set; }

        public bool? group { get; set; }

        public int? parent_id { get; set; }

        [StringLength(100)]
        public string depend { get; set; }

        [StringLength(1000)]
        public string coment { get; set; }

        public virtual ListProjects ListProjects { get; set; }

        public virtual TemplatesStagesProject TemplatesStagesProject { get; set; }
    }
}
