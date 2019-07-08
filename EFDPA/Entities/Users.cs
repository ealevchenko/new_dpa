namespace EFDPA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Users
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string user_name { get; set; }

        [StringLength(1000)]
        public string description { get; set; }

        [StringLength(150)]
        public string email { get; set; }

        [StringLength(50)]
        public string surname { get; set; }

        [StringLength(50)]
        public string name { get; set; }

        [StringLength(50)]
        public string patronymic { get; set; }

        public int? id_structural_subdivisions { get; set; }

        public virtual StructuralSubdivisions StructuralSubdivisions { get; set; }
    }
}
