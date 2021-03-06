USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [BALANCE].[Balance_NG_3]    Script Date: 04.12.2020 17:52:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [BALANCE].[Balance_NG_3](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[date] [date] NOT NULL,
	[id_metering_units] [int] NOT NULL,
	[value] [float] NOT NULL,
 CONSTRAINT [PK_Balance_NG_3] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [BALANCE].[Balance_NG_3] ON 

INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (1, CAST(N'2020-12-03' AS Date), 1, 462)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (2, CAST(N'2020-12-03' AS Date), 2, 203.5)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (3, CAST(N'2020-12-03' AS Date), 3, 1)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (4, CAST(N'2020-12-03' AS Date), 4, 0)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (5, CAST(N'2020-12-03' AS Date), 5, 130.5)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (6, CAST(N'2020-12-03' AS Date), 6, 11.7)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (7, CAST(N'2020-12-03' AS Date), 7, 0)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (8, CAST(N'2020-12-03' AS Date), 8, 0.5)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (9, CAST(N'2020-12-03' AS Date), 9, 59.805)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (10, CAST(N'2020-12-03' AS Date), 10, 58.52)
INSERT [BALANCE].[Balance_NG_3] ([id], [date], [id_metering_units], [value]) VALUES (11, CAST(N'2020-12-03' AS Date), 11, 0)
SET IDENTITY_INSERT [BALANCE].[Balance_NG_3] OFF
