USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[ListOrder]    Script Date: 10.06.2019 16:46:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListOrder](
	[IDOrder] [int] IDENTITY(1,1) NOT NULL,
	[IDTypeOrder] [int] NOT NULL,
	[NumOrder] [int] NULL,
	[DateOrder] [datetime] NULL,
	[Order] [nvarchar](512) NOT NULL,
	[OrderEng] [nvarchar](512) NOT NULL,
	[IDFile] [int] NULL,
	[IDFileEng] [int] NULL,
 CONSTRAINT [PK_ListOrder] PRIMARY KEY CLUSTERED 
(
	[IDOrder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
