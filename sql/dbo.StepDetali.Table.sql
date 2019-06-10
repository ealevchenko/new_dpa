USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[StepDetali]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepDetali](
	[IDStepDetali] [int] IDENTITY(1,1) NOT NULL,
	[IDProject] [int] NOT NULL,
	[IDStep] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[FactStart] [datetime] NULL,
	[FactStop] [datetime] NULL,
	[Persent] [int] NOT NULL,
	[Coment] [nvarchar](1024) NULL,
	[Responsible] [nvarchar](1024) NULL,
	[SkipStep] [bit] NOT NULL,
	[CurrentStep] [bit] NOT NULL,
 CONSTRAINT [PK_StepDetali] PRIMARY KEY CLUSTERED 
(
	[IDStepDetali] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
