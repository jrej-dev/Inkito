import React from 'react';
import StoreContext from '../../../../stores/appStore';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import TrendyPanel from '../panels/trendypanel';
import NewPanel from '../panels/newpanel';

const PanelBlocks = ({ type, newData, trendyData, activeTrend, panelBlockNumber }) => {
    const store = React.useContext(StoreContext);
    const history = useHistory();

    const contentClickHandle = (props) => {
        if (type === "comics") {
          history.push(`/comicReader/${props.author}/${props.seriesTitle}`);
        } else if (type === "novels") {
          history.push(`/novelReader/${props.author}/${props.seriesTitle}`);
        }
    }

    return useObserver(() => {
      if(toJS(newData).length > 0 || toJS(trendyData).length > 0) {
        let fresh = [];
        let trendy = [];
        let category = "";
        if (type === "comics") {
          category = store.activeComicCategory.split(" ").join("").toLowerCase();
        } else if (type === "novels") {
          category = store.activeNovelCategory.split(" ").join("").toLowerCase();
        }

        if (activeTrend === "trendy") {
          fresh = [];
          trendy =  toJS(trendyData);
          if (category !== "allcategories") {
            trendy =  toJS(trendyData).filter(object => object.tags.includes(category));
          } 
        } else if (activeTrend === "new") {
          trendy =  [];
          fresh = toJS(newData);
          if (category !== "allcategories") {
            fresh = toJS(newData).filter(object => object.tags.includes(category));
          } 
        } else {
          if (category !== "allcategories") {
            trendy =  toJS(trendyData).filter(object => object.tags.includes(category));
            fresh = toJS(newData).filter(object => object.tags.includes(category));
          } else {
            fresh = toJS(newData);
            trendy =  toJS(trendyData);
          }
        }

        var singles = [];
        var blocks = []; 
        var singleBlocks = [];
        var blockNumber = panelBlockNumber;

        if (trendy.length < 4){
          blockNumber = parseInt(panelBlockNumber) + ( parseInt(panelBlockNumber) - parseInt(trendy.length));
        }

        for (let j = 0 ; j < blockNumber; j++) {
          if (fresh[j] !== undefined && trendy[j] !== undefined){ 
              if (j % 2 === 0) {
                blocks.push(
                  <div key={trendy[j].title} className={`panel-block ${j}`}>  
                    <TrendyPanel                    
                      content={trendy[j]}
                      onClick={contentClickHandle}
                      user={toJS(store.userDetail)}
                    />
                    <NewPanel                
                      content={fresh[j]}
                      onClick={contentClickHandle}
                      user={toJS(store.userDetail)}
                    />
                  </div>
                )
              } else {
                blocks.push(
                  <div key={fresh[j].title} className={`panel-block ${j}`}>
                    <NewPanel      
                      content={fresh[j]}
                      onClick={contentClickHandle}
                      user={toJS(store.userDetail)}
                    />
                    <TrendyPanel 
                      content={trendy[j]}
                      onClick={contentClickHandle}
                      user={toJS(store.userDetail)}
                   />
                  </div>
                )
              }
          } else if (fresh[j] && trendy[j] === undefined) {
            singles.push(
              <NewPanel 
                key={fresh[j].title}
                content={fresh[j]}
                onClick={contentClickHandle}
                user={toJS(store.userDetail)}
              />
            )
          } 
        }
        
        singles.forEach((value, index) => {
          if (index % 2 === 0) {
            singleBlocks.push(<div key={type + " single " + index} className="panel-block single">{singles.slice(index, index + 2)}</div>);
          }
        });
        
        return [...blocks, ...singleBlocks];        
      } else {
        return <wired-spinner class="custom" spinning duration="1000"/>
      }
    })
  }

  export default PanelBlocks;
