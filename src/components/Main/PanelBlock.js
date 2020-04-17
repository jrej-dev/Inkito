import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'wired-elements';

import TrendyPanel from '../Panels/TrendyPanel';
import NewPanel from '../Panels/NewPanel';
import { useHistory } from "react-router-dom";


const PanelBlocks = ({ type, newData, trendyData, panelBlockNumber }) => {
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
          category = store.activeComicCategory.replace(" ","").toLowerCase();
        } else if (type === "novels") {
          category = store.activeNovelCategory.replace(" ","").toLowerCase();
        }
        if (category !== "allcategories") {
          fresh = toJS(newData).filter(object => object.tags.includes(category));
          trendy =  toJS(trendyData).filter(object => object.tags.includes(category));
        } else {
          fresh = toJS(newData);
          trendy =  toJS(trendyData);
        }

        var blocks = []; 
        for (let j = 0 ; j < panelBlockNumber; j++) {
          if (fresh[j] !== undefined && trendy[j] !== undefined){            
              if (j % 2 === 0) {
                blocks.push(
                  <div key={trendy[j].title} className="panel-block">
                    <TrendyPanel 
                      content={trendy[j]}
                      onClick={contentClickHandle}
                    />
                    <NewPanel 
                      content={fresh[j]}
                      onClick={contentClickHandle}
                    />
                  </div>
                )
              } else {
                blocks.push(
                  <div key={fresh[j].title} className="panel-block">
                    <NewPanel 
                      content={fresh[j]}
                      onClick={contentClickHandle}
                    />
                    <TrendyPanel 
                      content={trendy[j]}
                      onClick={contentClickHandle}
                   />
                  </div>
                )
              }
          } else if (trendy[j] && fresh[j] === undefined) {
            blocks.push(
              <div key={trendy[j].title} className="panel-block">
                <TrendyPanel 
                  content={trendy[j]}
                  onClick={contentClickHandle}
                />
              </div>
            )
          } else if (fresh[j] && trendy[j] === undefined) {
            blocks.push(
              <div key={fresh[j].title} className="panel-block">
                <NewPanel 
                  content={fresh[j]}
                  onClick={contentClickHandle}
                />
              </div>
            )
          } else {
            return blocks;
          }
        }
        return blocks;
      } else {
        return <wired-spinner class="custom" spinning duration="1000"/>
      }
    })
  }

  export default PanelBlocks;