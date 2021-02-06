import React from 'react';
import { useLocalStore } from 'mobx-react';
import { runInAction } from 'mobx';
import { safeJSON } from '../middlewares/json';

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
        addTrendyComic: (res) => {
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
        addNewComic: (res) => {
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
        addTrendyNovel: (res) => {
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
        addNewNovel: (res) => {
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
        /*       
        General fetch
        type: "comics" || "novels"
        limit: number
        */
        fetchContent: async (type, limit) => {
            try {
                let skip;
                if (type === "comics") {
                    let allComics = [...store.trendingComics, ...store.newComics];
                    skip = allComics.length;
                } else if (type === "novels") {
                    let allNovels = [...store.trendingNovels, ...store.newNovels];
                    skip = allNovels.length;
                }
                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ type: type, limit: limit, skip: skip })
                };

                let seriesInfo = await fetch(`${ENDPOINT}/fetchContent`, options)
                    .then(res => res.json())

                runInAction(() => {
                    if (type === "comics") {
                        store.newComics = [...store.newComics, ...seriesInfo.new];
                        store.trendingComics = [...store.trendingComics, ...seriesInfo.trendy];
                    } else if (type === "novels") {
                        store.newNovels = [...store.newNovels, ...seriesInfo.new];
                        store.trendingNovels = [...store.trendingNovels, ...seriesInfo.trendy];
                    }
                })
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
            fetch(`${ENDPOINT}/logout`)
                .then(res => {
                    if (res && res.status === 200) {
                        store.userDetail = {};
                        document.location.href = '/';
                    }
                    localStorage.setItem('access-token', "");
                    localStorage.setItem('users', "");
                    store.userDetail = {};
                })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                })
            return false;
        },
        follow: (follower, following) => {
            runInAction(() => {
                store.followState = "pending";
            })

            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ follower, following })
            };

            fetch(`${ENDPOINT}/follow`, options)
                .then(res => {
                    if (res && res.status === 200) {
                        if (store.seriesInfo) {
                            store.seriesInfo.followers.push(follower);
                            runInAction(() => {
                                store.followState = "done";
                            })
                        } else {
                            console.log("failed to add follower - Please refresh.")
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    runInAction(() => {
                        store.followState = "error";
                    })
                })
        },
        unfollow: (unfollower, unfollowing) => {
            store.followState = "pending";

            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ unfollower, unfollowing })
            };

            fetch(`${ENDPOINT}/unfollow`, options)
                .then(res => {
                    if (res && res.status === 200) {
                        if (store.seriesInfo) {
                            store.followState = "done";
                            store.seriesInfo.followers = store.seriesInfo.followers.filter(follower => follower !== unfollower);
                        } else {
                            console.log("failed to remove from followers - Please refresh.")
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    store.followState = "error";
                })
        },
        vote: (voter, author, permlink, weight, page) => {
            store.voteState = permlink;

            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ voter, author, permlink, weight })
            };

            fetch(`${ENDPOINT}/vote`, options)
                .then(res => {
                    if (res && res.status === 200) {
                        runInAction(() => {
                            const votes = res.votes;
                            const reward = res.reward;

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
                    }
                })
                .catch(err => {
                    store.voteState = "error";
                    console.log(err);
                })
        },
        //The comment() method is rate limited to 5 minutes per root comment (post), and 20 seconds per non-root comment (reply).
        comment: (parent_author, parent_permlink, author, permlink, title, body, json_metadata, page, update) => {
            store.commentState = "pending";

            let params = {
                parent_author,
                parent_permlink,
                author,
                permlink,
                title,
                body,
                json_metadata: safeJSON.stringify(json_metadata),
            };

            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ parent_author, parent_permlink, author, permlink, title, body, json_metadata, update })
            };

            fetch(`${ENDPOINT}/comment`, options)
                .then(res => {
                    if (res && res.status === 200) {
                        store.commentState = "done";
                        store.toggleReplyIsActive(parent_permlink);

                        runInAction(() => {
                            params.pending_payout_value = "0.000 HBD";
                            params.total_payout_value = "0.000 HBD";
                            params.created = new Date().toISOString();
                            params.active_votes = [];

                            function findParentPermlink(content) {
                                if (content.permlink === parent_permlink) {
                                    content.replies.push(params);
                                } else {
                                    for (let reply of content.replies) {
                                        findParentPermlink(reply)
                                    }
                                }
                            }

                            if (store.seriesDetail.length > page) {
                                findParentPermlink(store.seriesDetail[page]);
                            }
                        })
                    }
                })
                .catch(err => {
                    store.commentState = "error";
                    console.log(err);
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

            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ params })
            };

            fetch(`${ENDPOINT}/updateProfile`, options)
                .then(res => {
                    if (res && res.status === 200) {
                        store.updateProfileState = "done";
                    }
                })
                .catch(err => {
                    store.updateProfileState = "error";
                    console.log(err);
                })
        },
        fetchPermlinks: async (author, title) => {
            store.seriesInfo = {};
            store.seriesInfo.author = author;
            store.seriesInfo.series_title = title;

            store.seriesDetail = [];
            store.seriesLength = 1;
            store.seriesLinkState = "pending";
            try {
                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ author, title })
                };

                let permlinks = await fetch(`${ENDPOINT}/fetchPermlinks`, options)
                    .then(res => res.json())
                    .catch(err => {
                        store.updateProfileState = "error";
                        console.log(err);
                    })

                runInAction(() => {
                    store.seriesLinks = permlinks;
                    store.seriesLinkState = "done";

                    store.seriesDetail.length = store.seriesLinks.length;
                    store.activeInfoTab = store.seriesLinks.map(object => object = false);
                    store.activeComments = store.seriesLinks.map(object => object = false);
                })

            } catch (error) {
                store.seriesLinkState = "error"
                console.log(error)
            }
        },
        fetchSeriesDetail: async (author, permlink, page) => {
            store.seriesDetailState = "pending";
            store.all_followers = [];
            try {
                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ author, permlink })
                };

                let content = await fetch(`${ENDPOINT}/fetchSeriesDetail`, options)
                    .then(res => res.json())
                    .catch(err => {
                        console.log(err);
                    })

                runInAction(async () => {
                    if (store.seriesDetail && store.seriesDetail.length > page) {
                        store.seriesDetail[page] = content;
                    }
                    const result = await store.fetchComments(content.author, content.permlink);

                    if (store.seriesDetail && store.seriesDetail.length > 0 && store.seriesDetail[page]) {
                        store.seriesDetail[page].replies = result;
                        store.seriesDetailState = "done";
                        if (store.seriesInfo) {
                            const avatar = await store.fetchAvatar(author);
                            const followers = await store.getFollowers(author);
                            store.seriesInfo.followers = followers;
                            store.seriesInfo.author_image = avatar
                            store.all_followers = [];
                        } else if (store.seriesInfo === undefined) {
                            console.log("error - fetching followers failed");
                        }
                    }
                    if (store.seriesDetail && store.seriesDetail.length > 0 && page > 1 && store.seriesDetail[0] === undefined) {
                        store.fetchSeriesDetail(author, store.seriesLinks[0], 0);
                    }
                });

            } catch (error) {
                store.seriesDetailState = "error"
                console.log(error)
            }
        },
        fetchComments: async (author, permlink) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author, permlink })
            };

            return await fetch(`${ENDPOINT}/fetchComments`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })
        },
        fetchAuthorSeries: async (author) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author })
            };

            let authorSeries = await fetch(`${ENDPOINT}/fetchAuthorSeries`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })

            store.authorInfo.series = [...store.authorInfo.series, ...authorSeries];
            store.authorInfo.series = [...new Set(store.authorInfo.series)];
        },
        async fetchSeriesInfo(seriesId) {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ seriesId })
            };

            const seriesInfo = await fetch(`${ENDPOINT}/fetchSeries`, options)
                .then(res => res.json());

            return seriesInfo;
        },
        async fetchAuthorInfo(author) {
            store.authorInfo = [];
            store.authorInfo.series = [];
            store.all_followers = [];
            store.all_following = [];

            store.authorInfoState = "pending";
            try {
                let options = {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: safeJSON.stringify({ author })
                };

                const info = await fetch(`${ENDPOINT}/fetchAuthorInfo`, options)
                    .then(res => res.json())
                    .catch(err => { console.log(err) })

                if (info && info.length > 0) {
                    store.authorInfo = info[0];
                }

                runInAction(async () => {
                    const follow = await store.getFollowCount(author);
                    if (store.authorInfo) {
                        store.authorInfo.follow = follow;
                        store.authorInfoState = "done";
                        store.authorInfo.series = [];

                        store.fetchAuthorSeries(author);
                    }
                    const followers = await store.getFollowers(author);
                    const following = await store.getFollowing(author);
                    if (store.authorInfo) {
                        store.authorInfo.followers = followers;
                        store.authorInfo.following = following;
                    }
                    store.all_following = [];
                    store.all_followers = [];
                })

            } catch (error) {
                store.authorInfoState = "error"
                console.log(error)
            }

        },
        getFollowCount: async (author) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author })
            };

            return await fetch(`${ENDPOINT}/fetchFollowCount`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })
        },
        fetchAvatar: async (author) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author })
            };

            return await fetch(`${ENDPOINT}/fetchAvatar`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })
        },
        getFollowers: async (author) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author })
            };

            let followers = await fetch(`${ENDPOINT}/fetchFollowers`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })

            if (followers) {
                return followers;
            } else {
                return [];
            }
        },
        getFollowing: async (author) => {
            let options = {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: safeJSON.stringify({ author })
            };

            return await fetch(`${ENDPOINT}/fetchFollowing`, options)
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                })
        }
    }));
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export default StoreContext;
