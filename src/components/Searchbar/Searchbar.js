import PropTypes from 'prop-types';
import { useState } from 'react';
import {Header, Form, Input, Label, Button} from './Searchbar.styled';

export function Searchbar({onSubmit}) {

    const [input, setInput] = useState("");

    const onChange = e => {
        setInput(e.currentTarget.value.toLowerCase());
    };    
      
    return (
        <Header>
            <Form onSubmit={()=>onSubmit(input)}>
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