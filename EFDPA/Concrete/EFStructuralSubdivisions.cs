using EFDPA.Abstract;
using EFDPA.Concrete;
using EFDPA.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFDPA.Concrete
{
    public class EFStructuralSubdivisions : IRepository<StructuralSubdivisions>
    {

        private EFDbContext db;

        public EFStructuralSubdivisions(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<StructuralSubdivisions> Get()
        {
            try
            {
                return db.Select<StructuralSubdivisions>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public StructuralSubdivisions Get(int id)
        {
            try
            {
                return db.Select<StructuralSubdivisions>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(StructuralSubdivisions item)
        {
            try
            {
                db.Insert<StructuralSubdivisions>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(StructuralSubdivisions item)
        {
            try
            {
                db.Update<StructuralSubdivisions>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(StructuralSubdivisions item)
        {
            try
            {
                StructuralSubdivisions dbEntry = db.StructuralSubdivisions.Find(item.id);
                if (dbEntry == null)
                {
                    Add(item);
                }
                else
                {
                    Update(item);
                }
            }
            catch (Exception e)
            {

            }

        }

        public void Delete(int id)
        {
            try
            {
                StructuralSubdivisions item = db.Delete<StructuralSubdivisions>(id);
            }
            catch (Exception e)
            {

            }
        }

        public int Save()
        {
            try
            {
                return db.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public StructuralSubdivisions Refresh(StructuralSubdivisions item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<StructuralSubdivisions>(item.id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
