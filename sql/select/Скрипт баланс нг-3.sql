use [KRR-PA-REP-SBF]

declare @date date = convert(datetime,'2020-12-03',120)
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