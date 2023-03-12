import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ThreeCircles } from  'react-loader-spinner';

export const App = () => {
  return (
    <>
      <Searchbar />
      <ThreeCircles
        height="100"
        width="100"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
      <ImageGallery images={[{src:"", alt:"qwerty", id:1},{src:"", alt:"qwerty", id:2}]}/>
    </>
  );
};
