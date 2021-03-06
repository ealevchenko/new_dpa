USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [BALANCE].[DailyIntake]    Script Date: 07.12.2020 17:49:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [BALANCE].[DailyIntake](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[date] [date] NOT NULL,
	[id_metering_units] [int] NOT NULL,
	[value] [float] NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_DailyIntake] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [BALANCE].[DailyIntake] ON 

INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (52, CAST(N'2020-12-07' AS Date), 1, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (53, CAST(N'2020-12-07' AS Date), 2, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (54, CAST(N'2020-12-07' AS Date), 3, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (55, CAST(N'2020-12-07' AS Date), 4, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (56, CAST(N'2020-12-07' AS Date), 5, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (57, CAST(N'2020-12-07' AS Date), 6, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (58, CAST(N'2020-12-07' AS Date), 8, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (59, CAST(N'2020-12-07' AS Date), 9, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (60, CAST(N'2020-12-07' AS Date), 10, 0, NULL, NULL)
INSERT [BALANCE].[DailyIntake] ([id], [date], [id_metering_units], [value], [change], [change_user]) VALUES (61, CAST(N'2020-12-07' AS Date), 11, 0, NULL, NULL)
SET IDENTITY_INSERT [BALANCE].[DailyIntake] OFF
ALTER TABLE [BALANCE].[DailyIntake]  WITH CHECK ADD  CONSTRAINT [FK_DailyIntake_Directory_Metering_Units] FOREIGN KEY([id_metering_units])
REFERENCES [BALANCE].[Directory_Metering_Units] ([id])
GO
ALTER TABLE [BALANCE].[DailyIntake] CHECK CONSTRAINT [FK_DailyIntake_Directory_Metering_Units]
GO
