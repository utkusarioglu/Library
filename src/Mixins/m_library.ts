
/* ////////////////////////////////////////////////////////////////////////////
 *
 *	IMPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/*
 *	DEPENDENCIES
 */
import { Parent } from "@utkusarioglu/mixer";
import { M_Namespace } from "@utkusarioglu/namespace";
import { M_State } from "@utkusarioglu/state"; 

/*
 *	LOCALS
 */
import { Book } from "../Book/book";

/*
 *	CONSTANTS
 */
import { C_Library } from "../Common/c_library";

/*
 *	DATATYPES
 */
import {
    t_libraryBookName,
    i_libraryBook,
    t_libraryCollection,
    t_resourceCollectionRecipe
} from "../Common/t_library";






/* ////////////////////////////////////////////////////////////////////////////
 *
 *	EXPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/**
 * Interface for Library
 * */
export interface M_Library extends
    M_Namespace,
    M_State
{ }

/**
 * Provides the functionality for handling multiple books and their curration
 * 
 * @requires 
 * M_State if the initializer isn't provided with a library base
 * 
 * @remarks
 * Component: Library
 * */
export abstract class M_Library extends M_Namespace {

    /** The root object where the Books will be added */
    private _library_base: any;
    private _book_names: t_libraryBookName[] = [];



/*
 * ======================================================== Boundary 1 =========
 *
 *	DECLARATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE LIBRARY
 */

    /**
     * Sets library base and initializes 
     * the books with the given names
     * 
     * @param library_base
     * @param book_names
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected initialize_Library(
        book_names: t_libraryBookName[],
        library_base: any = this.get_State().get_Vars(),
    ): this {
        this.set_LibraryBase(library_base);
        this.initialize_Books(book_names);
        return this;
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE LIBRARY BASE
 */

    /**
     *  Sets the location where the books are added
     * 
     * @remarks
     * Class: M_Library
     * Component: Library
     * */
    protected set_LibraryBase(base: any): this {
        this._library_base = base;
        return this;
    }

    /**
     * Returns the target that Library uses as its base
     * May contain items other than books
     * 
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected get_LibraryBase(): Object {
        if (!this._library_base) {
            throw new Error(C_Library.E_LibraryBaseBeforeSet);
        }
        return this._library_base;
    }


/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE BOOK NAMES
 */

    /**
     * Returns names of all the books that are being carried
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     * */
    protected get_AllBookNames(): t_libraryBookName[] {
        return this._book_names;
    }

    /**
     * Pushes the specified book name to the book names list
     * 
     * @param book_name
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected add_BookName(book_name: t_libraryBookName): this {

        if (!this._book_names) {
            this._book_names = [];
        }

        this._book_names.push(book_name);

        return this;
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE BOOK
 */

    /**
     * Creates a book instance and places it within the library
     * 
     * @param book_name
     * @param book_content
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected add_Book(book_name: t_libraryBookName, book_content?: i_libraryBook): this {

        this.get_LibraryBase().pave(
            book_name,
            () => {
                throw new Error(C_Library.E_BookNameTaken)
            },
            () => {

                const new_book = new Book(`${this.get_GlobalNamespace()}/Library/${book_name}`);
                this.add_BookName(book_name);

                if (book_content !== undefined) {
                    new_book.add_BookContent(book_content)
                }

                return new_book;
            }
        )

        return this;
    }

    /**
     * Returns the book specified 
     * 
     * @param book_name
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected get_Book(book_name: t_libraryBookName): Book {
        return this.get_LibraryBase().sniff(
            book_name,
            () => {
                throw new Error(
                    C_Library.E_BookBeforeDeclaration.subs(book_name)
                );
            },
            (book) => {
                return book
            }
        )
    }


/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE BOOKS
 */

    /**
     * Initializes the books with the specified names
     * 
     * @param book_names
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected initialize_Books(book_names: t_libraryBookName[]): this {
        book_names.forEach((book_name) => {
            this.add_Book(book_name);
        });
        return this;
    }



/*
 * ======================================================== Boundary 1 =========
 *
 *	IMPLEMENTATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	CURRATE COLLECTION
 */

    /**
     * Returns the specified books
     * 
     * @param collection_specifications array input: returns the books 
     * with the specified name. Object input: returns given keys as the
     * alias for the book names; which are expected as values
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     */
    protected get_SomeBooks(
        collection_specifications: Array<t_libraryBookName> | t_resourceCollectionRecipe
    ): t_libraryCollection {

        let collection: t_libraryCollection = {};

        if (Array.isArray(collection_specifications)) {

            collection_specifications.forEach((book_name: t_libraryBookName) => {
                collection[book_name] = this.get_Book(book_name);
            });

        } else if (collection_specifications.is_Object()) {

            Object.entries(collection_specifications).forEach(([alias, book_name]) => {
                collection[alias] = this.get_Book(book_name);
            });

        } else {
            throw new Error(C_Library.E_FaultyCollectionSpec);
        }

        return collection;
    }

    /**
     * Get All the books registered in the library
     *
     * @remarks
     * Class: M_Library
     * Component: Library
     * */
    protected get_AllBooks(): t_libraryCollection {
        return this.get_SomeBooks(this.get_AllBookNames());
    }

}