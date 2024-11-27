/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useEffect, useState } from "react";

export default function Account({ token }) {
    const [accountInfo, setAccountInfo] = useState(null);
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
                        Authorization: `Bearer ${token}`
                    }
                })
                const result = await response.json();
                console.log(result);
                console.log('Retrieved token:', token);
                setAccountInfo(result);
            } catch (error) {
                console.error('Failed to fetch account info:', error);
            }
        }

        fetchAccountInfo();
    }, [])


    return (
        <div>
            {accountInfo && (
                <>
                    <p><strong>Email:</strong> {accountInfo.email}</p>
                    <p><strong>Name:</strong> {accountInfo.firstname}</p>
                    <h2>Checked-Out Books</h2>
                </>
            )}
        </div>
    );
}