import React, {Component} from 'react';
import '../../sass/App.scss';

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';
import Promo from '../../components/Main/Promo';
import ContentDisplay from '../../components/Main/ContentDisplay';
import Footer from '../../components/Main/Footer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      promoArray: [
        {
            title: "Shades Of Men",
            author: "Jrej",
            thumbnail: "https://picsum.photos/300/500",
            link: "http://localhost:3000/jrej/shadesofmen",
        },
        {
            title: "IN/SYS",
            author: "Jrej",
            thumbnail: "https://picsum.photos/300/300",
            link: "http://localhost:3000/jrej/shadesofmen",
        }
      ],
      activeComicCategory : "All Categories",
      activeNovelCategory : "All Categories"
    }
  }

  comicCategoryClickHandle = (e) => {
    if (!e.target.className.includes("isActive")) {
      this.setState({ activeComicCategory : e.target.className });
    }
  }

  novelCategoryClickHandle = (e) => {
    if (!e.target.className.includes("isActive")) {
      this.setState({ activeNovelCategory : e.target.className });
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Hero />
        <Promo promoArray={this.state.promoArray} />
        <ContentDisplay content={"Comics"} activeCategory={this.state.activeComicCategory} catClickHandle={this.comicCategoryClickHandle} />
        <ContentDisplay content={"Novels"} activeCategory={this.state.activeNovelCategory} catClickHandle={this.novelCategoryClickHandle} />
        <Footer />
      </div>
    );
  }
}

export default App;
