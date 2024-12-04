import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
                const result = await response.json();
                setBook(result.book);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBook();
    }, [id])
    if (!book) return <p>Loading player details...</p>;

    return (
        <div id="book-details">
            <div className="book-image">
                <img src={book.coverimage} alt={`Cover of ${book.title}`} />
            </div>
            <div className="book-description">
                <h1>{book.title}</h1>
                <p><strong>Author : </strong>{book.author}</p>
                <p>{book.description}</p>
                <div className='actions'>
                    <button className="btn" onClick={() => navigate('/books')}>Back to All Books</button>
                </div>
            </div>
        </div>
    );
}