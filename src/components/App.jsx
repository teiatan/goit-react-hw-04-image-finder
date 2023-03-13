import axios from 'axios';
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
    foundSearch: "",
    images: [],
    page: 1,
    totalPages: 1,
    loader: false,
    loadMoreButton: false,
    showModal: false,
    modalImgSrc: "https://pixabay.com/get/g803966287f8aae001fe72a363b20b56d487cb3d3025c5bab81a9a655bc4642288d0ff4e4181c944eb3e4dcaec80ff96d4887bd1b0f161ff231e92792d33f2e15_1280.jpg",
    modalImgAlt: "",
  };

  handleSearchInput = e => {
    this.setState({search: e.currentTarget.value.toLowerCase()});
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Search request shouldn`t be empty');
      return;
    }
    this.setState(() => {
        if(this.state.search !== this.state.foundSearch) {
          return ({page:1, images:[], foundSearch:this.state.search});
        };
      });
    window.scrollTo(0,0);
  };

  getImages = async () => {
    this.setState({loader:true, loadMoreButton:false});
    const apiKey = "32214751-b09778eb488071213c70b42e8";
    const url = `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    
    const request = await axios.get(url);
    const response = JSON.parse(request.request.response);
    const totalHits = response.totalHits;
    const images = response.hits.map(hit => {
      return ({id: hit.id, src: hit.webformatURL, srcLarge:hit.largeImageURL, alt: hit.tags})
    });
    this.setState({loader:false})
    return {images, totalHits};
    
  };

  loadMore = () => {    
      this.setState(prevState => {
        if(this.state.page < this.state.totalPages) {
        return ({page:prevState.page+1})};
      });
  };

  modalOpen = e => {
    if(e.target.nodeName === 'IMG') {
      this.setState({showModal: true, modalImgSrc: e.target.getAttribute("data-modal")})
    }
  };

  modalClose = () => {
    this.setState({showModal: false, modalImgSrc: ""});
  };

  async componentDidUpdate(_, prevState) {
    if(prevState.foundSearch !== this.state.foundSearch || prevState.page !== this.state.page) {
      const response = await this.getImages();
      this.setState({images: [...this.state.images, ...response.images], totalPages: response.totalHits})
      this.setState(prevState => {
        if(prevState.page < prevState.totalPages) {
          return ({loadMoreButton: true,})
        } else {
          return ({loadMoreButton: false,})
        };
      });
      
    };
  };

  render() {
    return (
      <AppDiv>  
        <Searchbar search={this.state.search} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {this.state.images !== [] && (<ImageGallery images={this.state.images} modalOpen={this.modalOpen}/>
        )}
        {this.state.loader === true && <Loader />}
        {this.state.loadMoreButton === true && <Button onClick={this.loadMore} />}
        {this.state.showModal === true && <Modal modalClose={this.modalClose} children={<img src={this.state.modalImgSrc} alt={this.state.modalImgAlt}/>}/>}
      </AppDiv> 
    );
  };
};
