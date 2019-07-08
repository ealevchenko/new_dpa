namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.ListProjects")]
    public partial class ListProjects
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ListProjects()
        {
            StagesProject = new HashSet<StagesProject>();
        }

        public int id { get; set; }

        public int id_type_project { get; set; }

        public int id_structural_subdivisions { get; set; }

        [Required]
        [StringLength(1000)]
        public string name_project_ru { get; set; }

        [Required]
        [StringLength(1000)]
        public string name_project_en { get; set; }

        [Required]
        public string goals_project_ru { get; set; }

        [Required]
        public string goals_project_en { get; set; }

        public int id_project_customer { get; set; }

        [StringLength(50)]
        public string spp_sap { get; set; }

        public int? id_spp_owner { get; set; }

        public DateTime? start_project { get; set; }

        public int? id_work_performer { get; set; }

        public DateTime? stop_project_contract { get; set; }

        [Column(TypeName = "money")]
        public decimal? budget { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_engineering_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_equipment_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_construction_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_commissioning_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? contract_other_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? payment_engineering_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? payment_equipment_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? payment_construction_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? payment_commissioning_value { get; set; }

        [Column(TypeName = "money")]
        public decimal? payment_other_value { get; set; }

        [StringLength(1000)]
        public string workspace { get; set; }

        public int id_project_manager { get; set; }

        public int id_status_project { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime change { get; set; }

        [Required]
        [StringLength(50)]
        public string change_user { get; set; }

        public virtual ProjectManager ProjectManager { get; set; }

        public virtual TypeProject TypeProject { get; set; }

        public virtual WorkPerformers WorkPerformers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StagesProject> StagesProject { get; set; }
    }
}
