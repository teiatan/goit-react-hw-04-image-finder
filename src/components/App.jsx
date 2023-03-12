import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { AppDiv } from "./App.styled";

export class App extends Component {
  state = {
    search: "",
    images: [{src:"", alt:"qwerty", id:1},{src:"", alt:"qwerty", id:2}],
    page: 0,
  }


  handleSearchInput = e => {
    this.setState({search: e.currentTarget.value});
  };

  getImages = () => {

  };

  loadMore = () => {
    console.log('Load more is clicked');
  };

  componentDidMount() {
    this.getImages();
  };

  render() {
    return (
      <AppDiv>  
        <Searchbar search={this.state.search} onChange={this.handleSearchInput} onSubmit={this.getImages}/>
        {this.state.images!==[] || (
          <>
            <Loader />
            <ImageGallery images={this.state.images}/>
            <Button onClick={this.loadMore} />
            <Modal src={"src"} alt={"alt"}/>
          </>
        )}
      </AppDiv> 
    );
  };
};
