using EFReporting.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api.Reportong.NG
{
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
    }
}
