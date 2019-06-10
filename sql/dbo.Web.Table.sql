USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[Web]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Web](
	[IDWeb] [int] NOT NULL,
	[Web] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](256) NOT NULL,
	[DescriptionEng] [nvarchar](256) NOT NULL,
	[URL] [nvarchar](1024) NOT NULL,
	[IDUser] [int] NOT NULL,
 CONSTRAINT [PK_Web] PRIMARY KEY CLUSTERED 
(
	[IDWeb] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
