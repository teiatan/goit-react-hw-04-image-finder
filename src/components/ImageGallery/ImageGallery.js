import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export function ImageGallery ({images, modalOpen}) {
    return (
        <Ul onClick={modalOpen}>
            {images.map(image =>
                {
                    return (
                        <ImageGalleryItem key={image.id} src={image.src} alt={image.alt} srcLarge={image.srcLarge}/>
                    );
                })}   
        </Ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        id: PropTypes.number,
        srcLarge: PropTypes.string,
    })),
    modalOpen: PropTypes.func,
};