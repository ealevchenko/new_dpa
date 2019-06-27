USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [project].[ProjectManager]    Script Date: 27.06.2019 17:13:20 ******/
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
