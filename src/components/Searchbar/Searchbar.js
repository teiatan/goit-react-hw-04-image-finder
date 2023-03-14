import PropTypes from 'prop-types';
import {Header, Form, Input, Label, Button} from './Searchbar.styled';

export function Searchbar({search, onChange, onSubmit}) {
    return (
        <Header>
            <Form onSubmit={onSubmit}>
                <Button type="submit">🔍
                    <Label>Search</Label>
                </Button>
            
                <Input
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={search}
                    onChange={onChange}
                />
            </Form>
        </Header>
    );
};

Searchbar.propTypes = {
    search: PropTypes.string, 
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};