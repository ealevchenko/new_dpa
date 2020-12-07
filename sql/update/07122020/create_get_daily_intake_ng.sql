USE [KRR-PA-REP-SBF]
GO

/****** Object:  UserDefinedFunction [BALANCE].[get_daily_intake_ng]    Script Date: 07.12.2020 17:47:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







CREATE FUNCTION [BALANCE].[get_daily_intake_ng]
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
	[value] [float] NOT NULL,
	[production] [float] NULL,
	[production_unit] [nvarchar](20) NULL,
	[optimal_consumption] [float] NULL
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
      ,[production] = (SELECT sum ([value]) FROM [KRR-PA-REP-SBF].[BALANCE].[DailyProduction] where [id_daily_intake] = bl.[id])
	  ,[production_unit] = (SELECT min([production_unit]) FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Production] where [id_metering_units] = bl.[id_metering_units])
	  ,[optimal_consumption] = (SELECT sum([optimal consumption]) FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Production] where [id_metering_units] = bl.[id_metering_units])
  FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] as bl Left JOIN 
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
	  ,[production] = (SELECT sum ([value]) FROM [KRR-PA-REP-SBF].[BALANCE].[DailyProduction] where [id_daily_intake] = bl.[id])
	  ,[production_unit] = (SELECT min([production_unit]) FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Production] where [id_metering_units] = bl.[id_metering_units])
      ,[optimal_consumption] = (SELECT sum([optimal consumption]) FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Production] where [id_metering_units] = bl.[id_metering_units])
  FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] as bl Left JOIN 
  [BALANCE].[Directory_Metering_Units] as mu ON mu.id = bl.[id_metering_units]
  where bl.[date] = @date and mu.[parent_id] = @home_mu
  RETURN
 END
 


GO


