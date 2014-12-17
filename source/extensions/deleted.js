
SimpleRant.prototype.getFacialExpressionVerbed = function () {
    var num = Math.floor(Math.random() * dic.faced.length);
    return dic.faced[num];
};

SimpleRant.prototype.getTitle = function () {
    var num = Math.floor(Math.random() * dic.title.all.length);
    return dic.title.all[num];
};
SimpleRant.prototype.getPossMale = function () {
    return dic.pron.male[0].split("/")[3];
};

SimpleRant.prototype.getPossFemale = function () {
    return dic.pron.female[0].split("/")[3];
};


SimpleRant.prototype.getNounAnimal = function () {
    var num = Math.floor(Math.random() * dic.noun.animal.length);
    return dic.noun.animal[num].split("/")[3];
};
SimpleRant.prototype.getCountry = function() {
    var num = Math.floor(Math.random() * dic.country.africa.concat(dic.country.asia,dic.country.caribbean,dic.country.centralamerica,dic.country.eurasia,dic.country.europe,dic.country.mediterranean,dic.country.middleeast,dic.country.northamerica,dic.country.oceania,dic.country.southamerica).length);
    return dic.country.africa.concat(dic.country.asia,dic.country.caribbean,dic.country.centralamerica,dic.country.eurasia,dic.country.europe,dic.country.mediterranean,dic.country.middleeast,dic.country.northamerica,dic.country.oceania,dic.country.southamerica)[num];
};

SimpleRant.prototype.getAdjective = function (plural) {
    var num = Math.floor(Math.random() * dic.adj.all.length);
    if("undefined" != dic.adj.all[num].split("/")[plural])
        return dic.adj.all[num].split("/")[plural];
    else
        return dic.adj.all[num];

};


SimpleRant.prototype.getAdverb = function() {
    var num = Math.floor(Math.random() * dic.adv.emotion.concat(dic.adv.sexy).length);
    return dic.adv.emotion.concat(dic.adv.sexy)[num];
};


SimpleRant.prototype.getAdverbByType = function (type) {
    var num;
    if(type=="emotion"){
        num = Math.floor(Math.random() * dic.adv.emotion.length);
        return dic.adv.emotion[num];
    }
    if(type=="sexy"){
        num = Math.floor(Math.random() * dic.adv.sexy.length);
        return dic.adv.sexy[num];
    }
};


SimpleRant.prototype.getVerb = function (plural) {
    var num = Math.floor(Math.random() * dic.verb.all.length);
    return dic.verb.all[num].split("/")[plural];
};
SimpleRant.prototype.getColor = function (plural) {
    var num = Math.floor(Math.random() * dic.color.primary.concat(dic.color.secondary).length);
    return dic.color.primary.concat(dic.color.secondary)[num].split("/")[plural];
};
SimpleRant.prototype.getNoun = function (plural) {
    var num = Math.floor(Math.random() * dic.noun.surface.concat(dic.noun.furniture,dic.noun.liquid,dic.noun.animal,dic.noun.article,dic.noun.ball,dic.noun.clothes,dic.noun.container,dic.noun.drug,dic.noun.food,dic.noun.fruit,dic.noun.furniture,dic.noun.hole,dic.noun.insect,dic.noun.job,dic.noun.liquid,dic.noun.long,dic.noun.person,dic.noun.plant,dic.noun.sex,dic.noun.surface,dic.noun.tool,dic.noun.vehicle,dic.noun.weapon).length);
    return  dic.noun.surface.concat(dic.noun.furniture,dic.noun.liquid,dic.noun.animal,dic.noun.article,dic.noun.ball,dic.noun.clothes,dic.noun.container,dic.noun.drug,dic.noun.food,dic.noun.fruit,dic.noun.furniture,dic.noun.hole,dic.noun.insect,dic.noun.job,dic.noun.liquid,dic.noun.long,dic.noun.person,dic.noun.plant,dic.noun.sex,dic.noun.surface,dic.noun.tool,dic.noun.vehicle,dic.noun.weapon)[num].split("/")[plural];
};
SimpleRant.prototype.getNounByType = function (nountype,plural) {
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic.noun.animal.length);
        return dic.noun.animal[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic.noun.tool.length);
        return dic.noun.tool[num].split("/")[plural];
    }
    if(nountype == "surface"){
        var num = Math.floor(Math.random() * dic.noun.surface.length);
        return dic.noun.surface[num].split("/")[plural];
    }
    if(nountype == "furniture"){
        var num = Math.floor(Math.random() * dic.noun.furniture.length);
        return dic.noun.furniture[num].split("/")[plural];
    }
    if(nountype == "round"){
        var num = Math.floor(Math.random() * dic.noun.round.length);
        return dic.noun.round[num].split("/")[plural];
    }
    if(nountype == "body"){
        var num = Math.floor(Math.random() * dic.noun.body.length);
        return dic.noun.body[num].split("/")[plural];
    }
    if(nountype == "liquid"){
        var num = Math.floor(Math.random() * dic.noun.liquid.length);
        return dic.noun.liquid[num].split("/")[plural];
    }
    if(nountype == "insect"){
        var num = Math.floor(Math.random() * dic.noun.insect.length);
        return dic.noun.insect[num].split("/")[plural];
    }
    if(nountype == "clothes"){
        var num = Math.floor(Math.random() * dic.noun.clothes.length);
        return dic.noun.clothes[num].split("/")[plural];
    }
    if(nountype == "plant"){
        var num = Math.floor(Math.random() * dic.noun.plant.length);
        return dic.noun.plant[num].split("/")[plural];
    }
    if(nountype == "person"){
        var num = Math.floor(Math.random() * dic.noun.person.length);
        return dic.noun.person[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic.noun.tool.length);
        return dic.noun.tool[num].split("/")[plural];
    }
    if(nountype == "long"){
        var num = Math.floor(Math.random() * dic.noun.long.length);
        return dic.noun.long[num].split("/")[plural];
    }
    if(nountype == "ball"){
        var num = Math.floor(Math.random() * dic.noun.ball.length);
        return dic.noun.ball[num].split("/")[plural];
    }
    if(nountype == "article"){
        var num = Math.floor(Math.random() * dic.noun.article.length);
        return dic.noun.article[num].split("/")[plural];
    }
    if(nountype == "drug"){
        var num = Math.floor(Math.random() * dic.noun.drug.length);
        return dic.noun.drug[num].split("/")[plural];
    }
    if(nountype == "fruit"){
        var num = Math.floor(Math.random() * dic.noun.fruit.length);
        return dic.noun.fruit[num].split("/")[plural];
    }
    if(nountype == "container"){
        var num = Math.floor(Math.random() * dic.noun.container.length);
        return dic.noun.container[num].split("/")[plural];
    }
    if(nountype == "instrument"){
        var num = Math.floor(Math.random() * dic.noun.instrument.length);
        return dic.noun.instrument[num].split("/")[plural];
    }
    if(nountype == "sex"){
        var num = Math.floor(Math.random() * dic.noun.sex.length);
        return dic.noun.sex[num].split("/")[plural];
    }
    if(nountype == "job"){
        var num = Math.floor(Math.random() * dic.noun.job.length);
        return dic.noun.job[num].split("/")[plural];
    }
    if(nountype == "weapon"){
        var num = Math.floor(Math.random() * dic.noun.weapon.length);
        return dic.noun.weapon[num].split("/")[plural];
    }
    if(nountype == "hole"){
        var num = Math.floor(Math.random() * dic.noun.hole.length);
        return dic.noun.hole[num].split("/")[plural];
    }
    if(nountype == "food"){
        var num = Math.floor(Math.random() * dic.noun.food.length);
        return dic.noun.food[num].split("/")[plural];
    }
    if(nountype == "vehicle"){
        var num = Math.floor(Math.random() * dic.noun.vehicle.length);
        return dic.noun.vehicle[num].split("/")[plural];
    }
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic.noun.animal.length);
        return dic.noun.animal[num].split("/")[plural];
    }
    if(nountype == "shape"){
        var num = Math.floor(Math.random() * dic.noun.shape.length);
        return dic.noun.shape[num].split("/")[plural];
    }
    return "";
};
SimpleRant.prototype.getAmount = function () {
    var num = Math.floor(Math.random() * dic.amount.length);
    return dic.amount[num];
};
SimpleRant.prototype.getRelationship = function (plural) {
    var num = Math.floor(Math.random() * dic.rel.neutral.concat(dic.rel.male, dic.rel.female).length);
    return dic.rel.neutral.concat(dic.rel.male, dic.rel.female)[num].split("/")[plural];
};
SimpleRant.prototype.getTitleMale = function () {
    var num = Math.floor(Math.random() * dic.title.all.length);
    return dic.title.all[num];
};

SimpleRant.prototype.getNameMale = function () {
    var num = Math.floor(Math.random() * dic.names.male.length);
    return dic.names.male[num];
};
SimpleRant.prototype.getNameFemale = function () {
    var num = Math.floor(Math.random() * dic.names.female.length);
    return dic.names.female[num];
};

SimpleRant.prototype.getYes = function () {
    var num = Math.floor(Math.random() * dic.yn.yes.length);
    return dic.yn.yes[num];
};
SimpleRant.prototype.getNo = function () {
    var num = Math.floor(Math.random() * dic.yn.no.length);
    return dic.yn.no[num];
};
SimpleRant.prototype.getExclamation = function () {
    var num = Math.floor(Math.random() * dic.emo.all.length);
    return dic.emo.all[num];
};
SimpleRant.prototype.getFirstName = function () {
    var num = Math.floor(Math.random() * dic.names.male.concat(dic.names.female).length);
    return dic.names.male.concat(dic.names.female)[num].split("/")[plural];
};
SimpleRant.prototype.getLastName = function () {
    var num = Math.floor(Math.random() * dic.surname.all.length);
    return dic.surname.all[num];
};
SimpleRant.prototype.getFacialExpression = function () {
    var num = Math.floor(Math.random() * dic.face.all.length);
    return dic.face.all[num];
};

SimpleRant.prototype.getCoordinatingConjunction = function () {
    var num = Math.floor(Math.random() * dic.conj.all.length);
    return dic.conj.all[num];
};

