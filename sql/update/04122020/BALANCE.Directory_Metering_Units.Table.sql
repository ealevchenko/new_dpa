USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [BALANCE].[Directory_Metering_Units]    Script Date: 04.12.2020 17:52:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [BALANCE].[Directory_Metering_Units](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_structural_subdivisions] [int] NOT NULL,
	[id_service area] [int] NOT NULL,
	[metering_units_name] [nvarchar](100) NOT NULL,
	[unbalance distribution] [bit] NULL,
	[working] [bit] NOT NULL,
	[note] [nvarchar](50) NULL,
	[parent_id] [int] NULL,
 CONSTRAINT [PK_Directory_Metering_Units] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [BALANCE].[Directory_Metering_Units] ON 

INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (1, 1, 1, N'Внешние газовые сети  ДП-9 ( 3 – нитка)', NULL, 1, N'Эл.вид (АСУ ГАЗ)', NULL)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (2, 51, 3, N'ГРП ТЭЦ-3. Расход газа на ТЭЦ-3.', 1, 1, N'Сумма по котлам', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (3, 51, 2, N'ГО ТЭЦ-3. Расход газа на свечу 1 ДП-9', 0, 1, N'Диаграм-ма', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (4, 51, 2, N'ГО ТЭЦ-3. Расход газа на свечу 2 ДП-9', 0, 1, N'Диаграм-ма', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (5, 8, 2, N'ДП-9. Расход газа на ДП-9', 1, 1, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (6, 8, 2, N'ДП-9. Расход газа на хоз. нужды ДП-9', 0, 1, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (7, 8, 2, N'ГРП ДП-9. Расход газа  на ГД', 1, 0, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (8, 8, 2, N'ГРП ДП-9. Расход газа  на ПУТ', 0, 1, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (9, 4, 4, N'АЦ-1. Расход газа  на цех', 1, 1, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (10, 5, 4, N'АЦ-2. Расход газа  на цех', 1, 1, N'Эл.вид', 1)
INSERT [BALANCE].[Directory_Metering_Units] ([id], [id_structural_subdivisions], [id_service area], [metering_units_name], [unbalance distribution], [working], [note], [parent_id]) VALUES (11, 6, 4, N'Гараж размораживания ГД (ГРСМ ГД). Расход газа  на ГРСМ', 0, 1, N'Эл.вид', 1)
SET IDENTITY_INSERT [BALANCE].[Directory_Metering_Units] OFF
