USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[TemplatesStagesProject]    Script Date: 2/7/2020 9:57:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[TemplatesStagesProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[stages_project_ru] [nvarchar](100) NOT NULL,
	[stages_project_en] [nvarchar](100) NOT NULL,
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
SET IDENTITY_INSERT [project].[TemplatesStagesProject] ON 

INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (1, N'Инициирование', N'Initialization', N'Этап Инициирования определяет и авторизует проект', N'Initiation stage identifies and authorizes the project', NULL, NULL)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (2, N'Планирование', N'Planning', N'Этап Планирование определяет сроки проекта, ресурсы и действия, необходимые для достижения целей Проекта', N'The Planning phase determines the project timeline, resources and actions necessary to achieve the objectives of the Project', NULL, NULL)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (3, N'Реализация и контроль', N'Implementation and control', N'Во время этапа Выполнения и Контроля исполнители/ответственные реализуют утвержденный План-график', N'During the Implementation and Control phase, the executors / responsible implement the approved Schedule', NULL, NULL)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (4, N'Завершение', N'Completion', N'Этап Завершения указывает на то, что все задачи проекта выполнены необходимым образом для завершения проекта, и формально устанавливает, что проект завершен. 
', N'The completion stage indicates that all the tasks of the project are completed in the necessary way to complete the project, and formally establishes that the project is completed', NULL, NULL)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (5, N'Разработка технического задания', N'Development of technical specifications', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (6, N'Разработка формы утверждения проектов', N'Development of a project approval form', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (8, N'Тендер (проработка ТКП)', N'Tender (elaboration of TCP)', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (9, N'Заключение контракта', N'Conclusion of a contract', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (10, N'Проектные работы', N'Design work', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (11, N'Приобритение оборудования', N'Purchasing equipment', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (12, N'Строительно-монтажные работы', N'Construction and installation work', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (13, N'Пусконаладочные работы', N'Commissioning works', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (14, N'Предварительные испытания ', N'Preliminary tests', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (15, N'Опытная эксплуатация', N'Trial operation', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (16, N'Ввод в промышленную эксплуатацию и принятие на баланс', N'Commissioning and adoption on balance', NULL, NULL, NULL, 3)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (17, N'Базовый инжиниринг', N'Basic engineering', NULL, NULL, NULL, 10)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (18, N'Стадия П', N'Stage P', NULL, NULL, NULL, 10)
INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (19, N'Детальный инжиниринг', N'Detailed engineering', NULL, NULL, NULL, 10)
SET IDENTITY_INSERT [project].[TemplatesStagesProject] OFF
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
