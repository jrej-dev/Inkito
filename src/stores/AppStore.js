
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

//Hivesigner
var hivesigner = require('hivesigner');

var api = new hivesigner.Client({
    app: 'inkito',
    callbackURL: 'https://www.inkito.io',
    accessToken: 'access_token',
    scope: ['vote', 'comment', 'follow', 'posting'],
});

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
                link: "https://www.inkito.io/comicReader/jrej/ghoulredone"
            },
            {
                title: "IN/SYS",
                author: "Jrej",
                thumbnail: "https://picsum.photos/400/300",
                link: "https://www.inkito.io/comicReader/jrej/shadesofmen"
            }
        ],

        //Content Display Data
        trendingComics: [],
        newComics: [],
        trendingNovels: [],
        newNovels: [],
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
        zoom: 70,
        zoomIsActive: false,
        clickedSeriesAuthor: "",
        clickedSeriesTitle: "",
        clickedSeriesContent: "",
        startPage: 0,
        currentPage: 0,
        navIsHidden: false,
        navMenuIsActive: false,
        shareMenuIsActive: false,
        shareMenuBottomIsActive: false,
        cookieConsent: null,
        replyIsActive: "",

        //Data states
        trendyComicState: "",
        newComicState: "",
        trendyNovelState: "",
        newNovelState: "",
        postDetailState: "",
        seriesDetailState: "",
        seriesLinkState: "",
        commentState: "",
        authorInfoState: "",
        voteState: "",
        followState: "",

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
        removeDuplicateContent: (newIds, trendyIds) => {
            return newIds.filter(id =>
                !trendyIds.includes(id)
            )
        },
        setSpinnerTimeout: (value) => {
            store.spinnerTimeout = value;
        },
        resetSeriesDetail: () => {
            store.zoom = 70;
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
            store.cookieConsent = JSON.parse(cookie);
        },
        toggleReplyIsActive: (value) => {
            if (store.replyIsActive === value) {
                store.replyIsActive = "";
            } else if (store.replyIsActive !== value) {
                store.replyIsActive = value;
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
        initHSLogin: () => {
            let link = api.getLoginURL();
            runInAction(() => {
                store.loginLink = link;
            })
        },
        follow: (follower, following) => {
            runInAction (() => {
                store.followState = "pending";
            })

            api.follow(follower, following, function (err, res) {
                if (res) {
                    console.log(res);
                    if (store.seriesInfo) {
                        store.seriesInfo.followers.push(follower);
                        runInAction (() => {
                            store.followState = "done";
                        })
                    } else {
                        console.log("failed to add follower - Please refresh.")
                    }
                } else if (err) {
                    console.log(err);
                    runInAction (() => {
                        store.followState = "error";
                    })
                }
            })
        },
        unfollow: (unfollower, unfollowing) => {
            store.followState = "pending";

            api.unfollow(unfollower, unfollowing, function (err, res) {
                if (res) {
                    console.log(res);
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
                    console.log(res);
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
        comment: (parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, page) => {
            store.commentState = "pending";
            let tx = [];
            let params = {
                parent_author: parentAuthor,
                parent_permlink: parentPermlink,
                author,
                permlink,
                title,
                body,
                json_metadata: JSON.stringify(jsonMetadata),
            };

            tx.push(['comment', params]);
            tx.push(store.getBeneficiaries(author, permlink));

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

                        if (store.seriesDetail.length > page){
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
        getUserDetail: (localAccess, localUser) => {
            store.userDetail = {};
            var params = {};

            if (localAccess && localUser) {
                var access_token = localAccess;
                var username = localUser;

            } else if (hivesigner.useHiveKeychain) {
                // The "username" parameter is required prior to log in for "Hive Keychain" users.
                params = { username: 'fabien' };
                api.login(params, function (err, token) {
                    console.log(err, token)
                });
            } else {
                access_token = new URLSearchParams(document.location.search).get('access_token');
                username = new URLSearchParams(document.location.search).get('username');
            }

            if (access_token) {
                // set access token after login
                api.setAccessToken(access_token);
                store.toggleNavMenu(false);

                api.me((err, res) => {
                    if (res) {
                        runInAction(() => {
                            store.userDetail = res;
                            if (store.cookieConsent && access_token) {
                                localStorage.setItem('access-token', JSON.stringify(access_token));
                            }
                            if (store.cookieConsent && username) {
                                localStorage.setItem('users', JSON.stringify(username));
                            }
                        })
                    }
                    if (err) {
                        console.log(err);
                    }
                })
            }
        },
        async fetchSeriesInfo(seriesId) {
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
        async fetchComics(last_trendy_author, last_trendy_permlink, last_new_author, last_new_permlink) {
            this.trendyComicState = "pending"
            try {
                let last_trendyComic = {};
                const trendyComicIds = await client.database
                    .getDiscussions("trending",
                        {
                            tag: "inkito-comics",
                            limit: 32,
                            start_author: last_trendy_author,
                            start_permlink: last_trendy_permlink
                        }
                    )
                    .then(result => {
                        if (result.length > 0) {
                            last_trendyComic = result[result.length - 1];
                        }
                        return result;
                    })
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])
                for (let id of trendyComicIds) {
                    if (this.trendingComics.length === 0) {
                        const comic = await store.fetchSeriesInfo(id);
                        this.trendingComics.push(comic);
                    } else {
                        if (!this.trendingComics.some(object => object.seriesId === id)) {
                            const comic = await store.fetchSeriesInfo(id);
                            this.trendingComics.push(comic);
                        }
                    }
                }
                this.trendyComicState = "done";

                this.newComicState = "pending";

                let last_newComic = {};
                const createdComicIds = await client.database
                    .getDiscussions("created",
                        {
                            tag: "inkito-comics",
                            limit: 32,
                            start_author: last_new_author,
                            start_permlink: last_new_permlink
                        }
                    )
                    .then(result => {
                        if (result.length > 0) {
                            last_newComic = result[result.length - 1];
                        }
                        return result;
                    })
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])
                const newComicIds = this.removeDuplicateContent(createdComicIds, trendyComicIds);

                for (let id of newComicIds) {
                    if (this.newComics.length === 0) {
                        const comic = await store.fetchSeriesInfo(id);
                        this.newComics.push(comic);
                    } else {
                        if (!this.newComics.some(object => object.seriesId === id)) {
                            const comic = await store.fetchSeriesInfo(id);
                            this.newComics.push(comic);
                        }
                    }
                }
                this.newComicState = "done";

                // Incorporate lazy load
                if (createdComicIds.length > 2 || trendyComicIds.length > 2) {
                    store.fetchComics(last_trendyComic.author, last_trendyComic.permlink, last_newComic.author, last_newComic.permlink);
                }

            } catch (error) {
                console.log(error);
            }
        },
        async fetchNovels(last_trendy_author, last_trendy_permlink, last_new_author, last_new_permlink) {
            this.trendyNovelState = "pending";
            let last_trendyNovel = {};
            try {
                const trendyNovelIds = await client.database
                    .getDiscussions("trending",
                        {
                            tag: "inkito-novels",
                            limit: 32,
                            start_author: last_trendy_author,
                            start_permlink: last_trendy_permlink
                        }
                    )
                    .then(result => {
                        if (result.length > 0) {
                            last_trendyNovel = result[result.length - 1];
                        }
                        return result;
                    })
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])
                //const trendy = [];

                for (let id of trendyNovelIds) {
                    if (this.trendingNovels.length === 0) {
                        const novel = await store.fetchSeriesInfo(id);
                        this.trendingNovels.push(novel);
                    } else {
                        if (!this.trendingNovels.some(object => object.seriesId === id)) {
                            const novel = await store.fetchSeriesInfo(id);
                            this.trendingNovels.push(novel);
                        }
                    }
                    //trendy.push(novel);
                }
                this.trendyNovelState = "done";
                //this.trendingNovels = trendy;

                this.newNovelState = "pending";
                let last_newNovel = {};
                const createdNovelIds = await client.database
                    .getDiscussions("created",
                        {
                            tag: "inkito-novels",
                            limit: 32,
                            start_author: last_new_author,
                            start_permlink: last_new_permlink
                        }
                    )
                    .then(result => {
                        if (result.length > 0) {
                            last_newNovel = result[result.length - 1];
                        }
                        return result;
                    })
                    .then(result => result.map(object => (
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(object.author))
                    ))).then(result => [...new Set(result.flat())])

                const newNovelIds = this.removeDuplicateContent(createdNovelIds, trendyNovelIds);
                //const fresh = [];

                for (let id of newNovelIds) {
                    if (this.newNovels.length === 0) {
                        const novel = await store.fetchSeriesInfo(id);
                        this.newNovels.push(novel);
                    } else {
                        if (!this.newNovels.some(object => object.seriesId === id)) {
                            const novel = await store.fetchSeriesInfo(id);
                            this.newNovels.push(novel);
                        }
                    }
                }
                this.newNovelState = "done"

                // Incorporate lazy load
                if (createdNovelIds.length > 1 || trendyNovelIds.length > 1) {
                    store.fetchNovels(last_trendyNovel.author, last_trendyNovel.permlink, last_newNovel.author, last_newNovel.permlink);
                }

            } catch (error) {
                console.log(error);
            }
        },
        async fetchPermlinks(author, seriesTitle, last_author, last_permlink, slice) {
            let seriesId = `${author}-${seriesTitle}`;
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
                        if (page === 0 && this.seriesInfo) {
                            const followers = await store.getFollowers(author);
                            this.seriesInfo.followers = followers;
                            this.all_followers = [];
                        } else if (this.seriesDetail[0] === undefined) {
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
                        const votes = await store.fetchActiveVotes(comment.author, comment.permlink);
                        comment.active_votes = votes;
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
                        JSON.parse(object.json_metadata).tags
                            .filter(tag => tag.includes(`${author}-`))
                    ))
                ).then(result => [...new Set(result.flat())])

            for (let id of authorSeries) {
                if (store.authorInfo && store.authorInfo.series.length === 0) {
                    let series = await store.fetchSeriesInfo(id);
                    store.authorInfo.series.push(series);
                } else {
                    if (store.authorInfo && !store.authorInfo.series.some(object => object.seriesId === id)) {
                        let series = await store.fetchSeriesInfo(id);
                        store.authorInfo.series.push(series);
                    }
                }
            }

            if (authorSeries.length > 0) {
                store.fetchAuthorSeries(author, last_result.author, last_result.permlink);
            }
        },
        async fetchAuthoInfo(author) {
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
                            let json = JSON.parse(result[0].json_metadata).profile;
                            result[0].about = json.about;
                            result[0].website = json.website;
                            result[0].location = json.location;
                            result[0].cover = json.cover_image;
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
        //to be fixed
        async getFollowCount(author) {
            const followCount = await client.call('follow_api', 'get_follow_count', [author])
                .then(result => { return result })

            return followCount;
        },
        async getFollowers(author, start, slice) {
            let last_follower = "";

            const followers = await client.call('follow_api', 'get_followers', [author, start, "blog", 1000])
                .then(result => {
                    if (result) {
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
                    if (result) {
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
