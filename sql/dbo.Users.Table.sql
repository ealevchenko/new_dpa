USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/7/2020 9:57:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](1000) NULL,
	[email] [nvarchar](150) NULL,
	[surname] [nvarchar](50) NULL,
	[name] [nvarchar](50) NULL,
	[patronymic] [nvarchar](50) NULL,
	[id_structural_subdivisions] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (1, N'EUROPE\lev75', NULL, N'Eduard.Levchenko@arcelormittal.com', N'Левченко', N'Эдуард', N'Алексеевич', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (2, N'EUROPE\nashidlovskiy', NULL, N'Nikita.Shidlovskiy@arcelormittal.com', N'Шидловский', N'Никита', N'Александрович', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (3, N'EUROPE\avzaytsev', NULL, N'Andrey.Zaytsev@arcelormittal.com', N'Зайцев', N'Андрей', N'Витальевич', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (4, N'EUROPE\avboychenko', NULL, N'Aleksandr.Boychenko@arcelormittal.com', N'Бойченко', N'Александр', N' Владимирович', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (5, N'EUROPE\asgavrish', NULL, N'Aleksandr.Gavrish@arcelormittal.com', N'Гавриш', N'Александр', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (6, N'EUROPE\vishevchuk', NULL, N'Valeriy.Shevchuk@arcelormittal.com', N'Шевчук', N'Валерий', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (7, N'EUROPE\ndleschenko', NULL, N'Nikolay.Leschenko@arcelormittal.com', N'Лещенко', N'Николай', N'Демьянович', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (8, N'EUROPE\avleutskiy', NULL, N'Andrey.Leutskiy@arcelormittal.com', N'Леутский', N'Андрей', N'Викторович', 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (9, N'EUROPE\assavenkov', NULL, N'Aleksandr.Savenkov@arcelormittal.com', N'Савенков', N'Александр', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (10, N'EUROPE\aatelegin', NULL, N'Aleksandr.Telegin@arcelormittal.com', N'Телегин', N'Александр', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (11, N'EUROPE\arromanets', NULL, N'Albert.Romanets@arcelormittal.com', N'Романец', N'Альберт', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (12, N'EUROPE\aachumak', NULL, N'aleksey.chumak@arcelormittal.com', N'Чумак', N'Алексей', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (13, N'EUROPE\iaglavatskiy', NULL, N'igor.glavatskiy@arcelormittal.com', N'Главатский', N'Игорь', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (14, N'EUROPE\avbokiy', NULL, N'Aleksandr.Bokiy@arcelormittal.com', N'Бокий', N'Александр', NULL, 3)
INSERT [dbo].[Users] ([id], [user_name], [description], [email], [surname], [name], [patronymic], [id_structural_subdivisions]) VALUES (15, N'EUROPE\dnsuhenko', NULL, N'Dmitry.Suhenko@arcelormittal.com', N'Сухенко', N'Дмитрий', NULL, 3)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_StructuralSubdivisions] FOREIGN KEY([id_structural_subdivisions])
REFERENCES [dbo].[StructuralSubdivisions] ([id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_StructuralSubdivisions]
GO
