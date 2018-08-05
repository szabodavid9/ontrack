import React from 'react';
import {Table} from 'react-bootstrap';

const BookList = (props) => {
    const {bookList} = props;
    return(
        <div className="book-list__wrapper">
            <Table className="book-list" striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Author</th>
                    <th>Publication city</th>
                    <th>Publication country</th>
                    <th>Publication year</th>
                    {/* <th>Subject</th> */}
                    <th>Title</th>
                    <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    bookList.map((book,index) => (
                        <tr key={book.id}>
                        <td>{index+1}</td>
                        <td>{book.book_author}</td>
                        <td>{book.book_publication_city}</td>
                        <td>{book.book_publication_country}</td>
                        <td>{book.book_publication_year}</td>
                        {/* <td>{book.book_subject}</td> */}
                        <td>{book.book_title}</td>
                        <td>{book.id}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 

export default BookList;