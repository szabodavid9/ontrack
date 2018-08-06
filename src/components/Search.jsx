import React,{Component} from 'react';
import axios from 'axios';
import {FormGroup, FormControl, InputGroup, Glyphicon, Button} from 'react-bootstrap';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: ''
        }

        this.search = this.search.bind(this);
    }

    search(){
        const {query} = this.state;
        const {count, setBooklist, setSearchOn} = this.props;
        
        axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
          page : 1,
          itemsPerPage : count, 
          filters:[{type: "all", values: [query]}]
        })
        .then(function (response) {
          setBooklist(response.data.books);
        })
        .catch(function (error) {
          console.log(error);
        });
        setSearchOn(true);
    }

    render(){
        return(
            <FormGroup>
                <InputGroup>
                    <FormControl
                    type='text'
                    placeholder='Search for a book'
                    onChange={event => {
                        this.setState(
                        {
                            query: event.target.value
                        }                               
                        )
                    }}
                    onKeyPress={event => {
                        if (event.key === 'Enter') { this.search() }
                    }}
                    />
                    <Button onClick={() => this.search()}>
                    <Glyphicon glyph="search" /> Search
                    </Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

export default Search;