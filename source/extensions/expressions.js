
SimpleRant.prototype.getFacialExpressionVerbed = function () {
    var num = Math.floor(Math.random() * dic_faced.length);
    return dic_faced[num];
};


SimpleRant.prototype.capitalize = function (s) {
    return s[0].toUpperCase() + s.slice(1);
};



SimpleRant.prototype.getTitle = function () {
    var num = Math.floor(Math.random() * dic_title.length);
    return dic_title[num];
};
SimpleRant.prototype.getPossMale = function () {
    return dic_pron_male[0].split("/")[3];
};

SimpleRant.prototype.getPossFemale = function () {
    return dic_pron_female[0].split("/")[3];
};


SimpleRant.prototype.getNounAnimal = function () {
    var num = Math.floor(Math.random() * dic_noun_animal.length);
    return dic_noun_animal[num].split("/")[3];
};
SimpleRant.prototype.getCountry = function() {
    var num = Math.floor(Math.random() * dic_country.length);
    return dic_country[num];
};

SimpleRant.prototype.getAdjective = function (plural) {
    var num = Math.floor(Math.random() * dic_adj.length);
    return dic_adj[num].split("/")[plural];
};


SimpleRant.prototype.getAdverb = function() {
    var num = Math.floor(Math.random() * dic_adv.length);
    return dic_adv[num];
};


SimpleRant.prototype.getAdverbByType = function (type) {
    var num;
    if(type=="emotion"){
        num = Math.floor(Math.random() * dic_adv_emotion.length);
        return dic_adv_emotion[num];
    }
    if(type=="sexy"){
        num = Math.floor(Math.random() * dic_adv_sexy.length);
        return dic_adv_sexy[num];
    }
};


SimpleRant.prototype.getVerb = function (plural) {
    var num = Math.floor(Math.random() * dic_verb.length);
    return dic_verb[num].split("/")[plural];
};
SimpleRant.prototype.getColor = function (plural) {
    var num = Math.floor(Math.random() * dic_color.length);
    return dic_color[num].split("/")[plural];
};
SimpleRant.prototype.getNoun = function (plural) {
    var num = Math.floor(Math.random() * dic_noun.length);
    return dic_noun[num].split("/")[plural];
};
SimpleRant.prototype.getNounByType = function (nountype,plural) {
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic_noun_animal.length);
        return dic_noun_animal[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic_noun_tool.length);
        return dic_noun_tool[num].split("/")[plural];
    }
    if(nountype == "surface"){
        var num = Math.floor(Math.random() * dic_noun_surface.length);
        return dic_noun_surface[num].split("/")[plural];
    }
    if(nountype == "furniture"){
        var num = Math.floor(Math.random() * dic_noun_furniture.length);
        return dic_noun_furniture[num].split("/")[plural];
    }
    if(nountype == "round"){
        var num = Math.floor(Math.random() * dic_noun_round.length);
        return dic_noun_round[num].split("/")[plural];
    }
    if(nountype == "body"){
        var num = Math.floor(Math.random() * dic_noun_body.length);
        return dic_noun_body[num].split("/")[plural];
    }
    if(nountype == "liquid"){
        var num = Math.floor(Math.random() * dic_noun_liquid.length);
        return dic_noun_liquid[num].split("/")[plural];
    }
    if(nountype == "insect"){
        var num = Math.floor(Math.random() * dic_noun_insect.length);
        return dic_noun_insect[num].split("/")[plural];
    }
    if(nountype == "clothes"){
        var num = Math.floor(Math.random() * dic_noun_clothes.length);
        return dic_noun_clothes[num].split("/")[plural];
    }
    if(nountype == "plant"){
        var num = Math.floor(Math.random() * dic_noun_plant.length);
        return dic_noun_plant[num].split("/")[plural];
    }
    if(nountype == "person"){
        var num = Math.floor(Math.random() * dic_noun_person.length);
        return dic_noun_person[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic_noun_tool.length);
        return dic_noun_tool[num].split("/")[plural];
    }
    if(nountype == "long"){
        var num = Math.floor(Math.random() * dic_noun_long.length);
        return dic_noun_long[num].split("/")[plural];
    }
    if(nountype == "ball"){
        var num = Math.floor(Math.random() * dic_noun_ball.length);
        return dic_noun_ball[num].split("/")[plural];
    }
    if(nountype == "article"){
        var num = Math.floor(Math.random() * dic_noun_article.length);
        return dic_noun_article[num].split("/")[plural];
    }
    if(nountype == "drug"){
        var num = Math.floor(Math.random() * dic_noun_drug.length);
        return dic_noun_drug[num].split("/")[plural];
    }
    if(nountype == "fruit"){
        var num = Math.floor(Math.random() * dic_noun_fruit.length);
        return dic_noun_fruit[num].split("/")[plural];
    }
    if(nountype == "container"){
        var num = Math.floor(Math.random() * dic_noun_container.length);
        return dic_noun_container[num].split("/")[plural];
    }
    if(nountype == "instrument"){
        var num = Math.floor(Math.random() * dic_noun_instrument.length);
        return dic_noun_instrument[num].split("/")[plural];
    }
    if(nountype == "sex"){
        var num = Math.floor(Math.random() * dic_noun_sex.length);
        return dic_noun_sex[num].split("/")[plural];
    }
    if(nountype == "job"){
        var num = Math.floor(Math.random() * dic_noun_job.length);
        return dic_noun_job[num].split("/")[plural];
    }
    if(nountype == "weapon"){
        var num = Math.floor(Math.random() * dic_noun_weapon.length);
        return dic_noun_weapon[num].split("/")[plural];
    }
    if(nountype == "hole"){
        var num = Math.floor(Math.random() * dic_noun_hole.length);
        return dic_noun_hole[num].split("/")[plural];
    }
    if(nountype == "food"){
        var num = Math.floor(Math.random() * dic_noun_food.length);
        return dic_noun_food[num].split("/")[plural];
    }
    if(nountype == "vehicle"){
        var num = Math.floor(Math.random() * dic_noun_vehicle.length);
        return dic_noun_vehicle[num].split("/")[plural];
    }
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic_noun_animal.length);
        return dic_noun_animal[num].split("/")[plural];
    }
    if(nountype == "shape"){
        var num = Math.floor(Math.random() * dic_noun_shape.length);
        return dic_noun_shape[num].split("/")[plural];
    }
    return "";
};
SimpleRant.prototype.getAmount = function () {
    var num = Math.floor(Math.random() * amount.length);
    return amount[num];
};
SimpleRant.prototype.getRelationship = function (plural) {
    var num = Math.floor(Math.random() * dic_rel.length);
    return dic_rel[num].split("/")[plural];
};
SimpleRant.prototype.getTitleMale = function () {
    var num = Math.floor(Math.random() * dic_title.length);
    return dic_title[num];
};
SimpleRant.prototype.getTitleFemale = function () {
    var num = Math.floor(Math.random() * dic_title.length);
    return dic_title[num];
};

SimpleRant.prototype.getNameMale = function () {
    var num = Math.floor(Math.random() * dic_name_male.length);
    return dic_name_male[num];
};
SimpleRant.prototype.getNameFemale = function () {
    var num = Math.floor(Math.random() * dic_name_female.length);
    return dic_name_female[num];
};


SimpleRant.prototype.getYes = function () {
    var num = Math.floor(Math.random() * dic_yn_yes.length);
    return dic_yn_yes[num];
};
SimpleRant.prototype.getNo = function () {
    var num = Math.floor(Math.random() * dic_yn_no.length);
    return dic_yn_no[num];
};
SimpleRant.prototype.getExclamation = function () {
    var num = Math.floor(Math.random() * dic_emo.length);
    return dic_emo[num];
};
SimpleRant.prototype.getFirstName = function () {
    var num = Math.floor(Math.random() * dic_name.length);
    return dic_name[num].split("/")[plural];
};
SimpleRant.prototype.getLastName = function () {
    var num = Math.floor(Math.random() * dic_name.length);
    return dic_name[num];
};
SimpleRant.prototype.getFacialExpression = function () {
    var num = Math.floor(Math.random() * dic_face.length);
    return dic_face[num];
};

SimpleRant.prototype.getCoordinatingConjunction = function () {
    var num = Math.floor(Math.random() * dic_conj.length);
    return dic_conj[num];
};

