USE [KRR-PA-REP-SBF]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 08.07.2019 17:01:14 ******/
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
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_StructuralSubdivisions] FOREIGN KEY([id_structural_subdivisions])
REFERENCES [dbo].[StructuralSubdivisions] ([id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_StructuralSubdivisions]
GO
