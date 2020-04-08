
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

export function StoreProvider({ children }) {
    const store = useLocalStore(() => ({

        // State Variables
        //Categories array and active
        categories: [
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
        activeComicCategory: "All Categories",
        activeNovelCategory: "All Categories",

        //Trend active (trending or new)
        activeComicTrend: "all",
        activeNovelTrend: "all",

        //Array for promoted content
        promoArray: [
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
        trendingComics: [],
        newComics: [],
        trendingNovels: [],
        newNovels: [],
        postDetail: [],
        postTitle: [],
        seriesDetail: [],
        clickedSeriesAuthor: "",
        clickedSeriesTitle: "",
        clickedSeriesContent: "",
        startPage: 1,
        currentPage: 1,

        //Data states
        trendyComicState: "",
        newComicState: "",
        trendyNovelState: "",
        newNovelState: "",
        postDetailState: "",
        seriesDetailState: "",

        //Queries
        comicsQuery: {
            tag: "inkito-comics",
            limit: 32,
        },
        novelsQuery: {
            tag: "inkito-novels",
            limit: 32,
        },
        //Actions 

        // categories
        updateActiveComicCategory: className => {
            store.activeComicCategory = className;
        },
        updateActiveNovelCategory: className => {
            store.activeNovelCategory = className
        },
        // Trends
        updateActiveComicTrend: trend => {
            store.activeComicTrend = trend;
        },
        updateActiveNovelTrend: trend => {
            store.activeNovelTrend = trend;
        },
        updateCurrentPage: page => {
            store.currentPage = page;
            store.startPage = page;
        },
        // Removing duplicates from new content data
        removeDuplicateContent: (newIds, trendyIds) => {
            return newIds.filter(id =>
                !trendyIds.includes(id)
            )
        },
        async fetchSeriesInfo(seriesId, type) {
            try {
                const seriesInfo = await client.database
                    .getDiscussions('created', { tag: seriesId, limit: 100 })
                    .then(result => result.reverse())
                    .then(result => {
                        if (result[0]) {
                            let reward = result[result.length-1].pending_payout_value !== "0.000 SBD" ? result[result.length-1].pending_payout_value : result[result.length-1].total_payout_value;
                            return {
                                title: result[0].title, 
                                author: result[0].author,
                                image: JSON.parse(result[0].json_metadata).image[0],
                                tags: JSON.parse(result[0].json_metadata).tags,
                                last_payout: reward,
                                seriesId: seriesId
                            };
                        } 
                    })
                    if (type === "trendingComics") {
                        this.trendyComicState = "done";
                        this.trendingComics.push(seriesInfo);
                    } else if (type === "newComics") {
                        this.newComicState = "done" 
                        this.newComics.push(seriesInfo);
                    } else if (type === "trendingNovels") {
                        this.trendyNovelState = "done";
                        this.trendingNovels.push(seriesInfo);
                    } else if (type === "newNovels") {
                        this.newNovelState = "done"
                        this.newNovels.push(seriesInfo);
                    }                    
                    return seriesInfo;
            } catch (error) {
                console.log(error)
            }
        },
        //Fetching Comics
        async fetchComics(query) {
            this.trendingComics = []
            this.trendyComicState = "pending"
            try {
                const trendyComicIds = await client.database
                    .getDiscussions("trending", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])
                
                trendyComicIds.map(id => store.fetchSeriesInfo(id,"trendingComics"));
                
                this.newComicState = "pending"    
                const createdComicIds = await client.database
                    .getDiscussions("created", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])

                const newComicIds = this.removeDuplicateContent(createdComicIds, trendyComicIds);
                newComicIds.map(id => store.fetchSeriesInfo(id,"newComics"));
            
            } catch (error) {
                console.log(error);
            }
        },
        async fetchNovels(query) {
            this.trendingNovels = []
            this.trendyNovelState = "pending"
            try {
                const trendyNovelIds = await client.database
                    .getDiscussions("trending", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])
                
                trendyNovelIds.map(id => store.fetchSeriesInfo(id,"trendingNovels"));
                
                this.newNovelState = "pending"    
                const createdNovelIds = await client.database
                    .getDiscussions("created", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])

                const newNovelIds = this.removeDuplicateContent(createdNovelIds, trendyNovelIds);
                newNovelIds.map(id => store.fetchSeriesInfo(id,"newNovels"));
            
            } catch (error) {
                console.log(error);
            }
        },
        async fetchSeries(author, seriesTitle) {
            let seriesId = `${author}-${seriesTitle}`
            this.seriesDetail = []
            this.seriesLength = 1
            this.seriesDetailState = "pending"
            try {
                const content = await client.database
                .getDiscussions('created', { tag: seriesId, limit: 100 })
                .then(result => {
                        return result.map(object => object.permlink );
                    })
                    this.seriesDetailState = "done"
                this.seriesDetail = content.reverse();
            } catch (error) {
                this.seriesDetailState = "error"
                console.log(error)
            }
        },
        async fetchPostDetail(author, permlink, page) {
            this.postDetailState = "pending"
            try {
                const content = await client.database
                    .call('get_content', [author, permlink])
                    .then(result => {
                        return result;
                    })
                this.postDetailState = "done"
                this.postDetail[page-1] = content.body;
                this.postTitle[page-1] = content.title;
            } catch (error) {
                this.postDetailState = "error"
                console.log(error)
            }
        }
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;