import { M_Namespace, t_namespace } from "@utkusarioglu/namespace";
import { t_libraryContent, i_libraryBook } from "./t_library";
export interface Book extends M_Namespace {
}
declare const Book_base: any;
export declare class Book extends Book_base {
    private _book;
    readonly RESOLUTION_RULES: any;
    constructor(namespace: t_namespace);
    add_Chapter(item_name: string, item_data: any, per_item_call?: (item: any) => any): this;
    get_Chapter(item_name: string): any;
    has_Chapter(item_name: string): boolean;
    get_AllChapters(): i_libraryBook;
    get_AllChapterNames(): string[];
    add_BookContent(library_content: any, per_item_call?: (item: any) => any): this;
    add_Books(library_set: t_libraryContent, per_item_call?: (item: any) => any): this;
}
export {};
