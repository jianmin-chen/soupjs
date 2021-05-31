# SoupJS
![version badge](https://img.shields.io/badge/version-1.0.0-brightgreen)
![js-dom version badge](https://img.shields.io/badge/js--dom-16.6.0-informational)
![node-fetch version badge](https://img.shields.io/badge/node--fetch-2.6.1-informational)

## About
SoupJS is a JavaScript library built for simple web scraping.

## Installation
To install using `npm`, run:
```
npm i soupjs-lib
```

## Usage
Here's a basic example of using SoupJS:
```javascript
const soupjs = require("soupjs-lib");
soupjs.scrape(url).then(res => {
    // Search for HTMl elements belonging to CSS selector
    let pTags = res.findAll("p");
    console.log(pTags);
    /*
        => [ Tag {
            tag: 'p',
            text: 'text',
            attrs: {'class': ['foo', 'bar', 'baz'], ...},
            htmlContent: 'some text',
            document: HTMLHtmlElement {}
        }, ...]
     */
}).catch(err => console.log(err));
```
For more information on using SoupJS, check out the [documentation](https://jianmin-chen.github.io/soupjs-docs).

## Contributing
Bug reports and pull requests are welcome on GitHub at [https://github.com/jianmin-chen/soupjs](https://github.com/jianmin-chen/soupjs). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License
This library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
