USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[MenagerProject]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenagerProject](
	[IDMenagerProject] [int] IDENTITY(1,1) NOT NULL,
	[IDUser] [int] NOT NULL,
	[WPhone] [int] NULL,
	[MPhone] [bigint] NULL,
	[SuperMenager] [bit] NOT NULL,
 CONSTRAINT [PK_MenagerProject] PRIMARY KEY CLUSTERED 
(
	[IDMenagerProject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
