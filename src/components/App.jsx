import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export class App extends Component {

  loadMore = () => {
    console.log('Load more is clicked');
  };

  render() {
    return (
      <>
        <Searchbar />
        <Loader />
        <ImageGallery images={[{src:"", alt:"qwerty", id:1},{src:"", alt:"qwerty", id:2}]}/>
        <Button onClick={this.loadMore} />
        <Modal src={"src"} alt={"alt"}/>
      </>
    );
  };
};
