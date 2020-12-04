[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(WebUI.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(WebUI.App_Start.NinjectWebCommon), "Stop")]

namespace WebUI.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using Ninject.Web.WebApi;
    using System.Web.Http;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                RegisterServices(kernel);
                GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);
                return kernel;
                
                //kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                //kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                //RegisterServices(kernel);
                //return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<EFDPA.Abstract.IRepository<EFDPA.Entities.Users>>().To<EFDPA.Concrete.EFUsers>();
            kernel.Bind<EFDPA.Abstract.IRepository<EFDPA.Entities.StructuralSubdivisions>>().To<EFDPA.Concrete.EFStructuralSubdivisions>();

            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.ProjectManager>>().To<EFProjects.Concrete.EFProjectManager>();
            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.ListProjects>>().To<EFProjects.Concrete.EFListProjects>();
            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.TypeProject>>().To<EFProjects.Concrete.EFTypeProject>();
            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.WorkPerformers>>().To<EFProjects.Concrete.EFWorkPerformers>();
            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.TemplatesStagesProject>>().To<EFProjects.Concrete.EFTemplatesStagesProject>();
            kernel.Bind<EFProjects.Abstract.IRepository<EFProjects.Entities.StagesProject>>().To<EFProjects.Concrete.EFStagesProject>();

            kernel.Bind<EFReporting.Abstract.IRepository<EFReporting.Entities.NG.Directory_Metering_Units>>().To<EFReporting.Concrete.NG.EFDirectory_Metering_Units>();
            kernel.Bind<EFReporting.Abstract.IRepository<EFReporting.Entities.NG.Balance_NG_3>>().To<EFReporting.Concrete.NG.EFBalance_NG_3>();

        }        
    }
}