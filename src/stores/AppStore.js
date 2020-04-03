
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
            limit: 32,
        },
        novelsQuery : {
            tag: "fiction",
            limit: 32,
        },
        trendyComicState : "",
        newComicState : "",
        removeDuplicateComics : newContent => {
            var duplicateIndexComics = [];
            store.trendingComics.forEach((element) => {
                newContent.forEach((data, index) => {
                if (element.post_id === data.post_id){
                    duplicateIndexComics.push(index)
                }
                })
            });
        
            if (duplicateIndexComics.length > 0){
                return newContent.filter((data,index) => !duplicateIndexComics.includes(index));
            } else {
                return newContent;
            }
        },
        removeDuplicateNovels : newContent => {
            var duplicateIndexNovels = [];    
            store.trendingNovels.forEach((element) => {
                newContent.forEach((data, index) => {
                if (element.title === data.title){
                    duplicateIndexNovels.push(index)
                }
                })
            });
            if (duplicateIndexNovels.length > 0){
                return newContent.filter((data,index) => !duplicateIndexNovels.includes(index));
            } else {
                return newContent;
            }
        },
        //Fetching Comics
        async fetchComics() {
            this.trendingComics = []
            this.trendyComicState = "pending"
            try {
                const trendyComics = await client.database
                .getDiscussions("trending", this.comicsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                })
                    
                // after await, modifying state again, needs an actions:
                this.trendyComicState = "done"
                this.trendingComics = trendyComics
                
                this.newComics = []
                this.newComicState = "pending"

                const newComics = await client.database
                .getDiscussions("created", this.comicsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                })

                const filteredComics = this.removeDuplicateComics(newComics);
                this.newComicState = "done"
                this.newComics = filteredComics

            } catch (error) {
                console.log(error);
            }
        },
        trendyNovelState : "",
        newNovelState : "",
        async fetchNovels() {
            this.trendingNovels = []
            this.trendyNovelState = "pending"
            try {
                const trendyNovels = await client.database
                .getDiscussions("trending", this.novelsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                })
                    
                // after await, modifying state again, needs an actions:
                this.trendyNovelState = "done"
                this.trendingNovels = trendyNovels
                
                this.newNovels = []
                this.newNovelState = "pending"

                const newNovels = await client.database
                .getDiscussions("created", this.novelsQuery)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                })
                const filteredNovels = this.removeDuplicateNovels(newNovels);
                this.newNovelState = "done"
                this.newNovels = filteredNovels
    
            } catch (error) {
                console.log(error);
            }
        }
    }));

    
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  };

  export default StoreContext;