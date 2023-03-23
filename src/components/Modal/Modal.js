import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({children, modalClose}) {

    useEffect(()=>{
            window.addEventListener('keydown', closeModalByEscape);
        return () => {
            window.removeEventListener('keydown', closeModalByEscape);
        };
    });

    const closeModalByEscape = e => {
        if (e.code === 'Escape') {
            modalClose();
        };
    };

    const closeModalByBackdropClick = e => {
        if(e.target.id === "backdrop") {
            modalClose();
        };
    };

    return (
        <DivOverlay id={"backdrop"} onClick={closeModalByBackdropClick}>
            <DivModal>
                {children}
            </DivModal>
        </DivOverlay>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
};