SimpleRant.prototype.getTimeNoun = function (plural) {
    var num = Math.floor(Math.random() * dic_timenoun.length);
    return dic_timenoun[num].split("/")[plural];
};

SimpleRant.prototype.getTimeDayOfWeek = function (plural) {
    var num = Math.floor(Math.random() * dic_timenoun_dayofweek.length);
    return dic_timenoun_dayofweek[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfDay = function (plural) {
    var num = Math.floor(Math.random() * dic_timenoun_timeofday.length);
    return dic_timenoun_timeofday[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfMonth = function (plural) {
    var num = Math.floor(Math.random() * dic_timenoun_month.length);
    return dic_timenoun_month[num].split("/")[plural];
};


