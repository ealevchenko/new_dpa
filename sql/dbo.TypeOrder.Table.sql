USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[TypeOrder]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeOrder](
	[IDTypeOrder] [int] IDENTITY(1,1) NOT NULL,
	[TypeOrder] [nvarchar](512) NOT NULL,
	[TypeOrderEng] [nvarchar](512) NOT NULL,
 CONSTRAINT [PK_TypeOrder] PRIMARY KEY CLUSTERED 
(
	[IDTypeOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
