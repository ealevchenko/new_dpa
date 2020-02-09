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
    public class EFTypeProject: IRepository<TypeProject>
    {

        private EFDbContext db;

        public EFTypeProject(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<TypeProject> Context
        {
            get { return db.TypeProject; }
        }

        public IEnumerable<TypeProject> Get()
        {
            try
            {
                return db.Select<TypeProject>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TypeProject Get(int id)
        {
            try
            {
                return db.Select<TypeProject>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(TypeProject item)
        {
            try
            {
                db.Insert<TypeProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(TypeProject item)
        {
            try
            {
                db.Update<TypeProject>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(TypeProject item)
        {
            try
            {
                TypeProject dbEntry = db.TypeProject.Find(item.id);
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
                TypeProject item = db.Delete<TypeProject>(id);
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

        public TypeProject Refresh(TypeProject item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<TypeProject>(item.id);
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
