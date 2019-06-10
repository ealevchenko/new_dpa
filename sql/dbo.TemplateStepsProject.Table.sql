USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[TemplateStepsProject]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplateStepsProject](
	[IDTemplateStepProject] [int] IDENTITY(1,1) NOT NULL,
	[TemplateStep] [nvarchar](100) NOT NULL,
	[TemplateStepEng] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_TemplateStepProject] PRIMARY KEY CLUSTERED 
(
	[IDTemplateStepProject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
