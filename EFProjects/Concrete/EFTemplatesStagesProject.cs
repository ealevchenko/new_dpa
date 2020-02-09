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
    public class EFTemplatesStagesProject: IRepository<TemplatesStagesProject>
    {

        private EFDbContext db;

        public EFTemplatesStagesProject(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<TemplatesStagesProject> Context
        {
            get { return db.TemplatesStagesProject; }
        }

        public IEnumerable<TemplatesStagesProject> Get()
        {
            try
            {
                return db.Select<TemplatesStagesProject>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TemplatesStagesProject Get(int id)
        {
            try
            {
                return db.Select<TemplatesStagesProject>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(TemplatesStagesProject item)
        {
            try
            {
                db.Insert<TemplatesStagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(TemplatesStagesProject item)
        {
            try
            {
                db.Update<TemplatesStagesProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(TemplatesStagesProject item)
        {
            try
            {
                TemplatesStagesProject dbEntry = db.TemplatesStagesProject.Find(item.id);
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
                TemplatesStagesProject item = db.Delete<TemplatesStagesProject>(id);
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

        public TemplatesStagesProject Refresh(TemplatesStagesProject item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<TemplatesStagesProject>(item.id);
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
