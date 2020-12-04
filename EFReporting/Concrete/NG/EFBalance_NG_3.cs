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
    public class EFBalance_NG_3 : IRepository<Balance_NG_3>
    {

        private EFDbContext db;

        public EFBalance_NG_3(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Balance_NG_3> Context
        {
            get { return db.Balance_NG_3; }
        }

        public IEnumerable<Balance_NG_3> Get()
        {
            try
            {
                return db.Select<Balance_NG_3>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Balance_NG_3 Get(int id)
        {
            try
            {
                return db.Select<Balance_NG_3>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Balance_NG_3 item)
        {
            try
            {
                db.Insert<Balance_NG_3>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Balance_NG_3 item)
        {
            try
            {
                db.Update<Balance_NG_3>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Balance_NG_3 item)
        {
            try
            {
                Balance_NG_3 dbEntry = db.Balance_NG_3.Find(item.id);
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
                Balance_NG_3 item = db.Delete<Balance_NG_3>(id);
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

        public Balance_NG_3 Refresh(Balance_NG_3 item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Balance_NG_3>(item.id);
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



        public void Add(IEnumerable<Balance_NG_3> items)
        {
            try
            {
                db.Inserts<Balance_NG_3>(items);
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
                db.Delete<Balance_NG_3>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Balance_NG_3> items)
        {
            try
            {
                db.Updates<Balance_NG_3>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
