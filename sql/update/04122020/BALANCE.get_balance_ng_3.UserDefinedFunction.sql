USE [KRR-PA-REP-SBF]
GO
/****** Object:  UserDefinedFunction [BALANCE].[get_balance_ng_3]    Script Date: 04.12.2020 17:52:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE FUNCTION [BALANCE].[get_balance_ng_3]
 (
    @date date, 
	@home_mu int
 )
	RETURNS 
	@balance TABLE(
	[first] [int] NOT NULL,
	[id] [int] NOT NULL,
	[date] [date] NOT NULL,
	[id_metering_units] [int] NOT NULL,
	[id_structural_subdivisions] [int] NULL,
	[id_service area] [int] NULL,
	[metering_units_name] [nvarchar](100) NULL,
	[unbalance distribution] [bit] NULL,
	[working] [bit] NULL,
	[note] [nvarchar](50) NULL,
	[value] [float] NOT NULL
	)
	AS
	BEGIN
	insert @balance
		SELECT 
			   [first] = 1
			   ,bl.[id]
			  ,bl.[date]
			  ,bl.[id_metering_units]
			  ,mu.[id_structural_subdivisions]
			  ,mu.[id_service area]
			  ,mu.[metering_units_name]
			  ,mu.[unbalance distribution]
			  ,mu.[working]
			  ,mu.[note]
			  ,bl.[value]
			  --into BALANCE
		  FROM [KRR-PA-REP-SBF].[BALANCE].[Balance_NG_3] as bl Left JOIN 
		  [BALANCE].[Directory_Metering_Units] as mu ON mu.id = bl.[id_metering_units]
		  where bl.[date] = @date and mu.[id] = @home_mu
		  union
		  SELECT 
			   [first] = 0
			   ,bl.[id]
			  ,bl.[date]
			  ,bl.[id_metering_units]
			  ,mu.[id_structural_subdivisions]
			  ,mu.[id_service area]
			  ,mu.[metering_units_name]
			  ,mu.[unbalance distribution]
			  ,mu.[working]
			  ,mu.[note]
			  ,bl.[value]
		  FROM [KRR-PA-REP-SBF].[BALANCE].[Balance_NG_3] as bl Left JOIN 
		  [BALANCE].[Directory_Metering_Units] as mu ON mu.id = bl.[id_metering_units]
		  where bl.[date] = @date and mu.[parent_id] = @home_mu
  RETURN
 END
 


GO
