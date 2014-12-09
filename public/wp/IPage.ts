/// <reference path="IRevision.ts" />
/// <reference path="IImageInfo.ts" />
module wp {
  export interface IPage {
    title?: string;
    revisions?: IRevision[];
    imageinfo?: IImageInfo[];
  }
}
