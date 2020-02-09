using EFDPA.Entities;
using EFProjects.Abstract;
//using EFProjects.Abstract;
using EFProjects.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFProjects.Helper;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/project/lp")]
    public class ListProjectsController : ApiController
    {
        protected IRepository<ListProjects> ef_lp;

        public ListProjectsController(IRepository<ListProjects> lp)
        {
            this.ef_lp = lp;
        }

        // GET: api/project/lp/all
        [Route("all")]
        [ResponseType(typeof(ListProjects))]
        public IHttpActionResult GetListProjects()
        {
            try
            {
                List<ListProjects> list = this.ef_lp.Get().ToList()
                    .Select(l => new ListProjects
                    {
                        id = l.id,
                        id_type_project = l.id_type_project,
                        id_structural_subdivisions = l.id_structural_subdivisions,
                        name_project_ru = l.name_project_ru,
                        name_project_en = l.name_project_en,
                        goals_project_ru = l.goals_project_ru,
                        goals_project_en = l.goals_project_en,
                        id_project_customer = l.id_project_customer,
                        spp_sap = l.spp_sap,
                        id_spp_owner = l.id_spp_owner,
                        start_project = l.start_project,
                        id_work_performer = l.id_work_performer,
                        stop_project_contract = l.stop_project_contract,
                        budget = l.budget,
                        budget_currency = l.budget_currency,
                        contract_value = l.contract_value,
                        contract_currency = l.contract_currency,
                        contract_engineering_value = l.contract_engineering_value,
                        contract_engineering_currency = l.contract_engineering_currency,
                        contract_equipment_value = l.contract_equipment_value,
                        contract_equipment_currency = l.contract_equipment_currency,
                        contract_construction_value = l.contract_construction_value,
                        contract_construction_currency = l.contract_construction_currency,
                        contract_commissioning_value = l.contract_commissioning_value,
                        contract_commissioning_currency = l.contract_commissioning_currency,
                        contract_other_value = l.contract_other_value,
                        contract_other_currency = l.contract_other_currency,
                        payment_engineering_value = l.payment_engineering_value,
                        payment_engineering_currency = l.payment_engineering_currency,
                        payment_equipment_value = l.payment_equipment_value,
                        payment_equipment_currency = l.payment_equipment_currency,
                        payment_construction_value = l.payment_construction_value,
                        payment_construction_currency = l.payment_construction_currency,
                        payment_commissioning_value = l.payment_commissioning_value,
                        payment_commissioning_currency = l.payment_commissioning_currency,
                        payment_other_value = l.payment_other_value,
                        payment_other_currency = l.payment_other_currency,
                        workspace = l.workspace,
                        id_project_manager = l.id_project_manager,
                        id_status_project = l.id_status_project,
                        create = l.create,
                        create_user = l.create_user,
                        change = l.change,
                        change_user = l.change_user,
                        ProjectManager = new ProjectManager
                        {
                            id = l.ProjectManager.id,
                            id_user = l.ProjectManager.id_user,
                            email = l.ProjectManager.email,
                            phone_work = l.ProjectManager.phone_work,
                            phone_mobile = l.ProjectManager.phone_mobile,
                            adress = l.ProjectManager.adress,
                            parent_id = l.ProjectManager.parent_id,
                        },
                        TypeProject = new TypeProject
                        {
                            id = l.TypeProject.id,
                            type_project_ru = l.TypeProject.type_project_ru,
                            type_project_en = l.TypeProject.type_project_en,
                            description_type_project_ru = l.TypeProject.description_type_project_ru,
                            description_type_project_en = l.TypeProject.description_type_project_en,

                        },
                        WorkPerformers = l.WorkPerformers != null ? new WorkPerformers
                        {
                            id = l.WorkPerformers.id,
                            name_performer_ru = l.WorkPerformers.name_performer_ru,
                            name_performer_en = l.WorkPerformers.name_performer_en,
                            email_performer = l.WorkPerformers.email_performer,
                            phone_performer = l.WorkPerformers.phone_performer,
                            name_boss = l.WorkPerformers.name_boss,
                            phone_boss = l.WorkPerformers.phone_boss,
                        } : null,
                        StagesProject = l.StagesProject.Select(t => new StagesProject
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
                        }).ToList()
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

        // GET: api/project/lp/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(ListProjects))]
        public IHttpActionResult GetListProjects(int id)
        {
            try
            {
                ListProjects project = this.ef_lp
                    .Get()
                    .Where(p => p.id == id)
                    .ToList()
                    .Select(l => new ListProjects
                    {
                        id = l.id,
                        id_type_project = l.id_type_project,
                        id_structural_subdivisions = l.id_structural_subdivisions,
                        name_project_ru = l.name_project_ru,
                        name_project_en = l.name_project_en,
                        goals_project_ru = l.goals_project_ru,
                        goals_project_en = l.goals_project_en,
                        id_project_customer = l.id_project_customer,
                        spp_sap = l.spp_sap,
                        id_spp_owner = l.id_spp_owner,
                        start_project = l.start_project,
                        id_work_performer = l.id_work_performer,
                        stop_project_contract = l.stop_project_contract,
                        budget = l.budget,
                        budget_currency = l.budget_currency,
                        contract_value = l.contract_value,
                        contract_currency = l.contract_currency,
                        contract_engineering_value = l.contract_engineering_value,
                        contract_engineering_currency = l.contract_engineering_currency,
                        contract_equipment_value = l.contract_equipment_value,
                        contract_equipment_currency = l.contract_equipment_currency,
                        contract_construction_value = l.contract_construction_value,
                        contract_construction_currency = l.contract_construction_currency,
                        contract_commissioning_value = l.contract_commissioning_value,
                        contract_commissioning_currency = l.contract_commissioning_currency,
                        contract_other_value = l.contract_other_value,
                        contract_other_currency = l.contract_other_currency,
                        payment_engineering_value = l.payment_engineering_value,
                        payment_engineering_currency = l.payment_engineering_currency,
                        payment_equipment_value = l.payment_equipment_value,
                        payment_equipment_currency = l.payment_equipment_currency,
                        payment_construction_value = l.payment_construction_value,
                        payment_construction_currency = l.payment_construction_currency,
                        payment_commissioning_value = l.payment_commissioning_value,
                        payment_commissioning_currency = l.payment_commissioning_currency,
                        payment_other_value = l.payment_other_value,
                        payment_other_currency = l.payment_other_currency,
                        workspace = l.workspace,
                        id_project_manager = l.id_project_manager,
                        id_status_project = l.id_status_project,
                        create = l.create,
                        create_user = l.create_user,
                        change = l.change,
                        change_user = l.change_user,
                        ProjectManager = new ProjectManager
                        {
                            id = l.ProjectManager.id,
                            id_user = l.ProjectManager.id_user,
                            email = l.ProjectManager.email,
                            phone_work = l.ProjectManager.phone_work,
                            phone_mobile = l.ProjectManager.phone_mobile,
                            adress = l.ProjectManager.adress,
                            parent_id = l.ProjectManager.parent_id,
                        },
                        TypeProject = new TypeProject
                        {
                            id = l.TypeProject.id,
                            type_project_ru = l.TypeProject.type_project_ru,
                            type_project_en = l.TypeProject.type_project_en,
                            description_type_project_ru = l.TypeProject.description_type_project_ru,
                            description_type_project_en = l.TypeProject.description_type_project_en,

                        },
                        WorkPerformers = l.WorkPerformers != null ? new WorkPerformers
                        {
                            id = l.WorkPerformers.id,
                            name_performer_ru = l.WorkPerformers.name_performer_ru,
                            name_performer_en = l.WorkPerformers.name_performer_en,
                            email_performer = l.WorkPerformers.email_performer,
                            phone_performer = l.WorkPerformers.phone_performer,
                            name_boss = l.WorkPerformers.name_boss,
                            phone_boss = l.WorkPerformers.phone_boss,
                        } : null,
                        StagesProject = l.StagesProject.Select(t => new StagesProject
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
                        }).ToList()
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

        // GET: api/project/lp/open
        [Route("open")]
        [ResponseType(typeof(ListProjects))]
        public IHttpActionResult GetOpenListProjects()
        {
            try
            {
                List<ListProjects> list = this.ef_lp
                    .Context
                    .ToList()
                    .Where(l=>l.id_status_project == 0)
                    .Select(l => l.GetListProjects()).ToList();
                //if (list == null || list.Count() == 0)
                //{
                //    return NotFound();
                //}
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST api/project/lp
        [HttpPost]
        [Route("")]
        public int PostListProjects([FromBody]ListProjects value)
        {
            try
            {
                this.ef_lp.Add(value);
                this.ef_lp.Save();
                this.ef_lp.Refresh(value);
                return value.id;
            }
            catch (Exception e)
            {
                //String.Format("Ошибка выполнения метода API:PostFuelSale(value={0})", value).SaveError(e);
                return -1;
            }
        }

        // PUT api/project/lp/5
        [HttpPut]
        [Route("{id:int}")]
        public int PutListProjects(int id, [FromBody]ListProjects value)
        {
            try
            {
                this.ef_lp.Update(value);
                return this.ef_lp.Save();
            }
            catch (Exception e)
            {
                //String.Format("Ошибка выполнения метода API:PutListProjects(id={0}, value={1})", id, value).SaveError(e);
                return -1;
            }
        }



        // GET: api/project/lp/pm/list_id/1,2,3,4
        [Route("pm/list_id/{list_id}")]
        [ResponseType(typeof(ListProjects))]
        public IHttpActionResult GetListProjectsOfListIDPM(string list_id)
        {
            try
            {
                List<int> sel = new List<int>();

                string[] st_id = list_id.Split(',');
                foreach (string st in st_id)
                {
                    if (!String.IsNullOrWhiteSpace(st))
                    {
                        sel.Add(int.Parse(st));
                    }
                }


                List<ListProjects> list = this.ef_lp.Get()
                    .Where(c => sel.Contains(c.id_project_manager))
                    .ToList()
                    .Select(l => new ListProjects
                    {
                        id = l.id,
                        id_type_project = l.id_type_project,
                        id_structural_subdivisions = l.id_structural_subdivisions,
                        name_project_ru = l.name_project_ru,
                        name_project_en = l.name_project_en,
                        goals_project_ru = l.goals_project_ru,
                        goals_project_en = l.goals_project_en,
                        id_project_customer = l.id_project_customer,
                        spp_sap = l.spp_sap,
                        id_spp_owner = l.id_spp_owner,
                        start_project = l.start_project,
                        id_work_performer = l.id_work_performer,
                        stop_project_contract = l.stop_project_contract,
                        budget = l.budget,
                        budget_currency = l.budget_currency,
                        contract_value = l.contract_value,
                        contract_currency = l.contract_currency,
                        contract_engineering_value = l.contract_engineering_value,
                        contract_engineering_currency = l.contract_engineering_currency,
                        contract_equipment_value = l.contract_equipment_value,
                        contract_equipment_currency = l.contract_equipment_currency,
                        contract_construction_value = l.contract_construction_value,
                        contract_construction_currency = l.contract_construction_currency,
                        contract_commissioning_value = l.contract_commissioning_value,
                        contract_commissioning_currency = l.contract_commissioning_currency,
                        contract_other_value = l.contract_other_value,
                        contract_other_currency = l.contract_other_currency,
                        payment_engineering_value = l.payment_engineering_value,
                        payment_engineering_currency = l.payment_engineering_currency,
                        payment_equipment_value = l.payment_equipment_value,
                        payment_equipment_currency = l.payment_equipment_currency,
                        payment_construction_value = l.payment_construction_value,
                        payment_construction_currency = l.payment_construction_currency,
                        payment_commissioning_value = l.payment_commissioning_value,
                        payment_commissioning_currency = l.payment_commissioning_currency,
                        payment_other_value = l.payment_other_value,
                        payment_other_currency = l.payment_other_currency,
                        workspace = l.workspace,
                        id_project_manager = l.id_project_manager,
                        id_status_project = l.id_status_project,
                        create = l.create,
                        create_user = l.create_user,
                        change = l.change,
                        change_user = l.change_user,
                        ProjectManager = new ProjectManager
                        {
                            id = l.ProjectManager.id,
                            id_user = l.ProjectManager.id_user,
                            email = l.ProjectManager.email,
                            phone_work = l.ProjectManager.phone_work,
                            phone_mobile = l.ProjectManager.phone_mobile,
                            adress = l.ProjectManager.adress,
                            parent_id = l.ProjectManager.parent_id,
                        },
                        TypeProject = new TypeProject
                        {
                            id = l.TypeProject.id,
                            type_project_ru = l.TypeProject.type_project_ru,
                            type_project_en = l.TypeProject.type_project_en,
                            description_type_project_ru = l.TypeProject.description_type_project_ru,
                            description_type_project_en = l.TypeProject.description_type_project_en,

                        },
                        WorkPerformers = l.WorkPerformers != null ? new WorkPerformers
                        {
                            id = l.WorkPerformers.id,
                            name_performer_ru = l.WorkPerformers.name_performer_ru,
                            name_performer_en = l.WorkPerformers.name_performer_en,
                            email_performer = l.WorkPerformers.email_performer,
                            phone_performer = l.WorkPerformers.phone_performer,
                            name_boss = l.WorkPerformers.name_boss,
                            phone_boss = l.WorkPerformers.phone_boss,
                        } : null,
                        StagesProject = l.StagesProject.Select(t => new StagesProject
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
                        }).ToList()
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
