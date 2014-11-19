dosen
=====
[![wercker status](https://app.wercker.com/status/21f29906f512f3d2f4e2feb3d39491fd/m "wercker status")](https://app.wercker.com/project/bykey/21f29906f512f3d2f4e2feb3d39491fd)
[![Dependency Status](https://david-dm.org/dosen/dosen.svg?style=flat)](https://david-dm.org/dosen/dosen)
[![devDependency Status](https://david-dm.org/dosen/dosen/dev-status.svg?style=flat)](https://david-dm.org/dosen/dosen#info=devDependencies)
[![endorse](https://api.coderwall.com/umireon/endorsecount.png)](https://coderwall.com/umireon)

[![Stories in Backlog](https://badge.waffle.io/dosen/dosen.png?label=ready&title=Backlog)](https://waffle.io/dosen/dosen)
[![Stories in Ready](https://badge.waffle.io/dosen/dosen.png?label=ready&title=Ready)](https://waffle.io/dosen/dosen)
[![Stories in In Progress](https://badge.waffle.io/dosen/dosen.png?label=ready&title=In%20Progress)](https://waffle.io/dosen/dosen)
[![Stories in Done](https://badge.waffle.io/dosen/dosen.png?label=ready&title=Done)](https://waffle.io/dosen/dosen)

[![Throughput Graph](https://graphs.waffle.io/dosen/dosen/throughput.svg)](https://waffle.io/dosen/dosen/metrics)

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
