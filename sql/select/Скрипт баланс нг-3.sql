use [KRR-PA-REP-SBF]

declare @date date = convert(datetime,'2020-12-07',120)
declare @home_mu int = 1

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
	  --into BALANCE
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