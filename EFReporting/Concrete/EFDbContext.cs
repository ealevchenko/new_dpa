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
        public virtual DbSet<Directory_Metering_Units> Directory_Metering_Units { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
