import axios from 'axios';
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { AppDiv } from "./App.styled";

export class App extends Component {
  state = {
    searchInputValue: "",
    foundSearch: "",
    images: [],
    page: 1,
    totalPages: 1,
    loader: false,
    loadMoreButton: false,
    showModal: false,
    modalImgSrc: "",
  };

  handleSearchInput = e => {
    this.setState({searchInputValue: e.currentTarget.value.toLowerCase()});
  };

  handleSearchSubmit = e => {
    const {searchInputValue, foundSearch} = this.state;
    e.preventDefault();
    if (searchInputValue.trim() === '') {
      toast.error(`Search request shouldn't be empty`);
      return;
    };
    this.setState(() => {
        if(searchInputValue !== foundSearch) {
          return ({page:1, images:[], foundSearch:searchInputValue});
        };
      });
    window.scrollTo(0,0);
  };

  getImages = async () => {
    this.setState({loader:true, loadMoreButton:false});

    const apiKey = "32214751-b09778eb488071213c70b42e8";
    const url = `https://pixabay.com/api/?q=${this.state.searchInputValue}&page=${this.state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    
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
        return ({page:prevState.page+1})
      };
    });
  };

  modalOpen = e => {
    if(e.target.nodeName === 'IMG') {
      this.setState({showModal: true, modalImgSrc: e.target.getAttribute("data-modal")})
    };
  };

  modalClose = () => {
    this.setState({showModal: false, modalImgSrc: ""});
  };

  async componentDidUpdate(_, prevState) {
    if(prevState.foundSearch !== this.state.foundSearch || prevState.page !== this.state.page) {
      const response = await this.getImages();
      
      this.setState({images: [...this.state.images, ...response.images], totalPages: Math.ceil(response.totalHits / 12)})
      
      this.setState(prevState => {
        if(prevState.page < prevState.totalPages) {
          return ({loadMoreButton: true,})
        } else {
          //toast.info(`You've reached the end of search`);
          return ({loadMoreButton: false,})
        };
      });
      
      if(response.images.length === 0) {
        toast.error(`These are no "${this.state.foundSearch}" images`);
      } else {
        if(this.state.page === 1) {
          toast.success(`We found ${response.totalHits} images`);
        };
      };
      
    };
  };

  render() {
const {searchInputValue, images, loader, loadMoreButton, showModal, modalImgSrc, modalImgAlt} = this.state;

    return (
      <AppDiv>  
        <Searchbar search={searchInputValue} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {images !== [] && (<ImageGallery images={images} modalOpen={this.modalOpen}/>
        )}
        {loader === true && <Loader />}
        {loadMoreButton === true && <Button onClick={this.loadMore} />}
        {showModal === true && <Modal modalClose={this.modalClose} children={<img src={modalImgSrc} alt={modalImgAlt}/>}/>}
        <ToastContainer autoClose={2500} />
      </AppDiv> 
    );
  };
};
