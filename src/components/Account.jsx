import { useEffect, useState } from "react";

export default function Account({ token }) {
    const [accountInfo, setAccountInfo] = useState({});
    const [checkedOutBooks, setCheckedOutBooks] = useState([]);
    useEffect(() => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }
        async function fetchAccountInfo() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                    method: "GET",
                    headers:
                    {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })

                const result = await response.json();
                setAccountInfo(result);

            } catch (error) {
                console.error('Failed to fetch account info.', error);
            }
        }
        async function fetchCheckOutBooks() {
            try {
                const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
                    headers:
                    {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await response.json();
                setCheckedOutBooks(data.reservation);

            } catch (error) {
                console.error("Error fetching checkout-books.", error);
            }
        }
        fetchCheckOutBooks();
        fetchAccountInfo();
        return () => { };
    }, [token])
    async function handleReturn(reservationId) {
        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
                {
                    method: "DELETE",
                    headers:
                    {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
            if (!response.ok) {
                alert("Book Returned successfully")
            }
            setCheckedOutBooks((prevBooks) => prevBooks.filter(book => book.id !== reservationId));
        } catch (error) {
            console.error("Error returning books.", error);
        }
    }
    if (!token) {
        return <p>You need to login to view your account.</p>
    }
    return (
        <div id="account">
            <div className='books-list'>
                {accountInfo && (
                    <div className="account-info">
                        <p><strong>Email Id:</strong> {accountInfo.email} </p>
                        <h1>Checked-Out Books</h1>
                    </div>
                )}
                {checkedOutBooks && checkedOutBooks.length > 0 ? (
                    <ul>
                        {checkedOutBooks.map((reservation) => (
                            <li key={reservation.id}>

                                <figure>
                                    <img src={reservation.coverimage} alt={`Cover of ${reservation.title}`} onClick={() => navigate(`/${book.id}`)} />
                                    <figcaption>
                                        <header>
                                            <h4><a href="#" onClick={() => navigate(`/${book.id}`)}>{reservation.title}</a> </h4>
                                            <p><strong>Author : </strong> {reservation.author}</p>
                                        </header>

                                        <p className="description">{reservation.description}</p>
                                        <div className='actions'>
                                            <button className="btn" type="submit" onClick={() => handleReturn(reservation.id)} >Return Book</button>
                                        </div>
                                    </figcaption>
                                </figure>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have 0 books checked out.</p>
                )}
            </div>
        </div>
    );
}