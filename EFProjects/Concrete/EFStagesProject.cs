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
    public class EFStagesProject : IRepository<StagesProject>
    {

        private EFDbContext db;

        public EFStagesProject(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<StagesProject> Context
        {
            get { return db.StagesProject; }
        }

        public IEnumerable<StagesProject> Get()
        {
            try
            {
                return db.Select<StagesProject>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public StagesProject Get(int id)
        {
            try
            {
                return db.Select<StagesProject>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(StagesProject item)
        {
            try
            {
                db.Insert<StagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(StagesProject item)
        {
            try
            {
                db.Update<StagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(StagesProject item)
        {
            try
            {
                StagesProject dbEntry = db.StagesProject.Find(item.id);
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
                StagesProject item = db.Delete<StagesProject>(id);
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

        public StagesProject Refresh(StagesProject item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<StagesProject>(item.id);
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
