/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const ReaderSection = () => {
    const [books, setBooks] = useState([]);
    const [expandedBook, setExpandedBook] = useState(null); // Track which book is expanded

    // Fetch books from localStorage
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(savedBooks);
    }, []);

    // Handle like and heart actions
    const handleLike = (index) => {
        const updatedBooks = [...books];
        updatedBooks[index].likes += 1;
        updatedBooks.sort((a, b) => b.likes - a.likes); // Sort by likes
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    const handleHeart = (index) => {
        const updatedBooks = [...books];
        updatedBooks[index].hearts += 1;
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    // Handle 5-star rating
    const handleRating = (index, rating) => {
        const updatedBooks = [...books];
        updatedBooks[index].rating = rating; // Store the rating
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    // Handle feedback submission
    const handleFeedbackSubmit = (index, event) => {
        event.preventDefault();
        const updatedBooks = [...books];
        const feedback = event.target.elements.feedback.value;
        updatedBooks[index].feedbacks.push(feedback);
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        event.target.reset(); // Reset the form
    };

    // Ensure only one div can be expanded at a time
    const handleDivClick = (index) => {
        setExpandedBook(expandedBook === index ? null : index); // Toggle expand only if another div is clicked
    };

    return (
        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Reader Section</h2>
            {books.length === 0 ? (
                <p>No books available. Write some books in the Writing Desk.</p>
            ) : (
                books.map((book, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            width: '60%',
                            marginBottom: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            maxHeight: expandedBook === index ? 'none' : '100px',
                            overflow: expandedBook === index ? 'visible' : 'hidden',
                            transition: 'max-height 0.5s ease',
                        }}
                        onClick={() => handleDivClick(index)} // Toggle expand/collapse on div click
                    >
                        <h3>{book.title}</h3>
                        {book.photo && <img src={book.photo} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />}
                        <p>{expandedBook === index ? book.content : `${book.content.slice(0, 100)}...`}</p>
                        {expandedBook === index && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <button onClick={() => handleLike(index)} style={{ marginRight: '10px' }}>
                                            👍 {book.likes}
                                        </button>
                                        <button onClick={() => handleHeart(index)}>
                                            ❤️ {book.hearts}
                                        </button>
                                    </div>
                                    <div>
                                        <StarRating rating={book.rating || 0} onRate={(rating) => handleRating(index, rating)} />
                                    </div>
                                    <form onSubmit={(event) => handleFeedbackSubmit(index, event)}>
                                        <input type="text" name="feedback" placeholder="Leave feedback" style={{ padding: '5px', marginRight: '10px' }} required />
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                                {/* Display feedbacks */}
                                <div>
                                    {book.feedbacks && book.feedbacks.map((feedback, idx) => (
                                        <p key={idx}>{feedback}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

// Star Rating Component
const StarRating = ({ rating, onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => onRate(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ cursor: 'pointer', color: star <= (hoverRating || rating) ? 'gold' : 'gray' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default ReaderSection;
