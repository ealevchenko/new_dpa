USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[SiteMap]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SiteMap](
	[IDSiteMap] [int] IDENTITY(1,1) NOT NULL,
	[IDWeb] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[IDSite] [int] NULL,
	[Title] [nvarchar](250) NOT NULL,
	[TitleEng] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[DescriptionEng] [nvarchar](1000) NOT NULL,
	[Protection] [bit] NOT NULL,
	[PageProcessor] [bit] NOT NULL,
	[ParentID] [int] NULL,
	[IDSection] [int] NOT NULL,
	[AccessRulesSection] [nvarchar](1000) NULL,
 CONSTRAINT [PK_tr_SiteMap] PRIMARY KEY CLUSTERED 
(
	[IDSiteMap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
