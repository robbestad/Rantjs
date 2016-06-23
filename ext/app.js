var sample_DIC = function () {
  var dic = {};
  dic.tokens = [];

  dic.sample = sample = {};
  var sample_all = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
  dic.sample.all = sample_all;
  dic.tokens.push("sample");
  return dic;
};

document.getElementById('submit').addEventListener('click', function() {
    var rant= require("rant");
    if('' == document.getElementById("input").value) return;
    var result = rant(document.getElementById("input").value);
    document.getElementById("output").value = result;
  }, false);

  function htmlDecode(value){
        return $('<div/>').html(value).text();
  }
  $(document).ready(function(){

    $(".run-example").click(function(){
      document.getElementById("input").value = "";
      document.getElementById("output").value = "";
      document.getElementById("input").value = htmlDecode(this.innerHTML);
      $("#submit").click();

    });

    $("#submit").click(function(){
      $('#output').removeClass('light');
      $('#output').addClass('purple');
    });

    $("#copy-button").zclip({
      path: "zeroclip/ZeroClipboard.swf",
      copy:function(){return $('textarea#output').val();},
      beforeCopy:function(){
      },
      afterCopy:function(){
        $('#output').css('color','white');
        $('#output').removeClass('purple');
        $('#output').addClass('light');
      }
    });
  });

  $(function() {
      // availableTags is distributed in words.js and concated in here...
      //var availableTags = [ "<preposition>",  "<firstname>",  "<activity>",  "<adj>",  "<adv>",  "<amount>",  "<color>",  "<conj>",  "<country>",  "<emo>",  "<em>",  "<face>",  "<greet>",  "<surname>",  "<noun>",  "<sound>",  "<title>",  "<place>",  "<prefix>",  "<prepos>",  "<pron>",  "<quality>",  "<rel>",  "<sconj>",  "<substance>",  "<timeadv>",  "<timenoun>",  "<unit>",  "<verbimg>",  "<say>",  "<verb>",  "<vocal>",  "<yn>"];
      var minWordLength = 2;
      function split(val) {
        return val.split(' ');
      }

      function extractLast(term) {
        return split(term).pop();
      }
      $("#input")
      // don't navigate away from the field on tab when selecting an item
      .bind("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.TAB && $(this).data("ui-autocomplete").menu.active) {
          event.preventDefault();
        }
      }).autocomplete({
        minLength: minWordLength,
        source: function(request, response) {
          // delegate back to autocomplete, but extract the last term
          var term = extractLast(request.term);
          if(term.length >= minWordLength){
            response($.ui.autocomplete.filter( availableTags, term ));
          }
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function(event, ui) {
          var terms = split(this.value);
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push(ui.item.value);
          // add placeholder to get the comma-and-space at the end
          terms.push("");
          this.value = terms.join(" ");
          return false;
        }
      });
    });
