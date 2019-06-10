USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[UsersActions]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersActions](
	[UserName] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[TimeStmp] [datetime] NOT NULL,
	[SessionID] [int] NOT NULL
) ON [PRIMARY]
GO
