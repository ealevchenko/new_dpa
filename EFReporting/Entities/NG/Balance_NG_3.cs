namespace EFReporting.Entities.NG
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BALANCE.Balance_NG_3")]
    public partial class Balance_NG_3
    {
        public int id { get; set; }

        [Column(TypeName = "date")]
        public DateTime date { get; set; }

        public int id_metering_units { get; set; }

        public double value { get; set; }
    }
}
