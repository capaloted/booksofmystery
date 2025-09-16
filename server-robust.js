const express = require('express');

// Initialize Stripe with comprehensive error handling
// Updated to support both live and test keys
let stripe = null;
let stripeEnabled = false;

try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey && stripeKey !== 'sk_test_your_key_here' && (stripeKey.startsWith('sk_test_') || stripeKey.startsWith('sk_live_'))) {
        stripe = require('stripe')(stripeKey);
        stripeEnabled = true;
        const keyType = stripeKey.startsWith('sk_live_') ? 'LIVE' : 'TEST';
        console.log(`✅ Stripe initialized successfully with ${keyType} key`);
    } else {
        console.log('⚠️ Stripe key not set or invalid, using mock mode');
    }
} catch (error) {
    console.error('❌ Stripe initialization error:', error.message);
    console.log('⚠️ Using mock payment mode');
}

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
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const keyType = stripeKey ? (stripeKey.startsWith('sk_live_') ? 'LIVE' : stripeKey.startsWith('sk_test_') ? 'TEST' : 'UNKNOWN') : 'none';
    res.json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        stripe: stripeEnabled ? 'enabled' : 'mock mode',
        stripeKeyExists: !!stripeKey,
        stripeKeyType: keyType,
        stripeKeyLength: stripeKey ? stripeKey.length : 0,
        stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 10) + '...' : 'none',
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

// Checkout endpoint - handles both real Stripe and mock
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { bookTitle, customerEmail, customerName } = req.body;
        
        console.log('Creating checkout session for:', bookTitle);
        
        if (stripeEnabled && stripe) {
            // Real Stripe checkout
            console.log('Creating real Stripe checkout session');
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'gbp',
                                product_data: {
                                    name: bookTitle,
                                    description: 'Mystery Book Purchase',
                                },
                                unit_amount: 500, // £5.00 in pence
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: `${req.protocol}://${req.get('host')}/success?book=${encodeURIComponent(bookTitle)}`,
                    cancel_url: `${req.protocol}://${req.get('host')}/`,
                    customer_email: customerEmail,
                    billing_address_collection: 'required',
                    shipping_address_collection: {
                        allowed_countries: ['GB', 'US', 'CA', 'AU'],
                    },
                });
                
                console.log('Stripe session created successfully:', session.id);
                res.json({ sessionId: session.id });
            } catch (stripeError) {
                console.error('Stripe checkout session creation failed:', stripeError.message);
                console.error('Stripe error details:', stripeError);
                res.status(500).json({ 
                    error: 'Stripe checkout failed', 
                    details: stripeError.message 
                });
                return;
            }
        } else {
            // Mock checkout
            console.log('Creating mock checkout session');
            res.json({ 
                success: true, 
                message: 'Mock checkout session created',
                checkoutUrl: '/success?book=' + encodeURIComponent(bookTitle)
            });
        }
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
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`💳 Stripe: ${stripeEnabled ? 'ENABLED' : 'MOCK MODE'}`);
    console.log(`📚 Books: Available`);
});

module.exports = app;
