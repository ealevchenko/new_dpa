USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[KPIProject]    Script Date: 10.06.2019 16:39:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KPIProject](
	[IDKPIProject] [int] IDENTITY(1,1) NOT NULL,
	[IDKPI] [int] NOT NULL,
	[IDProject] [int] NOT NULL,
	[IndexKPI] [int] NOT NULL,
	[ROI] [real] NOT NULL,
	[NPV] [real] NOT NULL,
 CONSTRAINT [PK_KPIProject] PRIMARY KEY CLUSTERED 
(
	[IDKPIProject] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[KPIProject] ON 

INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (1, 47, 72, 0, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (2, 40, 72, 3, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (3, 39, 32, 3, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (4, 41, 34, 3, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (5, 42, 36, 0, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (6, 43, 72, 0, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (7, 44, 42, 3, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (8, 45, 42, 3, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (9, 46, 42, 0, 0, 0)
INSERT [dbo].[KPIProject] ([IDKPIProject], [IDKPI], [IDProject], [IndexKPI], [ROI], [NPV]) VALUES (10, 1, 1, 3, 0, 0)
SET IDENTITY_INSERT [dbo].[KPIProject] OFF
