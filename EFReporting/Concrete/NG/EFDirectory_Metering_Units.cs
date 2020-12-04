using EFReporting.Abstract;
using EFReporting.Entities.NG;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFReporting.Concrete.NG
{
    public class EFDirectory_Metering_Units : IRepository<Directory_Metering_Units>
    {

        private EFDbContext db;

        public EFDirectory_Metering_Units(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_Metering_Units> Context
        {
            get { return db.Directory_Metering_Units; }
        }

        public IEnumerable<Directory_Metering_Units> Get()
        {
            try
            {
                return db.Select<Directory_Metering_Units>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_Metering_Units Get(int id)
        {
            try
            {
                return db.Select<Directory_Metering_Units>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_Metering_Units item)
        {
            try
            {
                db.Insert<Directory_Metering_Units>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_Metering_Units item)
        {
            try
            {
                db.Update<Directory_Metering_Units>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_Metering_Units item)
        {
            try
            {
                Directory_Metering_Units dbEntry = db.Directory_Metering_Units.Find(item.id);
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
                Console.WriteLine(e);
            }

        }

        public void Delete(int id)
        {
            try
            {
                Directory_Metering_Units item = db.Delete<Directory_Metering_Units>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
                Console.WriteLine(e);
                return -1;
            }
        }

        public Directory_Metering_Units Refresh(Directory_Metering_Units item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_Metering_Units>(item.id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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



        public void Add(IEnumerable<Directory_Metering_Units> items)
        {
            try
            {
                db.Inserts<Directory_Metering_Units>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<int> items)
        {
            try
            {
                db.Delete<Directory_Metering_Units>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Directory_Metering_Units> items)
        {
            try
            {
                db.Updates<Directory_Metering_Units>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
