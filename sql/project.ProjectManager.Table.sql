USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[ProjectManager]    Script Date: 2/7/2020 9:57:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [project].[ProjectManager](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NOT NULL,
	[email] [nvarchar](150) NOT NULL,
	[phone_work] [bigint] NULL,
	[phone_mobile] [bigint] NULL,
	[adress] [nvarchar](150) NULL,
	[parent_id] [int] NULL,
 CONSTRAINT [PK_ProjectManager] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [project].[ProjectManager] ON 

INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (1, 3, N'Andrey.Zaytsev@arcelormittal.com', NULL, NULL, NULL, NULL)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (2, 2, N'Nikita.Shidlovskiy@arcelormittal.com', NULL, NULL, NULL, 1)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (3, 1, N'Eduard.Levchenko@arcelormittal.com', 96332, 80974760178, N'ЦТД к402', 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (4, 8, N'Andrey.Leutskiy@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (5, 4, N'Aleksandr.Boychenko@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (6, 5, N'Aleksandr.Gavrish@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (7, 6, N'Valeriy.Shevchuk@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (8, 7, N'Nikolay.Leschenko@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (9, 9, N'Aleksandr.Savenkov@arcelormittal.com', NULL, NULL, NULL, 5)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (10, 10, N'Aleksandr.Telegin@arcelormittal.com', NULL, NULL, NULL, 5)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (11, 11, N'Albert.Romanets@arcelormittal.com', NULL, NULL, NULL, 6)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (12, 12, N'aleksey.chumak@arcelormittal.com', NULL, NULL, NULL, 6)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (13, 13, N'igor.glavatskiy@arcelormittal.com', NULL, NULL, NULL, 2)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (14, 14, N'Aleksandr.Bokiy@arcelormittal.com', NULL, NULL, NULL, 7)
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (15, 15, N'Dmitry.Suhenko@arcelormittal.com', NULL, NULL, NULL, 6)
SET IDENTITY_INSERT [project].[ProjectManager] OFF
ALTER TABLE [project].[ProjectManager]  WITH CHECK ADD  CONSTRAINT [FK_ProjectManager_ProjectManager] FOREIGN KEY([parent_id])
REFERENCES [project].[ProjectManager] ([id])
GO
ALTER TABLE [project].[ProjectManager] CHECK CONSTRAINT [FK_ProjectManager_ProjectManager]
GO
ALTER TABLE [project].[ProjectManager]  WITH CHECK ADD  CONSTRAINT [FK_ProjectManager_Users] FOREIGN KEY([id_user])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [project].[ProjectManager] CHECK CONSTRAINT [FK_ProjectManager_Users]
GO
