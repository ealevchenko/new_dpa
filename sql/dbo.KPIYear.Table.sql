USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[KPIYear]    Script Date: 10.06.2019 16:36:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KPIYear](
	[IDKPIYear] [int] IDENTITY(1,1) NOT NULL,
	[IDKPIProject] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[Q1] [real] NULL,
	[Q2] [real] NULL,
	[Q3] [real] NULL,
	[Q4] [real] NULL,
 CONSTRAINT [PK_KPIYear] PRIMARY KEY CLUSTERED 
(
	[IDKPIYear] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[KPIYear] ON 

INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (1, 1, 2016, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (2, 1, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (3, 1, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (4, 1, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (5, 1, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (6, 1, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (7, 1, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (8, 1, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (9, 1, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (10, 1, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (11, 1, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (12, 2, 2016, 275000, 275000, 275000, 275000)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (13, 2, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (14, 2, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (15, 2, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (16, 2, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (17, 2, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (18, 2, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (19, 2, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (20, 2, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (21, 2, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (22, 2, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (23, 3, 2016, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (24, 3, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (25, 3, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (26, 3, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (27, 3, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (28, 3, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (29, 3, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (30, 3, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (31, 3, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (32, 3, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (33, 3, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (34, 4, 2016, 835250, 835250, 835250, 835250)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (35, 4, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (36, 4, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (37, 4, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (38, 4, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (39, 4, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (40, 4, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (41, 4, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (42, 4, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (43, 4, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (44, 4, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (45, 5, 2016, 15000, 15000, 15000, 15000)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (46, 5, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (47, 5, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (48, 5, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (49, 5, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (50, 5, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (51, 5, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (52, 5, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (53, 5, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (54, 5, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (55, 5, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (56, 6, 2016, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (57, 6, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (58, 6, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (59, 6, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (60, 6, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (61, 6, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (62, 6, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (63, 6, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (64, 6, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (65, 6, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (66, 6, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (67, 7, 2016, 50000, 250000, 250000, 50000)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (68, 7, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (69, 7, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (70, 7, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (71, 7, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (72, 7, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (73, 7, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (74, 7, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (75, 7, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (76, 7, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (77, 7, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (78, 8, 2016, 50000, 200000, 200000, 50000)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (79, 8, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (80, 8, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (81, 8, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (82, 8, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (83, 8, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (84, 8, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (85, 8, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (86, 8, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (87, 8, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (88, 8, 2026, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (89, 9, 2016, 700000, 2800000, 2800000, 700000)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (90, 9, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (91, 9, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (92, 9, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (93, 9, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (94, 9, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (95, 9, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (96, 9, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (97, 9, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (98, 9, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (99, 9, 2026, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (100, 10, 2016, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (101, 10, 2017, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (102, 10, 2018, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (103, 10, 2019, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (104, 10, 2020, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (105, 10, 2021, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (106, 10, 2022, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (107, 10, 2023, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (108, 10, 2024, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (109, 10, 2025, NULL, NULL, NULL, NULL)
INSERT [dbo].[KPIYear] ([IDKPIYear], [IDKPIProject], [Year], [Q1], [Q2], [Q3], [Q4]) VALUES (110, 10, 2026, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[KPIYear] OFF
