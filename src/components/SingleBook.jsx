/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";

export default function SingleBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPlayer() {
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
                const result = await response.json();
                setBook(result.book)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlayer();
    }, [id])
    if (!book) return <p>Loading player details...</p>;

    return (
        <div className="bookdetails">
            <h3>{book.title}</h3>
            <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: "200px", height: "300px" }} />
            <h2>{book.author}</h2>
            <p>{book.description}</p>
            <button onClick={() => navigate('/books')}>Back to All Books</button>
        </div>
    );
}