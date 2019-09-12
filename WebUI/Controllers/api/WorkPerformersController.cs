using EFProjects.Abstract;
using EFProjects.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/project/wp")]
    public class WorkPerformersController : ApiController
    {
        protected IRepository<WorkPerformers> ef_wp;

        public WorkPerformersController(IRepository<WorkPerformers> wp)
        {
            this.ef_wp = wp;
        }

        // GET: api/project/wp/all
        [Route("all")]
        [ResponseType(typeof(WorkPerformers))]
        public IHttpActionResult GetWorkPerformers()
        {
            try
            {
                List<WorkPerformers> list = this.ef_wp.Get().ToList()
                    .Select(w => new WorkPerformers
                    {
                        id = w.id,
                        name_performer_ru = w.name_performer_ru,
                        name_performer_en = w.name_performer_en,
                        email_performer = w.email_performer,
                        phone_performer = w.phone_performer,
                        name_boss = w.name_boss,
                        phone_boss = w.phone_boss,

                    }).ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
