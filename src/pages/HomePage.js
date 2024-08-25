import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/HomePage.css';

const HomePage = ({ onLogout }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                const allBooks = response.data;
                // Shuffle books and select the first 5
                const shuffledBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 5);
                setBooks(shuffledBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container">
            <aside className="sidebar">
                <h2 className="sidebar-title">Navigation</h2>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/staff" className="nav-link">Staff Info</Link></li>
                        <li><Link to="/users" className="nav-link">User Info</Link></li>
                        <li><Link to="/books" className="nav-link">Books</Link></li>
                        <li><button className="nav-link logout-button" onClick={onLogout}>Log Out</button></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <section className="section-books">
                    <h2 className="section-title">Available Books</h2>
                    <table className="books-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>ISBN</th>
                                <th>Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.copiesAvailable}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
