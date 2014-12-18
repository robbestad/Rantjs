var fs = require('fs'), util = require('util'), stream = require('stream'), es = require("event-stream");

var lineNr = 0, re='', match; var kw={}; var keywords=[]; var tokenword=[]; addedClasses=[];
var filename='', subs=[]; var e;

if(undefined === process.argv[2]){
    console.log("please pass a filename");
    process.exit();
}


var s = fs.createReadStream(__dirname+"/"+process.argv[2])
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        lineNr += 1;

        (function(){
            //#version 2
            //#name noun
            //#subs singular plural

            re=new RegExp("^(#name )","g");
            match=line.match(re);
            if(null !== match) {
                filename=line.replace(re,'');
                if(filename === "with"){
                    filename = "preposition";
                }

                if(filename === "name"){
                    filename = "firstname";
                }

            }

            re=new RegExp("^(#subs )","g");
            match=line.match(re);
            if(null !== match) {
                line.replace(re,'').split(/ /).map(function(item){
                    subs.push(item);
                });
            }



            re=new RegExp("^[\t\v\f \u00a0\u1680\u2000-\u200b\u2028\u2029\u202f\u205f\u3000]+","g");
            line=line.replace(re,'');
            re=new RegExp("^(> )","g");
            match=line.match(re);
            if(null !== match){
                var word = line.replace(/(> )/i, '');
                if(word !== '' && word !== '|'){
                    tokenword[lineNr]=word;

                    addedClasses.map(function(item){
                        //console.log(keywords[lineNr]);
                        if("undefined" != typeof keywords[lineNr]){
                            keywords[lineNr]=keywords[lineNr]+" "+item;
                            //console.log(item);
                        } else {
                            keywords[lineNr]=item;
                        }
                    });
                }
            }

            re=new RegExp("\\| class ","g");
            match=line.match(re);
            if(null !== match){
                e=line.replace(re,'');
                keywords[lineNr-1]=e.replace(/-/g,'');
                //var tokens=classes.split(" ");
                //tokens.forEach(function(e){
                //    e.replace(/(a-z)/ig,'');
                //    if(e !== '' && e !== '|')
                //        keywords[lineNr-1]=e;
                //});
            }


            re=new RegExp("\\#class add ","g");
            match=line.match(re);
            if(null !== match){
                e=line.replace(re,'');
                addedClasses.push(e.replace(/-/g,''));
            }

            re=new RegExp("\\#class remove ","g");
            match=line.match(re);
            if(null !== match){
                var index = addedClasses.indexOf(line.replace(re,''));
                if (index > -1) {
                    addedClasses.splice(index, 1);
                }
            }


            // resume the readstream
            s.resume();


            // if you want to stop execution
            //var data = new Buffer('Something bad happened\n');
            //fs.writeSync(stream.fd, data, 0, data.length, stream.pos);
            //process.exit();

        })();

    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){

            //
            ////console.log(addedClasses);
            ////keywords.map(function(item,idx){
            ////    console.log(idx+" "+item);
            ////});
            //////
            var mappedKeywords=[]; dic={};
            re = new RegExp(/ /);

            keywords.map(function(item,idx){
                var line = item.split(re);
                line.map(function(kw){
                    var index = mappedKeywords.indexOf(kw);
                    if (index <= -1) {
                        mappedKeywords.push(kw);
                        dic[kw]=[];
                    }
                });
            });


            var all = []; dic.all = all; var toFile;
            //var animal = []; dic.animal = animal;
            tokenword.map(function(item,idx){
                if("undefined" == typeof keywords[idx]){
                    // plain .all
                    dic.all.push(item);
                }
                else {
                    var line = keywords[idx].split(re);
                    line.map(function(kw){
                            dic[kw].push(item);
                    });
                }
            });

            var toFile =("var "+filename+"={};\n");
            toFile+=("dic."+filename+"="+filename+";\n");
            mappedKeywords.map(function(k){
                toFile+=("dic."+filename+"."+k+"=["+dic[k].map(function(item){return "\""+item+"\""})+"];\n");
            });
            var out_all="dic."+filename+".all=["+dic.all.map(function(item){return "\""+item+"\""})+"].concat(";
            var i=0;
            mappedKeywords.map(function(k){
                out_all+="dic."+filename+"."+k;
                if(++i<mappedKeywords.length) out_all+=",";
            });
            out_all+=");\n";
            toFile+=(out_all);

            toFile+=("dic."+filename+".subs=["+subs.map(function(item){return "\""+item+"\""})+"];\n");
            toFile+=("dic."+filename+".filters=["+mappedKeywords.map(function(item){return "\""+item+"\""})+"];\n");


            fs.writeFile(__dirname+"/out/"+filename+".js", toFile, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Saved out/"+filename+".js!\n");
                }
            });

        })
);



//var greet ={
//};
//dic.greet = greet;
//var greet_all= ["hello","greetings","hola","hey","what's up","whazzup","yo","good day","good morning","good afternoon","good evening","good night","hey buddy","ahoy","sup","salutations","aloha","konichi wa","what's happening","how's it hanging","how's it going","what's new","guten Tag"].concat();
//dic.greet.all=greet_all;

//subs.noun=["singular","plural"];
//filters.noun=["body","hole","person","sex","weapon","animal","tool","food","drug","article","fruit","container","furniture","instrument","plant","shape","ball","surface","liquid","long","dog","job","round","clothes","vehicle","insect",];

