/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [id]
      ,[id_project]
      ,[id_templates_stages_project]
      ,[position]
      ,[start]
      ,[stop]
      ,[current]
      ,[skip]
      ,[mile]
      ,[resource]
      ,[persent]
      ,[group]
      ,[parent_id]
      ,[depend]
      ,[coment]
	  --delete
  FROM [KRR-PA-REP-SBF].[project].[StagesProject]

  SELECT TOP (1000) [id]
      ,[stages_project_ru]
      ,[stages_project_en]
      ,[stages_project_description_ru]
      ,[stages_project_description_en]
      ,[id_project_manager]
      ,[parent_id]
	  --delete
  FROM [KRR-PA-REP-SBF].[project].[TemplatesStagesProject] 
 --where [id]>19