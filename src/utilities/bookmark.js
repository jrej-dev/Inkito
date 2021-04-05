import { safeJSON } from '../middlewares/json';

export const bookmark = {
    getPage: (author, title) => {
        let storedBookmarks = safeJSON.parse(localStorage.getItem("bookmarks"));
        if (storedBookmarks) {
            for (let bookmark of storedBookmarks) {
                if (bookmark.id === `${author}-${title}`) {
                   return bookmark.currentPage
                }
            }
            return null
        } else {
            return null
        }
    },
    setPage: (author, title, page) => {
        let storedBookmarks = safeJSON.parse(localStorage.getItem("bookmarks"));
        let bookmark = [];
        if (storedBookmarks) {
          storedBookmarks = storedBookmarks.filter(object => object.id !== `${author}-${title}`);
          bookmark = [...storedBookmarks, {id: `${author}-${title}`, currentPage: page}];
        } else {
          bookmark = [{id: `${author}-${title}`, currentPage: page}];
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmark));
    }
}