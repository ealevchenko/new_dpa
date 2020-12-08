namespace EFReporting.Entities.NG
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BALANCE.Directory_Metering_Units")]
    public partial class Directory_Metering_Units
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Metering_Units()
        {
            DailyIntake = new HashSet<DailyIntake>();
            Directory_Production = new HashSet<Directory_Production>();
        }

        public int id { get; set; }

        public int id_structural_subdivisions { get; set; }

        [Column("id_service area")]
        public int id_service_area { get; set; }

        [Required]
        [StringLength(100)]
        public string metering_units_name { get; set; }

        [Column("unbalance distribution")]
        public bool? unbalance_distribution { get; set; }

        public bool working { get; set; }

        [StringLength(50)]
        public string note { get; set; }

        public int? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DailyIntake> DailyIntake { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Production> Directory_Production { get; set; }
    }
}
