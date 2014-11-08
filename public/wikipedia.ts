/// <reference path="typings/jquery/jquery.d.ts" />
/* tslint:disable:no-string-literal */
class Wikipedia {
  public endpoint = "http://ja.wikipedia.org/w/api.php?callback=?";

  public getText(title: string): JQueryPromise<string> {
    console.debug("getting from Wikipadia the text of " + title);
    return jQuery.getJSON(this.endpoint, {
        action: "query",
        format: "json",
        prop: "revisions",
        rvprop: "content",
        titles: title,
        redirects: true
    }).then(function(data: IWpResult): JQueryPromise<string> {
      console.assert("query" in data);
      var query = data["query"];

      console.assert("pages" in query);
      var pages = query["pages"];
      for (var k in pages) {
        if (!pages.hasOwnProperty(k)) {
          continue;
        }

        console.assert(k in pages);
        var page = pages[k];

        if ( ! ("revisions" in page)) {
          console.warn("cannot find the text of " + title);
          return $.Deferred().reject("");
        }
        var revs = page["revisions"];

        console.assert(0 in revs);
        var rev = revs[0];

        console.assert("*" in rev);
        var text = rev["*"];

        console.debug("retrieved the text of " + title);
        return $.Deferred().resolve(text).promise();
      }
    });
  }

  public getBacklinks(title: string): JQueryPromise<IWpBacklink[]> {
    console.debug("getting from Wikipadia the backlinks of " + title);
    return jQuery.getJSON(this.endpoint, {
      action: "query",
      format: "json",
      list: "backlinks",
      bltitle: title,
      bllimit: 500
    }).then(function(data: IWpResult): JQueryPromise<IWpBacklink[]> {
      console.assert("query" in data);
      var query = data["query"];

      console.assert("backlinks" in query);
      var backlinks = query["backlinks"];

      console.debug("retrieved the backlinks of " + title);
      return $.Deferred().resolve(backlinks).promise();
    });
  }
}

interface IWpResult {
  query: IWpQuery;
}

interface IWpQuery {
  pages?: {[n: string]: IWpPage};
  backlinks: IWpBacklink[];
}

interface IWpPage {
  revisions: IWpRevision[];
}

interface IWpRevision {
  "*": string;
}

interface IWpBacklink {
  pageid: number;
  ns: number;
  title: string;
}
