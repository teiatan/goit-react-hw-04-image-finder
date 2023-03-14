import PropTypes from 'prop-types';
import { ButtonEl } from './Button.styled';

export function Button({onClick}) {
    return (
        <ButtonEl onClick={() => onClick()}>Load more</ButtonEl>
    ); 
};

Button.propTypes = {
    onClick: PropTypes.func,
};