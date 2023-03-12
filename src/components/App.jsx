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
    page: 1,
  }


  handleSearchInput = e => {
    this.setState({search: e.currentTarget.value});
  };

  getImages = () => {
    const apiKey = "32214751-b09778eb488071213c70b42e8";
    const url = `https://pixabay.com/api/?q=${this.state.search}=${this.state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  };

  loadMore = () => {
    console.log('Load more is clicked');
  };

  componentDidMount() {

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
