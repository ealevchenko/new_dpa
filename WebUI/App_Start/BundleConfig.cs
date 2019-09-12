using System.Web;
using System.Web.Optimization;

namespace WebUI
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство построения на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            //jquery-ui
            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                    "~/Scripts/jquery-ui-1.12.1.min.js",
                    "~/Scripts/datepicker-ru.js"//,
                    //"~/Scripts/datepicker-en-GB.js"
                    ));


            bundles.Add(new StyleBundle("~/jquery-ui/css").Include(
                "~/Content/themes/base/jquery-ui.css",
                "~/Content/themes/base/jquery-ui.structure.css",
                "~/Content/themes/base/jquery-ui.theme.css"));
            //
            // Календарь
            bundles.Add(new ScriptBundle("~/bundles/DateTime").Include(
                "~/Scripts/DateTime/moment.min.js"
                , "~/Scripts/DateTime/jquery.daterangepicker.js"
                ));

            bundles.Add(new StyleBundle("~/DateTime/css").Include("~/Content/DateTime/daterangepicker.css"));
        }
    }
}
