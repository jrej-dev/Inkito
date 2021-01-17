import React, { useEffect } from 'react';
import StoreContext from '../../../stores/appStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import '../reader.scss';
import ContentBody from '../contentbody/contentbody';
import InfoTab from '../infotab/infotab';

const Blog = ({ type, page, permlink, nextPermlink, author }) => {
  const store = React.useContext(StoreContext);
  
  useEffect(() => {
    if (store.seriesDetail.length > page) {
      //Fetching page only if undefined
      if (store.seriesDetail[page] === undefined) {
        store.fetchSeriesDetail(author, permlink, page);
      }
      //Fetching next page if needed
      if (page + 1 < store.seriesLinks.length && store.seriesDetail.length > 0 && store.seriesDetail[page + 1] === undefined) {
        store.fetchSeriesDetail(author, nextPermlink, page + 1);
      } else if (page + 1 === store.seriesLinks.length) {
        //Fetching author info on last page
        if (toJS(store.authorInfo) && toJS(store.authorInfo).name !== author) {
          store.fetchAuthorInfo(author);
        } else if (toJS(store.authorInfo).length === 0) {
          store.fetchAuthorInfo(author);
        }
      }
      //For the heart in the NavReader Bar
      if (store.seriesDetail.length > 0 && store.seriesDetail[store.seriesLinks.length - 1] === undefined) {
        store.fetchSeriesDetail(author, store.seriesLinks[store.seriesLinks.length - 1], store.seriesLinks.length - 1);
      }
    }
    window.addEventListener('scroll', closeZoomBanner);
  })

  const infoClickHandle = (e) => {
    if (e.target.className.includes("toggle")) {
      store.toggleInfoTab(page);
    } else if (e.target.className.includes("comment")) {
      store.toggleComments(page);
    }
  }

  const closeZoomBanner = () => {
    store.toggleZoomBanner(false);
  }


  var Content = () => {
    return useObserver(() => {
      if (toJS(store.seriesDetail).length > 0 && toJS(store.seriesDetail)[page] && store.activeComments && store.activeInfoTab) {
        if (store.seriesDetailState === "error") {
          window.location.reload();
        }
        if (type === "comics") {
          return (
            <div>
              <div className={`comic-body content-body zoom-${store.zoom}`} onClick={closeZoomBanner}>
                <ContentBody content={toJS(store.seriesDetail)[page]} />
              </div>
              <InfoTab
                commentIsActive={store.activeComments[page]}
                infoIsActive={store.activeInfoTab[page]}
                type={type}
                content={toJS(store.seriesDetail)[page]}
                onClick={infoClickHandle}
                zoom={store.zoom}
                page={page}
                replyIsActive={store.replyIsActive}

                userDetail={toJS(store.userDetail)}
                seriesInfo={toJS(store.seriesInfo)}
                followState={store.followState}
                commentState={store.commentState}
                voteState={store.voteState}
              />
            </div>
          )
        } else if (type === "novels") {
          return (
            <div>
              <div className="novel-body zoom-70">
                <wired-card elevation="2">
                  <div className="content-body">
                    <ContentBody content={toJS(store.seriesDetail)[page]} />
                  </div>
                </wired-card>
              </div>
              <InfoTab
                commentIsActive={store.activeComments[page]}
                infoIsActive={store.activeInfoTab[page]}
                type={type}
                content={toJS(store.seriesDetail)[page]}
                onClick={infoClickHandle}
                page={page}
                replyIsActive={store.replyIsActive}

                userDetail={toJS(store.userDetail)}
                seriesInfo={toJS(store.seriesInfo)}
                followState={store.followState}
                commentState={store.commentState}
                voteState={store.voteState}
              />
            </div>
          )
        }
      } else {
        return (
          <wired-spinner class="custom" spinning duration="1000" />
        )
      }
    })
  }

  return (
    <div className="blog">
      <Content />
    </div>
  );
}

export default Blog;
