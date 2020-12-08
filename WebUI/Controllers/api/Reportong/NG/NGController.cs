using EFReporting.Abstract;
using EFReporting.Concrete;
using EFReporting.Entities.NG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api.Reportong.NG
{

    public static class ids_library
    {
        public static DailyIntake GetDailyIntake(this DailyIntake s)
        {
            try
            {
                if (s == null) return null;
                return new DailyIntake()
                {
                    id = s.id,
                    date = s.date,
                    id_metering_units = s.id_metering_units,
                    value = s.value,
                    change = s.change,
                    change_user = s.change_user,
                    DailyProduction = s.DailyProduction.ToList().Select(p => p.GetDailyProduction()).ToList(),
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public static DailyProduction GetDailyProduction(this DailyProduction s)
        {
            try
            {
                if (s == null) return null;
                return new DailyProduction()
                {
                    id = s.id,
                    id_daily_intake = s.id_daily_intake,
                    id_directory_production = s.id_directory_production,
                    value = s.value,
                    change = s.change,
                    change_user = s.change_user,
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
    
    public partial class BALANCE
    {
        public int first { get; set; }
        public int id { get; set; }
        public DateTime date { get; set; }
        public int id_metering_units { get; set; }
        public int? id_structural_subdivisions { get; set; }
        public int? id_service_area { get; set; }
        public string metering_units_name { get; set; }
        public bool? unbalance_distribution { get; set; }
        public bool? working { get; set; }
        public string note { get; set; }
        public double value { get; set; }
    }

    public partial class DailyIntakeNG
    {
        public int first { get; set; }
        public int id { get; set; }
        public DateTime date { get; set; }
        public int id_metering_units { get; set; }
        public int? id_structural_subdivisions { get; set; }
        public int? id_service_area { get; set; }
        public string metering_units_name { get; set; }
        public bool? unbalance_distribution { get; set; }
        public bool? working { get; set; }
        public string note { get; set; }
        public double value { get; set; }
        public double? production { get; set; }
        public string production_unit { get; set; }
        public double? optimal_consumption { get; set; }
    }
    
    [RoutePrefix("api/reporting/ng")]
    public class NGController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        protected IRepository<DailyIntake> ef_di;
        protected IRepository<DailyProduction> ef_dp;

        public NGController(IRepository<DailyIntake> di, IRepository<DailyProduction> dp)
        {
            this.ef_di = di;
            this.ef_dp = dp;
        }

        // GET: api/reporting/ng/balance/n3/date/2020-12-03T00:00:00/root/1
        /// <summary>
        /// Показать за сутки ,баланс нитка -3 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("balance/n3/date/{date:datetime}/root/{root:int}")]
        [ResponseType(typeof(BALANCE))]
        public IHttpActionResult GetViewBalanceNG3(DateTime date, int root)
        {
            try
            {
                string sql = "select * from [BALANCE].[get_balance_ng_3](Convert(datetime,'" + date.ToString("yyyy-MM-dd") + "',120), " + root.ToString() + ")";
                List<BALANCE> list = this.db.Database.SqlQuery<BALANCE>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/reporting/ng/daily_intake/date/2020-12-07T00:00:00/root/1
        /// <summary>
        /// Показать за сутки потребление и производство
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("daily_intake/date/{date:datetime}/root/{root:int}")]
        [ResponseType(typeof(DailyIntakeNG))]
        public IHttpActionResult GetViewDailyIntakeNG(DateTime date, int root)
        {
            try
            {
                string sql = "select * from [BALANCE].[get_daily_intake_ng](Convert(datetime,'" + date.ToString("yyyy-MM-dd") + "',120), " + root.ToString() + ")";
                List<DailyIntakeNG> list = this.db.Database.SqlQuery<DailyIntakeNG>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/reporting/ng/daily_intake/date/2020-12-07T00:00:00
        [Route("daily_intake/date/{date:datetime}")]
        [ResponseType(typeof(DailyIntake))]
        public IHttpActionResult GetDailyIntakeOfDate(DateTime date)
        {
            try
            {
                List<DailyIntake> list = this.ef_di
                    .Context
                    .Where(s => s.date == date)
                    .ToList()
                    .Select(c => c.GetDailyIntake())
                    .ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST api/reporting/ng/daily_intake/list
        [HttpPost]
        [Route("daily_intake/list")]
        public int PostListDailyIntake([FromBody]List<DailyIntake> list)
        {
            try
            {
                this.ef_di.Update(list);
                int res = this.ef_di.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // POST api/reporting/ng/daily_production/list
        [HttpPost]
        [Route("daily_production/list")]
        public int PostDailyProduction([FromBody]List<DailyProduction> list)
        {
            try
            {
                this.ef_dp.Update(list);
                int res = this.ef_dp.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // GET: api/reporting/ng/create/daily_intake/date/2020-12-07T00:00:00
        [Route("create/daily_intake/date/{date:datetime}")]
        [ResponseType(typeof(int))]
        public IHttpActionResult GetCreateDailyIntakeOfDate(DateTime date)
        {
            try
            {
                string sql = "declare @date datetime = convert(datetime,'" + date.ToString("yyyy-MM-dd") + "',120) EXEC [BALANCE].[create_string_ng] @date";
                int res = this.db.Database.ExecuteSqlCommand(sql);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
