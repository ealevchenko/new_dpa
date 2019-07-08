USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[TypeProject]    Script Date: 08.07.2019 17:01:14 ******/
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
