dosen
=====
The game comparing metrics of a Wikipedia page, largely depending on the client
side programing.

Prerequisites
-------------
- [nodejs](http://nodejs.org)

Download
--------
```
git clone https://github.com/umireon/client-collab.git
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
npm run start
```
or simply open ```public/index.html```

Advanced
--------
```
npm install gulp bower tsd -g
gulp watch
```
