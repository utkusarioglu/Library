import { M_Namespace } from "@utkusarioglu/namespace";
import { Book } from "./book";
import { t_libraryBookName, i_libraryBook, t_libraryCollection, t_resourceCollectionRecipe } from "./t_library";
export interface M_Library extends M_Namespace {
}
declare const M_Library_base: any;
export declare abstract class M_Library extends M_Library_base {
    private _library_base;
    private _book_names;
    protected initialize_Library(book_names: t_libraryBookName[], library_base?: any): this;
    protected set_LibraryBase(base: any): this;
    protected get_LibraryBase(): Object;
    protected get_AllBookNames(): t_libraryBookName[];
    protected add_BookName(book_name: t_libraryBookName): this;
    protected add_Book(book_name: t_libraryBookName, book_content?: i_libraryBook): this;
    protected get_Book(book_name: t_libraryBookName): Book;
    protected initialize_Books(book_names: t_libraryBookName[]): this;
    protected get_SomeBooks(collection_specifications: Array<t_libraryBookName> | t_resourceCollectionRecipe): t_libraryCollection;
    protected get_AllBooks(): t_libraryCollection;
}
export {};
