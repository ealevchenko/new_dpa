USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[ProjectManager]    Script Date: 29.07.2019 17:09:01 ******/
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
INSERT [project].[ProjectManager] ([id], [id_user], [email], [phone_work], [phone_mobile], [adress], [parent_id]) VALUES (3, 1, N'Eduard.Levchenko@arcelormittal.com', NULL, NULL, NULL, 2)
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
