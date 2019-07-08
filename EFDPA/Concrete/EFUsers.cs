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
    public class EFUsers : IRepository<Users>
    {

        private EFDbContext db;

        public EFUsers(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Users> Get()
        {
            try
            {
                return db.Select<Users>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Users Get(int id)
        {
            try
            {
                return db.Select<Users>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Users item)
        {
            try
            {
                db.Insert<Users>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Users item)
        {
            try
            {
                db.Update<Users>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Users item)
        {
            try
            {
                Users dbEntry = db.Users.Find(item.id);
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
                Users item = db.Delete<Users>(id);
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

        public Users Refresh(Users item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Users>(item.id);
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
