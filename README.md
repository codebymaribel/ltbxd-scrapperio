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


### :memo: Types

For more info about the types please refer to the [types ](./src/types)



### 🤝 Contributing

> todo



### 🎖 License

> todo

---

Made with ❤ by [CodebyMaribel](https://github.com/codebymaribel)

---
