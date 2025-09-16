const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Hardcoded books (no CSV dependency)
const books = {
    mystery: [
        { title: "The Silent Patient", author: "Alex Michaelides", description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.", price: 5.00 },
        { title: "Gone Girl", author: "Gillian Flynn", description: "A dark psychological thriller about a marriage gone terribly wrong.", price: 5.00 },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", description: "A journalist and a hacker investigate a decades-old disappearance.", price: 5.00 }
    ],
    thriller: [
        { title: "The Da Vinci Code", author: "Dan Brown", description: "A symbologist and a cryptologist race to solve a murder and uncover a secret.", price: 5.00 },
        { title: "The Bourne Identity", author: "Robert Ludlum", description: "A man with no memory must discover his true identity while being hunted.", price: 5.00 },
        { title: "The Silence of the Lambs", author: "Thomas Harris", description: "An FBI trainee seeks help from a brilliant but insane cannibalistic serial killer.", price: 5.00 }
    ],
    horror: [
        { title: "The Shining", author: "Stephen King", description: "A family becomes caretakers of a haunted hotel during the winter.", price: 5.00 },
        { title: "The Exorcist", author: "William Peter Blatty", description: "A young girl's demonic possession leads to a battle between good and evil.", price: 5.00 },
        { title: "It", author: "Stephen King", description: "Seven children face their worst nightmare in the form of a shape-shifting entity.", price: 5.00 }
    ],
    romance: [
        { title: "The Notebook", author: "Nicholas Sparks", description: "A timeless love story about a couple separated by war and reunited years later.", price: 5.00 },
        { title: "Me Before You", author: "Jojo Moyes", description: "A heartwarming story about love, loss, and living life to the fullest.", price: 5.00 },
        { title: "The Time Traveler's Wife", author: "Audrey Niffenegger", description: "A unique love story about a man with a genetic disorder that causes him to time travel.", price: 5.00 }
    ],
    fantasy: [
        { title: "The Hobbit", author: "J.R.R. Tolkien", description: "A classic fantasy adventure about a hobbit's unexpected journey.", price: 5.00 },
        { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", description: "The magical story of a young wizard discovering his destiny.", price: 5.00 },
        { title: "The Name of the Wind", author: "Patrick Rothfuss", description: "A fantasy epic about a legendary wizard telling his life story.", price: 5.00 }
    ],
    "sci-fi": [
        { title: "Dune", author: "Frank Herbert", description: "A science fiction epic about politics, religion, and ecology on a desert planet.", price: 5.00 },
        { title: "The Martian", author: "Andy Weir", description: "A science fiction thriller about an astronaut stranded on Mars.", price: 5.00 },
        { title: "Foundation", author: "Isaac Asimov", description: "A science fiction classic about psychohistory and the fall of a galactic empire.", price: 5.00 }
    ]
};

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Working server is running!', 
        timestamp: new Date().toISOString(),
        booksCount: Object.keys(books).length
    });
});

// Books API endpoint
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Mock checkout endpoint (no real Stripe for now)
app.post('/create-checkout-session', (req, res) => {
    res.json({ 
        message: 'Checkout would work here with real Stripe key',
        sessionId: 'mock_session_' + Date.now()
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Working server running on port ${PORT}`);
});

module.exports = app;
