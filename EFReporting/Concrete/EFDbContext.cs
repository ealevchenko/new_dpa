using EFReporting.Entities.NG;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFReporting.Concrete
{
    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=NG")
        {
        }

        public virtual DbSet<Balance_NG_3> Balance_NG_3 { get; set; }

        public virtual DbSet<DailyIntake> DailyIntake { get; set; }
        public virtual DbSet<DailyProduction> DailyProduction { get; set; }
        public virtual DbSet<Directory_Metering_Units> Directory_Metering_Units { get; set; }
        public virtual DbSet<Directory_Production> Directory_Production { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DailyIntake>()
                .HasMany(e => e.DailyProduction)
                .WithRequired(e => e.DailyIntake)
                .HasForeignKey(e => e.id_daily_intake)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Metering_Units>()
                .HasMany(e => e.DailyIntake)
                .WithRequired(e => e.Directory_Metering_Units)
                .HasForeignKey(e => e.id_metering_units)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Metering_Units>()
                .HasMany(e => e.Directory_Production)
                .WithRequired(e => e.Directory_Metering_Units)
                .HasForeignKey(e => e.id_metering_units)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Production>()
                .HasMany(e => e.DailyProduction)
                .WithRequired(e => e.Directory_Production)
                .HasForeignKey(e => e.id_directory_production)
                .WillCascadeOnDelete(false);
        }
    }
}
