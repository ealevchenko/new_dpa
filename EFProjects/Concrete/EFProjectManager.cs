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
    public class EFProjectManager : IRepository<ProjectManager>
    {

        private EFDbContext db;

        public EFProjectManager(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ProjectManager> Context
        {
            get { return db.ProjectManager; }
        }
        public IEnumerable<ProjectManager> Get()
        {
            try
            {
                return db.Select<ProjectManager>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ProjectManager Get(int id)
        {
            try
            {
                return db.Select<ProjectManager>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(ProjectManager item)
        {
            try
            {
                db.Insert<ProjectManager>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(ProjectManager item)
        {
            try
            {
                db.Update<ProjectManager>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(ProjectManager item)
        {
            try
            {
                ProjectManager dbEntry = db.ProjectManager.Find(item.id);
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
                ProjectManager item = db.Delete<ProjectManager>(id);
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

        public ProjectManager Refresh(ProjectManager item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ProjectManager>(item.id);
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
