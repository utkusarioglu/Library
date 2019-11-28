
/* ////////////////////////////////////////////////////////////////////////////
 *
 *	IMPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */
import { Book } from "./book";


/* ////////////////////////////////////////////////////////////////////////////
 *
 *	DOMESTICS
 *
 * ///////////////////////////////////////////////////////////////////////// */

test("Book.add_chapters", () => {
    const book = new Book("test/book");

    let adds = {
        chapter2: "chapter2-content",
        chapter3: "chapter3-content"
    };

    book.add_Chapter("chapter1", "chapter1-content")
    book.add_Chapters(adds);

    expect(book.get_AllChapterNames()).toStrictEqual(["chapter1", "chapter2", "chapter3"]);
    

});
