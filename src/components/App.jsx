import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { getImages } from "apiService/apiService";
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

  async componentDidUpdate(_, prevState) {
    if(prevState.foundSearch !== this.state.foundSearch || prevState.page !== this.state.page) {
      
      this.setState({loader: true})
      
      try {
        const response = await getImages(this.state.searchInputValue, this.state.page);

        if(response.images.length === 0) {
          toast.error(`These are no "${this.state.foundSearch}" images`);
        return;
        };
        
        
        if(this.state.page === 1) {
          toast.success(`We found ${response.totalHits} images`);
        };
        
        this.setState(prevState => ({
          images: [...prevState.images, ...response.images], 
          loadMoreButton: this.state.page < Math.ceil(response.totalHits / 12), 
        }));
     
      } catch (error) {
        toast.error(error.message);
        
      }finally{this.setState({loader: false})}; 
    };
  };

  handleSearchInput = e => {
    this.setState({searchInputValue: e.currentTarget.value.toLowerCase()});
  };

  handleSearchSubmit = e => {
    const {searchInputValue, foundSearch} = this.state;
    e.preventDefault();
    window.scrollTo(0,0);
    if (searchInputValue.trim() === '') {
      toast.error(`Search request shouldn't be empty`);
      return;
    };
    if(searchInputValue !== foundSearch) {
      this.setState({page:1, images:[], foundSearch:searchInputValue, loadMoreButton: false,});
    };
  };

  loadMore = () => {    
    this.setState(prevState => {
      return ({page:prevState.page+1});
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

  render() {
    const {searchInputValue, images, loader, loadMoreButton, showModal, modalImgSrc, modalImgAlt} = this.state;
    return (
      <AppDiv>  
        <Searchbar search={searchInputValue} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {images.length !== 0 && (<ImageGallery images={images} modalOpen={this.modalOpen}/>
        )}
        {loader === true && <Loader />}
        {loadMoreButton && <Button onClick={this.loadMore} />}
        {showModal  && <Modal modalClose={this.modalClose} children={<img src={modalImgSrc} alt={modalImgAlt}/>}/>}
        <ToastContainer autoClose={2500} />
      </AppDiv> 
    );
  };
};
