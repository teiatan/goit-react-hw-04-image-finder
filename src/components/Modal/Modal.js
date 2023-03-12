import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({src, alt}) {
    return (
    <DivOverlay>
        <DivModal>
            <img src={src} alt={alt} />
        </DivModal>
    </DivOverlay>
  );
};

Modal.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};