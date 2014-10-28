/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="animal.ts" />
/// <reference path="extractor.ts" />
var submit = <HTMLInputElement>document.querySelector('input[type=submit]');
var search = <HTMLInputElement>document.querySelector('input[type=text]');
var desc = <HTMLTextAreaElement>document.querySelector('textarea');
submit.addEventListener('click', function() {
  var url = 'http://ja.wikipedia.org/w/api.php?callback=?';
  jQuery.ajax({
    dataType: 'jsonp',
    url: url,
    data: {
      action: 'query',
      format: 'json',
      prop: 'revisions',
      rvprop: 'content',
      titles: search.value,
      redirects: true
    },
    cache: true
  }).done(function(data) {
    console.log(data);
    var pages = data['query']['pages'];
    for (var k in pages) {
      var rev = pages[k]['revisions'][0];
      var text = rev['*'];
      desc.innerText = text;
      var mya = Extractor.extract(text);
      showMyAnimal(mya);
      break;
    }
  });
  jQuery.getJSON(url, {
    action: 'query',
    format: 'json',
    list: 'backlinks',
    bltitle: search.value,
    bllimit: 500
  }).done(function(data) {
    var backlinks = data['query']['backlinks'];
    var bl = document.getElementById('my-backlinks');
    bl.innerText = backlinks.length;
  });
});

function showMyAnimal(animal: Animal) {
  var bl = document.getElementById('my-bodyLength');
  bl.innerText = animal.bodyLength.toString();
  var bw = document.getElementById('my-bodyWeight');
  bw.innerText = animal.bodyWeight.toString();
}
