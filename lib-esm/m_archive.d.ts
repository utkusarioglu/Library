import { M_Controller, M_ControllerEvents } from "@utkusarioglu/controller";
import { M_Library } from "./m_library";
import { t_archive, e_archiveDepth, i_archiveFile, t_archiveTab, i_fileDescriptor, t_archiveTabWrapperFunc, t_libraryBookName } from "./t_library";
import { t_transmission } from "@utkusarioglu/controller";
import { t_resolutionInstruction } from "@utkusarioglu/resolver";
export interface M_Archive extends M_Controller, M_ControllerEvents, M_Library {
}
declare const M_Archive_base: any;
export declare abstract class M_Archive extends M_Archive_base {
    private _tab_wrapping_function;
    protected add_Archive_FromResolutionInstruction(resolution_instruction: t_resolutionInstruction): this;
    protected extract_Archive_FromTransmission(transmission: t_transmission): t_archive;
    protected add_Archive(archive: t_archive): this;
    protected add_File(file: i_archiveFile): this;
    protected add_Tab(description: i_fileDescriptor, tab: t_archiveTab): this;
    protected disable_Archive_AtDepth(depth: e_archiveDepth): this;
    protected disable_Books(): this;
    protected disable_Chapters(): this;
    protected disable_Sections(): this;
    protected disable_Pages(): this;
    protected disable_Lines(): this;
    protected enable_Archive_AtDepth(): this;
    protected get_TabWrapper(book_name: t_libraryBookName, tab_input: t_archiveTab): any;
    protected set_TabWrappers(book_names: t_libraryBookName[], tab_wrapping_function: t_archiveTabWrapperFunc): this;
}
export {};
