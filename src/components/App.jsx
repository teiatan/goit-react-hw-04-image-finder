import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { getImages } from "apiService/apiService";
import { AppDiv } from "./App.styled";

export function App() {

  const [searchInputValue, setSearchInputValue] = useState("");
  const [foundSearch, setFoundSearch] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [showModal, setShowmodal] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const isFirstRender = useRef(true);
  
  useEffect(()=>{
    console.log(isFirstRender);
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };

    if (foundSearch.trim() !== '') {
      getImages(foundSearch, page).then(
        response => {
          setImages(prevState => [...prevState, ...response.images]);
          setLoadMoreButton(page < Math.ceil(response.totalHits / 12));
          
          if(response.images.length === 0) {
            toast.error(`These are no "${foundSearch}" images`);
            return;
          };
          
          if(page === 1) {
            toast.success(`We found ${response.totalHits} images`);
          };
        }
      ).catch(
        error => { 
          toast.error(error.message);
          console.log(error); 
        }
      ).finally(
        () => {
          setLoader(false);
        }
      );
      
    };    
  },[foundSearch, page]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    window.scrollTo(0,0);
    if (searchInputValue.trim() === '') {
      toast.error(`Search request shouldn't be empty`);
      return;
    };
    if(searchInputValue !== foundSearch) {
      setPage(1);
      setImages([]);
      setFoundSearch(searchInputValue);
      setLoadMoreButton(false);
    };
  };

  const loadMore = () => { 
    setPage(prevState => prevState+1)
  };

  const modalOpen = e => {
    if(e.target.nodeName === 'IMG') {
      setShowmodal(true);
      setModalImgSrc(e.target.getAttribute("data-modal"));
    };
  };

  const modalClose = () => {
    setShowmodal(false);
    setModalImgSrc("");
  };

  return (
    <AppDiv>  
      <Searchbar search={searchInputValue} onChange={handleSearchInput} onSubmit={handleSearchSubmit}/>
      {images.length !== 0 && (<ImageGallery images={images} modalOpen={modalOpen}/>
      )}
      {loader === true && <Loader />}
      {loadMoreButton && <Button onClick={loadMore} />}
      {showModal  && <Modal modalClose={modalClose} children={<img src={modalImgSrc} alt={"modalImgAlt"}/>}/>}
      <ToastContainer autoClose={2500} />
    </AppDiv> 
  );
};
