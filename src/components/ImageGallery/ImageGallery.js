import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export function ImageGallery ({images}) {
    return (
        <Ul>
            {images.map(image =>
                {
                    return (
                        <ImageGalleryItem key={image.id} src={image.src} alt={image.alt}/>
                    );
                })}
            
        </Ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array,
};