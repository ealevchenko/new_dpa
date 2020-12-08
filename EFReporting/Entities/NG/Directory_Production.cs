namespace EFReporting.Entities.NG
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BALANCE.Directory_Production")]
    public partial class Directory_Production
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Production()
        {
            DailyProduction = new HashSet<DailyProduction>();
        }

        public int id { get; set; }

        public int id_metering_units { get; set; }

        [Required]
        [StringLength(100)]
        public string production_name { get; set; }

        [Required]
        [StringLength(20)]
        public string production_unit { get; set; }

        [Column("optimal consumption")]
        public double optimal_consumption { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DailyProduction> DailyProduction { get; set; }

        public virtual Directory_Metering_Units Directory_Metering_Units { get; set; }
    }
}
