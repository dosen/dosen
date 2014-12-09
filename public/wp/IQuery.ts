/// <reference path="IPages.ts" />
/// <reference path="IBacklink.ts" />
module wp {
  export interface IQuery {
    pages?: IPages;
    backlinks?: IBacklink[];
  }
}
