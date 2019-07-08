USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[ListProjects]    Script Date: 08.07.2019 17:01:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[ListProjects](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_type_project] [int] NOT NULL,
	[id_structural_subdivisions] [int] NOT NULL,
	[name_project_ru] [nvarchar](1000) NOT NULL,
	[name_project_en] [nvarchar](1000) NOT NULL,
	[goals_project_ru] [nvarchar](max) NOT NULL,
	[goals_project_en] [nvarchar](max) NOT NULL,
	[id_project_customer] [int] NOT NULL,
	[spp_sap] [nvarchar](50) NULL,
	[id_spp_owner] [int] NULL,
	[start_project] [datetime] NULL,
	[id_work_performer] [int] NULL,
	[stop_project_contract] [datetime] NULL,
	[budget] [money] NULL,
	[contract_value] [money] NULL,
	[contract_engineering_value] [money] NULL,
	[contract_equipment_value] [money] NULL,
	[contract_construction_value] [money] NULL,
	[contract_commissioning_value] [money] NULL,
	[contract_other_value] [money] NULL,
	[payment_engineering_value] [money] NULL,
	[payment_equipment_value] [money] NULL,
	[payment_construction_value] [money] NULL,
	[payment_commissioning_value] [money] NULL,
	[payment_other_value] [money] NULL,
	[workspace] [nvarchar](1000) NULL,
	[id_project_manager] [int] NOT NULL,
	[id_status_project] [int] NOT NULL,
	[create] [datetime] NOT NULL,
	[create_user] [nvarchar](50) NOT NULL,
	[change] [datetime] NOT NULL,
	[change_user] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ListProjects] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_ProjectManager] FOREIGN KEY([id_project_manager])
REFERENCES [project].[ProjectManager] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_ProjectManager]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_StructuralSubdivisions] FOREIGN KEY([id_structural_subdivisions])
REFERENCES [dbo].[StructuralSubdivisions] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_StructuralSubdivisions]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_StructuralSubdivisions1] FOREIGN KEY([id_project_customer])
REFERENCES [dbo].[StructuralSubdivisions] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_StructuralSubdivisions1]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_StructuralSubdivisions2] FOREIGN KEY([id_spp_owner])
REFERENCES [dbo].[StructuralSubdivisions] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_StructuralSubdivisions2]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_TypeProject] FOREIGN KEY([id_type_project])
REFERENCES [project].[TypeProject] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_TypeProject]
GO
ALTER TABLE [project].[ListProjects]  WITH CHECK ADD  CONSTRAINT [FK_ListProjects_WorkPerformers] FOREIGN KEY([id_work_performer])
REFERENCES [project].[WorkPerformers] ([id])
GO
ALTER TABLE [project].[ListProjects] CHECK CONSTRAINT [FK_ListProjects_WorkPerformers]
GO
