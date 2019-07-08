USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[StructuralSubdivisions]    Script Date: 08.07.2019 17:01:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StructuralSubdivisions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[position] [int] NOT NULL,
	[name_subdivisions_ru] [nvarchar](100) NOT NULL,
	[name_subdivisions_en] [nvarchar](100) NOT NULL,
	[name_subdivisions_full_ru] [nvarchar](1000) NOT NULL,
	[name_subdivisions_full_en] [nvarchar](1000) NOT NULL,
	[type] [int] NOT NULL,
	[code] [int] NULL,
	[parent_id] [int] NULL,
 CONSTRAINT [PK_StructuralSubdivisions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
