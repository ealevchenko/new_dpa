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
    [RoutePrefix("api/project/pm")]
    public class ProjectManagerController : ApiController
    {
        protected IRepository<ProjectManager> ef_pm;

        public ProjectManagerController(IRepository<ProjectManager> pm)
        {
            this.ef_pm = pm;
        }

        // GET: api/project/pm/all
        [Route("all")]
        [ResponseType(typeof(ProjectManager))]
        public IHttpActionResult GetProjectManager()
        {
            try
            {
                List<ProjectManager> list = this.ef_pm.Get().ToList()
                    .Select(m => new ProjectManager
                    {
                        id = m.id,
                        id_user = m.id_user ,
                        email = m.email ,
                        phone_work = m.phone_work ,
                        phone_mobile = m.phone_mobile ,
                        adress = m.adress ,
                        parent_id = m.parent_id,
                        //StructuralSubdivisions = new StructuralSubdivisions
                        //{
                        //    id = u.StructuralSubdivisions.id,
                        //    position = u.StructuralSubdivisions.position,
                        //    name_subdivisions_ru = u.StructuralSubdivisions.name_subdivisions_ru,
                        //    name_subdivisions_en = u.StructuralSubdivisions.name_subdivisions_en,
                        //    name_subdivisions_full_ru = u.StructuralSubdivisions.name_subdivisions_full_ru,
                        //    name_subdivisions_full_en = u.StructuralSubdivisions.name_subdivisions_full_en,
                        //    type = u.StructuralSubdivisions.type,
                        //    code = u.StructuralSubdivisions.code,
                        //    parent_id = u.StructuralSubdivisions.parent_id,
                        //}
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

        // GET: api/project/pm/user/id/1
        [Route("user/id/{id_user:int}")]
        [ResponseType(typeof(ProjectManager))]
        public IHttpActionResult GetProjectManagerOfIDUser(int id_user)
        {
            try
            {
                ProjectManager pm = this.ef_pm.Get()
                    .Where(m=>m.id_user==id_user)
                    .ToList()
                    .Select(m => new ProjectManager
                    {
                        id = m.id,
                        id_user = m.id_user ,
                        email = m.email ,
                        phone_work = m.phone_work ,
                        phone_mobile = m.phone_mobile ,
                        adress = m.adress ,
                        parent_id = m.parent_id,

                    }).FirstOrDefault();
                if (pm == null)
                {
                    return NotFound();
                }
                return Ok(pm);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        /// <summary>
        /// Добавить цепочку потомков
        /// </summary>
        /// <param name="list"></param>
        /// <param name="pm"></param>
        protected void GetProjectManagerChild(ref List<ProjectManager> list, ProjectManager pm)
        {
            try
            {
                if (pm == null) return;
                List<ProjectManager> list_child = this.ef_pm.Get()
                    .Where(m => m.parent_id == (int)pm.id)
                    .ToList()
                    .Select(m => new ProjectManager
                    {
                        id = m.id,
                        id_user = m.id_user,
                        email = m.email,
                        phone_work = m.phone_work,
                        phone_mobile = m.phone_mobile,
                        adress = m.adress,
                        parent_id = m.parent_id,

                    }).ToList();
                if (list_child != null)
                {
                    foreach (ProjectManager pm_child in list_child)
                    {
                        list.Add(pm_child);
                        GetProjectManagerChild(ref list, pm_child);
                    }
                }
            }
            catch (Exception e)
            {
                return;
            }
        }

        // GET: api/project/pm/chain_manager/id/1
        [Route("chain_manager/id/{id_pm:int}")]
        [ResponseType(typeof(ProjectManager))]
        public IHttpActionResult GetChainProjectManagerOfIDPM(int id_pm)
        {
            try
            {
                List<ProjectManager> list = new List<ProjectManager>();
                ProjectManager pm = this.ef_pm.Get()
                    .Where(m => m.id == id_pm)
                    .ToList()
                    .Select(m => new ProjectManager
                    {
                        id = m.id,
                        id_user = m.id_user,
                        email = m.email,
                        phone_work = m.phone_work,
                        phone_mobile = m.phone_mobile,
                        adress = m.adress,
                        parent_id = m.parent_id,

                    }).FirstOrDefault();
                if (pm != null)
                {
                    list.Add(pm);
                    GetProjectManagerChild(ref list, pm);

                }
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
