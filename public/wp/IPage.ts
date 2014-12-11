/// <reference path="IRevision.ts" />
/// <reference path="IImageInfo.ts" />
/// <reference path="IUser.ts" />
module wp {
  export interface IPage {
    title?: string;
    revisions?: IRevision[];
    imageinfo?: IImageInfo[];
    contributors?: IUser[];
  }
}
