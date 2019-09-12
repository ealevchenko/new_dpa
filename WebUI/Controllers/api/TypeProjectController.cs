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
    [RoutePrefix("api/project/tp")]
    public class TypeProjectController : ApiController
    {

        protected IRepository<TypeProject> ef_tp;

        public TypeProjectController(IRepository<TypeProject> tp)
        {
            this.ef_tp = tp;
        }

        // GET: api/project/tp/all
        [Route("all")]
        [ResponseType(typeof(TypeProject))]
        public IHttpActionResult GetTypeProject()
        {
            try
            {
                List<TypeProject> list = this.ef_tp.Get().ToList()
                    .Select(t => new TypeProject
                    {
                        id = t.id, 
                        type_project_ru = t.type_project_ru,
                        type_project_en = t.type_project_en,
                        description_type_project_ru = t.description_type_project_ru,
                        description_type_project_en = t.description_type_project_en
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
