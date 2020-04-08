
import React from 'react';
import { useLocalStore } from 'mobx-react';
const StoreContext = React.createContext();

//Steem API
const { Client } = require('dsteem');
let opts = {};
//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    '0000000000000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
const client = new Client('https://api.steemit.com');

export function StoreProvider({children}) {
    const store = useLocalStore(() => ({

    // State Variables
        //Categories array and active
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
        activeComicCategory : "All Categories",
        activeNovelCategory : "All Categories",

        //Trend active (trending or new)
        activeComicTrend : "all",
        activeNovelTrend : "all",

        //Array for promoted content
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

        //Content Display Data
        trendingComics : [],
        newComics : [],
        trendingNovels : [],
        newNovels : [],
        postDetail : "",
        postTitle : "",
        seriesDetail : [],
        clickedSeriesAuthor : "",
        clickedSeriesTitle : "",
        clickedSeriesContent : "",
        startPage : 1,
        currentPage : 1,

        //Data states
        trendyComicState : "",
        newComicState : "",
        trendyNovelState : "",
        newNovelState : "",
        postDetailState : "",
        seriesDetailState : "",

        //Queries
        comicsQuery:  {
            tag: "inkito-comics",
            limit: 32,
          },
        novelsQuery: {
            tag: "fiction",
            limit: 32,
        },
    //Actions 

        // categories
        updateActiveComicCategory : className => {
            store.activeComicCategory = className;
        },
        updateActiveNovelCategory : className => {
            store.activeNovelCategory = className
        },
        // Trends
        updateActiveComicTrend : trend => {
            store.activeComicTrend = trend;
        },
        updateActiveNovelTrend : trend => {
            store.activeNovelTrend = trend;
        },
        updateCurrentPage : page => {
            store.currentPage = page;
            store.startPage = page;
        },
        // Removing duplicates from new content data
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
        async fetchComics(query) {
            this.trendingComics = []
            this.trendyComicState = "pending"
            try {
                const trendyComics = await client.database
                .getDiscussions("trending", query)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                }) 
                this.trendyComicState = "done"
                this.trendingComics = trendyComics

                this.newComics = []
                this.newComicState = "pending"

                const newComics = await client.database
                .getDiscussions("created", query)
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
        async fetchNovels(query) {
            this.trendingNovels = []
            this.trendyNovelState = "pending"
            try {
                const trendyNovels = await client.database
                .getDiscussions("trending", query)
                .then(result => {
                    if (result) {
                        return result; 
                   } else {
                        console.log("No result.");
                   };
                   
                })
                this.trendyNovelState = "done"
                this.trendingNovels = trendyNovels                
                this.newNovels = []
                this.newNovelState = "pending"

                const newNovels = await client.database
                .getDiscussions("created", query)
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
        },
        async fetchPostDetail(author, permlink) {
            this.postDetail = ""
            this.postTitle = ""
            this.postDetailState = "pending"
            try {
                const content = await client.database
                .call('get_content', [author, permlink])
                .then(result => {
                    return result;
                })
                this.postDetailState = "done"
                this.postDetail = content.body;
                this.postTitle = content.title;
            } catch (error) {
                this.postDetailState = "error"
                console.log(error)
            }
        },
        async fetchSeries(author, seriesTitle) {
            let seriesId = `${author}-${seriesTitle}`
            this.seriesDetail = []
            this.seriesLength = 1
            this.seriesDetailState = "pending"
            try {
                const content = await  client.database
                .getDiscussions('created', {tag: seriesId, limit: 100})
                .then(result => {
                    return result;
                })
                this.seriesDetailState = "done"
                this.seriesDetail = content.reverse();
            } catch (error) {
                this.seriesDetailState = "error"
                console.log(error)
            }
        }
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  };

  export default StoreContext;