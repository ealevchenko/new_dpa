USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [BALANCE].[DailyProduction]    Script Date: 07.12.2020 17:49:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [BALANCE].[DailyProduction](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_daily_intake] [int] NOT NULL,
	[id_directory_production] [int] NOT NULL,
	[value] [float] NOT NULL,
	[change] [datetime] NULL,
	[change_user] [nvarchar](50) NULL,
 CONSTRAINT [PK_DailyProduction] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [BALANCE].[DailyProduction] ON 

INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (37, 53, 2, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (38, 53, 3, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (39, 53, 4, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (40, 53, 5, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (41, 56, 6, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (42, 58, 7, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (43, 59, 8, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (44, 59, 9, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (45, 59, 10, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (46, 59, 11, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (47, 59, 12, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (48, 59, 13, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (49, 60, 14, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (50, 60, 15, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (51, 60, 16, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (52, 60, 17, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (53, 60, 18, 0, NULL, NULL)
INSERT [BALANCE].[DailyProduction] ([id], [id_daily_intake], [id_directory_production], [value], [change], [change_user]) VALUES (54, 60, 19, 0, NULL, NULL)
SET IDENTITY_INSERT [BALANCE].[DailyProduction] OFF
ALTER TABLE [BALANCE].[DailyProduction]  WITH CHECK ADD  CONSTRAINT [FK_DailyProduction_DailyIntake] FOREIGN KEY([id_daily_intake])
REFERENCES [BALANCE].[DailyIntake] ([id])
GO
ALTER TABLE [BALANCE].[DailyProduction] CHECK CONSTRAINT [FK_DailyProduction_DailyIntake]
GO
ALTER TABLE [BALANCE].[DailyProduction]  WITH CHECK ADD  CONSTRAINT [FK_DailyProduction_Directory_Production] FOREIGN KEY([id_directory_production])
REFERENCES [BALANCE].[Directory_Production] ([id])
GO
ALTER TABLE [BALANCE].[DailyProduction] CHECK CONSTRAINT [FK_DailyProduction_Directory_Production]
GO
