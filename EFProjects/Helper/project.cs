using EFProjects.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFProjects.Helper
{
    public static class project
    {
        public static ProjectManager GetProjectManager(this ProjectManager m)
        {
            if (m == null) return null;
            return new ProjectManager()
            {
                id = m.id,
                id_user = m.id_user,
                email = m.email,
                phone_work = m.phone_work,
                phone_mobile = m.phone_mobile,
                adress = m.adress,
                parent_id = m.parent_id,
            };
        }

        public static TypeProject GetTypeProject(this TypeProject t)
        {
            if (t == null) return null;
            return new TypeProject()
            {
                id = t.id,
                type_project_ru = t.type_project_ru,
                type_project_en = t.type_project_en,
                description_type_project_ru = t.description_type_project_ru,
                description_type_project_en = t.description_type_project_en,

            };
        }

        public static WorkPerformers GetWorkPerformers(this WorkPerformers w)
        {
            if (w == null) return null;
            return new WorkPerformers()
            {
                id = w.id,
                name_performer_ru = w.name_performer_ru,
                name_performer_en = w.name_performer_en,
                email_performer = w.email_performer,
                phone_performer = w.phone_performer,
                name_boss = w.name_boss,
                phone_boss = w.phone_boss,
            };
        }

        public static TemplatesStagesProject GetTemplatesStagesProject(this TemplatesStagesProject t)
        {
            if (t == null) return null;
            return new TemplatesStagesProject()
            {
                id = t.id,
                stages_project_ru = t.stages_project_ru,
                stages_project_en = t.stages_project_en,
                stages_project_description_ru = t.stages_project_description_ru,
                stages_project_description_en = t.stages_project_description_en,
                id_project_manager = t.id_project_manager,
                parent_id = t.parent_id,
                ProjectManager = t.ProjectManager.GetProjectManager() 
            };
        }

        public static StagesProject GetStagesProject(this StagesProject s)
        {
            if (s == null) return null;
            return new StagesProject()
            {
                id = s.id,
                id_project = s.id_project,
                id_templates_stages_project = s.id_templates_stages_project,
                position = s.position,
                start = s.start,
                stop = s.stop,
                current = s.current,
                skip = s.skip,
                mile = s.mile,
                resource = s.resource,
                persent = s.persent,
                group = s.group,
                parent_id = s.parent_id,
                depend = s.depend,
                coment = s.coment,
                TemplatesStagesProject = s.TemplatesStagesProject.GetTemplatesStagesProject(),
            };
        }

        public static List<StagesProject> GetStagesProject(this List<StagesProject> s) {
            return s.Select(l => l.GetStagesProject()).ToList();
        }

        public static ListProjects GetListProjects(this ListProjects l)
        {
            if (l == null) return null;
            return new ListProjects()
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
                ProjectManager = l.ProjectManager.GetProjectManager(),
                TypeProject = l.TypeProject.GetTypeProject(),
                WorkPerformers = l.WorkPerformers.GetWorkPerformers(),
                StagesProject = l.StagesProject.ToList().GetStagesProject(),
            };
        }
    }
}
