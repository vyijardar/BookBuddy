/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
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
                // console.log(result);
                // console.log('Retrieved token:', token);
                setAccountInfo(result);

            } catch (error) {
                console.error('Failed to fetch account info:', error);
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
                // console.log('Checked-Out Books:', data);
                setCheckedOutBooks(data.reservation);

            } catch (error) {
                console.error("Error fetching checkout-books:", error);
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

        }
    }
    if (!token) {
        return <p>You need to login to view your account.</p>
    }
    return (
        <div className="account">
            {accountInfo && (
                <>
                    <p><strong>Email:</strong> {accountInfo.email}</p>
                    <p><strong>Name:</strong> {accountInfo.firstname} {accountInfo.lastname}</p>
                    <h2>Checked-Out Books</h2>

                </>
            )}
            {checkedOutBooks && checkedOutBooks.length > 0 ? (
                <ul>
                    {checkedOutBooks.map((reservation) => (
                        <li key={reservation.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                            <h3>{reservation.title}</h3>
                            <img src={reservation.coverimage} alt={`Cover of ${reservation.title}`} style={{ width: "200px", height: "300px" }} onClick={() => navigate(`/${book.id}`)} />
                            <h2>{reservation.author}</h2>
                            <p>{reservation.description}</p>
                            <p>{reservation.available}</p>
                            <button type="submit" onClick={() => handleReturn(reservation.id)} >Return Book</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have 0 books checked out.</p>
            )}
        </div>
    );
}