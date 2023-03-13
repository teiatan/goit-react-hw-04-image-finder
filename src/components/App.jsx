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
    images: [],
    page: 1,
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
    this.setState({page:1, loader: true, images: [], loadMoreButton: false});

    //const images = await this.getImages(1);
    //this.setState({images: images.images, totalHits: images.totalHits, page:1});
  };

  getImages = async (page) => {
    this.setState({loader:true});
    const apiKey = "32214751-b09778eb488071213c70b42e8";
    const url = `https://pixabay.com/api/?q=${this.state.search}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
    const request = await axios.get(url).finally(() => this.setState({loader:false}));
    const response = JSON.parse(request.request.response);
    const totalHits = response.totalHits;
    const images = response.hits.map(hit => {
      return ({id: hit.id, src: hit.webformatURL, srcLarge:hit.largeImageURL, alt: hit.tags})
    });
    
    console.log('11111');
    return {images, totalHits};
    
  };

  loadMore = async () => {
    if(this.state.page < this.state.totalHits) {
      const page = this.state.page + 1;
      const apiResponce = await this.getImages(page);
      
      this.setState(async prevState => {
        //const page = prevState.page + 1;
        //const apiResponce = await this.getImages(page);
        console.log([...prevState.images, ...apiResponce.images]);
        return ({images: [...prevState.images, ...apiResponce.images], page: page})
      })
      console.log('333333');
    };
  };

  componentDidMount() {

  };

  componentDidUpdate() {

  };

  render() {
    return (
      <AppDiv>  
        <Searchbar search={this.state.search} onChange={this.handleSearchInput} onSubmit={this.handleSearchSubmit}/>
        {this.state.loader === true && <Loader />}
        {this.state.images !== [] && (
          <>
            <ImageGallery images={this.state.images}/>
            
            {/* <Modal src={"src"} alt={"alt"}/> */}
          </>
        )}
        {this.state.loadMoreButton === true && <Button onClick={this.loadMore} />}

      </AppDiv> 
    );
  };
};
