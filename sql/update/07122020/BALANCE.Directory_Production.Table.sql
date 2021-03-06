USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [BALANCE].[Directory_Production]    Script Date: 07.12.2020 17:49:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [BALANCE].[Directory_Production](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_metering_units] [int] NOT NULL,
	[production_name] [nvarchar](100) NOT NULL,
	[production_unit] [nvarchar](20) NOT NULL,
	[optimal consumption] [float] NOT NULL,
 CONSTRAINT [PK_Directory_Production] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [BALANCE].[Directory_Production] ON 

INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (2, 2, N'ПК-5', N'т*ч', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (3, 2, N'ПК-6', N'т*ч', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (4, 2, N'ПК-7', N'т*ч', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (5, 2, N'ПК-8', N'т*ч', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (6, 5, N'ДП-9', N'т.чугуна', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (7, 8, N'ПУТ ДП-9', N'т. пыли', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (8, 9, N'АЦ-1, АМ-1', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (9, 9, N'АЦ-1, АМ-2', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (10, 9, N'АЦ-1, АМ-3', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (11, 9, N'АЦ-1, АМ-4', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (12, 9, N'АЦ-1, АМ-5', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (13, 9, N'АЦ-1, АМ-6', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (14, 10, N'АЦ-2, АМ-1', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (15, 10, N'АЦ-2, АМ-2', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (16, 10, N'АЦ-2, АМ-3', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (17, 10, N'АЦ-2, АМ-4', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (18, 10, N'АЦ-2, АМ-5', N'т. агломерата', 0)
INSERT [BALANCE].[Directory_Production] ([id], [id_metering_units], [production_name], [production_unit], [optimal consumption]) VALUES (19, 10, N'АЦ-2, АМ-6', N'т. агломерата', 0)
SET IDENTITY_INSERT [BALANCE].[Directory_Production] OFF
ALTER TABLE [BALANCE].[Directory_Production]  WITH CHECK ADD  CONSTRAINT [FK_Directory_Production_Directory_Metering_Units] FOREIGN KEY([id_metering_units])
REFERENCES [BALANCE].[Directory_Metering_Units] ([id])
GO
ALTER TABLE [BALANCE].[Directory_Production] CHECK CONSTRAINT [FK_Directory_Production_Directory_Metering_Units]
GO
