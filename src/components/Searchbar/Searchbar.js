import PropTypes from 'prop-types';
import { useState } from 'react';
import {Header, Form, Input, Label, Button} from './Searchbar.styled';

export function Searchbar({handleSearchSubmit}) {

    const [input, setInput] = useState("");

    const onChange = e => {
        setInput(e.currentTarget.value.toLowerCase());
    };
    
    const onSubmit = e => {
        e.preventDefault(); 
        handleSearchSubmit(input);
    }
      
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
                    value={input}
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