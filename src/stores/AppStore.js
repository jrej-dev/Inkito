
import React from 'react';
import { useLocalStore } from 'mobx-react';
const { Client } = require('dsteem');

const client = new Client('https://api.steemit.com');
const StoreContext = React.createContext();

export function StoreProvider({children}) {
    const store = useLocalStore(() => ({
        // State Variables
        categories : [
            "All Categories",
            "Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Sci-Fi",
            "Slice Of Life"
        ],
        promoArray : [
            {
                title: "Shades Of Men",
                author: "Jrej",
                thumbnail: "https://picsum.photos/500/300",
                link: "http://localhost:3000/jrej/shadesofmen"
            },
            {
                title: "IN/SYS",
                author: "Jrej",
                thumbnail: "https://picsum.photos/400/300",
                link: "http://localhost:3000/jrej/shadesofmen"
            }
        ],
        trendingComics : [],
        newComics : [],
        trendingNovels : [],
        newNovels : [],

        //Actions 
        // categories
        activeComicCategory : "All Categories",
        updateActiveComicCategory : className => {
            store.activeComicCategory = className;
        },
        activeNovelCategory : "All Categories",
        updateActiveNovelCategory : className => {
            store.activeNovelCategory = className
        },
        // Trendy or New
        activeComicTrend : "all",
        updateActiveComicTrend : trend => {
            store.activeComicTrend = trend;
        },
        activeNovelTrend : "all",
        updateActiveNovelTrend : trend => {
            store.activeNovelTrend = trend;
        },
        comicsQuery : {
            tag: "comics",
            limit: 16,
        },
        novelsQuery : {
            tag: "fiction",
            limit: 16,
        },
        trendyComicState : "",
        newComicState : "",
        //Fetching Trendy Comics
        async fetchComics(filter) {
            this.trendingComics = []
            this.newComics = []
            if (filter === "trending") {
                this.trendyComicState = "pending"
            } else if (filter === "created") {
                this.newComicState = "pending"
            }
            try {
                const comics = await client.database
                .getDiscussions(filter, this.comicsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                 })   
                //const filteredComics = comics.filter(comic => comics.json_metadata.includes(store.activeComicCategory))
                // after await, modifying state again, needs an actions:
                if (filter === "trending") {
                    this.trendyComicState = "done"
                    this.trendingComics = comics
                } else if (filter === "created") {
                    this.newComicState = "done"
                    this.newComics = comics
                }
            } catch (error) {
                console.log(error);
                if (filter === "trending") {
                    this.trendyComicState = "error";
                } else if (filter === "created") {
                    this.newComicState = "error";
                }
            }
        },
        trendyNovelState : "",
        newNovelState : "",
        async fetchNovels(filter) {
            this.trendingNovels = []
            this.newNovels = []
            if (filter === "trending") {
                this.trendyNovelState = "pending"
            } else if (filter === "created") {
                this.newNovelState = "pending"
            }
            try {
                const novels = await client.database
                .getDiscussions(filter, this.novelsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                 })   
                //const filteredComics = comics.filter(comic => comics.json_metadata.includes(store.activeComicCategory))
                // after await, modifying state again, needs an actions:
                if (filter === "trending") {
                    this.trendyNovelState = "done"
                    this.trendingNovels = novels
                } else if (filter === "created") {
                    this.newNovelState = "done"
                    this.newNovels = novels
                }
            } catch (error) {
                console.log(error);
                if (filter === "trending") {
                    this.trendyNovelState = "error";
                } else if (filter === "created") {
                    this.newNovelState = "error";
                }
            }
        }
    }));
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  };

  export default StoreContext;