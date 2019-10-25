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
    [RoutePrefix("api/project/sp")]
    public class StagesProjectController : ApiController
    {
        protected IRepository<StagesProject> ef_sp;

        public StagesProjectController(IRepository<StagesProject> sp)
        {
            this.ef_sp = sp;
        }

        // GET: api/project/sp/all
        [Route("all")]
        [ResponseType(typeof(StagesProject))]
        public IHttpActionResult GetStagesProject()
        {
            try
            {
                List<StagesProject> list = this.ef_sp.Get().ToList()
                    .Select(t => new StagesProject
                    {
                        id = t.id,
                        id_project = t.id_project,
                        id_templates_stages_project = t.id_templates_stages_project,
                        position = t.position,
                        start = t.start,
                        stop = t.stop,
                        current = t.current,
                        skip = t.skip,
                        mile = t.mile,
                        resource = t.resource,
                        persent = t.persent,
                        group = t.group,
                        parent_id = t.parent_id,
                        depend = t.depend,
                        coment = t.coment,
                        TemplatesStagesProject = new TemplatesStagesProject
                        {
                            id = t.id,
                            stages_project_ru = t.TemplatesStagesProject.stages_project_ru,
                            stages_project_en = t.TemplatesStagesProject.stages_project_en,
                            stages_project_description_ru = t.TemplatesStagesProject.stages_project_description_ru,
                            stages_project_description_en = t.TemplatesStagesProject.stages_project_description_en,
                            id_project_manager = t.TemplatesStagesProject.id_project_manager,
                            parent_id = t.TemplatesStagesProject.parent_id,
                            ProjectManager = t.TemplatesStagesProject.ProjectManager != null ? new ProjectManager
                            {
                                id = t.TemplatesStagesProject.ProjectManager.id,
                                id_user = t.TemplatesStagesProject.ProjectManager.id_user,
                                email = t.TemplatesStagesProject.ProjectManager.email,
                                phone_work = t.TemplatesStagesProject.ProjectManager.phone_work,
                                phone_mobile = t.TemplatesStagesProject.ProjectManager.phone_mobile,
                                adress = t.TemplatesStagesProject.ProjectManager.adress,
                                parent_id = t.TemplatesStagesProject.ProjectManager.parent_id,
                            } : null,
                        },
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

        // GET: api/project/sp/id/2
        [Route("id/{id:int}")]
        [ResponseType(typeof(StagesProject))]
        public IHttpActionResult GetStagesProject(int id)
        {
            try
            {
                StagesProject project = this.ef_sp
                    .Get()
                    .Where(p => p.id == id)
                    .ToList()
                    .Select(t => new StagesProject
                    {
                        id = t.id,
                        id_project = t.id_project,
                        id_templates_stages_project = t.id_templates_stages_project,
                        position = t.position,
                        start = t.start,
                        stop = t.stop,
                        current = t.current,
                        skip = t.skip,
                        mile = t.mile,
                        resource = t.resource,
                        persent = t.persent,
                        group = t.group,
                        parent_id = t.parent_id,
                        depend = t.depend,
                        coment = t.coment,
                        TemplatesStagesProject = new TemplatesStagesProject
                        {
                            id = t.id,
                            stages_project_ru = t.TemplatesStagesProject.stages_project_ru,
                            stages_project_en = t.TemplatesStagesProject.stages_project_en,
                            stages_project_description_ru = t.TemplatesStagesProject.stages_project_description_ru,
                            stages_project_description_en = t.TemplatesStagesProject.stages_project_description_en,
                            id_project_manager = t.TemplatesStagesProject.id_project_manager,
                            parent_id = t.TemplatesStagesProject.parent_id,
                            ProjectManager = t.TemplatesStagesProject.ProjectManager != null ? new ProjectManager
                            {
                                id = t.TemplatesStagesProject.ProjectManager.id,
                                id_user = t.TemplatesStagesProject.ProjectManager.id_user,
                                email = t.TemplatesStagesProject.ProjectManager.email,
                                phone_work = t.TemplatesStagesProject.ProjectManager.phone_work,
                                phone_mobile = t.TemplatesStagesProject.ProjectManager.phone_mobile,
                                adress = t.TemplatesStagesProject.ProjectManager.adress,
                                parent_id = t.TemplatesStagesProject.ProjectManager.parent_id,
                            } : null,
                        },
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

        // GET: api/project/sp/project_id/7
        [Route("project_id/{id_project:int}")]
        [ResponseType(typeof(StagesProject))]
        public IHttpActionResult GetStagesProjectOfIDProject(int id_project)
        {
            try
            {
                List<StagesProject> list = this.ef_sp
                    .Get()
                    .Where(p => p.id_project == id_project)
                    .ToList()
                    .Select(t => new StagesProject
                    {
                        id = t.id,
                        id_project = t.id_project,
                        id_templates_stages_project = t.id_templates_stages_project,
                        position = t.position,
                        start = t.start,
                        stop = t.stop,
                        current = t.current,
                        skip = t.skip,
                        mile = t.mile,
                        resource = t.resource,
                        persent = t.persent,
                        group = t.group,
                        parent_id = t.parent_id,
                        depend = t.depend,
                        coment = t.coment,
                        TemplatesStagesProject = new TemplatesStagesProject
                        {
                            id = t.id,
                            stages_project_ru = t.TemplatesStagesProject.stages_project_ru,
                            stages_project_en = t.TemplatesStagesProject.stages_project_en,
                            stages_project_description_ru = t.TemplatesStagesProject.stages_project_description_ru,
                            stages_project_description_en = t.TemplatesStagesProject.stages_project_description_en,
                            id_project_manager = t.TemplatesStagesProject.id_project_manager,
                            parent_id = t.TemplatesStagesProject.parent_id,
                            ProjectManager = t.TemplatesStagesProject.ProjectManager != null ? new ProjectManager
                            {
                                id = t.TemplatesStagesProject.ProjectManager.id,
                                id_user = t.TemplatesStagesProject.ProjectManager.id_user,
                                email = t.TemplatesStagesProject.ProjectManager.email,
                                phone_work = t.TemplatesStagesProject.ProjectManager.phone_work,
                                phone_mobile = t.TemplatesStagesProject.ProjectManager.phone_mobile,
                                adress = t.TemplatesStagesProject.ProjectManager.adress,
                                parent_id = t.TemplatesStagesProject.ProjectManager.parent_id,
                            } : null,
                        },
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

        // POST api/project/sp
        [HttpPost]
        [Route("")]
        public int PostStagesProject([FromBody]StagesProject value)
        {
            try
            {
                this.ef_sp.Add(value);
                this.ef_sp.Save();
                this.ef_sp.Refresh(value);
                return value.id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/project/sp/5
        [HttpPut]
        [Route("{id:int}")]
        public int PutStagesProject(int id, [FromBody]StagesProject value)
        {
            try
            {
                this.ef_sp.Update(value);
                return this.ef_sp.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE: api/project/sp/8
        [HttpDelete]
        [Route("{id:int}")]
        public int DeleteStagesProject(int id)
        {
            try
            {
                this.ef_sp.Delete(id);
                return this.ef_sp.Save();
            }
            catch (Exception e)
            {
                return -1;
            }            
        }
    }
}
