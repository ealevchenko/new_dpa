USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[IDUser] [int] IDENTITY(1,1) NOT NULL,
	[IDWeb] [int] NULL,
	[UserEnterprise] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[Email] [nvarchar](150) NULL,
	[bDistribution] [bit] NOT NULL,
	[Surname] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Patronymic] [nvarchar](50) NULL,
	[Post] [nvarchar](250) NULL,
	[IDSection] [int] NOT NULL,
 CONSTRAINT [PK_tr_Users] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
