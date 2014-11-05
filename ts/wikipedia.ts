/// <reference path="typings/jquery/jquery.d.ts" />
class Wikipedia {
  public endpoint = 'http://ja.wikipedia.org/w/api.php?callback=?';

  public getText(title: string): JQueryPromise<(string)=>void> {
    console.debug('getting from Wikipadia the text of ' + title);
    return jQuery.getJSON(this.endpoint, {
        action: 'query',
        format: 'json',
        prop: 'revisions',
        rvprop: 'content',
        titles: title,
        redirects: true
    }).then(function(data) {
      var pages = data['query']['pages'];
      for (var k in pages) {
        console.assert(k in pages);
        var page = pages[k];

        console.assert('revisions' in page);
        var revs = page['revisions'];

        console.assert(0 in revs);
        var rev = revs[0];

        console.assert('*' in rev);
        var text = rev['*'];

        console.debug('retrieved the text of ' + title);
        return text;
      }
    });
  }
}
/*
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
*/
