import { Parent } from "@utkusarioglu/mixer";
import { Resolution } from "@utkusarioglu/resolver";
import { M_Controller } from "@utkusarioglu/controller";
import { M_Library } from "./m_library";
import { C_Library } from "./c_library";
export class M_Archive extends Parent().with(M_Library, M_Controller) {
    add_Archive_FromResolutionInstruction(resolution_instruction) {
        const arg_pool = Resolution.extract_ArgumentPool_fromResolutionInstruction(resolution_instruction);
        const sender = arg_pool[0][0];
        const archive = arg_pool[0][1];
        this.add_Archive(archive);
        this.announce_LibraryAdded(sender);
        return this;
    }
    extract_Archive_FromTransmission(transmission) {
        const transmission_content = transmission.Content;
        return transmission_content.map((file_content) => {
            return file_content.Content;
        });
    }
    add_Archive(archive) {
        if (archive.length === 0) {
            console.warn("Empty Archive");
        }
        else {
            const isle = archive;
            const rack = isle;
            const shelf = rack;
            const box = shelf;
            const folder = box;
            folder.forEach((file) => {
                this.add_File(file);
            });
        }
        return this;
    }
    add_File(file) {
        file.sniff(["DESCRIPTION"], () => {
            throw new Error(C_Library.E_AbsentFileDescriptor);
        }, (description) => {
            delete file.DESCRIPTION;
            Object.entries(file).forEach(([tab_name, tab]) => {
                this.add_Tab(description, tab);
            });
        });
        return this;
    }
    add_Tab(description, tab) {
        Object.entries(tab)
            .forEach(([leaf_name, leaf]) => {
            const book_name = description.BOOK.toProperCase();
            this
                .get_Book(book_name)
                .add_Chapter(leaf_name, this.get_TabWrapper(book_name, leaf));
        });
        return this;
    }
    disable_Archive_AtDepth(depth) {
        return this;
    }
    disable_Books() {
        return this;
    }
    disable_Chapters() {
        return this;
    }
    disable_Sections() {
        return this;
    }
    disable_Pages() {
        return this;
    }
    disable_Lines() {
        return this;
    }
    enable_Archive_AtDepth() {
        return this;
    }
    get_TabWrapper(book_name, tab_input) {
        return this.sniff(["_tab_wrapping_function", book_name], () => tab_input, (func) => {
            return func(tab_input);
        });
    }
    set_TabWrappers(book_names, tab_wrapping_function) {
        book_names.forEach((book_name) => {
            this.pave(["_tab_wrapping_function", book_name], undefined, () => {
                return tab_wrapping_function;
            });
        });
        return this;
    }
}
//# sourceMappingURL=m_archive.js.map