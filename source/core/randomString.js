var randomString = function (l, chars) {
    chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var rndString = '';
    for (var i = 0; i < l; i++) {
        var rndPos = Math.floor(Math.random() * chars.length);
        rndString += chars.substring(rndPos, rndPos + 1);
    }
    return rndString;
};
module.exports = randomString;
