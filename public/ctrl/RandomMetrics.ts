module ctrl {
  "use strict";

  export class RandomMetrics {
    private table = [
      [
        { name: "BodyLength", weight: 1 },
        { name: "BodyWeight", weight: 1 }
      ],
      [
        { name: "ZoologicalNameLength", weight: 1 },
        { name: "FamilyNameLength", weight: 1 }
      ],
      [
        { name: "Backlinks", weight: 1 },
        { name: "Punctuations", weight: 1 },
        { name: "BitCount", weight: 1 }
      ]
    ];

    public select(index: number): string {
      var list = this.table[index];
      var whole = 0;
      for (var i = 0; i < list.length; i++) {
        whole += list[i].weight;
      }

      var rand = Math.random() * whole;
      var acc = 0;
      for (i = 0; i < list.length; i++) {
        var item = list[i];
        acc += item.weight;
        if (rand < acc) {
          return item.name;
        }
      }
    }

    public selectAll(): string[] {
      var names: string[] = [];
      for (var i = 0; i < this.table.length; i++) {
        names.push(this.select(i));
      }
      return names;
    }
  }
}
