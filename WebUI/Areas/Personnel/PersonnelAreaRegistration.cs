﻿using System.Web.Mvc;

namespace WebUI.Areas.Personnel
{
    public class PersonnelAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Personnel";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Personnel_default",
                "Personnel/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WebUI.Areas.Personnel.Controllers" }
            );
        }
    }
}