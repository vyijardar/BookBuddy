/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Books({ token }) {
    const [books, setBooks] = useState([]); // All books fetched from the API
    const [search, setSearch] = useState(''); // User input for searching
    const [filteredBooks, setFilteredBooks] = useState([]); // Books matching the search term
    const navigate = useNavigate();

    // Fetch books when the component mounts
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

    // Update filteredBooks whenever searchTerm or books change
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
        const searchTerm = search.toLowerCase();
        const results = books.filter(
            book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
        );
        setFilteredBooks(results);
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
                body:JSON.stringify({available: false})
            });
        
            if (response.ok) {
                alert('Book checked out successfully!');
                // Optionally refetch books to update availability
                const updatedBooks = books.map((book) =>
                    book.id === bookId ? { ...book, available: false } : book
                );
                console.log(updatedBooks);
                setBooks(updatedBooks);
            } else {
                alert('Failed to check out book.');
            }
        } catch (error) {
            console.error('Error checking out book:', error);
        }

    }

    return (
        <div className='main'>
            <h1>All Books</h1>
            <div className='searchbar'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search books" value={search} onChange={handleChange}></input>
                    <button type='submit'>Search</button>
                </form>

            </div>

            <div className='books-list'>
                {
                    search === "" ? (

                        books.length > 0 ? (
                            <ul>
                                {
                                    books.map(book => (
                                        <li key={book.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                                            <h3>{book.title}</h3>
                                            <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: "200px", height: "300px" }} onClick={() => navigate(`/${book.id}`)} />
                                            <h2>{book.author}</h2>
                                            <p>{book.description}</p>
                                            <p>{book.available}</p>
                                            {
                                                book.available === true && token && (
                                                    <button type="submit" onClick={() => handleCheckout(book.id)} >Checkout Book</button>
                                                )}

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
                                        <li key={book.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                                            <h3>{book.title}</h3>
                                            <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: "200px", height: "300px" }} onClick={() => navigate(`/${book.id}`)} />
                                            <h2>{book.author}</h2>
                                            <p>{book.description}</p>
                                            <p>{book.available}</p>
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