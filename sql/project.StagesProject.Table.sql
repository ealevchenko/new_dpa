USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[StagesProject]    Script Date: 29.07.2019 17:09:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[StagesProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_project] [int] NOT NULL,
	[id_templates_stages_project] [int] NOT NULL,
	[position] [int] NOT NULL,
	[start_stages] [datetime] NULL,
	[stop_stages] [datetime] NULL,
	[persent] [int] NOT NULL,
	[coment] [nvarchar](1000) NULL,
	[responsible] [nvarchar](1000) NULL,
	[skip_stages] [bit] NOT NULL,
	[current_stages] [bit] NOT NULL,
 CONSTRAINT [PK_StepDetali] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [project].[StagesProject]  WITH CHECK ADD  CONSTRAINT [FK_StagesProject_ListProjects] FOREIGN KEY([id_project])
REFERENCES [project].[ListProjects] ([id])
GO
ALTER TABLE [project].[StagesProject] CHECK CONSTRAINT [FK_StagesProject_ListProjects]
GO
ALTER TABLE [project].[StagesProject]  WITH CHECK ADD  CONSTRAINT [FK_StagesProject_TemplatesStagesProject] FOREIGN KEY([id_templates_stages_project])
REFERENCES [project].[TemplatesStagesProject] ([id])
GO
ALTER TABLE [project].[StagesProject] CHECK CONSTRAINT [FK_StagesProject_TemplatesStagesProject]
GO
