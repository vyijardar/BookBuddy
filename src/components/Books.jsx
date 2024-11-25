/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Books() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
                const result = await response.json();
                setBooks(result.books)
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, [])

    return (
        <>
            <h1>All Books</h1>
            <div className='main'>
                {
                    books.length > 0 ? (
                        <ul>
                            {
                                books.map(book => (
                                    <li key={book.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                                        <h3>{book.title}</h3>
                                        <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: "200px", height: "300px" }} onClick={() => navigate(`/${book.id}`)} />
                                        <h2>{book.author}</h2>
                                        <p>{book.description}</p>
                                    </li>

                                ))
                            }
                        </ul>

                    ) : (<p>No Books found.</p>)
                }
            </div>
        </>
    );
}