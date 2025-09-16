const express = require('express');
// Initialize Stripe with error handling
let stripe;
try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here');
    console.log('Stripe initialized successfully');
} catch (error) {
    console.error('Stripe initialization error:', error);
    stripe = null;
}
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Book database file path
const BOOKS_CSV_FILE = path.join(__dirname, 'books.csv');

// Load books from CSV file
function loadBooks() {
    return new Promise((resolve, reject) => {
        const books = {};
        
        fs.createReadStream(BOOKS_CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                const genre = row.genre.toLowerCase();
                if (!books[genre]) {
                    books[genre] = [];
                }
                
                books[genre].push({
                    title: row.title,
                    author: row.author,
                    description: row.description,
                    price: parseFloat(row.price) || 0.30
                });
            })
            .on('end', () => {
                console.log('Books loaded from CSV:', Object.keys(books).length, 'genres');
                resolve(books);
            })
            .on('error', (error) => {
                console.error('Error loading books from CSV:', error);
                reject(error);
            });
    });
}

// Save books to CSV file
function saveBooks(books) {
    try {
        let csvContent = 'genre,title,author,description,price\n';
        
        Object.keys(books).forEach(genre => {
            books[genre].forEach(book => {
                csvContent += `${genre},"${book.title}","${book.author}","${book.description}",${book.price}\n`;
            });
        });
        
        fs.writeFileSync(BOOKS_CSV_FILE, csvContent);
        return true;
    } catch (error) {
        console.error('Error saving books to CSV:', error);
        return false;
    }
}

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create Stripe Checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        if (!stripe) {
            console.error('Stripe not initialized');
            return res.status(500).json({ error: 'Payment system not available' });
        }
        
        const { bookTitle, customerEmail, customerName } = req.body;
        
        console.log('Creating Stripe Checkout session');
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: bookTitle || 'Mystery Book',
                            description: 'A carefully selected mystery book delivered to your door',
                        },
                               unit_amount: 500, // £5.00 in pence
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/?canceled=true`,
            customer_email: customerEmail,
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA', 'AU'],
            },
            billing_address_collection: 'required',
            metadata: {
                bookTitle: bookTitle || 'Mystery Book',
                customerEmail: customerEmail || 'unknown@example.com',
                customerName: customerName || 'Unknown Customer'
            }
        });
        
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await loadBooks();
        res.json(books);
    } catch (error) {
        console.error('Error loading books:', error);
        res.status(500).json({ error: 'Failed to load books' });
    }
});

// API endpoint to add a new book
app.post('/api/books', async (req, res) => {
    const { genre, title, author, description, price } = req.body;
    
    if (!genre || !title || !author || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        const books = await loadBooks();
        
        if (!books[genre]) {
            books[genre] = [];
        }
        
        const newBook = {
            title,
            author,
            description,
            price: price || 0.30
        };
        
        books[genre].push(newBook);
        
        if (saveBooks(books)) {
            res.json({ success: true, book: newBook });
        } else {
            res.status(500).json({ error: 'Failed to save book' });
        }
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

// API endpoint to update a book
app.put('/api/books/:genre/:index', async (req, res) => {
    const { genre, index } = req.params;
    const { title, author, description, price } = req.body;
    
    try {
        const books = await loadBooks();
        
        if (!books[genre] || !books[genre][index]) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        if (title) books[genre][index].title = title;
        if (author) books[genre][index].author = author;
        if (description) books[genre][index].description = description;
        if (price) books[genre][index].price = price;
        
        if (saveBooks(books)) {
            res.json({ success: true, book: books[genre][index] });
        } else {
            res.status(500).json({ error: 'Failed to update book' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// API endpoint to delete a book
app.delete('/api/books/:genre/:index', async (req, res) => {
    const { genre, index } = req.params;
    
    try {
        const books = await loadBooks();
        
        if (!books[genre] || !books[genre][index]) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        const deletedBook = books[genre].splice(index, 1)[0];
        
        if (saveBooks(books)) {
            res.json({ success: true, book: deletedBook });
        } else {
            res.status(500).json({ error: 'Failed to delete book' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CSV upload endpoint
app.post('/api/upload-csv', upload.single('csv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No CSV file uploaded' });
        }
        
        const books = {};
        
        // Read the uploaded CSV file
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                const genre = row.genre.toLowerCase();
                if (!books[genre]) {
                    books[genre] = [];
                }
                
                books[genre].push({
                    title: row.title,
                    author: row.author,
                    description: row.description,
                    price: parseFloat(row.price) || 0.30
                });
            })
            .on('end', () => {
                // Save the new books to the main CSV file
                if (saveBooks(books)) {
                    // Clean up uploaded file
                    fs.unlinkSync(req.file.path);
                    res.json({ success: true, message: 'CSV uploaded successfully' });
                } else {
                    res.status(500).json({ error: 'Failed to save books' });
                }
            })
            .on('error', (error) => {
                console.error('Error parsing CSV:', error);
                fs.unlinkSync(req.file.path);
                res.status(400).json({ error: 'Invalid CSV format' });
            });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Failed to upload CSV' });
    }
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Success page route
app.get('/success', async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        
        if (!sessionId) {
            return res.redirect('/?error=no_session');
        }
        
        // Retrieve the checkout session to get order details
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        // Create a simple success page HTML
        const successHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - Books of Mystery</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        .success-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        h1 { margin-bottom: 20px; }
        .order-details {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        .btn-primary {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1rem;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            transition: transform 0.3s ease;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase! Your mystery book will be shipped within 2-3 business days.</p>
        
        <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${session.id.slice(-8)}</p>
            <p><strong>Book:</strong> ${session.metadata.bookTitle}</p>
            <p><strong>Customer:</strong> ${session.metadata.customerName}</p>
            <p><strong>Email:</strong> ${session.metadata.customerEmail}</p>
                   <p><strong>Amount:</strong> £5.00</p>
            <p><strong>Status:</strong> ${session.payment_status}</p>
        </div>
        
        <a href="/" class="btn-primary">Start New Mystery</a>
    </div>
</body>
</html>`;
        
        res.send(successHtml);
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.redirect('/?error=session_error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to replace the Stripe keys with your actual keys!');
});
