USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[WorkPerformers]    Script Date: 27.06.2019 17:13:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[WorkPerformers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name_performer_ru] [nvarchar](50) NOT NULL,
	[name_performer_en] [nvarchar](50) NOT NULL,
	[email_performer] [nvarchar](100) NULL,
	[phone_performer] [bigint] NULL,
	[name_boss] [nvarchar](100) NULL,
	[phone_boss] [bigint] NULL,
 CONSTRAINT [PK_WorkPerformers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
