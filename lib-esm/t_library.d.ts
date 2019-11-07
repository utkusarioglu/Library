import { i_map, t_identityFunc } from "@utkusarioglu/starel-globals";
export declare type t_libraryContent = any;
export declare type t_archive = Array<t_archiveIsle | i_archiveFile>;
export declare type t_archiveIsle = Array<t_archiveRack | i_archiveFile>;
export declare type t_archiveRack = Array<t_archiveShelf | i_archiveFile>;
export declare type t_archiveShelf = Array<t_archiveBox | i_archiveFile>;
export declare type t_archiveBox = Array<t_archiveFolder | i_archiveFile>;
export declare type t_archiveFolder = Array<i_archiveFile>;
export interface i_archiveFile {
    DESCRIPTION: i_fileDescriptor;
    [shelf_name: string]: t_archiveTab;
}
export declare type t_archiveTab = i_map<any>;
export interface i_libraryBook {
    [chapter_name: string]: any;
}
export declare type t_libraryChapter = t_libraryDeepLevel;
export declare type t_librarySection = t_libraryDeepLevel;
export declare type t_libraryPage = t_libraryDeepLevel;
export declare type t_libraryLine = t_libraryDeepLevel;
export declare type t_libraryDeepLevel = {
    [chapter_name: string]: any;
} | Array<any> | string | number;
export declare type t_libraryBookName = string;
export declare type t_archiveShelfName = string;
export interface i_fileDescriptor {
    BOOK: string;
}
export declare type t_libraryCollection = t_archiveTab;
export declare type t_resourceCollectionRecipe = i_map<string>;
export declare enum e_archiveDepth {
    Archive = 0,
    Isle = 1,
    Rack = 2,
    Shelf = 3,
    Box = 4,
    Folder = 5,
    File = 6,
    Tab = 7,
    Package = 11
}
export declare enum e_libraryDepth {
    Library = 8,
    Book = 10,
    Chapter = 11,
    Section = 12,
    Page = 13,
    Line = 14
}
export declare enum e_resourceDepth {
    Collection = 9,
    Source = 10,
    Reference = 11
}
export declare type t_archiveTabWrapperFunc = t_identityFunc<t_archiveTab>;
