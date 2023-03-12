import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export function ImageGallery ({images}) {
    return (
        <Ul class="gallery">
            {images.map(image =>
                {
                    return (
                        <ImageGalleryItem src={image.src} alt={image.alt}/>
                    );
                })}
            
        </Ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array,
};