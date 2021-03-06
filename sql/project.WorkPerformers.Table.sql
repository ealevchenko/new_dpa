USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[WorkPerformers]    Script Date: 2/7/2020 9:57:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[WorkPerformers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name_performer_ru] [nvarchar](50) NOT NULL,
	[name_performer_en] [nvarchar](50) NOT NULL,
	[email_performer] [nvarchar](100) NULL,
	[phone_performer] [bigint] NULL,
	[name_boss] [nvarchar](100) NULL,
	[phone_boss] [bigint] NULL,
 CONSTRAINT [PK_WorkPerformers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [project].[WorkPerformers] ON 

INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1, N'ДП Сименс', N'ДП Сименс', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (2, N'CIE', N'CIE', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (3, N'CISDI', N'CISDI', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (4, N'Drilltech Group LLC', N'Drilltech Group LLC', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (5, N'Ekoplant', N'Ekoplant', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (6, N'FLS', N'FLS', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (7, N'NHI', N'NHI', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (8, N'Автоматизация ТерраВатт Групп', N'Автоматизация ТерраВатт Групп', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (9, N'ВФ ООО КСК-Автоматизация', N'ВФ ООО КСК-Автоматизация', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (10, N'Далгакиран', N'Далгакиран', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (11, N'Инвариант', N'Инвариант', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (12, N'Меттранссервис', N'Меттранссервис', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (13, N'Налко', N'Налко', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (14, N'НПП Славутич', N'НПП Славутич', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (15, N'ООО "КЗТМ"', N'ООО "КЗТМ"', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (16, N'ООО НПП Крамтехцентр', N'ООО НПП Крамтехцентр', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (17, N'Приметалз', N'Приметалз', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (18, N'Системосервис', N'Системосервис', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (19, N'Спецгазпром', N'Спецгазпром', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (20, N'Техэнергохим', N'Техэнергохим', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (21, N'Уралмаш (ОМЗ)', N'Уралмаш (ОМЗ)', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (22, N'Шенк Украина', N'Шенк Украина', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (23, N'Danieli', N'Danieli', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (24, N'ОООВПП «Известа»', N'ОООВПП «Известа»', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (25, N'Трэй Украина', N'Трэй Украина', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (26, N'Saralli', N'Saralli', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (27, N'SMS', N'SMS', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (28, N'Danieli Corus', N'Danieli Corus', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (29, N'Weihua', N'Weihua', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1027, N'Агбор инжиниринг', N'Агбор инжиниринг', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1028, N'КБК', N'КБК', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1029, N'Ольвия', N'Ольвия', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1030, N'Никопрограсбуд', N'Никопрограсбуд', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1031, N'Укрпромсервис', N'Укрпромсервис', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1032, N'Линде Газ', N'Линде Газ', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1033, N'Cryo Inter Trading LLC', N'Cryo Inter Trading LLC', NULL, NULL, NULL, NULL)
INSERT [project].[WorkPerformers] ([id], [name_performer_ru], [name_performer_en], [email_performer], [phone_performer], [name_boss], [phone_boss]) VALUES (1034, N'«Весоизмерительные системы»', N'«Весоизмерительные системы»', N'sales@vis.ua', 676116240, NULL, NULL)
SET IDENTITY_INSERT [project].[WorkPerformers] OFF
