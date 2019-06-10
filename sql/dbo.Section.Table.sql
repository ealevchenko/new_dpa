USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[Section]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Section](
	[IDSection] [int] IDENTITY(1,1) NOT NULL,
	[Position] [int] NOT NULL,
	[Section] [nvarchar](100) NOT NULL,
	[SectionEng] [nvarchar](100) NOT NULL,
	[SectionFull] [nvarchar](1000) NOT NULL,
	[SectionFullEng] [nvarchar](1000) NOT NULL,
	[TypeSection] [int] NOT NULL,
	[Cipher] [int] NULL,
	[ParentID] [int] NULL,
 CONSTRAINT [PK_tr_Section] PRIMARY KEY CLUSTERED 
(
	[IDSection] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
