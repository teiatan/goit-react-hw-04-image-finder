import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {
  return (
    <>
      <Searchbar />
      <ImageGallery images={[{src:"", alt:"qwerty", id:1},{src:"", alt:"qwerty", id:2}]}/>
    </>
  );
};
