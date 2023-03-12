import PropTypes from 'prop-types';
import {Header, Form, Input, Label, Button} from './Searchbar.styled';

export function Searchbar({onSubmit}) {
    return (
    <Header>
        <Form onSubmit={() => onSubmit()}>
            <Button type="submit">
            🔍
                <Label>Search</Label>
            </Button>
        
            <Input
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </Form>
    </Header>);
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};