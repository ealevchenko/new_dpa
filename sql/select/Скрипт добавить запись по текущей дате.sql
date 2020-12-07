USE [KRR-PA-REP-SBF]

declare @date date = getDate();

select @date

IF (SELECT COUNT(1) FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] where [date] = @date)>0
BEGIN
	 delete from [KRR-PA-REP-SBF].[BALANCE].[DailyProduction]  where [id_daily_intake] in (select id FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] where [date] = @date)    
	 delete from [KRR-PA-REP-SBF].[BALANCE].[DailyIntake]  where [date] = @date
END
--ELSE
--BEGIN
--     SELECT 'value abcd is missing'
--END

INSERT INTO [BALANCE].[DailyIntake]
SELECT  @date, [id], 0 ,null,null
  FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Metering_Units]
  where [working]=1



INSERT INTO [BALANCE].[DailyProduction]
SELECT 
[id_daily_intake] = (SELECT top(1) di.[id] FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] as di where di.[date] = @date and  di.[id_metering_units] = dp.[id_metering_units])
	  ,dp.[id]
      ,0
      ,null
      ,null
  FROM [KRR-PA-REP-SBF].[BALANCE].[Directory_Production] as dp
  where dp.[id_metering_units] in (SELECT [id_metering_units] FROM [KRR-PA-REP-SBF].[BALANCE].[DailyIntake] where [date] = @date)