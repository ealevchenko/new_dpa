namespace EFDPA.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFDPA.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=dpa")
        {
        }

        public virtual DbSet<StructuralSubdivisions> StructuralSubdivisions { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StructuralSubdivisions>()
                .HasMany(e => e.Users)
                .WithOptional(e => e.StructuralSubdivisions)
                .HasForeignKey(e => e.id_structural_subdivisions);
        }
    }
}
