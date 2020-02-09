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
    public class EFListProjects : IRepository<ListProjects>
    {

        private EFDbContext db;

        public EFListProjects(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ListProjects> Context
        {
            get { return db.ListProjects; }
        }

        public IEnumerable<ListProjects> Get()
        {
            try
            {
                return db.Select<ListProjects>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ListProjects Get(int id)
        {
            try
            {
                return db.Select<ListProjects>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(ListProjects item)
        {
            try
            {
                db.Insert<ListProjects>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(ListProjects item)
        {
            try
            {
                db.Update<ListProjects>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(ListProjects item)
        {
            try
            {
                ListProjects dbEntry = db.ListProjects.Find(item.id);
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
                ListProjects item = db.Delete<ListProjects>(id);
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

        public ListProjects Refresh(ListProjects item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ListProjects>(item.id);
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
