using EFDPA.Abstract;
using EFDPA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/ss")]
    public class StructuralSubdivisionsController : ApiController
    {
        protected IRepository<StructuralSubdivisions> ef_ss;

        public StructuralSubdivisionsController(IRepository<StructuralSubdivisions> ss)
        {
            this.ef_ss = ss;
        }

        // GET: api/ss/all
        [Route("all")]
        [ResponseType(typeof(StructuralSubdivisions))]
        public IHttpActionResult GetStructuralSubdivisions()
        {
            try
            {
                List<StructuralSubdivisions> list = this.ef_ss.Get().ToList()
                    .Select(s => new StructuralSubdivisions
                    {
                        id = s.id,
                        position = s.position,
                        name_subdivisions_ru = s.name_subdivisions_ru,
                        name_subdivisions_en = s.name_subdivisions_en,
                        name_subdivisions_full_ru = s.name_subdivisions_full_ru,
                        name_subdivisions_full_en = s.name_subdivisions_full_en,
                        type = s.type,
                        code = s.code,
                        parent_id = s.parent_id,
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
