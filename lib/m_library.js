"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mixer_1 = require("@utkusarioglu/mixer");
var c_library_1 = require("./c_library");
var m_namespace_1 = require("@utkusarioglu/m_namespace");
var book_1 = require("./book");
var M_Library = (function (_super) {
    __extends(M_Library, _super);
    function M_Library() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._book_names = [];
        return _this;
    }
    M_Library.prototype.initialize_Library = function (book_names, library_base) {
        if (library_base === undefined) {
            library_base = this.get_State().get_Vars();
        }
        this.set_LibraryBase(library_base);
        this.initialize_Books(book_names);
        return this;
    };
    M_Library.prototype.set_LibraryBase = function (base) {
        this._library_base = base;
        return this;
    };
    M_Library.prototype.get_LibraryBase = function () {
        if (!this._library_base) {
            throw new Error(c_library_1.C_Library.E_LibraryBaseBeforeSet);
        }
        return this._library_base;
    };
    M_Library.prototype.get_AllBookNames = function () {
        return this._book_names;
    };
    M_Library.prototype.add_BookName = function (book_name) {
        if (!this._book_names) {
            this._book_names = [];
        }
        this._book_names.push(book_name);
        return this;
    };
    M_Library.prototype.add_Book = function (book_name, book_content) {
        var _this = this;
        this.get_LibraryBase().pave(book_name, function () {
            throw new Error(c_library_1.C_Library.E_BookNameTaken);
        }, function () {
            var new_book = new book_1.Book(_this.get_GlobalNamespace() + "/Library/" + book_name);
            _this.add_BookName(book_name);
            if (book_content !== undefined) {
                new_book.add_BookContent(book_content);
            }
            return new_book;
        });
        return this;
    };
    M_Library.prototype.get_Book = function (book_name) {
        return this.get_LibraryBase().sniff(book_name, function () {
            throw new Error(c_library_1.C_Library.E_BookBeforeDeclaration);
        }, function (book) {
            return book;
        });
    };
    M_Library.prototype.initialize_Books = function (book_names) {
        var _this = this;
        book_names.forEach(function (book_name) {
            _this.add_Book(book_name);
        });
        return this;
    };
    M_Library.prototype.get_SomeBooks = function (collection_specifications) {
        var _this = this;
        var collection = {};
        if (Array.isArray(collection_specifications)) {
            collection_specifications.forEach(function (book_name) {
                collection[book_name] = _this.get_Book(book_name);
            });
        }
        else if (collection_specifications.is_Object()) {
            Object.entries(collection_specifications).forEach(function (_a) {
                var alias = _a[0], book_name = _a[1];
                collection[alias] = _this.get_Book(book_name);
            });
        }
        else {
            throw new Error(c_library_1.C_Library.E_FaultyCollectionSpec);
        }
        return collection;
    };
    M_Library.prototype.get_AllBooks = function () {
        return this.get_SomeBooks(this.get_AllBookNames());
    };
    return M_Library;
}(mixer_1.Parent().with(m_namespace_1.M_Namespace)));
exports.M_Library = M_Library;
//# sourceMappingURL=m_library.js.map