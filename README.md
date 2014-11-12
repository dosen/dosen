dosen
=====
[![wercker status](https://app.wercker.com/status/21f29906f512f3d2f4e2feb3d39491fd/m "wercker status")](https://app.wercker.com/project/bykey/21f29906f512f3d2f4e2feb3d39491fd)
[![Dependency Status](https://david-dm.org/dosen/dosen.svg?style=flat)](https://david-dm.org/dosen/dosen)
[![devDependency Status](https://david-dm.org/dosen/dosen/dev-status.svg?style=flat)](https://david-dm.org/dosen/dosen#info=devDependencies)

The game comparing metrics of a Wikipedia page, largely depending on the client
side programing.

Prerequisites
-------------
- [nodejs](http://nodejs.org)

Download
--------
```
git clone https://github.com/dosen/dosen.git
```

Build
-----
- install requirements
```
npm install
```

- build assets (including CSS and Typescript)
```
npm run compile
```

- run server (typically on [http://localhost:9000](http://localhost:9000))
```
npm start
```

Advanced
--------
- continuous developing
```
npm run watch
```

- linting typescript
```
npm install gulp -g
gulp tslint
```
