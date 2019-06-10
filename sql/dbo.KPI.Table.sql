USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[KPI]    Script Date: 10.06.2019 16:39:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KPI](
	[IDKPI] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](1024) NOT NULL,
	[NameEng] [nvarchar](1024) NOT NULL,
 CONSTRAINT [PK_KPI] PRIMARY KEY CLUSTERED 
(
	[IDKPI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[KPI] ON 

INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (1, N'Контроль расходных материалов', N'Control of expendables')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (2, N'Уменьшение расхода кислорода на дутье', N'Reduction of a consumption of oxygen by blasting')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (3, N'Сокращение потерь основных энергоресурсов', N'Reduction of losses of the main energy resources')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (4, N'Повышение производительности', N'Increase of productivity')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (5, N'Повышение производительности', N'Increase of productivity')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (6, N'Сокращение потерь основных энергоресурсов', N'Reduction of losses of the main energy resources')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (7, N'Сокращение потерь основных энергоресурсов', N'Reduction of losses of the main energy resources')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (8, N'Увеличение объемов продаж', N'Increase in sales volumes')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (9, N'Уменьшение экологических штрафов (штраф за хранение)', N'Reduction of ecological penalties(penalty for storage)')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (10, N'Уменьшение расходов на транспортировку', N'Reduction of expenses on transportation')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (11, N'Уменьшение потерь кислорода технического', N'Reduction of losses of oxygen technical')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (12, N'Уменьшение потерь кислорода технологического', N'Reduction of losses of oxygen technological')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (13, N'Расход тепла на дутье', N'Expense heat on blasting')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (14, N'Расход электроэнергии', N'Expense electric power')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (15, N'Сокращение потерь питьевой и технической воды', N'Reduction the losses of drinking and technical water')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (16, N'Уменьшение расхода  электроэнергии', N'Reduction of an expense of the electric power')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (17, N'Снижение потерь металла в угар', N'Decrease the losses of metal in waste')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (18, N'Снижение потерь металла на окалинообразование', N'Decrease the losses of metal by scale education')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (19, N'Удельный расход природного газа', N'Specific consumption of natural gas')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (20, N'Увеличение выхода мерных длин', N'Increase in an exit of measured lengths')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (21, N'Сокращение простоев на настройку стана', N'Reduction of idle times on control of a camp')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (22, N'Уменьшение простоев на отбор проб', N'Reduction of idle times by sampling')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (23, N'Уменьшение выхода негабаритной обрези', N'Reduction of an exit of an oversized trimming')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (24, N'Увеличение выхода мерных длин', N'Increase in an exit of measured lengths')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (25, N'Уменьшение выхода негабаритной обрези', N'Reduction in an exit of an oversized trimming')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (26, N'Увеличение выхода мерных длин', N'Increase in an exit of measured lengths')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (27, N'Уменьшение выхода негабаритной обрези', N'Reduction of an exit of an oversized trimming')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (28, N'Уменьшение расхода  электроэнергии', N'Reduction in an expense of the electric power')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (29, N'Увеличение выхода мерных длин', N'Increase in an exit of measured lengths')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (30, N'Уменьшение выхода негабаритной обрези', N'Reduction in an exit of an oversized trimming')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (31, N'Уменьшение расхода  электроэнергии', N'Reduction in an expense of the electric power')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (32, N'Увеличение выхода мерных длин', N'Increase in an exit of measured lengths')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (33, N'Уменьшение выхода негабаритной обрези', N'Reduction in an exit of an oversized trimming')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (34, N'Уменьшение простоев на настройку стана', N'Reduction the idle times by control of a camp')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (35, N'Уменьшение выхода брака', N'Reduction in an exit of marriage')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (36, N'Снижение потребления электроэнергии для каждого стана', N'Decrease of electricity consumption for each camp')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (37, N'Уменьшение расхода условного топлива', N'Reduction the consumption of conditional fuel')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (38, N'Увеличение производительности стана при упаковке МТП', N'Increase in productivity of a camp when packing MTP')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (39, N'Уменьшение потерь металла связанных с недостоверным учетом', N'Reduction the losses of metal connected with doubtful account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (40, N'Уменьшение потерь металла связанных с недостоверным учетом', N'Reduction the losses of metal connected with doubtful account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (41, N'Уменьшение потерь металла связанных с недостоверным учетом', N'Reduction the losses of metal connected with doubtful account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (42, N'Уменьшение потерь металла связанных с недостоверным учетом', N'Reduction the losses of metal connected with doubtful account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (43, N'Уменьшение потерь металла связанных с недостоверным учетом', N'Reduction the losses of metal connected with doubtful account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (44, N'Увеличение объемов продаж', N'Increase in sales volumes')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (45, N'Уменьшение экологических штрафов (штраф за хранение)', N'reduction of ecological penalties (penalty for storage)')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (46, N'Уменьшение расходов на транспортировку', N'Reduction of expenses on transportation')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (47, N'Нарушение оперативного учета', N'Violation of the operational account')
INSERT [dbo].[KPI] ([IDKPI], [Name], [NameEng]) VALUES (48, N'Уменьшение экологических штрафов', N'$')
SET IDENTITY_INSERT [dbo].[KPI] OFF
