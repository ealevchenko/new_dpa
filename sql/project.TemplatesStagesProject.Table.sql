USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[TemplatesStagesProject]    Script Date: 31.07.2019 17:43:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[TemplatesStagesProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[stages_project_ru] [nvarchar](50) NOT NULL,
	[stages_project_en] [nvarchar](50) NOT NULL,
	[stages_project_description_ru] [nvarchar](1000) NULL,
	[stages_project_description_en] [nvarchar](1000) NULL,
	[id_project_manager] [int] NULL,
	[parent_id] [int] NULL,
 CONSTRAINT [PK_TemplatesStagesProject] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [project].[TemplatesStagesProject]  WITH CHECK ADD  CONSTRAINT [FK_TemplatesStagesProject_ProjectManager] FOREIGN KEY([id_project_manager])
REFERENCES [project].[ProjectManager] ([id])
GO
ALTER TABLE [project].[TemplatesStagesProject] CHECK CONSTRAINT [FK_TemplatesStagesProject_ProjectManager]
GO
ALTER TABLE [project].[TemplatesStagesProject]  WITH CHECK ADD  CONSTRAINT [FK_TemplatesStagesProject_TemplatesStagesProject] FOREIGN KEY([parent_id])
REFERENCES [project].[TemplatesStagesProject] ([id])
GO
ALTER TABLE [project].[TemplatesStagesProject] CHECK CONSTRAINT [FK_TemplatesStagesProject_TemplatesStagesProject]
GO
