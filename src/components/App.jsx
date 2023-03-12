import axios from 'axios';
import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
//import { Loader } from "./Loader/Loader";
//import { Button } from "./Button/Button";
//import { Modal } from "./Modal/Modal";
import { AppDiv } from "./App.styled";

export class App extends Component {
  state = {
    search: "",
    images: [],
    page: 1,
  }


  handleSearchInput = e => {
    this.setState({search: e.currentTarget.value});
  };

  handleSearchSubmit = async e => {
    e.preventDefault();
    const images = await this.getImages(1);
    this.setState({images: images});
  };

  getImages = async (page) => {
    const apiKey = "32214751-b09778eb488071213c70b42e8";
    const url = `https://pixabay.com/api/?q=${this.state.search}=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    const request = await axios.get(url);
    const response = JSON.parse(request.request.response);
    const totalHits = response.totalHits;
    const images = response.hits.map(hit => {
      return ({id: hit.id, src: hit.webformatURL, srcLarge:hit.largeImageURL, alt: hit.tags})
    });
    return images;
    
  };

  loadMore = () => {
    console.log('Load more is clicked');
  };

  componentDidMount() {

  };

  render() {
    return (
      <AppDiv>  
        <Searchbar search={this.state.search} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {this.state.images===[] || (
          <>
            {/* <Loader /> */}
            <ImageGallery images={this.state.images}/>
            {/* <Button onClick={this.loadMore} />
            <Modal src={"src"} alt={"alt"}/> */}
          </>
        )}
      </AppDiv> 
    );
  };
};
