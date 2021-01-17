import React from 'react';
import { useLocalStore } from 'mobx-react';
import { runInAction } from 'mobx';
import { binArrayToJson, safeJSON } from '../middlewares/json';

//Steem API
const { Client } = require('dsteem');
let opts = {};
//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    '0000000000000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
const client = new Client('https://anyx.io/');

//Hivesigner
var hivesigner = require('hivesigner');

var api = new hivesigner.Client({
    app: 'inkito',
    callbackURL: 'https://www.inkito.io',
    accessToken: 'access_token',
    scope: ['vote', 'comment', 'follow', 'posting'],
});

var ENDPOINT = "https://inkito-ipfs.herokuapp.com";
if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:5000";
}

const StoreContext = React.createContext();

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
        /*promoArray: [
            {
                title: "Shades Of Men",
                author: "Jrej",
                thumbnail: "https://picsum.photos/400/300",
                link: "https://inkito.io/comicReader/jrej/ghoulredone"
            },
            {
                title: "IN/SYS",
                author: "Jrej",
                thumbnail: "https://picsum.photos/400/300",
                link: "https://inkito.io/comicReader/jrej/shadesofmen"
            }
        ],*/

        //Content Display Data
        trendingComics: [],
        newComics: [],
        trendingNovels: [],
        newNovels: [],
        //Search bookmark
        last_trendyComic: {},
        last_newComic: {},
        last_trendyNovel: {},
        last_newNovel: {},

        seriesLinks: [],
        seriesDetail: [],
        seriesInfo: {},
        activeInfoTab: [],
        activeComments: [],
        authorInfo: [],
        userDetail: {},
        all_followers: [],
        all_following: [],
        loginLink: "",
        zoom: 50,
        zoomIsActive: false,
        clickedSeriesAuthor: "",
        clickedSeriesTitle: "",
        clickedSeriesContent: "",
        startPage: 0,
        currentPage: 0,
        loginIsActive: false,
        navIsHidden: false,
        navMenuIsActive: false,
        shareMenuIsActive: false,
        shareMenuBottomIsActive: false,
        cookieConsent: null,
        replyIsActive: "",

        //Data states
        fetchComicState: "",
        fetchNovelState: "",
        postDetailState: "",
        seriesDetailState: "",
        seriesLinkState: "",
        commentState: "",
        authorInfoState: "",
        voteState: "",
        followState: "",
        updateProfileState: "",
        uploadState: "",
        ipfsState: false,

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
        // Removing duplicates from new content data
        removeDuplicateContent: (newContent, trendyContent) => {
            let trendyIds = trendyContent.map(content => content.seriesId);
            let filteredContent = newContent.filter(content => !trendyIds.includes(content.seriesId));
            return filteredContent;
        },
        setSpinnerTimeout: (value) => {
            store.spinnerTimeout = value;
        },
        resetSeriesDetail: () => {
            store.zoom = 50;
            store.seriesDetail = [];
            store.seriesLinks = [];
            store.activeInfoTab = [];
            store.spinnerTimeout = [];
            store.replyIsActive = ""
        },
        toggleInfoTab: (page) => {
            store.activeInfoTab[page] = !store.activeInfoTab[page];
            if (store.activeInfoTab[page] === false) {
                store.activeInfoTab = store.activeInfoTab.map(info => info = false);
                store.activeComments[page] = false;
            }
        },
        closeInfoTab: () => {
            store.activeInfoTab = store.activeInfoTab.map(info => (info = false));
        },
        toggleComments: (page) => {
            store.activeComments[page] = !store.activeComments[page];
        },
        toggleZoomBanner: (value) => {
            if (value === false && store.zoomIsActive === true) {
                store.zoomIsActive = false;
            } else if (value === undefined) {
                store.zoomIsActive = !store.zoomIsActive;
            }
        },
        toggleLogin: (value) => {
            if (value === false && store.loginIsActive === true) {
                store.loginIsActive = false;
            } else if (value === undefined) {
                store.loginIsActive = !store.loginIsActive;
            }
        },
        toggleNav: (value) => {
            store.navIsHidden = value;
        },
        toggleNavMenu: (value) => {
            if (value === false && store.navMenuIsActive === true) {
                store.navMenuIsActive = false;
            } else if (value === undefined) {
                store.navMenuIsActive = !store.navMenuIsActive;
            }
        },
        toggleShareMenu: (value) => {
            if (value === false && store.shareMenuIsActive === true) {
                store.shareMenuIsActive = false;
            } else if (value === undefined) {
                store.shareMenuIsActive = !store.shareMenuIsActive;
            }
        },
        toggleShareMenuBottom: (value) => {
            if (value === false && store.shareMenuBottomIsActive === true) {
                store.shareMenuBottomIsActive = false;
            } else if (value === undefined) {
                store.shareMenuBottomIsActive = !store.shareMenuBottomIsActive;
            }
        },
        updateZoom: (increment) => {
            if (store.zoom > 30 && store.zoom < 90) {
                store.zoom = store.zoom + increment;
            } else if (store.zoom === 30 && increment > 0) {
                store.zoom = store.zoom + increment;
            } else if (store.zoom === 90 && increment < 0) {
                store.zoom = store.zoom + increment;
            }
        },
        checkCookieConsent: () => {
            const cookie = localStorage.getItem('cookie-consent');
            store.cookieConsent = safeJSON.parse(cookie);
        },
        toggleReplyIsActive: (value) => {
            if (store.replyIsActive === value) {
                store.replyIsActive = "";
            } else if (store.replyIsActive !== value) {
                store.replyIsActive = value;
            }
        },
        trendyComicCb: (res) => {
            if (res && res.data) {
                let comic = res.data;
                if (store.trendingComics.length === 0 || !store.trendingComics.some(object => object.seriesId === comic.seriesId)) {
                    store.trendingComics.push(comic);
                    store.newComics = store.removeDuplicateContent(store.newComics, store.trendingComics);
                }
            } else if (res && res.bookmark) {
                store.last_trendyComic = res.bookmark;
            }
        },
        newComicCb: (res) => {
            if (res && res.data) {
                let comic = res.data;
                if (store.newComics.length === 0 || !store.newComics.some(object => object.seriesId === comic.seriesId)) {
                    if (store.trendingComics.length === 0 || !store.trendingComics.some(object => object.seriesId === comic.seriesId)) {
                        store.newComics.push(comic);
                    }
                }
            } else if (res && res.bookmark) {
                store.last_newComic = res.bookmark;
            }
        },
        trendyNovelCb: (res) => {
            if (res && res.data) {
                let novel = res.data;
                if (store.trendingNovels.length === 0 || !store.trendingNovels.some(object => object.seriesId === novel.seriesId)) {
                    store.trendingNovels.push(novel);
                    store.newNovels = store.removeDuplicateContent(store.newNovels, store.trendingNovels);
                }
            } else if (res && res.bookmark) {
                store.last_trendyNovel = res.bookmark;
            }
        },
        newNovelCb: (res) => {
            if (res && res.data) {
                let novel = res.data;
                if (store.newNovels.length === 0 || !store.newNovels.some(object => object.seriesId === novel.seriesId)) {
                    if (store.trendingNovels.length === 0 || !store.trendingNovels.some(object => object.seriesId === novel.seriesId)) {
                        store.newNovels.push(novel);
                    }
                }
            } else if (res && res.bookmark) {
                store.last_newNovel = res.bookmark;
            }
        },

        //Temporal
        temporalLogin: async () => {
            try {
                var requestOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(`${ENDPOINT}/temporalLogin`, requestOptions).then(res => res.text())

                runInAction(() => {
                    if (response === "success") {
                        store.ipfsState = true;
                    } else {
                        store.ipfsState = false;
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        /*       
        General fetch
        type: "comics" || "novels"
        limit: number
        */
        fetch: (type, limit) => {
            try {
                if (type === "comics") {
                    let comicCount = 0;
                    let comicCountCb = (number) => {
                        comicCount = comicCount + number;
                    }

                    store.fetchComicState = "pending";

                    store.fetchContent("inkito-comics", "trending", limit, store.trendyComicCb, comicCountCb, comicCount, store.last_trendyComic.author, store.last_trendyComic.permlink);
                    let comicLimit = limit - store.trendingComics.length;
                    store.fetchContent("inkito-comics", "created", comicLimit, store.newComicCb, comicCountCb, comicCount, store.last_newComic.author, store.last_newComic.permlink);

                    store.fetchComicState = "done";

                } else if (type === "novels") {
                    let novelCount = 0
                    let nouvelCountCb = (number) => {
                        novelCount = novelCount + number;
                    }

                    store.fetchNovelState = "pending";

                    store.fetchContent("inkito-novels", "trending", limit, store.trendyNovelCb, nouvelCountCb, novelCount, store.last_trendyComic.author, store.last_trendyComic.permlink);
                    let novelLimit = limit - store.trendingComics.length;
                    store.fetchContent("inkito-novels", "created", novelLimit, store.newNovelCb, nouvelCountCb, novelCount, store.last_newComic.author, store.last_newComic.permlink);

                    store.fetchNovelState = "done";
                }
            } catch (error) {
                console.log(error);
            }
        },
        fetchContent: async (tag, section, limit, contentCb, countCb, count, last_author, last_permlink) => {
            try {
                var last_content = {};
                var local_count = count;

                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ section, tag, last_author, last_permlink })
                };

                const content = await fetch(`${ENDPOINT}/fetchContent`, options)
                    .then(async res => {
                        let data = [];
                        const reader = res.body.getReader();
                        return await reader.read().then(function processText({ done, value }) {
                            if (done) {
                                return data;
                            }
                            // value for fetch streams is a Uint8Array
                            let json = binArrayToJson(value);
                            let res = safeJSON.parse(json);

                            if (res) {
                                if (local_count < limit) {
                                    if (res.data) {
                                        data.push(res.data.seriesId);
                                        contentCb(res);
                                        local_count++;
                                        countCb(1);
                                    } else if (res.bookmark) {
                                        contentCb(res);
                                        last_content = res.bookmark;
                                    }
                                } else {
                                    console.log("limit reached for: " + section + " " + tag.slice(7));
                                }
                            }
                            return reader.read().then(processText);
                        });
                    })

                //Looping conditions:
                //More content to be found
                if (content && content.length > 2 && local_count < limit) {

                    let newCount = local_count + content.length;
                    store.fetchContent(tag, section, limit, contentCb, countCb, newCount, last_content.author, last_content.permlink);

                    //API call failed. Trying again.
                } else if (content === undefined && local_count < limit) {

                    store.fetchContent(tag, section, limit, contentCb, countCb, local_count, last_content.author, last_content.permlink);

                    //No content left to be found.
                } else {
                    countCb(local_count);
                    if (content && content.length <= 2) {
                        console.log("no more content to be found for: " + section + " " + tag.slice(7));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        initHSLogin: async () => {
            let link = await fetch(`${ENDPOINT}/getLoginURL`).then(res => res.text());

            runInAction(() => {
                store.loginLink = link;
            })
        },
        login: (user) => {
            let params = { username: user };

            api.login(params, function (err, token) {
                if (token) {
                    console.log(token);
                    store.toggleLogin(false);
                    store.getUserDetail(token, user)
                } else if (err) {
                    console.log(err);
                }
            })
        },
        getUserDetail: async (localAccess, localUser) => {
            store.userDetail = {};

            if (localAccess && localUser) {
                var access_token = localAccess;
                var username = localUser;
            } else {
                access_token = new URLSearchParams(document.location.search).get('access_token');
                username = new URLSearchParams(document.location.search).get('username');
            }

            if (access_token) {
                store.toggleNavMenu(false);

                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ access_token: access_token })
                }

                //set access token in API and getting user after login
                let userDetail = await fetch(`${ENDPOINT}/getUser`, options)
                    .then(res => res.json())

                runInAction(() => {
                    store.userDetail = userDetail;

                    if (access_token) {
                        localStorage.setItem('access-token', safeJSON.stringify(access_token));
                    }
                    if (username) {
                        localStorage.setItem('users', safeJSON.stringify(username));
                    }
                })
            }
        },
















        logOut: () => {
            api.revokeToken(function (err, res) {
                if (res && res.success) {
                    store.userDetail = {};
                    document.location.href = '/';
                }
                localStorage.setItem('access-token', "");
                localStorage.setItem('users', "");
                store.userDetail = {};
                if (err) {
                    console.log(err);
                }
            });
            return false;
        },















        fetchActiveVotes: (author, permlink) => {
            return client.database
                .call('get_active_votes', [author, permlink])
                .then(result => {
                    return result;
                })
        },
        fetchPendingReward: (author, permlink) => {
            return client.database
                .call('get_content', [author, permlink])
                .then(result => {
                    return result.pending_payout_value
                })
        },

        follow: (follower, following) => {
            runInAction(() => {
                store.followState = "pending";
            })

            api.follow(follower, following, function (err, res) {
                if (res) {
                    if (store.seriesInfo) {
                        store.seriesInfo.followers.push(follower);
                        runInAction(() => {
                            store.followState = "done";
                        })
                    } else {
                        console.log("failed to add follower - Please refresh.")
                    }
                } else if (err) {
                    console.log(err);
                    runInAction(() => {
                        store.followState = "error";
                    })
                }
            })
        },
        unfollow: (unfollower, unfollowing) => {
            store.followState = "pending";

            api.unfollow(unfollower, unfollowing, function (err, res) {
                if (res) {
                    if (store.seriesInfo) {
                        store.followState = "done";
                        store.seriesInfo.followers = store.seriesInfo.followers.filter(follower => follower !== unfollower);
                    } else {
                        console.log("failed to add follower - Please refresh.")
                    }
                } else if (err) {
                    console.log(err);
                    store.followState = "error";
                }
            })
        },
        vote: (voter, author, permlink, weight, page) => {
            store.voteState = permlink;
            api.vote(voter, author, permlink, weight, function (err, res) {
                if (res) {
                    runInAction(async () => {
                        const votes = await store.fetchActiveVotes(author, permlink);
                        const reward = await store.fetchPendingReward(author, permlink);

                        function findPermlink(content) {
                            if (content.permlink === permlink) {
                                content.active_votes = votes;
                                content.pending_payout_value = reward;
                                store.voteState = "done";
                                return content;
                            } else {
                                for (let reply of content.replies) {
                                    findPermlink(reply)
                                }
                            }
                        }

                        if (store.seriesDetail.length > page) {
                            findPermlink(store.seriesDetail[page]);
                        }
                    })
                } else if (err) {
                    store.voteState = "error";
                    console.log(err);
                }
            })
        },
        getBeneficiaries: (author, permlink) => {
            return ["comment_options", {
                author: author,
                permlink: permlink,
                max_accepted_payout: "1000000.000 HBD",
                percent_steem_dollars: 10000,
                allow_votes: 1,
                allow_curation_rewards: 1,
                extensions: [
                    [
                        0,
                        {
                            beneficiaries: [
                                {
                                    account: "inkito",
                                    weight: 1000
                                }
                            ]
                        }
                    ]
                ]
            }];
        },
        //The comment() method is rate limited to 5 minutes per root comment (post), and 20 seconds per non-root comment (reply).
        comment: (parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, page, update) => {
            store.commentState = "pending";
            let tx = [];
            let params = {
                parent_author: parentAuthor,
                parent_permlink: parentPermlink,
                author,
                permlink,
                title,
                body,
                json_metadata: safeJSON.stringify(jsonMetadata),
            };

            tx.push(['comment', params]);
            if (!update) {
                tx.push(store.getBeneficiaries(author, permlink));
            }

            api.broadcast(tx, function (err, res) {
                if (res) {
                    store.commentState = "done";
                    store.toggleReplyIsActive(parentPermlink);

                    runInAction(() => {
                        params.pending_payout_value = "0.000 HBD";
                        params.total_payout_value = "0.000 HBD";
                        params.created = new Date().toISOString();
                        params.active_votes = [];

                        function findParentPermlink(content) {
                            if (content.permlink === parentPermlink) {
                                content.replies.push(params);
                            } else {
                                for (let reply of content.replies) {
                                    findParentPermlink(reply)
                                }
                            }
                        }

                        if (store.seriesDetail.length > page) {
                            console.log(store.seriesDetail[page].permlink)
                            findParentPermlink(store.seriesDetail[page]);
                        }
                    })
                } else if (err) {
                    store.commentState = "error";
                    console.log(err);
                }
            })
        },
        updateProfile: (account_name, metadata) => {
            store.updateProfileState = "pending";
            let params = {
                account: account_name,
                json_metadata: "",
                posting_json_metadata: metadata,
                extensions: []
            };

            api.broadcast([['account_update2', params]], function (err, res) {
                if (res) {
                    store.updateProfileState = "done";
                    console.log(res);

                } else if (err) {
                    store.updateProfileState = "error";
                    console.log(err);
                }
            })
        },

        async fetchPermlinks(author, seriesTitle, last_author, last_permlink, slice) {
            let seriesId = `${author}-${seriesTitle}`;
            if (seriesTitle === "series") {
                seriesId = author;
            }
            this.seriesInfo = {};
            this.seriesInfo.author = author;
            this.seriesInfo.series_title = seriesTitle;

            this.seriesDetail = [];
            this.seriesLength = 1;
            this.seriesLinkState = "pending";
            try {
                let last_result = {};
                const content = await client.database
                    .getDiscussions('created', {
                        tag: seriesId,
                        limit: 100,
                        start_author: last_author,
                        start_permlink: last_permlink
                    })
                    .then(result => {
                        if (result.length > 0) {
                            last_result = result[result.length - 1];
                        }
                        return result;
                    })
                    .then(result => {
                        return result.map(object => object.permlink).reverse();
                    })

                runInAction(() => {
                    if (slice) {
                        this.seriesLinks = this.seriesLinks.concat(content.slice(1));
                    } else {
                        this.seriesLinks = this.seriesLinks.concat(content);
                    }

                    this.seriesDetail.length = this.seriesLinks.length;
                    this.activeInfoTab = this.seriesLinks.map(object => object = false);
                    this.activeComments = this.seriesLinks.map(object => object = false);
                })

                if (content.length > 1) {
                    store.fetchPermlinks(author, seriesTitle, last_result.author, last_result.permlink, true);
                } else {
                    this.seriesLinkState = "done";
                }
            } catch (error) {
                this.seriesLinkState = "error"
                console.log(error)
            }
        },
        async fetchSeriesDetail(author, permlink, page) {
            this.seriesDetailState = "pending";
            this.all_followers = [];
            try {
                const content = await client.database
                    .call('get_content', [author, permlink])
                    .then(result => {
                        result.image = safeJSON.parse(result.json_metadata).image;
                        result.tags = safeJSON.parse(result.json_metadata).tags;
                        return result;
                    })

                runInAction(async () => {
                    if (this.seriesDetail.length > page) {
                        this.seriesDetail[page] = content;
                    }
                    const result = await store.fetchComments(content);
                    if (this.seriesDetail.length > 0 && this.seriesDetail[page]) {
                        this.seriesDetail[page].replies = result;
                        this.seriesDetailState = "done";
                        if (this.seriesInfo) {
                            const avatar = await store.fetchAvatar(author);
                            const followers = await store.getFollowers(author);
                            this.seriesInfo.followers = followers;
                            this.seriesInfo.author_image = avatar
                            this.all_followers = [];
                        } else if (this.seriesInfo === undefined) {
                            console.log("error - fetching followers failed");
                        }
                    }
                    if (this.seriesDetail.length > 0 && page > 1 && this.seriesDetail[0] === undefined) {
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
                    for (let comment of results) {
                        comment.active_votes = await store.fetchActiveVotes(comment.author, comment.permlink);
                        comment.profile_image = await store.fetchAvatar(comment.author);
                    }
                    const replies = await store.fetchComments(result);
                    result.replies = replies
                }
            }

            if (results.length === 0 || results[0].parent_author.length > 0) {
                return results;
            }
        },
        async fetchAuthorSeries(author, last_author, last_permlink) {
            let last_result = {};
            const authorSeries = await client.database
                .getDiscussions('blog', {
                    tag: author,
                    start_author: last_author,
                    start_permlink: last_permlink,
                    limit: 100
                })
                .then(result => {
                    if (result.length > 0) {
                        last_result = result[result.length - 1];
                    }
                    return result;
                })
                .then(result =>
                    result.map(object => (
                        safeJSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(author))
                    ))
                ).then(result => [...new Set(result.flat())])

            for (let id of authorSeries) {
                if (store.authorInfo && store.authorInfo.series.length === 0) {
                    let series = await store.fetchSeriesInfo(id);
                    store.authorInfo.series.push(series);
                } else {
                    if (store.authorInfo) {
                        if (store.authorInfo.series && !store.authorInfo.series.some(object => object.seriesId === id)) {
                            let series = await store.fetchSeriesInfo(id);
                            store.authorInfo.series.push(series);
                        }
                    }
                }
            }

            if (authorSeries.length > 0) {
                store.fetchAuthorSeries(author, last_result.author, last_result.permlink);
            }
        },
        async fetchAuthorInfo(author) {
            this.authorInfo = [];
            this.authorInfo.series = [];
            this.all_followers = [];
            this.all_following = [];

            this.authorInfoState = "pending";
            try {
                const info = await client.database
                    .call('get_accounts', [[author]])
                    .then(result => {
                        if (result.length > 0) {
                            let json = safeJSON.parse(result[0].posting_json_metadata).profile;
                            result[0].about = json.about;
                            result[0].displayName = json.name;
                            result[0].website = json.website;
                            result[0].location = json.location;
                            result[0].cover = json.cover_image;
                            result[0].avatar = json.profile_image;
                            return result;
                        }
                    })
                if (info.length > 0) {
                    this.authorInfo = info[0];
                }

                runInAction(async () => {
                    const follow = await store.getFollowCount(author);
                    if (this.authorInfo) {
                        this.authorInfo.follow = follow;
                        this.authorInfoState = "done";
                        this.authorInfo.series = [];

                        store.fetchAuthorSeries(author);
                    }
                    const followers = await store.getFollowers(author);
                    const following = await store.getFollowing(author);
                    if (this.authorInfo) {
                        this.authorInfo.followers = followers;
                        this.authorInfo.following = following;
                    }
                    this.all_following = [];
                    this.all_followers = [];
                })

            } catch (error) {
                this.authorInfoState = "error"
                console.log(error)
            }

        },
        async getFollowCount(author) {
            const followCount = await client.call('follow_api', 'get_follow_count', [author])
                .then(result => { return result })

            return followCount;
        },
        async getFollowers(author, start, slice) {
            let last_follower = "";

            const followers = await client.call('follow_api', 'get_followers', [author, start, "blog", 1000])
                .then(result => {
                    if (result && result[result.length - 1]) {
                        last_follower = result[result.length - 1].follower;
                    }
                    return result.map(follow => follow.follower);
                })

            runInAction(() => {
                if (slice) {
                    this.all_followers = this.all_followers.concat(followers.slice(1));
                } else {
                    this.all_followers = this.all_followers.concat(followers);
                }
            })

            if (followers.length === 1000) {
                store.getFollowers(author, last_follower, true)
            } else {
                return this.all_followers;
            }
        },
        async getFollowing(author, start, slice) {
            let last_following = "";

            const following = await client.call('follow_api', 'get_following', [author, start, "blog", 1000])
                .then(result => {
                    if (result && result[result.length - 1]) {
                        last_following = result[result.length - 1].following;
                    }
                    return result.map(follow => follow.following);
                })

            runInAction(() => {
                if (slice) {
                    this.all_following = this.all_following.concat(following.slice(1));
                } else {
                    this.all_following = this.all_following.concat(following);
                }
            })

            if (following.length === 1000) {
                store.getFollowing(author, last_following, true)
            } else {
                return this.all_following;
            }
        }
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;
