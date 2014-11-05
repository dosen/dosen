/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="animal.ts" />
/// <reference path="extractor.ts" />
var submit = <HTMLInputElement>document.querySelector('input[type=submit]');
var search = <HTMLInputElement>document.querySelector('input[type=text]');
var desc = <HTMLTextAreaElement>document.querySelector('textarea');
var metric1_icon = <HTMLElement>document.querySelector('.metric__icon');
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
  var m1t = document.querySelector('#metric-1 .metric__title');
  m1t.textContent = "bodyLength";
  var m1v = document.querySelector('#metric-1 .metric__value');
  m1v.textContent = animal.bodyLength.toString();
  var m1i = <HTMLElement>document.querySelector('#metric-1 .metric__icon');
  m1i.classList.add('metric__icon--down');

  var m2t = document.querySelector('#metric-2 .metric__title');
  m2t.textContent = "bodyWeight";
  var m2v = document.querySelector('#metric-2 .metric__value');
  m2v.textContent = animal.bodyWeight.toString();
  var m2i = <HTMLElement>document.querySelector('#metric-2 .metric__icon');
  m2i.classList.add('metric__icon--up');
}
