import PropTypes from 'prop-types';
import { Component } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';

export class Modal extends Component {

    static propTypes = {
        children: PropTypes.node,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.modalClose();
        };
    };

    handleBackdropClick = e => {
        if(e.target.id === "backdrop") {
            this.props.modalClose();
        };
    };

    render() {
        return (
            <DivOverlay id={"backdrop"} onClick={this.handleBackdropClick}>
                <DivModal>
                    {this.props.children}
                </DivModal>
            </DivOverlay>
        );
    };
};
