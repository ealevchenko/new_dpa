USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[StagesProject]    Script Date: 21.10.2019 16:50:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[StagesProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_project] [int] NOT NULL,
	[id_templates_stages_project] [int] NOT NULL,
	[position] [int] NOT NULL,
	[start] [datetime] NULL,
	[stop] [datetime] NULL,
	[current] [bit] NOT NULL,
	[skip] [bit] NOT NULL,
	[mile] [bit] NULL,
	[resource] [nvarchar](100) NULL,
	[persent] [int] NOT NULL,
	[group] [bit] NULL,
	[parent_id] [int] NULL,
	[depend] [nvarchar](100) NULL,
	[coment] [nvarchar](1000) NULL,
 CONSTRAINT [PK_StagesProject] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [project].[StagesProject] ON 

INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (2, 7, 3, 1, NULL, NULL, 0, 0, NULL, NULL, 0, 1, NULL, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (3, 7, 10, 2, NULL, NULL, 0, 0, NULL, NULL, 0, 1, 2, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (6, 7, 17, 3, CAST(N'2019-05-15T00:00:00.000' AS DateTime), CAST(N'2019-09-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI', 90, 0, 3, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (7, 7, 18, 4, CAST(N'2019-09-15T00:00:00.000' AS DateTime), CAST(N'2020-02-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI', 0, 0, 3, N'6', NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (8, 7, 19, 5, CAST(N'2019-12-15T00:00:00.000' AS DateTime), CAST(N'2020-02-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI(MTehn)', 0, 0, 3, N'7', NULL)
SET IDENTITY_INSERT [project].[StagesProject] OFF
ALTER TABLE [project].[StagesProject]  WITH CHECK ADD  CONSTRAINT [FK_StagesProject_ListProjects] FOREIGN KEY([id_project])
REFERENCES [project].[ListProjects] ([id])
GO
ALTER TABLE [project].[StagesProject] CHECK CONSTRAINT [FK_StagesProject_ListProjects]
GO
ALTER TABLE [project].[StagesProject]  WITH CHECK ADD  CONSTRAINT [FK_StagesProject_TemplatesStagesProject1] FOREIGN KEY([id_templates_stages_project])
REFERENCES [project].[TemplatesStagesProject] ([id])
GO
ALTER TABLE [project].[StagesProject] CHECK CONSTRAINT [FK_StagesProject_TemplatesStagesProject1]
GO
