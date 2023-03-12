import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";


export const App = () => {
  return (
    <>
      <Searchbar />
      <Loader />
      <ImageGallery images={[{src:"", alt:"qwerty", id:1},{src:"", alt:"qwerty", id:2}]}/>
    </>
  );
};
