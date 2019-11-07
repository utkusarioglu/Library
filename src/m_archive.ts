
/*
 *	COMPONENTS
 */
import { Parent } from "@utkusarioglu/mixer";
import { Resolution } from "@utkusarioglu/resolver";

/*
 *	MIXINS
 */
import { M_Controller, M_ControllerEvents } from "@utkusarioglu/controller";
import { M_Library } from "./m_library";
import { C_Library } from "./c_library";

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
} from "./t_library";
import {
    t_transmission
} from "@utkusarioglu/controller";
import {
    t_resolutionInstruction
} from "@utkusarioglu/resolver";
//import { t_fileContent } from "../../Kernel/Data/Access/Storage/t_storage";
import { t_namespace } from "@utkusarioglu/namespace";
import { i_map } from "@utkusarioglu/starel-globals";

/**
 * Interface for M_Librarian
 * */
export interface M_Archive extends
    M_Controller,
    M_ControllerEvents,
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
        resolution_instruction: t_resolutionInstruction
    ): this {

        const arg_pool = Resolution.extract_ArgumentPool_fromResolutionInstruction(
            resolution_instruction
        );
        const sender: t_namespace = arg_pool[0][0];
        const archive: t_archive = arg_pool[0][1];

        this.add_Archive(archive);
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
    protected extract_Archive_FromTransmission(transmission: t_transmission): t_archive {

        //const transmission_content: t_fileContent[] = transmission.Content;
        const transmission_content: i_map<any>[] = transmission.Content;

        return transmission_content.map((file_content) => {
            return file_content.Content;
        });
    }

    /**
     * Calls add_Cabinets for each i_cabinet within the archive
     * 
     * @param archive
     *
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected add_Archive(archive: t_archive): this {

        if (archive.length === 0) {
            console.warn("Empty Archive");
        } else {

            const isle: t_archiveIsle = archive;
            const rack: t_archiveRack = isle;
            const shelf: t_archiveShelf = rack;
            const box: t_archiveBox = shelf;
            const folder: t_archiveFolder = box;

            folder.forEach((file: i_archiveFile) => {
                this.add_File(file);
            });

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

                Object.entries(file as i_archiveFile).forEach(([tab_name, tab]) => {

                    this.add_Tab(description, tab)

                });
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

        Object.entries(tab as t_archiveTab)
            .forEach(([leaf_name, leaf]) => {

                const book_name: t_libraryBookName = description.BOOK.toProperCase();

                this
                    .get_Book(book_name)
                    .add_Chapter(leaf_name, this.get_TabWrapper(book_name, leaf))

            });

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
     * @param tab_input
     * 
     * @remarks
     * Class: M_Archive
     * Component: Library
     */
    protected get_TabWrapper(
        book_name: t_libraryBookName,
        tab_input: t_archiveTab
    ): any {

        return this.sniff(["_tab_wrapping_function", book_name],
            () => tab_input,
            (func: t_archiveTabWrapperFunc) => {
                return func(tab_input);
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
