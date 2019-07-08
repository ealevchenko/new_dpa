namespace EFProjects.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("project.TypeProject")]
    public partial class TypeProject
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TypeProject()
        {
            ListProjects = new HashSet<ListProjects>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string type_project_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string type_project_en { get; set; }

        [Required]
        [StringLength(1000)]
        public string description_type_project_ru { get; set; }

        [Required]
        [StringLength(1000)]
        public string description_type_project_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ListProjects> ListProjects { get; set; }
    }
}
