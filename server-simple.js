const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Book database file path
const BOOKS_CSV_FILE = path.join(__dirname, 'books.csv');

// Fallback books if CSV fails
function getFallbackBooks() {
    return {
        mystery: [
            { title: "The Silent Patient", author: "Alex Michaelides", description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.", price: 5.00 },
            { title: "Gone Girl", author: "Gillian Flynn", description: "A dark psychological thriller about a marriage gone terribly wrong.", price: 5.00 }
        ],
        thriller: [
            { title: "The Da Vinci Code", author: "Dan Brown", description: "A symbologist and a cryptologist race to solve a murder and uncover a secret.", price: 5.00 },
            { title: "The Bourne Identity", author: "Robert Ludlum", description: "A man with no memory must discover his true identity while being hunted.", price: 5.00 }
        ],
        horror: [
            { title: "The Shining", author: "Stephen King", description: "A family becomes caretakers of a haunted hotel during the winter.", price: 5.00 },
            { title: "The Exorcist", author: "William Peter Blatty", description: "A young girl's demonic possession leads to a battle between good and evil.", price: 5.00 }
        ],
        romance: [
            { title: "The Notebook", author: "Nicholas Sparks", description: "A timeless love story about a couple separated by war and reunited years later.", price: 5.00 },
            { title: "Me Before You", author: "Jojo Moyes", description: "A heartwarming story about love, loss, and living life to the fullest.", price: 5.00 }
        ],
        fantasy: [
            { title: "The Hobbit", author: "J.R.R. Tolkien", description: "A classic fantasy adventure about a hobbit's unexpected journey.", price: 5.00 },
            { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", description: "The magical story of a young wizard discovering his destiny.", price: 5.00 }
        ],
        "sci-fi": [
            { title: "Dune", author: "Frank Herbert", description: "A science fiction epic about politics, religion, and ecology on a desert planet.", price: 5.00 },
            { title: "The Martian", author: "Andy Weir", description: "A science fiction thriller about an astronaut stranded on Mars.", price: 5.00 }
        ]
    };
}

// Load books from CSV file with fallback
function loadBooks() {
    return new Promise((resolve, reject) => {
        const books = {};
        
        // Check if CSV file exists
        if (!fs.existsSync(BOOKS_CSV_FILE)) {
            console.log('CSV file not found, using fallback books');
            resolve(getFallbackBooks());
            return;
        }
        
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
                    price: parseFloat(row.price) || 5.00
                });
            })
            .on('end', () => {
                console.log('Books loaded from CSV:', Object.keys(books).length, 'genres');
                resolve(books);
            })
            .on('error', (error) => {
                console.error('Error loading books from CSV:', error);
                console.log('Using fallback books instead');
                resolve(getFallbackBooks());
            });
    });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve CSS file explicitly
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

// Serve JavaScript file explicitly
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        books: 'available'
    });
});

// Books API endpoint
app.get('/api/books', async (req, res) => {
    try {
        const books = await loadBooks();
        res.json(books);
    } catch (error) {
        console.error('Error loading books:', error);
        res.json(getFallbackBooks());
    }
});

// Mock checkout endpoint (no real payment)
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { bookTitle, customerEmail, customerName } = req.body;
        
        console.log('Mock checkout session created for:', bookTitle);
        
        // Return a mock success response
        res.json({ 
            success: true, 
            message: 'Mock checkout session created',
            checkoutUrl: '/success?book=' + encodeURIComponent(bookTitle)
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Success page
app.get('/success', (req, res) => {
    const bookTitle = req.query.book || 'Your Mystery Book';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Successful - Books of Mystery</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div class="container">
                <div class="success-page">
                    <div class="success-icon">✅</div>
                    <h1>Payment Successful!</h1>
                    <p>Thank you for your purchase!</p>
                    <div class="book-info">
                        <h2>${bookTitle}</h2>
                        <p>Your mystery book will be shipped to you soon!</p>
                        <p class="price">Total: £5.00</p>
                    </div>
                    <a href="/" class="btn-primary">Choose Another Book</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Simple server - no Stripe integration');
});

module.exports = app;
