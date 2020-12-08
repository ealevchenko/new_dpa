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
    public class EFDailyIntake : IRepository<DailyIntake>
    {

        private EFDbContext db;

        public EFDailyIntake(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<DailyIntake> Context
        {
            get { return db.DailyIntake; }
        }

        public IEnumerable<DailyIntake> Get()
        {
            try
            {
                return db.Select<DailyIntake>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public DailyIntake Get(int id)
        {
            try
            {
                return db.Select<DailyIntake>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(DailyIntake item)
        {
            try
            {
                db.Insert<DailyIntake>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(DailyIntake item)
        {
            try
            {
                db.Update<DailyIntake>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(DailyIntake item)
        {
            try
            {
                DailyIntake dbEntry = db.DailyIntake.Find(item.id);
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
                DailyIntake item = db.Delete<DailyIntake>(id);
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

        public DailyIntake Refresh(DailyIntake item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<DailyIntake>(item.id);
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



        public void Add(IEnumerable<DailyIntake> items)
        {
            try
            {
                db.Inserts<DailyIntake>(items);
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
                db.Delete<DailyIntake>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<DailyIntake> items)
        {
            try
            {
                db.Updates<DailyIntake>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
