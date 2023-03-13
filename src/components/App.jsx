import axios from 'axios';
import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
//import { Modal } from "./Modal/Modal";
import { AppDiv } from "./App.styled";

export class App extends Component {
  state = {
    search: "",
    foundSearch: "",
    images: [],
    page: 1,
    totalPages: 0,
    loader: false,
    loadMoreButton: false,
  };

  handleSearchInput = e => {
    this.setState({search: e.currentTarget.value.toLowerCase()});
  };

  handleSearchSubmit = async e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      alert('Search request shouldn`t be empty');
      return;
    }
    this.setState({page:1, images: [], foundSearch:this.state.search});

    //const images = await this.getImages(1);
    //this.setState({images: images.images, totalHits: images.totalHits, page:1});
  };

  getImages = async () => {
    this.setState({loader:true});
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

  loadMore = async () => {
    if(this.state.page < this.state.totalPages) {    
      this.setState(prevState => {
        return ({page:prevState.page+1})
      });
    };
  };

  componentDidMount() {

  };

  async componentDidUpdate(_, prevState) {
    if(prevState.foundSearch !== this.state.foundSearch || prevState.page !== this.state.page) {
      const response = await this.getImages();
      this.setState({images: [...prevState.images, ...response.images], totalPages: response.totalHits})

      if(this.state.page === this.totalHits) {
        this.setState({loadMoreButton: false,})
      } else {
        this.setState({loadMoreButton: true,})
      };
    };
  };

  render() {
    return (
      <AppDiv>  
        <Searchbar search={this.state.search} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {this.state.loader === true && <Loader />}
        {this.state.images !== [] && (<ImageGallery images={this.state.images}/>
        )}
        {this.state.loadMoreButton === true && <Button onClick={this.loadMore} />}
        {/* <Modal src={"src"} alt={"alt"}/> */}
      </AppDiv> 
    );
  };
};
