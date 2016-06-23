var sample_DIC = function () {
	var dic = {};
	dic.tokens = {};

	dic.sample = sample = {};
	var sample_all = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
	dic.sample.all=[].concat(sample_all);
	dic.tokens.push("sample");
	return dic;
};
module.exports=sample_DIC;