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
    [RoutePrefix("api/project/tsp")]
    public class TemplatesStagesProjectController : ApiController
    {
        protected IRepository<TemplatesStagesProject> ef_tsp;

        public TemplatesStagesProjectController(IRepository<TemplatesStagesProject> tsp)
        {
            this.ef_tsp = tsp;
        }

        // GET: api/project/tsp/all
        [Route("all")]
        [ResponseType(typeof(TemplatesStagesProject))]
        public IHttpActionResult GetTemplatesStagesProject()
        {
            try
            {
                List<TemplatesStagesProject> list = this.ef_tsp.Get().ToList()
                    .Select(t => new TemplatesStagesProject
                    {
                        id = t.id,
                        stages_project_ru = t.stages_project_ru,
                        stages_project_en = t.stages_project_en,
                        stages_project_description_ru = t.stages_project_description_ru,
                        stages_project_description_en = t.stages_project_description_en,
                        id_project_manager = t.id_project_manager,
                        parent_id = t.parent_id,
                        ProjectManager = t.ProjectManager != null ? new ProjectManager
                        {
                            id = t.ProjectManager.id,
                            id_user = t.ProjectManager.id_user,
                            email = t.ProjectManager.email,
                            phone_work = t.ProjectManager.phone_work,
                            phone_mobile = t.ProjectManager.phone_mobile,
                            adress = t.ProjectManager.adress,
                            parent_id = t.ProjectManager.parent_id,
                        } : null,

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

        // GET: api/project/tsp/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(TemplatesStagesProject))]
        public IHttpActionResult GetTemplatesStagesProject(int id)
        {
            try
            {
                TemplatesStagesProject project = this.ef_tsp
                    .Get()
                    .Where(p => p.id == id)
                    .ToList()
                    .Select(t => new TemplatesStagesProject
                    {
                        id = t.id,
                        stages_project_ru = t.stages_project_ru,
                        stages_project_en = t.stages_project_en,
                        stages_project_description_ru = t.stages_project_description_ru,
                        stages_project_description_en = t.stages_project_description_en,
                        id_project_manager = t.id_project_manager,
                        parent_id = t.parent_id,
                        ProjectManager = t.ProjectManager != null ? new ProjectManager
                        {
                            id = t.ProjectManager.id,
                            id_user = t.ProjectManager.id_user,
                            email = t.ProjectManager.email,
                            phone_work = t.ProjectManager.phone_work,
                            phone_mobile = t.ProjectManager.phone_mobile,
                            adress = t.ProjectManager.adress,
                            parent_id = t.ProjectManager.parent_id,
                        } : null,
                    }).FirstOrDefault();
                if (project == null)
                {
                    return NotFound();
                }
                return Ok(project);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

    }
}
