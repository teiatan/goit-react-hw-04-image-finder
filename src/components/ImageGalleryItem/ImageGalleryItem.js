import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem ({src, alt}) {
    return (
        <Li>
            <Img src={src} alt={alt} />
        </Li>
    );
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};