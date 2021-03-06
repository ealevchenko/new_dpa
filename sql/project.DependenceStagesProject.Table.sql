USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[DependenceStagesProject]    Script Date: 31.07.2019 17:43:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[DependenceStagesProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_stage_project] [int] NOT NULL,
	[id_dependent_project_stage] [int] NOT NULL,
 CONSTRAINT [PK_DependenceStagesProject] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [project].[DependenceStagesProject]  WITH CHECK ADD  CONSTRAINT [FK_DependenceStagesProject_StagesProject] FOREIGN KEY([id_stage_project])
REFERENCES [project].[StagesProject] ([id])
GO
ALTER TABLE [project].[DependenceStagesProject] CHECK CONSTRAINT [FK_DependenceStagesProject_StagesProject]
GO
ALTER TABLE [project].[DependenceStagesProject]  WITH CHECK ADD  CONSTRAINT [FK_DependenceStagesProject_StagesProject1] FOREIGN KEY([id_dependent_project_stage])
REFERENCES [project].[StagesProject] ([id])
GO
ALTER TABLE [project].[DependenceStagesProject] CHECK CONSTRAINT [FK_DependenceStagesProject_StagesProject1]
GO
