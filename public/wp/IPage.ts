/// <reference path="IRevision.ts" />
/// <reference path="IImageInfo.ts" />
/// <reference path="IUser.ts" />
/// <reference path="ILanglink.ts" />
module wp {
  export interface IPage {
    title?: string;
    revisions?: IRevision[];
    imageinfo?: IImageInfo[];
    contributors?: IUser[];
    langlinks?: ILanglink[];
  }
}
