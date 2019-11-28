
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
    const chapter1: [string, any] = ["chapter1", "chapter1-content"];

    let adds: [string, any][] = [];

    for (let i = 2; i < 4; i++) {
        const add: [string, any] = chapter1.map((member) => {
            return member.replace("1", i.toString())
        }) as [string, any]

        adds.push(add)
    }

    book.add_Chapter("chapter1", "chapter1-content")
    book.add_Chapters(adds);

    expect(book.get_AllChapterNames()).toStrictEqual(["chapter1", "chapter2", "chapter3"]);
    

});
