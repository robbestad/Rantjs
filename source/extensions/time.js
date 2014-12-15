SimpleRant.prototype.getTimeNoun = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.dayofweek.concat(dic.timenoun.timeofday,dic.timenoun.month).length);
    return dic.timenoun.dayofweek.concat(dic.timenoun.timeofday,dic.timenoun.month)[num].split("/")[plural];
};

SimpleRant.prototype.getTimeDayOfWeek = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.dayofweek.length);
    return dic.timenoun.dayofweek[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfDay = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.timeofday.length);
    return dic.timenoun.timeofday[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfMonth = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.month.length);
    return dic.timenoun.month[num].split("/")[plural];
};


