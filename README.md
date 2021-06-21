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
For more information on using SoupJS, check out the [documentation](https://jianmin-chen.github.io/soupjs-docs), or keep reading.

## Under the Hood
To use SoupJS, it might be useful to find out how it works under the hood. Basically, you start by passing the URL of the website you want to scrape to `scrape()`. You can also pass in a file by adding an extra parameter to the function, discussed below.

Depending on whether you're getting an online file or a local file, SoupJS will either use JavaScript's `fetch` API(provided by the filler library `node-fetch`) or Node's `fs`(i.e., filesystem) module to read the file.

Once it does that, the function will create a new `Soup` object for the contents of the file. This object basically uses the contents of the file to create a new, virtual Document Object Model that you can search through.

To search through the file, `Soup` provides two methods. The first method finds the first occurrence of a HTML element matching a specific CSS selector, and the latter method finds all occurrences of elements that match a CSS selector.

When these element(s) are found, a `Tag` object is created for each one of them. The `Tag` class provides you with information about the element, in a simplified way. Like the `Soup` class, it also provides two methods for searching, but within the scope of the object.

## `scrape()`
```javascript
Soup scrape(string location, string filetype="url")
```
Main function provided. `scrape()` is asynchronous, and takes in two parameters: `location`, or the location of the file, and `filetype`, which represents where the file is coming from.

The location can either be a URL(*https://...*), or the path of a local file(*./file.html*).

By default, the second parameter is "url", in which case the location is a URL. However, if you would like to scrape a local file, you need to pass in "file".

## `Soup`
```javascript
Soup(string content)
```
The `Soup` class takes a string `content` and creates a DOM based off of it. It has the following methods:
```javascript
Tag find(string selector)
array findAll(string selector, int limit=null)
```
Both of them take a parameter `selector`, which represents the CSS selector being used to filter the document. `findAll()`, however, takes an extra optional parameter `limit` which represents the maximum number of elements to be returned. If the number of elements matching the selector is larger than `limit`, the elements returned will be capped at `limit`. Otherwise, all elements will be returned. By default, this is set to `null` so all elements are returned - *for large files, using `limit` is suggested so that overflow errors don't occur*.

This class also has a couple of extra properties that can be used.
```javascript
string htmlContent
object document
string text
```
These should be generally self-explanatory. `htmlContent` is the HTML of `content`, and `text` is the text of `content`. **`document` stores the actual virtual DOM, meaning you can directly access it if `find()` or `findAll()` can't be used for your purposes.**

## `Tag`
```javascript
Tag(Element element)
```
The `Tag` class takes a DOM element, normally passed to it by the `Soup` class, and converts it to a easier to read and understand format. Once a `Tag` object is created, it will provide some useful properties:
```javascript
string tag
string text
object attrs
string htmlContent
object document
```
`tag` provides the tag name of the element(e.g., "p" for paragraph tags). `text` provides the inner text of the element, while `htmlContent` provides the inner HTML of the element.

`attrs` contains all the attributes of the element, and is a object, or dictonary, with a key-and-value structure. For multi-valued attributes like classes, the `Tag` class will automatically split up the values into a array.

Finally, `document` stores a virtual DOM, within the scope of the element. **You can access it just like you can with the `document` property in the `Soup` class, if the methods described below can't be used for your purposes.**

Like the `Soup` class, `Tag` also provides two methods for filtering elements.
```javascript
string getAttr(string attr)
Tag find(string selector)
array findAll(string selector, int limit=null)
```
However, it also provides a extra method, `getAttr()`. This method takes the name of an attribute and returns what the element has for it. If the element doesn't have the provided attribute, it will return `undefined`.


## Contributing
Bug reports and pull requests are welcome on GitHub at [https://github.com/jianmin-chen/soupjs](https://github.com/jianmin-chen/soupjs). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License
This library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
