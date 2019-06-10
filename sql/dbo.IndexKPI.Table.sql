USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[IndexKPI]    Script Date: 10.06.2019 16:39:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IndexKPI](
	[IndexKPI] [int] IDENTITY(1,1) NOT NULL,
	[IndexName] [nvarchar](64) NOT NULL,
	[IndexNameEng] [nvarchar](64) NOT NULL,
	[IndexDescription] [nvarchar](256) NULL,
	[IndexDescriptionEng] [nvarchar](256) NULL,
 CONSTRAINT [PK_IndexKPI] PRIMARY KEY CLUSTERED 
(
	[IndexKPI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[IndexKPI] ON 

INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (0, N'Нет', N'Not', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (1, N'%', N'%', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (2, N'кг', N'kg', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (3, N'тон', N'tons', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (4, N'час.', N'hours', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (5, N'м3', N'm3', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (6, N'тыс. м3', N'thous. m3', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (7, N'кг\т', N'kg\m', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (8, N'тыс. м3\т', N'thous. m3\tons', NULL, NULL)
INSERT [dbo].[IndexKPI] ([IndexKPI], [IndexName], [IndexNameEng], [IndexDescription], [IndexDescriptionEng]) VALUES (9, N'кВт\ч', N'kW\h', NULL, NULL)
SET IDENTITY_INSERT [dbo].[IndexKPI] OFF
