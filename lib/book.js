"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mixer_1 = require("@utkusarioglu/mixer");
const namespace_1 = require("@utkusarioglu/namespace");
class Book extends mixer_1.Parent().with(namespace_1.M_Namespace) {
    constructor(namespace) {
        super();
        this._book = {};
        this.RESOLUTION_RULES = {
            During: [
                undefined,
                "get_Chapter()",
            ],
        };
        this.set_GlobalNamespace(namespace);
    }
    add_Chapter(item_name, item_data, per_item_call = (item) => item) {
        this._book[item_name] = per_item_call(item_data);
        return this;
    }
    get_Chapter(item_name) {
        if (this.has_Chapter(item_name)) {
            return this._book[item_name];
        }
        else {
            return null;
        }
    }
    has_Chapter(item_name) {
        return this._book.hasOwnProperty(item_name);
    }
    get_AllChapters() {
        return this._book;
    }
    get_AllChapterNames() {
        return Object.keys(this._book);
    }
    add_BookContent(library_content, per_item_call = (item) => item) {
        Object.entries(library_content).forEach(([key, value]) => {
            this.add_Chapter(key, value, per_item_call);
        });
        return this;
    }
    add_Books(library_set, per_item_call = (item) => item) {
        Object.values(library_set).forEach((library_item) => {
            this.add_BookContent(library_item, per_item_call);
        });
        return this;
    }
}
exports.Book = Book;
//# sourceMappingURL=book.js.map