
/* ////////////////////////////////////////////////////////////////////////////
 *
 *	IMPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/*
 *	DEPENDENCIES
 */
import { M_Namespace } from "@utkusarioglu/namespace";

/*
 *	DATATYPES
 */
import {
    t_libraryContent,
    i_libraryBook
} from "../Common/t_library";
import { t_namespace } from "@utkusarioglu/namespace";







/* ////////////////////////////////////////////////////////////////////////////
 *
 *	EXPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/** 
 * Interface for Book 
 * */
export interface Book extends
    M_Namespace
{ }

/**
 * Aggregates a type of data for the instantiating class
 * 
 * @remarks
 * Component: Library
 * */
export class Book extends M_Namespace {

/*
 * ======================================================== Boundary 1 =========
 *
 *	INSTANTIATION
 *
 * =============================================================================
 */
    /** Repository of the class */
    private _book: i_libraryBook = {};

    /** Provides Resolver for the rules to retrieve data from this class */
    public readonly RESOLUTION_RULES: any = {
        During: [
            undefined,
            "get_Chapter()",
        ], 
    };

    /**
     * Aggregates a type of data for the instantiating class
     * 
     * @param namespace
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    constructor(namespace: t_namespace) {
        super();
        this.set_GlobalNamespace(namespace)
    }



/*
 * ======================================================== Boundary 1 =========
 *
 *	IMPLEMENTATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE CHAPTER
 */

    /**
     * 
     * Adds a key, value pair to the library
     * 
     * @param item_name: key
     * @param item_data: value
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public add_Chapter(
        item_name: string,
        item_data: any,
        per_item_call: (item: any) => any = (item: any) => item,
    ): this {
        this._book[item_name] = per_item_call(item_data);
        return this;
    }

    /**
     * Adds an array of chapters to the book
     * 
     * @param chapters
     * @param per_item_call
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public add_Chapters(
        chapters: {[chapter_name: string]: any},
        per_item_call: (item: any) => any = (item: any) => item,
    ): this {
        Object.entries(chapters).forEach(([chapter_name, chapter_content]) => {
            this.add_Chapter(chapter_name, chapter_content, per_item_call);
        })
        return this;
    }

    /**
     * Returns the value associated with the given key
     * 
     * @param item_name key
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public get_Chapter(item_name: string): any {
        if (this.has_Chapter(item_name)) {
            return this._book[item_name];
        } else {
            //console.warn(`Undefined "${item_name}" has been called from ${this.get_GlobalNamespace()}`);
            return null; 
        }
    }

    /**
     * Checks whether the given key exists in the library
     * 
     * @param item_name key
     * 
     * @returns true if the key exists in the library
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public has_Chapter(item_name: string): boolean {
        return this._book.hasOwnProperty(item_name);
    }

    /**
     * Returns entire library items
     * 
     * @returns entire library
     *
     * @remarks
     * Class: Book
     * Component: Library
     * */
    public get_AllChapters() {
        return this._book;
    }

    /**
     * Returns the name of all Items in the library
     *
     * @remarks
     * Class: Book
     * Component: Library
     * */
    public get_AllChapterNames(): string[] {
        return Object.keys(this._book);
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE BOOK
 */

    /**
     * Adds an entire library content at once
     * 
     * @param library_content: entire library content as key,value pairs
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public add_BookContent(
        library_content: any,
        per_item_call: (item: any) => any = (item: any) => item,
    ): this {
        Object.entries(library_content).forEach(([key, value]) => {
            this.add_Chapter(key, value as object, per_item_call);
        });
        return this;
    }

    /**
     * Adds multiple libraries iteratively
     * 
     * @param library_set: multiple libraries as key, value pairs
     * @param per_item_call callback for each added item. Ex using Resolver class
     * to resolve the instructions
     *
     * @remarks
     * Class: Book
     * Component: Library
     */
    public add_Books(
        library_set: t_libraryContent,
        per_item_call: (item: any) => any = (item: any) => item,
    ): this {
        Object.values(library_set).forEach((library_item) => {
            this.add_BookContent(library_item, per_item_call); // key is ignored
        });
        return this;
    }
}
