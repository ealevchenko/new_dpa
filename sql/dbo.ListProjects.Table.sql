USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[ListProjects]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListProjects](
	[IDProject] [int] IDENTITY(1,1) NOT NULL,
	[IDTypeProject] [int] NOT NULL,
	[IDImplementationProgram] [int] NULL,
	[IDMenagerProject] [int] NOT NULL,
	[IDReplacementProject] [int] NULL,
	[IDSection] [int] NOT NULL,
	[SAPCode] [nvarchar](50) NULL,
	[TypeString] [nvarchar](50) NULL,
	[TypeStatus] [int] NOT NULL,
	[Funding] [money] NULL,
	[Currency] [int] NULL,
	[FundingDescription] [nvarchar](50) NULL,
	[AllocationFunds] [bit] NOT NULL,
	[LineOwner] [int] NULL,
	[Year] [int] NOT NULL,
	[Name] [nvarchar](1024) NOT NULL,
	[NameEng] [nvarchar](1024) NOT NULL,
	[Description] [nvarchar](2048) NOT NULL,
	[DescriptionEng] [nvarchar](2048) NOT NULL,
	[Contractor] [nvarchar](100) NULL,
	[DateContractor] [nvarchar](50) NULL,
	[Status] [int] NOT NULL,
	[Effect] [int] NULL,
	[IDOrder] [int] NULL,
	[TypeConstruction] [int] NOT NULL,
	[Change] [datetime] NULL,
 CONSTRAINT [PK_ssd_Project] PRIMARY KEY CLUSTERED 
(
	[IDProject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
