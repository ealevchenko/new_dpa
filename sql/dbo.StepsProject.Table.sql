USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[StepsProject]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepsProject](
	[IDStep] [int] IDENTITY(1,1) NOT NULL,
	[IDTemplateStepProject] [int] NOT NULL,
	[IDBigStep] [int] NOT NULL,
	[Step] [nvarchar](100) NOT NULL,
	[StepEng] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_StepsProject] PRIMARY KEY CLUSTERED 
(
	[IDStep] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
