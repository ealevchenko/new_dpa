namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.DependenceStagesProject")]
    public partial class DependenceStagesProject
    {
        public int id { get; set; }

        public int id_stage_project { get; set; }

        public int id_dependent_project_stage { get; set; }

        public virtual StagesProject StagesProject { get; set; }

        public virtual StagesProject StagesProject1 { get; set; }
    }
}
