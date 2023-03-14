import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem ({src, alt, srcLarge}) {
    return (
        <Li>
            <Img src={src} alt={alt} data-modal={srcLarge}/>
        </Li>
    );
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    srcLarge: PropTypes.string,
};