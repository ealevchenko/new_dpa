USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[TypeProject]    Script Date: 2/7/2020 9:57:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[TypeProject](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_project_ru] [nvarchar](50) NOT NULL,
	[type_project_en] [nvarchar](50) NOT NULL,
	[description_type_project_ru] [nvarchar](1000) NOT NULL,
	[description_type_project_en] [nvarchar](1000) NOT NULL,
 CONSTRAINT [PK_TypeProject] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [project].[TypeProject] ON 

INSERT [project].[TypeProject] ([id], [type_project_ru], [type_project_en], [description_type_project_ru], [description_type_project_en]) VALUES (1, N'Стратегический CAPEX', N'Strategic CAPEX', N'Стратегический CAPEX', N'Strategic CAPEX')
INSERT [project].[TypeProject] ([id], [type_project_ru], [type_project_en], [description_type_project_ru], [description_type_project_en]) VALUES (2, N'Нормативный CAPEX', N'Normative CAPEX', N'Нормативный CAPEX', N'Normative CAPEX')
SET IDENTITY_INSERT [project].[TypeProject] OFF
