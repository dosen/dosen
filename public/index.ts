/// <reference path="extractor.ts" />
/// <reference path="wikipedia.ts" />
var panes = document.getElementsByClassName("pane");
for (var i = 0; i < panes.length; i++) {
  var pane = <HTMLElement>panes[i];
  console.assert(pane !== undefined);
  (function(pane: HTMLElement): void {
    var submit = <HTMLInputElement>pane.querySelector("input[type=submit]");
    console.assert(submit != null);

    var search = <HTMLInputElement>pane.querySelector("input[type=text]");
    console.assert(search != null);

    submit.addEventListener("click", function(): void {
      var wp = new Wikipedia();
      wp.getText(search.value).done(function(text: string): void {
        var animal = Extractor.extract(text);

        var metric_1 = document.getElementById(pane.id + "__metric_1");
        console.assert(metric_1 != null);

        var title = <HTMLElement>metric_1.querySelector(".metric__title");
        title.textContent = "bodyLength";

        var value = <HTMLElement>metric_1.querySelector(".metric__value");
        value.textContent = animal.bodyLength.toString();

        var icon = <HTMLElement>metric_1.querySelector(".metric__icon");
        if (Math.random() > 0.5) {
          icon.classList.remove("metric__icon--down");
          icon.classList.add("metric__icon--up");
        } else {
          icon.classList.remove("metric__icon--up");
          icon.classList.add("metric__icon--down");
        }

        var metric_2 = document.getElementById(pane.id + "__metric_2");
        console.assert(metric_2 != null);

        var title2 = <HTMLElement>metric_2.querySelector(".metric__title");
        title2.textContent = "bodyWeight";

        var value2 = <HTMLElement>metric_2.querySelector(".metric__value");
        value2.textContent = animal.bodyWeight.toString();

        var icon2 = <HTMLElement>metric_2.querySelector(".metric__icon");
        if (Math.random() > 0.5) {
          icon2.classList.remove("metric__icon--down");
          icon2.classList.add("metric__icon--up");
        } else {
          icon2.classList.remove("metric__icon--up");
          icon2.classList.add("metric__icon--down");
        }
      });
      wp.getBacklinks(search.value).done(function(backlinks: IWpBacklink[]): void {
        var metric_3 = document.getElementById(pane.id + "__metric_3");
        console.assert(metric_3 != null);

        var title = <HTMLElement>metric_3.querySelector(".metric__title");
        title.textContent = "backlinks";

        var value = <HTMLElement>metric_3.querySelector(".metric__value");
        value.textContent = backlinks.length.toString();

        var icon = <HTMLElement>metric_3.querySelector(".metric__icon");
        if (Math.random() > 0.5) {
          icon.classList.remove("metric__icon--down");
          icon.classList.add("metric__icon--up");
        } else {
          icon.classList.remove("metric__icon--up");
          icon.classList.add("metric__icon--down");
        }
      });
    });
  })(pane);
}
