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
    public class EFDailyProduction : IRepository<DailyProduction>
    {

        private EFDbContext db;

        public EFDailyProduction(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<DailyProduction> Context
        {
            get { return db.DailyProduction; }
        }

        public IEnumerable<DailyProduction> Get()
        {
            try
            {
                return db.Select<DailyProduction>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public DailyProduction Get(int id)
        {
            try
            {
                return db.Select<DailyProduction>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(DailyProduction item)
        {
            try
            {
                db.Insert<DailyProduction>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(DailyProduction item)
        {
            try
            {
                db.Update<DailyProduction>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(DailyProduction item)
        {
            try
            {
                DailyProduction dbEntry = db.DailyProduction.Find(item.id);
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
                DailyProduction item = db.Delete<DailyProduction>(id);
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

        public DailyProduction Refresh(DailyProduction item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<DailyProduction>(item.id);
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



        public void Add(IEnumerable<DailyProduction> items)
        {
            try
            {
                db.Inserts<DailyProduction>(items);
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
                db.Delete<DailyProduction>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<DailyProduction> items)
        {
            try
            {
                db.Updates<DailyProduction>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
