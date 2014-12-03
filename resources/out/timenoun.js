
var dic_timenoun=[];
var dic_timenoun_holiday = ["New Year's Eve/New Year's Eves", "New Year's Day/New Year's Days", "Valentine's Day/Valentine's Days", "Easter/Easters", "Labor Day/Labor Days", "Halloween/Halloweens", "Thanksgiving/Thanksgivings", "Christmas/Christmasses", "Hanukkah/Hanukkahs", "Black Friday/Black Fridays", "Kwanzaa/Kwanzaas", "Boxing Day/Boxing Days", "Labor Day/Labor Days", "Father's Day/Father's Days", "Mother's Day/Mother's Days", "Groundhog Day/Groundhog Days"];
var dic_timenoun_unit = ["millisecond/milliseconds", "second/seconds", "minute/minutes", "hour/hours", "day/days", "month/months", "year/years"];
var dic_timenoun_month = ["January/Januaries", "February/Februaries", "March/Marches", "April/Aprils", "May/Mays", "June/Junes", "July/Julies", "August/Augusts", "September/Septembers", "October/Octobers", "November/Novembers", "December/Decembers"];
var dic_timenoun_dayofweek = ["Sunday/Sundays", "Monday/Mondays", "Tuesday/Tuesdays", "Wednesday/Wednesdays", "Thursday/Thursdays", "Friday/Fridays", "Saturday/Saturdays"];
var dic_timenoun_timeofday = ["dawn/dawns", "morning/mornings", "noon/noons", "day/days", "afternoon/afternoons", "evening/evenings", "dusk/dusks", "night/nights", "midnight/midnights"];
dic_timenoun = dic_timenoun.concat(dic_timenoun_holiday,dic_timenoun_unit,dic_timenoun_month,dic_timenoun_dayofweek,dic_timenoun_timeofday);