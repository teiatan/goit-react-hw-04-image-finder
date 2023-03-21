import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export function Modal({children, modalClose}) {

    useEffect(()=>{
            window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            modalClose();
        };
    };

    const handleBackdropClick = e => {
        if(e.target.id === "backdrop") {
            modalClose();
        };
    };

    return (
        <DivOverlay id={"backdrop"} onClick={handleBackdropClick}>
            <DivModal>
                {children}
            </DivModal>
        </DivOverlay>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
};