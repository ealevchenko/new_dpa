namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.WorkPerformers")]
    public partial class WorkPerformers
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkPerformers()
        {
            ListProjects = new HashSet<ListProjects>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string name_performer_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string name_performer_en { get; set; }

        [StringLength(100)]
        public string email_performer { get; set; }

        public long? phone_performer { get; set; }

        [StringLength(100)]
        public string name_boss { get; set; }

        public long? phone_boss { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ListProjects> ListProjects { get; set; }
    }
}
