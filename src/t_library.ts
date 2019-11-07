
/**
 * Alias for any denoting library content
 * */
export type t_libraryContent = any 





/*
 * ======================================================== Boundary 1 =========
 *
 *	LIBRARY HIERARCHY TYPES
 *
 * =============================================================================
 */

/**
 * Datatype that holds Module Archive, relabeling of
 * t_fileContent as the data comes from Storage
 * 
 * Container for: [[i_archiveFile]]
 * 
 * @remarks
 * Service: Library
 * */
export type t_archive = Array<t_archiveIsle | i_archiveFile>

/**
 * This datatype is non-addressable, provided only to 
 * reflect the underlying folderstructure of the module
 * Refer to Library documentation for details
 * 
 * Member of: [[t_archive]]
 * Container for: [[i_archiveFile]]
 * 
 * @remarks
 * Service: Library
 * */
export type t_archiveIsle = Array<t_archiveRack | i_archiveFile>;

/**
 * This datatype is non-addressable, provided only to
 * reflect the underlying folderstructure of the module
 * Refer to Library documentation for details
 *
 * Member of: [[t_archive]]
 * Container for: [[i_archiveFile]]
 *
 * @remarks
 * Service: Library
 * */
export type t_archiveRack = Array<t_archiveShelf | i_archiveFile>;

/**
 * This datatype is non-addressable, provided only to
 * reflect the underlying folderstructure of the module
 * Refer to Library documentation for details
 *
 * Member of: [[t_archive]]
 * Container for: [[i_archiveFile]]
 *
 * @remarks
 * Service: Library
 * */
export type t_archiveShelf = Array<t_archiveBox | i_archiveFile>;

/**
 * This datatype is non-addressable, provided only to
 * reflect the underlying folderstructure of the module
 * Refer to Library documentation for details
 *
 * Member of: [[t_archive]]
 * Container for: [[i_archiveFile]]
 *
 * @remarks
 * Service: Library
 * */
export type t_archiveBox = Array<t_archiveFolder | i_archiveFile>;

/**
 * This datatype is non-addressable, provided only to
 * reflect the underlying folderstructure of the module
 * Refer to Library documentation for details
 *
 * Member of: [[t_archive]]
 * Container for: [[i_archiveFile]]
 *
 * @remarks
 * Service: Library
 * */
export type t_archiveFolder = Array<i_archiveFile>; 


/**
 * Node representation of the data contained in a single
 * archive file
 * 
 * Member of [[t_archiveFolder]]
 * Container for [[t_archiveTab]] and [[i_fileDescriptor]]
 * 
 * @remarks
 * Service: Library
 * */
export interface i_archiveFile {
    DESCRIPTION: i_fileDescriptor,
    [shelf_name: string]: t_archiveTab
}

/**
 * Root objects of the archive files
 * Names of these objects will not be stored in the library
 * They are meant to help with human grouping of packages
 * 
 * Key: package_name
 * 
 * Member of [[t_archiveFile]]
 * container for [[t_package]]
 * 
 * @remarks
 * Component: Library
 * */
export type t_archiveTab = {
    [archive_tab_name: string]: any
}

/**
 * Datatype for internal book content
 * */
export interface i_libraryBook {
    [chapter_name: string]: any
}

/**
 * Denotes members of i_book
 * */
export type t_libraryChapter = t_libraryDeepLevel

/**
 * Denotes members of t_chapter
 * */
export type t_librarySection = t_libraryDeepLevel;

/**
 * Denotes members of t_section
 * */
export type t_libraryPage = t_libraryDeepLevel;

/**
 * Denotes members of t_page
 * */
export type t_libraryLine = t_libraryDeepLevel;

/**
 * Denotes members of t_line or itself
 * */
export type t_libraryDeepLevel = {
    [chapter_name: string]: any
} | Array<any> | string | number;



/*
 * ======================================================== Boundary 1 =========
 *
 *	DOCUMENTATION TYPES
 *
 * =============================================================================
 */

/**
 * Alias for denoting names of books
 * */
export type t_libraryBookName = string

/** 
 * Alias for denoting shelf names 
 * */
export type t_archiveShelfName = string

/**
 * Structure of the descriptor object that is expected to be present
 * in every archive file
 * */
export interface i_fileDescriptor {
    BOOK: string
}



/*
 * ======================================================== Boundary 1 =========
 *
 *	COLLECTION TYPES
 *
 * =============================================================================
 */

/**
 * Alias for denoting currated book collections
 * */
export type t_libraryCollection = t_archiveTab;

/**
 * Input type for get_SomeBooks where the keys define the alias that the book will have
 * and the value defines the book_name
 * Key: book alias
 * */
export type t_resourceCollectionRecipe = {
    [recipe_name: string]: string
}



/*
 * ======================================================== Boundary 1 =========
 *
 *	POTENCY TYPES
 *
 * =============================================================================
 */

/**
 * Specifies the depth from the archive perspective
 * */
export enum e_archiveDepth {
    Archive = 0,
    Isle = 1,
    Rack = 2,
    Shelf = 3,
    Box = 4,
    Folder = 5,
    File = 6,
    Tab = 7,
    Package = 11,
}

/**
 * Specifies depth from Library perspective
 * */
export enum e_libraryDepth {
    Library = 8,
    Book = 10,
    Chapter = 11,
    Section = 12,
    Page = 13,
    Line = 14,
}

/**
 * Specifies depth from Resource perspective
 * 
 * */
export enum e_resourceDepth {
    Collection = 9,
    Source = 10,
    Reference = 11,
}



/*
 * ======================================================== Boundary 1 =========
 *
 *	ARCHIVE TYPES
 *
 * =============================================================================
 */

/**
 * Identity function for [[t_archiveTab]]
 * */
export type t_archiveTabWrapperFunc = (unwrapped: t_archiveTab) => t_archiveTab
