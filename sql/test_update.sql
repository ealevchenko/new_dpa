use [KRR-PA-REP-SBF]
SET IDENTITY_INSERT [project].[StagesProject] ON 
go
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (2, 7, 3, 1, NULL, NULL, 0, 0, NULL, NULL, 0, 1, NULL, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (3, 7, 10, 2, NULL, NULL, 0, 0, NULL, NULL, 0, 1, 2, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (6, 7, 17, 3, CAST(N'2019-05-15T00:00:00.000' AS DateTime), CAST(N'2019-09-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI', 90, 0, 3, NULL, NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (7, 7, 18, 4, CAST(N'2019-09-15T00:00:00.000' AS DateTime), CAST(N'2020-02-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI', 0, 0, 3, N'6', NULL)
INSERT [project].[StagesProject] ([id], [id_project], [id_templates_stages_project], [position], [start], [stop], [current], [skip], [mile], [resource], [persent], [group], [parent_id], [depend], [coment]) VALUES (8, 7, 19, 5, CAST(N'2019-12-15T00:00:00.000' AS DateTime), CAST(N'2020-02-15T00:00:00.000' AS DateTime), 0, 0, NULL, N'CISDI(MTehn)', 0, 0, 3, N'7', NULL)

SET IDENTITY_INSERT [project].[StagesProject] OFF
go

--SET IDENTITY_INSERT [project].[TemplatesStagesProject] ON 

--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (1, N'�������������', N'Initialization', N'���� ������������� ���������� � ���������� ������', N'Initiation stage identifies and authorizes the project', NULL, NULL)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (2, N'������������', N'Planning', N'���� ������������ ���������� ����� �������, ������� � ��������, ����������� ��� ���������� ����� �������', N'The Planning phase determines the project timeline, resources and actions necessary to achieve the objectives of the Project', NULL, NULL)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (3, N'���������� � ��������', N'Implementation and control', N'�� ����� ����� ���������� � �������� �����������/������������� ��������� ������������ ����-������', N'During the Implementation and Control phase, the executors / responsible implement the approved Schedule', NULL, NULL)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (4, N'����������', N'Completion', N'���� ���������� ��������� �� ��, ��� ��� ������ ������� ��������� ����������� ������� ��� ���������� �������, � ��������� �������������, ��� ������ ��������. 
--', N'The completion stage indicates that all the tasks of the project are completed in the necessary way to complete the project, and formally establishes that the project is completed', NULL, NULL)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (5, N'���������� ������������ �������', N'Development of technical specifications', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (6, N'���������� ����� ����������� ��������', N'Development of a project approval form', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (8, N'������ (���������� ���)', N'Tender (elaboration of TCP)', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (9, N'���������� ���������', N'Conclusion of a contract', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (10, N'��������� ������', N'Design work', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (11, N'������������ ������������', N'Purchasing equipment', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (12, N'�����������-��������� ������', N'Construction and installation work', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (13, N'��������������� ������', N'Commissioning works', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (14, N'��������������� ��������� ', N'Preliminary tests', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (15, N'������� ������������', N'Trial operation', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (16, N'���� � ������������ ������������ � �������� �� ������', N'Commissioning and adoption on balance', NULL, NULL, NULL, 3)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (17, N'������� ����������', N'Basic engineering', NULL, NULL, NULL, 10)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (18, N'������ �', N'Stage P', NULL, NULL, NULL, 10)
--INSERT [project].[TemplatesStagesProject] ([id], [stages_project_ru], [stages_project_en], [stages_project_description_ru], [stages_project_description_en], [id_project_manager], [parent_id]) VALUES (19, N'��������� ����������', N'Detailed engineering', NULL, NULL, NULL, 10)

--SET IDENTITY_INSERT [project].[TemplatesStagesProject] OFF