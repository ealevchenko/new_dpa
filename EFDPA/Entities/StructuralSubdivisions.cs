namespace EFDPA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class StructuralSubdivisions
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public StructuralSubdivisions()
        {
            Users = new HashSet<Users>();
        }

        public int id { get; set; }

        public int position { get; set; }

        [Required]
        [StringLength(100)]
        public string name_subdivisions_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string name_subdivisions_en { get; set; }

        [Required]
        [StringLength(1000)]
        public string name_subdivisions_full_ru { get; set; }

        [Required]
        [StringLength(1000)]
        public string name_subdivisions_full_en { get; set; }

        public int type { get; set; }

        public int? code { get; set; }

        public int? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Users> Users { get; set; }
    }
}
