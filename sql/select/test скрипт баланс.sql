USE [KRR-PA-REP-SBF]
select * from [BALANCE].[get_balance_ng_3](convert(datetime,'2020-12-03',120), 1) order by [first] desc, id_metering_units