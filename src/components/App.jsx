import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup, FormControl, InputGroup, Glyphicon, Button} from 'react-bootstrap';
import {Redirect } from 'react-router-dom';

import Loader from './Loader';
import Pagination from './Pagination';
import BookList from './BookList';

import '../scss/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        count: 0,
        pageOfBooks: [],
        bookList : [],
        query: '',
        searchOn: false
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.search = this.search.bind(this);
  }

  onChangePage(pageOfBooks) {
    this.setState({ pageOfBooks: pageOfBooks });
  }

  search(){
    const {query, count} = this.state;
    let currentComponent = this;
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
      page : 1,
      itemsPerPage : count, 
      filters:[{type: "all", values: [query]}]
    })
    .then(function (response) {
      currentComponent.setState({
        bookList : response.data.books
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    currentComponent.setState({
      searchOn : true
    })
  }

  componentDidMount(){
    let currentComponent = this;

    axios.post('http://nyx.vima.ekt.gr:3000/api/books')
    .then(function (response) {
      const count = response.data.count;
      currentComponent.setState({
        count: count
      })
      axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
        page : 1,
        itemsPerPage : count
      })
      .then(function (response) {
        currentComponent.setState({
          bookList : response.data.books
        })
      })
      .catch(function (error) {
        window.location.reload();
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if (activepage === 1){
      this.setState({
        searchOn : false
      })
    }
    const { bookList, pageOfBooks, searchOn } = this.state;
    let   { activepage } = this.props.match.params;
    activepage = parseInt(activepage);
    
    return (
      <div className="App">
        {
        bookList.length > 0 || searchOn ? 
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
        : ''
        }
        {
          searchOn && activepage !==1
          ? <Redirect to='/active-page/1'/>
          : ''
        }
        {
          //Book list is loaded 
          bookList.length > 0 
          ? <BookList bookList={pageOfBooks}/> 
          : searchOn ? <h1>No result...</h1> : <Loader/>
        }
        <Pagination initialPage={activepage} items={bookList} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default App;
