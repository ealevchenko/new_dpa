using EFProjects.Abstract;
using EFProjects.Concrete;
using EFProjects.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFProjects.Concrete
{
    public class EFWorkPerformers: IRepository<WorkPerformers>
    {

        private EFDbContext db;

        public EFWorkPerformers(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<WorkPerformers> Get()
        {
            try
            {
                return db.Select<WorkPerformers>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public WorkPerformers Get(int id)
        {
            try
            {
                return db.Select<WorkPerformers>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(WorkPerformers item)
        {
            try
            {
                db.Insert<WorkPerformers>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(WorkPerformers item)
        {
            try
            {
                db.Update<WorkPerformers>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(WorkPerformers item)
        {
            try
            {
                WorkPerformers dbEntry = db.WorkPerformers.Find(item.id);
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
                WorkPerformers item = db.Delete<WorkPerformers>(id);
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

        public WorkPerformers Refresh(WorkPerformers item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WorkPerformers>(item.id);
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
