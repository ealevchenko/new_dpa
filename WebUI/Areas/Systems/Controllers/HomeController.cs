using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Areas.Systems.Controllers
{
    public class HomeController : Controller
    {
        // GET: Systems/Home
        public ActionResult Index()
        {
            return View();
        }
    }
}