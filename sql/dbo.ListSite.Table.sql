USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[ListSite]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListSite](
	[IDSite] [int] IDENTITY(1,1) NOT NULL,
	[URL] [nvarchar](1024) NOT NULL,
	[Description] [nvarchar](1024) NOT NULL,
	[DescriptionEng] [nvarchar](1024) NOT NULL,
	[URLHelp] [nvarchar](1024) NULL,
 CONSTRAINT [PK_tr_ListSite] PRIMARY KEY CLUSTERED 
(
	[IDSite] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
