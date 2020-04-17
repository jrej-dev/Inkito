
import React from 'react';
import { useLocalStore } from 'mobx-react';
import { runInAction } from 'mobx';
const StoreContext = React.createContext();

//Steem API
const { Client } = require('dsteem');
let opts = {};
//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    '0000000000000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
const client = new Client('https://api.pharesim.me');

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
                link: "http://localhost:3000/comicReader/jrej/ghoulredone"
            },
            {
                title: "IN/SYS",
                author: "Jrej",
                thumbnail: "https://picsum.photos/400/300",
                link: "http://localhost:3000/comicReader/jrej/shadesofmen"
            }
        ],

        //Content Display Data
        trendingComics: [],
        newComics: [],
        trendingNovels: [],
        newNovels: [],
        seriesLinks: [],
        seriesDetail: [],
        activeInfoTab: [],
        activeComments: [],
        clickedSeriesAuthor: "",
        clickedSeriesTitle: "",
        clickedSeriesContent: "",
        startPage: 0,
        currentPage: 0,
        spinnerTimeout: false,
        navIsHidden: false,

        //Data states
        trendyComicState: "",
        newComicState: "",
        trendyNovelState: "",
        newNovelState: "",
        postDetailState: "",
        seriesDetailState: "",
        commentState: "",

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
            store.startPage = page;
            store.currentPage = page;
        },
        scrollCurrentPage: page => {
            store.currentPage = page;
        },
        /*sortByLatestUpdate: content => {
            content = content.slice().sort(function (a, b) {
                return new Date(b.last_update) - new Date(a.last_update)
            })
            return content;
        },*/
        // Removing duplicates from new content data
        removeDuplicateContent: (newIds, trendyIds) => {
            return newIds.filter(id =>
                !trendyIds.includes(id)
            )
        },
        setSpinnerTimeout: (value) => {
            store.spinnerTimeout = value;
        },
        resetSeriesDetail: () => {
            store.seriesDetail = [];
            store.seriesLinks = [];
            store.activeInfoTab = [];
            store.spinnerTimeout = [];
        },
        toggleInfoTab: (page) => {
            store.activeInfoTab[page] = !store.activeInfoTab[page];
            if (store.activeInfoTab[page] === false) {
                store.activeInfoTab = store.activeInfoTab.map(info => info = false);
                store.activeComments[page] = false;
            }
        },
        closeInfoTab: () => {
            store.activeInfoTab = store.activeInfoTab.map(info => info = false);
        },
        toggleComments: (page) => {
            store.activeComments[page] = !store.activeComments[page];
        },
        async fetchSeriesInfo(seriesId, type) {
            try {
                const seriesInfo = await client.database
                    .getDiscussions('created', { tag: seriesId, limit: 100 })
                    .then(result => result.reverse())
                    .then(result => {
                        if (result[0]) {
                            let reward = result[result.length - 1].pending_payout_value !== "0.000 HBD" ? result[result.length - 1].pending_payout_value : result[result.length - 1].total_payout_value;
                            let lastUpdate = result[result.length - 1];
                            return {
                                title: result[0].title,
                                author: result[0].author,
                                image: JSON.parse(result[0].json_metadata).image[0],
                                tags: JSON.parse(result[0].json_metadata).tags,
                                last_payout: reward,
                                last_update: lastUpdate,
                                seriesId: seriesId
                            };
                        }
                    })

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
                //const trendy = [];

                for (let id of trendyComicIds) {
                    const comic = await store.fetchSeriesInfo(id);
                    this.trendingComics.push(comic);
                    //trendy.push(comic)
                }
                this.trendyComicState = "done";
                //this.trendingComics = trendy;

                this.newComics = []
                this.newComicState = "pending"
                const createdComicIds = await client.database
                    .getDiscussions("created", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])

                const newComicIds = this.removeDuplicateContent(createdComicIds, trendyComicIds);
                //const fresh = [];

                for (let id of newComicIds) {
                    const comic = await store.fetchSeriesInfo(id);
                    this.newComics.push(comic);
                    //fresh.push(comic);
                }

                this.newComicState = "done";
                //this.newComics = fresh;

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
                //const trendy = [];

                for (let id of trendyNovelIds) {
                    const novel = await store.fetchSeriesInfo(id);
                    this.trendingNovels.push(novel);
                    //trendy.push(novel);
                }
                this.trendyNovelState = "done";
                //this.trendingNovels = trendy;

                this.newNovels = [];
                this.newNovelState = "pending";
                const createdNovelIds = await client.database
                    .getDiscussions("created", query)
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])

                const newNovelIds = this.removeDuplicateContent(createdNovelIds, trendyNovelIds);
                //const fresh = [];

                for (let id of newNovelIds) {
                    const novel = await store.fetchSeriesInfo(id);
                    //fresh.push(novel);
                    this.newNovels.push(novel);
                }
                this.newNovelState = "done"
                //this.newNovels = fresh;

            } catch (error) {
                console.log(error);
            }
        },
        async fetchPermlinks(author, seriesTitle) {
            let seriesId = `${author}-${seriesTitle}`;
            this.seriesLinks = [];
            this.seriesDetail = [];
            this.seriesLength = 1;
            this.seriesLinkState = "pending";
            try {
                const content = await client.database
                    .getDiscussions('created', { tag: seriesId, limit: 100 })
                    .then(result => {
                        return result.map(object => object.permlink).reverse();
                    })

                runInAction(() => {
                    this.seriesLinkState = "done";
                    this.seriesLinks = content;

                    this.seriesDetail.length = content.length;
                    this.activeInfoTab = content.map(object => object = false);
                    this.activeComments = content.map(object => object = false);
                })

            } catch (error) {
                this.seriesLinkState = "error"
                console.log(error)
            }
        },
        async fetchSeriesDetail(author, permlink, page) {
            this.seriesDetailState = "pending"
            try {
                const content = await client.database
                    .call('get_content', [author, permlink])
                    .then(result => {
                        return result;
                    })
                this.seriesDetail[page] = content;

                runInAction(async () => {
                    const result = await store.fetchComments(content);
                    if (this.seriesDetail[page]) {
                        this.seriesDetail[page].replies = result;
                        this.seriesDetailState = "done";
                    }

                    if (page > 1) {
                        store.fetchSeriesDetail(author, store.seriesLinks[0], 0);
                    }
                });

            } catch (error) {
                store.seriesDetailState = "error"
                console.log(error)
            }
        },
        async fetchComments(content) {
            const results = await client.database
                .call('get_content_replies', [content.author, content.permlink])

            if (results.length === 0 || results[0].parent_author.length > 0) {
                for (let result of results) {
                    const replies = await store.fetchComments(result);
                    result.replies = replies
                }
            }

            if (results.length === 0 || results[0].parent_author.length > 0) {
                return results;
            }
        }
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;