import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({src, alt, children}) {
    return (
    <DivOverlay>
        <DivModal>
            {children}
        </DivModal>
    </DivOverlay>
  );
};

Modal.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};