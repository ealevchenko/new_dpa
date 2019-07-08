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
    public class EFDependenceStagesProject : IRepository<DependenceStagesProject>
    {

        private EFDbContext db;

        public EFDependenceStagesProject(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<DependenceStagesProject> Get()
        {
            try
            {
                return db.Select<DependenceStagesProject>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public DependenceStagesProject Get(int id)
        {
            try
            {
                return db.Select<DependenceStagesProject>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(DependenceStagesProject item)
        {
            try
            {
                db.Insert<DependenceStagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(DependenceStagesProject item)
        {
            try
            {
                db.Update<DependenceStagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(DependenceStagesProject item)
        {
            try
            {
                DependenceStagesProject dbEntry = db.DependenceStagesProject.Find(item.id);
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
                DependenceStagesProject item = db.Delete<DependenceStagesProject>(id);
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

        public DependenceStagesProject Refresh(DependenceStagesProject item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<DependenceStagesProject>(item.id);
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
