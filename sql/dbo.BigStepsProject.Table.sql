USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[BigStepsProject]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BigStepsProject](
	[IDBigStep] [int] IDENTITY(1,1) NOT NULL,
	[BigStep] [nvarchar](100) NOT NULL,
	[BigStepEng] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_BigStepsProject] PRIMARY KEY CLUSTERED 
(
	[IDBigStep] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BigStepsProject] ON 

INSERT [dbo].[BigStepsProject] ([IDBigStep], [BigStep], [BigStepEng]) VALUES (1, N'Подготовка и утверждение', N'Preparation and approval')
INSERT [dbo].[BigStepsProject] ([IDBigStep], [BigStep], [BigStepEng]) VALUES (2, N'Тендер', N'Tender')
INSERT [dbo].[BigStepsProject] ([IDBigStep], [BigStep], [BigStepEng]) VALUES (3, N'Выполнение', N'Performance')
SET IDENTITY_INSERT [dbo].[BigStepsProject] OFF
