
/* ////////////////////////////////////////////////////////////////////////////
 *
 *	IMPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/*
 *	DEPENDENCIES
 */
import { Parent } from "@utkusarioglu/mixer";
import { Resolution, t_ri, t_ri_any } from "@utkusarioglu/resolver";
import {
    M_Controller, i_talk, i_response,
    //M_ControllerEvents
} from "@utkusarioglu/controller";

/*
 *	MIXINS
 */
import { M_Library } from "./m_library";

/*
 *	CONSTANTS
 */
import { C_Library } from "../Common/c_library";

/*
 *	DATATYPES
 */
import {
    t_archive,
    e_archiveDepth,
    i_archiveFile,
    t_archiveIsle,
    t_archiveTab,
    t_archiveRack,
    t_archiveShelf,
    t_archiveBox,
    t_archiveFolder,
    i_fileDescriptor,
    t_archiveTabWrapperFunc,
    t_libraryBookName
} from "../Common/t_library";
import { t_namespace } from "@utkusarioglu/namespace";







/* ////////////////////////////////////////////////////////////////////////////
 *
 *	EXPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/**
 * Interface for M_Archive
 * */
export interface M_Archive extends
    M_Controller,
    // M_ControllerEvents, // Doesn't look like this is necessary
    M_Library
{ }



/**
 * Provides Archive and Library manaagement functionality to classes
 * 
 * @requires
 * M_Library for add_Books()
 * M_Controller for sending archives
 * 
 * @remarks
 * Component: Library
 * */
export abstract class M_Archive extends Parent().with(
    M_Library,
    M_Controller
) {


    private _tab_wrapping_function!: t_archiveTabWrapperFunc;

/*
 * ======================================================== Boundary 1 =========
 *
 *	DECLARATION
 *
 * =============================================================================
 */

/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE ARCHIVE
 */

    /**
     * Infers archive from transmission and calls add_Archive for the
     * processing of the archive add
     * 
     * @param transmission
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected add_Archive_FromResolutionInstruction(
        resolution_instruction: t_ri_any,
        load_order: Array<string> = [],
    ): this {

        const args = Resolution.extract_Arguments(resolution_instruction, 0);

        const sender: t_namespace = args[0];
        const archive: t_archive = args[1];

        this.add_Archive(archive, load_order);
        this.announce_LibraryAdded(sender);

        return this;
    }

    /**
     * Extracts the [[t_archive]] content from [[t_transmission]]
     * 
     * @param transmission
     *
     * @remarks
     * Class: Native
     * Module: Native
     * */
    protected extract_Archive_FromTransmission(
        transmission: i_response<t_archive>
    ): t_archive {

        // TODO type here is fudged. the real type is t_fileContent from Storage
        //const transmission_content: t_fileContent[] = transmission.Content;
        const transmission_content: any[] = transmission.Content;

        return transmission_content.map((file_content) => {
            return file_content.Content;
        });
    }

    /**
     * Calls add_Cabinets for each i_cabinet within the archive
     * 
     * @param archive
     * @param load_order defines order of books to be loaded
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected add_Archive(
        archive: t_archive,
        load_order: Array<string> = [],
    ): this {

        if (archive.length === 0) {
            console.warn("Empty Archive");
        } else {

            const isle: t_archiveIsle = archive;
            const rack: t_archiveRack = isle;
            const shelf: t_archiveShelf = rack;
            const box: t_archiveBox = shelf;
            const folder: t_archiveFolder = box;

            if (load_order.length > 0) {
                load_order.forEach((book_name) => {
                    folder.forEach((file) => {
                        file.sniff("DESCRIPTION.BOOK", undefined,
                            (file_book_name) => {
                                if (file_book_name === book_name) {
                                    this.add_File(file);
                                }
                            }
                        )
                    });
                });
            } else {
                folder.forEach((file: i_archiveFile) => {
                    this.add_File(file);
                });
            }



        }
        return this;
    }




/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE FILE
 */

    /**
     * Calls add_Tab for each but DESCRIPTION tab of the file.
     * Attaches DESCRIPTION as an argument to the calls
     * 
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected add_File(file: i_archiveFile): this {

        file.sniff(["DESCRIPTION"],
            () => {
                throw new Error(C_Library.E_AbsentFileDescriptor);
            },
            (description: i_fileDescriptor) => {

                delete file.DESCRIPTION;

                if (file !== undefined || file !== null) {
                    Object.entries(file as i_archiveFile)
                        .forEach(([tab_name, tab]) => {

                            this.add_Tab(description, tab)

                        });
                }
            }
        )

        return this;

    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE TAB
 */

    /**
     * 
     * @param book
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected add_Tab(
        description: i_fileDescriptor,
        tab: t_archiveTab
    ): this {

        if (tab !== undefined) {
            Object.entries(tab as t_archiveTab)
                .forEach(([chapter_name, chapter_content]) => {

                    const book_name: t_libraryBookName =
                        description.BOOK;

                    this
                        .get_Book(book_name)
                        .add_Chapter(chapter_name, this.get_TabWrapper(
                            book_name,
                            chapter_content,
                            chapter_name,
                        ))

                });
        }

        return this;
    }



/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE POTENCY
 */

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Archive_AtDepth(depth: e_archiveDepth): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Books(): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Chapters(): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Sections(): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Pages(): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected disable_Lines(): this {

        return this;
    }

    /**
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     * */
    protected enable_Archive_AtDepth(): this {

        return this;
    }





/* ---------------------------------------------------------- Use Case ---------
 *	HANDLE TAB WRAPPING
 */

    /**
     * Returns the tab wrapping function for the specified book name
     * Returns an identity function if no tab wrapper is specified for the book
     * 
     * @param book_name
     * @param chapter_content
     * 
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected get_TabWrapper(
        book_name: t_libraryBookName,
        chapter_content: t_archiveTab,
        chapter_name: string,
    ): any {

        return this.sniff(["_tab_wrapping_function", book_name],
            () => chapter_content,
            (func: t_archiveTabWrapperFunc) => {
                return func(chapter_content, chapter_name);
            } 
        )
    }

    /**
     * Sets the specified wrapping function for the specified book names
     * 
     * @param book_names
     * @param tab_wrapping_function
     * 
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected set_TabWrappers(
        book_names: t_libraryBookName[],
        tab_wrapping_function: t_archiveTabWrapperFunc
    ): this {

        book_names.forEach((book_name) => {
            this.pave(["_tab_wrapping_function", book_name], undefined,
                () => {
                    return tab_wrapping_function;
                }
            )
        });

        return this;
    }

}
