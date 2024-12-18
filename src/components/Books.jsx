import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function Books({ token }) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
                const result = await response.json();
                setBooks(result.books);
                setFilteredBooks(result.books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        fetchBooks();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const searchTerm = search.toLowerCase();
        const results = books.filter(
            book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
        );
        setFilteredBooks(results);
    }

    function handleChange(event) {
        setSearch(event.target.value);
    }


    async function handleCheckout(bookId) {
        if (!token) {
            return alert("Please Login to checkout books.");
        }

        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ available: false })
            });

            if (response.ok) {
                alert('Book checked out successfully!');

                const updatedBooks = books.map((book) =>
                    book.id === bookId ? { ...book, available: false } : book
                );
                setBooks(updatedBooks);
            } else {
                alert('Failed to check out book.');
            }
        } catch (error) {
            console.error('Error checking out book:', error);
        }

    }

    return (
        <div id='main'>
            <h1><
                span class="material-icons">star</span>
                Check Out The New Releases
                <span class="material-icons">star</span>
            </h1>
            <div className='search-filters' >
                <form onSubmit={handleSubmit}>
                    <div className='search-container'>
                        <input type="text" placeholder="Search books" value={search} name="search" onChange={handleChange}></input>
                    </div>

                    <div className='search-icon'>
                        <button type='submit'> <span className="material-icons">search</span></button>
                    </div>
                </form>

            </div>
            <div className='books-list'>
                {
                    search === "" ? (
                        books.length > 0 ? (
                            <ul>
                                {
                                    books.map(book => (
                                        <li key={book.id}>
                                            <figure>
                                                {
                                                    book.available === true && token && (
                                                        <div className='available'>
                                                            <h3>Available</h3>
                                                        </div>
                                                    )}
                                                <img src={book.coverimage} alt={`Cover of ${book.title}`} onClick={() => navigate(`/${book.id}`)} />
                                                <figcaption>
                                                    <header>
                                                        <h4><a href="#" onClick={() => navigate(`/${book.id}`)}>{book.title}</a> </h4>
                                                        <p><strong>Author : </strong> {book.author} </p>
                                                    </header>
                                                    <p className='description'>{book.description}</p>
                                                    {
                                                        book.available === true && token && (
                                                            <div className='actions'>
                                                                <button className="btn" type="submit" onClick={() => handleCheckout(book.id)} >Checkout Book</button>
                                                            </div>
                                                        )}
                                                </figcaption>
                                            </figure>
                                        </li>

                                    ))
                                }
                            </ul>

                        ) : (<p>No Books found.</p>)

                    ) : (
                        filteredBooks.length > 0 ? (
                            <ul>
                                {
                                    filteredBooks.map(book => (
                                        <li key={book.id}>
                                            <figure>
                                                <img src={book.coverimage} alt={`Cover of ${book.title}`} onClick={() => navigate(`/${book.id}`)} />
                                                <figcaption>
                                                    <header>
                                                        <h4><a href="#" onClick={() => navigate(`/${book.id}`)}>{book.title}</a> </h4>
                                                        <p><strong>Author : </strong> {book.author} </p>
                                                    </header>
                                                    <p className='description'>{book.description}</p>

                                                </figcaption>
                                            </figure>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (<p>No Books found.</p>)
                    )
                }
            </div>
        </div>
    );
}