namespace EFReporting.Entities.NG
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BALANCE.DailyProduction")]
    public partial class DailyProduction
    {
        public int id { get; set; }

        public int id_daily_intake { get; set; }

        public int id_directory_production { get; set; }

        public double value { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual DailyIntake DailyIntake { get; set; }

        public virtual Directory_Production Directory_Production { get; set; }
    }
}
