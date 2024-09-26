/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const WritingDesk = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setContent(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = () => {
        if (title && content) {
            const newBook = { title, content, likes: 0, hearts: 0 };
            let books = JSON.parse(localStorage.getItem('books')) || [];
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            setTitle('');
            setContent('');
            alert('Book saved!');
        } else {
            alert('Please provide both title and content.');
        }
    };

    return (
        <center>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div style={{ width: '50%', textAlign: 'center' }}>
                <h2>Writing Desk</h2>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <br />
                <textarea
                    placeholder="Write your book here or upload a .txt file..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: '100%', height: '200px', padding: '10px', marginBottom: '10px' }}
                />
                <br />
                <input type="file" accept=".txt" onChange={handleFileUpload} />
                <br />
                <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>
                    Save Book
                </button>
            </div>
        </div>
        </center>
        
    );
};

export default WritingDesk;
