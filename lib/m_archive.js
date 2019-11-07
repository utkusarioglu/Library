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
var resolver_1 = require("@utkusarioglu/resolver");
var controller_1 = require("@utkusarioglu/controller");
var m_library_1 = require("./m_library");
var c_library_1 = require("./c_library");
var M_Archive = (function (_super) {
    __extends(M_Archive, _super);
    function M_Archive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    M_Archive.prototype.add_Archive_FromResolutionInstruction = function (resolution_instruction) {
        var arg_pool = resolver_1.Resolution.extract_ArgumentPool_fromResolutionInstruction(resolution_instruction);
        var sender = arg_pool[0][0];
        var archive = arg_pool[0][1];
        this.add_Archive(archive);
        this.announce_LibraryAdded(sender);
        return this;
    };
    M_Archive.prototype.extract_Archive_FromTransmission = function (transmission) {
        var transmission_content = transmission.Content;
        return transmission_content.map(function (file_content) {
            return file_content.Content;
        });
    };
    M_Archive.prototype.add_Archive = function (archive) {
        var _this = this;
        if (archive.length === 0) {
            console.warn("Empty Archive");
        }
        else {
            var isle = archive;
            var rack = isle;
            var shelf = rack;
            var box = shelf;
            var folder = box;
            folder.forEach(function (file) {
                _this.add_File(file);
            });
        }
        return this;
    };
    M_Archive.prototype.add_File = function (file) {
        var _this = this;
        file.sniff(["DESCRIPTION"], function () {
            throw new Error(c_library_1.C_Library.E_AbsentFileDescriptor);
        }, function (description) {
            delete file.DESCRIPTION;
            Object.entries(file).forEach(function (_a) {
                var tab_name = _a[0], tab = _a[1];
                _this.add_Tab(description, tab);
            });
        });
        return this;
    };
    M_Archive.prototype.add_Tab = function (description, tab) {
        var _this = this;
        Object.entries(tab)
            .forEach(function (_a) {
            var leaf_name = _a[0], leaf = _a[1];
            var book_name = description.BOOK.toProperCase();
            _this
                .get_Book(book_name)
                .add_Chapter(leaf_name, _this.get_TabWrapper(book_name, leaf));
        });
        return this;
    };
    M_Archive.prototype.disable_Archive_AtDepth = function (depth) {
        return this;
    };
    M_Archive.prototype.disable_Books = function () {
        return this;
    };
    M_Archive.prototype.disable_Chapters = function () {
        return this;
    };
    M_Archive.prototype.disable_Sections = function () {
        return this;
    };
    M_Archive.prototype.disable_Pages = function () {
        return this;
    };
    M_Archive.prototype.disable_Lines = function () {
        return this;
    };
    M_Archive.prototype.enable_Archive_AtDepth = function () {
        return this;
    };
    M_Archive.prototype.get_TabWrapper = function (book_name, tab_input) {
        return this.sniff(["_tab_wrapping_function", book_name], function () { return tab_input; }, function (func) {
            return func(tab_input);
        });
    };
    M_Archive.prototype.set_TabWrappers = function (book_names, tab_wrapping_function) {
        var _this = this;
        book_names.forEach(function (book_name) {
            _this.pave(["_tab_wrapping_function", book_name], undefined, function () {
                return tab_wrapping_function;
            });
        });
        return this;
    };
    return M_Archive;
}(mixer_1.Parent().with(m_library_1.M_Library, controller_1.M_Controller)));
exports.M_Archive = M_Archive;
//# sourceMappingURL=m_archive.js.map