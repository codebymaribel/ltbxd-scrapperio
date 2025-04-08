# Letterboxd Scrapper

A scrapper for Letterboxd public lists.

### :pushpin: Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Functions](#functions)
- [Types](#types)
- [Collaboration](#collaboration)
- [License](#license)

---

### :rocket: Features

- Get watchlist films based on username.

---

### :package: Installation

```bash
npm install ltbxdscrapper
```

### :wrench: Functions

Here's the list of available functions in this package:

#### getWatchlist

```javascript
// Require letterboxd scrapper library
import {getWatchlist} from 'ltbxdscrapper';

const userwatchlist = await getWatchlist({
  username: "username", // Required
  options: {
    poster: true,
    IMDBID: true,
  }, // Optional
});

// userwatchlist returns:

{
    status: 'OK',
    data: [
        {
            id: '50602',
            title: 'Persepolis',
            slug: 'persepolis',
            poster: 'https://a.ltrbxd.com/resized/sm/upload/28/um/1t/jq/dYvyF1RlNokAd1N7Nek0vDpYsV6-0-125-0-187-crop.jpg?v=fc5d71c744'
        }
    ],
    errorMessage: null,
}
```

:warning: **Note:** Posters and IMDBID are true by default. If you don't wish these values then use the [Options Object](https://github.com/codebymaribel/ltbxd-scrapperio/blob/develop/types/index.d.ts) in the query.

#### getUserLists

```javascript
// Require letterboxd scrapper library
import {getUserLists} from 'ltbxdscrapper';

const userLists = await getUserLists({username: 'maribelbhf',
options:{
    posters: true,
    summary: true,
    amount: true,
    max: 5
}});

// userLists returns:

{
  status: 'OK',
  data: [
    {
      title: 'Movie list 1',
      summary: 'This is the summary',
      amount: '27 films',
      url: 'https://letterboxd.com/username/list/peliculitas-para-asustarnos-de-manera-uteana/',
      posters: [    'https://a.ltrbxd.com/resized/sm/upload/um/45/8m/or/t0c3qxcKSaO4iBYVAzIeyPbC8I1-0-70-0-105-crop.jpg?v=72ab2e2ec7',
                  'https://a.ltrbxd.com/resized/film-poster/7/7/4/4/5/4/774454-crush-0-70-0-105-crop.jpg?v=fc5422620b',
                  'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-70-0-105-crop.jpg?v=053670ff84',
                  'https://a.ltrbxd.com/resized/sm/upload/jn/np/vd/8h/qxUKbHFaqC0PYKITLERnt5fmuBg-0-70-0-105-crop.jpg?v=47f413d784',
                  'https://a.ltrbxd.com/resized/film-poster/5/1/9/7/0/51970-before-sunset-0-70-0-105-crop.jpg?v=059bc2bbc0',
               ]
    },
    {
      title: 'Movie list 2',
      summary: null,
      amount: '80 films',
      url: 'https://letterboxd.com/username/list/si-me-pides-que-elija-una-pelicula-seria/',
      posters: [    'https://a.ltrbxd.com/resized/sm/upload/um/45/8m/or/t0c3qxcKSaO4iBYVAzIeyPbC8I1-0-70-0-105-crop.jpg?v=72ab2e2ec7',
                  'https://a.ltrbxd.com/resized/film-poster/7/7/4/4/5/4/774454-crush-0-70-0-105-crop.jpg?v=fc5422620b',
                  'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-70-0-105-crop.jpg?v=053670ff84',
                  'https://a.ltrbxd.com/resized/sm/upload/jn/np/vd/8h/qxUKbHFaqC0PYKITLERnt5fmuBg-0-70-0-105-crop.jpg?v=47f413d784',
                  'https://a.ltrbxd.com/resized/film-poster/5/1/9/7/0/51970-before-sunset-0-70-0-105-crop.jpg?v=059bc2bbc0',
               ]
    },
    {
      title: 'Movie list 3',
      summary: null,
      amount: '2 films',
      url: 'https://letterboxd.com/username/list/country-stories/',
      posters: [    'https://a.ltrbxd.com/resized/sm/upload/um/45/8m/or/t0c3qxcKSaO4iBYVAzIeyPbC8I1-0-70-0-105-crop.jpg?v=72ab2e2ec7',
                  'https://a.ltrbxd.com/resized/film-poster/7/7/4/4/5/4/774454-crush-0-70-0-105-crop.jpg?v=fc5422620b',
                  'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-70-0-105-crop.jpg?v=053670ff84',
                  'https://a.ltrbxd.com/resized/sm/upload/jn/np/vd/8h/qxUKbHFaqC0PYKITLERnt5fmuBg-0-70-0-105-crop.jpg?v=47f413d784',
                  'https://a.ltrbxd.com/resized/film-poster/5/1/9/7/0/51970-before-sunset-0-70-0-105-crop.jpg?v=059bc2bbc0',
               ]
    }
  ],
  errorMessage: null
}
```

:warning: **Note:** Posters, Summary and Amount are true by default. If you don't wish these values then use the [Options Object](https://github.com/codebymaribel/ltbxd-scrapperio/blob/develop/types/index.d.ts) in the query.

### :memo: Types

For more info about the types please refer to the [types ](./src/types)

### 🤝 Contributing

> todo

### 🎖 License

> todo

---

Made with ❤ by [CodebyMaribel](https://github.com/codebymaribel)

---
