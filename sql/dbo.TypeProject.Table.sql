USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[TypeProject]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeProject](
	[IDTypeProject] [int] IDENTITY(1,1) NOT NULL,
	[TypeProject] [nvarchar](50) NOT NULL,
	[TypeProjectEng] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[DescriptionEng] [nvarchar](1000) NOT NULL,
 CONSTRAINT [PK_TypeProject] PRIMARY KEY CLUSTERED 
(
	[IDTypeProject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
