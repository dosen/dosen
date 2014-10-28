/// <reference path="typings/jquery/jquery.d.ts" />
var submit = <HTMLInputElement>document.querySelector('input[type=submit]');
var search = <HTMLInputElement>document.querySelector('input[type=text]');
submit.addEventListener('click', function() {
  var q = search.value;
  jQuery.getJSON("http://ja.wikipedia.org/w/api.php?action=query&titles=DVD&format=json&callback=?", function(data) {
    search.value = data;
  });
});
