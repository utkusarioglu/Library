import { Parent } from "@utkusarioglu/mixer";
import { C_Library } from "./c_library";
import { M_Namespace } from "@utkusarioglu/namespace";
import { Book } from "./book";
export class M_Library extends Parent().with(M_Namespace) {
    constructor() {
        super(...arguments);
        this._book_names = [];
    }
    initialize_Library(book_names, library_base) {
        if (library_base === undefined) {
            library_base = this.get_State().get_Vars();
        }
        this.set_LibraryBase(library_base);
        this.initialize_Books(book_names);
        return this;
    }
    set_LibraryBase(base) {
        this._library_base = base;
        return this;
    }
    get_LibraryBase() {
        if (!this._library_base) {
            throw new Error(C_Library.E_LibraryBaseBeforeSet);
        }
        return this._library_base;
    }
    get_AllBookNames() {
        return this._book_names;
    }
    add_BookName(book_name) {
        if (!this._book_names) {
            this._book_names = [];
        }
        this._book_names.push(book_name);
        return this;
    }
    add_Book(book_name, book_content) {
        this.get_LibraryBase().pave(book_name, () => {
            throw new Error(C_Library.E_BookNameTaken);
        }, () => {
            const new_book = new Book(`${this.get_GlobalNamespace()}/Library/${book_name}`);
            this.add_BookName(book_name);
            if (book_content !== undefined) {
                new_book.add_BookContent(book_content);
            }
            return new_book;
        });
        return this;
    }
    get_Book(book_name) {
        return this.get_LibraryBase().sniff(book_name, () => {
            throw new Error(C_Library.E_BookBeforeDeclaration);
        }, (book) => {
            return book;
        });
    }
    initialize_Books(book_names) {
        book_names.forEach((book_name) => {
            this.add_Book(book_name);
        });
        return this;
    }
    get_SomeBooks(collection_specifications) {
        let collection = {};
        if (Array.isArray(collection_specifications)) {
            collection_specifications.forEach((book_name) => {
                collection[book_name] = this.get_Book(book_name);
            });
        }
        else if (collection_specifications.is_Object()) {
            Object.entries(collection_specifications).forEach(([alias, book_name]) => {
                collection[alias] = this.get_Book(book_name);
            });
        }
        else {
            throw new Error(C_Library.E_FaultyCollectionSpec);
        }
        return collection;
    }
    get_AllBooks() {
        return this.get_SomeBooks(this.get_AllBookNames());
    }
}
//# sourceMappingURL=m_library.js.map