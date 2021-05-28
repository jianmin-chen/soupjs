import fetch from "node-fetch";
import readFile from "fs";
import JSDOM from "jsdom";

const MULTI_VALUED_ATTRIBUTES = ["class", "rel", "rev", "accept-charset", "headers", "accesskey"];
let STRIP = (text) => text.replace(/[\n\r]+|[\s]{2,}/g, " ").trim();

class Tag {
    constructor(element) {
        this.tag = element.tagName.toLowerCase();
        this.text = STRIP(element.textContent) || STRIP(element.value);
        this.attrs = {};
        Array.from(element.attributes).forEach(attr => {
            if (MULTI_VALUED_ATTRIBUTES.includes(attr.nodeName)) {
                // Split multi-valued attributes into a array
                this.attrs[attr.nodeName] = attr.nodeValue.split(" ");
            } else {
                this.attrs[attr.nodeName] = attr.nodeValue;
            }
        });
        this.htmlContent = element.innerHTML;
        this.document = new JSDOM(element.innerHTML).window.document.documentElement;
    }

    getAttr(attr) {
        return this.attrs[attr];
    }

    find(selector) {
        const query = this.document.querySelector(selector);
        if (query) {
            // Return Tag object if selector is used on page
            return new Tag(query);
        }
        return null;
    }

    findAll(selector, limit=null) {
        let tags = [];
        let query = Array.from(this.document.querySelectorAll(selector));
        if (limit) {
            // Limit query elements by slicing
            query = query.slice(...limit);
        }
        query.forEach(element => tags.push(new Tag(element)));
        return tags;
    }
}

class Soup {
    constructor(content) {
        this.htmlContent = content;
        this.document = new JSDOM(content).window.document.documentElement;
        this.text = this.document.textContent;
    }

    find(selector) {
        const query = this.document.querySelector(selector);
        if (query) {
            // Return Tag object if selector is used on page
            return new Tag(query);
        }
        return null;
    }

    findAll(selector, limit=null) {
        let tags = [];
        let query = Array.from(this.document.querySelectorAll(selector));
        if (limit && query.length < limit) {
            // Limit query elements by slicing
            query = query.slice(...limit);
        }
        query.forEach(element => tags.push(new Tag(element)));
        return tags;
    }
}

const scrape = async (location, filetype="url") => {
    return new Promise((resolve, reject) => {
        filetype = filetype.toLowerCase();
        if (filetype == "url") {
            // User is trying to scrape data from URL
            fetch(location).then(res => res.text()).then(html => resolve(new Soup(html))).catch(err => reject(err));
        } else if (filetype == "file") {
            // User is trying to scrape data from file
            readFile(location, "utf8", (err, data) => {
                if (err) {
                    // Error reading file
                    reject(err);
                } else {
                    resolve(new Soup(data));
                }
            });
        } else {
            // filetype parameter is invalid
            reject(`Filetype parameter is invalid and should either be "url" or "file"`);
        }
    });
};

// Exports
module.exports = {
    Tag: Tag,
    Soup: Soup,
    scrape: scrape
};
