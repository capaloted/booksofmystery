// Book database - loaded from API
let bookDatabase = {};

// Load books from the API
async function loadBooksFromAPI() {
    try {
        const response = await fetch('/api/books');
        if (response.ok) {
            bookDatabase = await response.json();
            console.log('Books loaded successfully:', bookDatabase);
        } else {
            console.error('Failed to load books:', response.statusText);
            // Fallback to hardcoded books
            bookDatabase = getFallbackBooks();
        }
    } catch (error) {
        console.error('Error loading books:', error);
        // Fallback to hardcoded books
        bookDatabase = getFallbackBooks();
    }
}

// Fallback books if API fails
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

// Original book database (fallback)
const fallbackBookDatabase = {
    fantasy: [
        {
            title: "The Dragon's Prophecy",
            author: "Elena Shadowweaver",
            description: "In a world where magic flows through ancient ley lines, a young mage discovers she is the last descendant of the Dragon Lords. As dark forces gather to destroy the realm, she must master her powers and fulfill an ancient prophecy that could save or doom all of creation.",
            price: 16.99
        },
        {
            title: "Crystal of Eternal Light",
            author: "Marcus Brightblade",
            description: "When the Crystal of Eternal Light is stolen from the Elven capital, a diverse group of adventurers must journey across treacherous lands to recover it before the world falls into eternal darkness.",
            price: 18.50
        },
        {
            title: "The Last Phoenix",
            author: "Aria Flameheart",
            description: "In a realm where phoenixes are extinct, a young scholar discovers a single phoenix egg. As she nurtures the creature, she uncovers a conspiracy that threatens to destroy the balance between fire and ice magic.",
            price: 17.25
        }
    ],
    mystery: [
        {
            title: "The Midnight Murders",
            author: "Detective Sarah Blackwood",
            description: "When a series of murders occur exactly at midnight in a small coastal town, Detective Sarah Blackwood must race against time to solve the case before the killer strikes again. Each victim leaves behind a cryptic clue that leads deeper into the town's dark secrets.",
            price: 15.99
        },
        {
            title: "The Vanishing Library",
            author: "Professor James Whitmore",
            description: "A renowned library disappears overnight, taking with it thousands of rare books and the librarian who was working late. The only clue is a single bookmark found in the empty space where the building once stood.",
            price: 16.75
        },
        {
            title: "The Clockmaker's Secret",
            author: "Inspector Margaret Stone",
            description: "In Victorian London, a master clockmaker is found dead in his workshop, surrounded by ticking timepieces that all show different times. The investigation reveals a web of deception involving stolen blueprints and a missing invention that could change the world.",
            price: 17.50
        }
    ],
    "sci-fi": [
        {
            title: "Quantum Paradox",
            author: "Dr. Alex Chen",
            description: "When quantum experiments go wrong, physicist Dr. Alex Chen finds herself trapped in multiple parallel dimensions. She must navigate through different versions of reality to find her way home, but each dimension holds its own dangers and revelations about the nature of existence.",
            price: 19.99
        },
        {
            title: "The Last Starship",
            author: "Commander Zara Nova",
            description: "Earth is dying, and humanity's last hope lies with the starship Endeavor and its crew of 500 colonists. But when they discover their destination planet is already inhabited by an advanced alien civilization, they must decide whether to fight, flee, or find a way to coexist.",
            price: 18.75
        },
        {
            title: "Neural Interface",
            author: "Dr. Maya Patel",
            description: "In 2087, neural interfaces allow humans to directly connect their minds to computers. When a hacker discovers how to control people through their implants, cybersecurity expert Dr. Maya Patel must stop them before the entire population becomes puppets.",
            price: 17.99
        }
    ],
    romance: [
        {
            title: "Love in the Time of War",
            author: "Isabella Rose",
            description: "During World War II, nurse Eleanor falls in love with a wounded soldier who has lost his memory. As she helps him recover, she discovers he's not who he appears to be, and their love story becomes entangled with espionage and danger.",
            price: 14.99
        },
        {
            title: "The Bookstore Romance",
            author: "Emma Thompson",
            description: "When struggling bookstore owner Lily inherits a mysterious collection of love letters, she embarks on a journey to find their author. Her search leads her to a charming historian who helps her uncover a century-old love story that mirrors her own heart's desires.",
            price: 15.50
        },
        {
            title: "Second Chance at Love",
            author: "Michael Rivers",
            description: "After a devastating divorce, Sarah returns to her hometown to start over. There, she reconnects with her high school sweetheart, now a successful architect. But can they overcome the pain of the past to build a future together?",
            price: 16.25
        }
    ],
    horror: [
        {
            title: "The Haunting of Blackwood Manor",
            author: "Victoria Nightshade",
            description: "When the Blackwood family moves into their ancestral home, they soon discover it's haunted by the spirits of previous residents who died under mysterious circumstances. As the hauntings intensify, they must uncover the manor's dark history before it claims their lives too.",
            price: 17.99
        },
        {
            title: "The Shadow People",
            author: "Dr. Samuel Graves",
            description: "A sleep researcher studying a rare condition where people see shadowy figures in their peripheral vision discovers that these 'shadow people' are real entities that feed on human fear. As his research progresses, the shadows begin to follow him into waking life.",
            price: 18.50
        },
        {
            title: "The Last Patient",
            author: "Dr. Rachel Monroe",
            description: "In a remote psychiatric hospital, Dr. Rachel Monroe treats a patient who claims to be possessed by a demon. As strange events begin occurring throughout the facility, she must determine if her patient is truly possessed or if something far more sinister is at work.",
            price: 16.75
        }
    ],
    thriller: [
        {
            title: "The Silent Assassin",
            author: "Jack Steel",
            description: "Former CIA operative Marcus Webb is pulled out of retirement when his former partner is found dead. The only clue is a cryptic message that leads him on a dangerous mission to stop a terrorist plot that could kill millions.",
            price: 19.25
        },
        {
            title: "Digital Conspiracy",
            author: "Lisa Chen",
            description: "When cybersecurity expert Lisa Chen discovers a massive data breach affecting millions of people, she uncovers a conspiracy involving government agencies and tech corporations. As she digs deeper, she becomes the target of assassins who will stop at nothing to silence her.",
            price: 17.99
        },
        {
            title: "The Perfect Crime",
            author: "Detective Robert Kane",
            description: "A series of seemingly perfect murders has the police baffled. Each victim is found in a locked room with no evidence of how the killer entered or left. Detective Kane must think like a criminal to catch a killer who always seems one step ahead.",
            price: 18.75
        }
    ]
};

// Initialize with fallback data if API fails
bookDatabase = fallbackBookDatabase;

// Current state
let currentGenre = null;
let selectedBook = null;
let isMystery = true;
let cartCount = 0;

// Initialize Stripe
const stripe = Stripe('pk_live_51NFFa6LzLzOqZf28rKtFnDGqKTNMZgRPlcYJCeUh0nCNt0TeuoS1f99zJV1uoIYTcz9YzSaP0uZtFuw8R8iggN6C0030cPQ1wn');
let stripeElements;
let cardElement;

// DOM elements
const screens = {
    genreSelection: document.getElementById('genre-selection'),
    boxAnimation: document.getElementById('box-animation'),
    bookReveal: document.getElementById('book-reveal'),
    purchaseScreen: document.getElementById('purchase-screen'),
    successScreen: document.getElementById('success-screen')
};

const elements = {
    mysteryBox: document.getElementById('mystery-box'),
    boxLid: document.getElementById('box-lid'),
    animationMessage: document.getElementById('animation-message'),
    bookTitle: document.getElementById('book-title'),
    bookAuthor: document.getElementById('book-author'),
    bookGenreBadge: document.getElementById('book-genre-badge'),
    revealedTitle: document.getElementById('revealed-title'),
    revealedAuthor: document.getElementById('revealed-author'),
    bookDescription: document.getElementById('book-description'),
    bookPrice: document.getElementById('book-price'),
    keepMysteryBtn: document.getElementById('keep-mystery'),
    revealBookBtn: document.getElementById('reveal-book'),
    purchaseTitle: document.getElementById('purchase-title'),
    purchaseAuthor: document.getElementById('purchase-author'),
    purchasePrice: document.getElementById('purchase-price'),
    purchaseTotal: document.getElementById('purchase-total'),
    checkoutForm: document.getElementById('checkout-form'),
    orderNumber: document.getElementById('order-number'),
    newOrderBtn: document.getElementById('new-order'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.querySelector('.cart-count'),
    presentPopup: document.getElementById('present-popup'),
    presentLid: document.getElementById('present-lid'),
    popupMessage: document.getElementById('popup-message'),
    closePopup: document.getElementById('close-popup')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing app...');
    
    // Load books from API first
    await loadBooksFromAPI();
    
    // Ensure books are loaded before initializing
    if (Object.keys(bookDatabase).length === 0) {
        console.log('No books loaded, using fallback');
        bookDatabase = getFallbackBooks();
    }
    
    console.log('Books loaded:', Object.keys(bookDatabase).length, 'genres');
    
    initializeEventListeners();
    initializeStripe();
    checkUrlParameters();
});

// Check URL parameters for success/cancel/error
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const error = urlParams.get('error');
    
    if (success === 'true') {
        showMessage('Payment successful! Check your email for confirmation.', 'success');
    } else if (canceled === 'true') {
        showMessage('Payment was canceled. You can try again anytime.', 'warning');
    } else if (error) {
        showMessage('There was an error processing your payment. Please try again.', 'error');
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            messageDiv.style.background = '#4CAF50';
            break;
        case 'warning':
            messageDiv.style.background = '#FF9800';
            break;
        case 'error':
            messageDiv.style.background = '#f44336';
            break;
        default:
            messageDiv.style.background = '#2196F3';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

function initializeEventListeners() {
    // Genre selection
    document.querySelectorAll('.genre-card').forEach(card => {
        card.addEventListener('click', function() {
            const genre = this.dataset.genre;
            selectGenre(genre);
        });
    });

    // Book reveal buttons
    if (elements.keepMysteryBtn) {
    elements.keepMysteryBtn.addEventListener('click', function() {
        proceedToPurchase(true);
    });
    }

    if (elements.revealBookBtn) {
    elements.revealBookBtn.addEventListener('click', revealBook);
    }

    // Purchase form
    if (elements.checkoutForm) {
    elements.checkoutForm.addEventListener('submit', handlePayment);
    }

    // New order button
    if (elements.newOrderBtn) {
    elements.newOrderBtn.addEventListener('click', function() {
        startNewOrder();
    });
    }

    // Cart button
    if (elements.cartBtn) {
    elements.cartBtn.addEventListener('click', function() {
        showCart();
    });
    }

    // Close popup when clicking outside
    if (elements.presentPopup) {
    elements.presentPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            closePresentPopup();
        }
    });
    }

    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Newsletter signup
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
}

function selectGenre(genre) {
    currentGenre = genre;
    
    // Start smooth transition
    startSmoothTransition();
}

function startSmoothTransition() {
    console.log('Starting smooth transition for genre:', currentGenre);
    console.log('Available books:', bookDatabase);
    
    // Animate genre selection out
    const genreSelection = document.querySelector('.genre-selection');
    if (genreSelection) {
        genreSelection.classList.add('transitioning-out');
    }
    
    // After genre animation completes, go directly to book reveal
    setTimeout(() => {
        // Select a random book from the genre
        const books = bookDatabase[currentGenre];
        console.log('Books for genre', currentGenre, ':', books);
        
        if (!books || books.length === 0) {
            console.error('No books found for genre:', currentGenre);
            return;
        }
        
        selectedBook = books[Math.floor(Math.random() * books.length)];
        console.log('Selected book:', selectedBook);
        
        // Go directly to book reveal
        showBookReveal();
        
    }, 400);
}

function showPresentPopup() {
    elements.presentPopup.classList.add('active');
}

function closePresentPopup() {
    elements.presentPopup.classList.remove('active');
}

function startPresentAnimation() {
    const messages = [
        "Selecting your book...",
        "Preparing your surprise...",
        "Almost ready..."
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        elements.popupMessage.textContent = messages[messageIndex];
        messageIndex++;
        
        if (messageIndex >= messages.length) {
            clearInterval(messageInterval);
            openPresent();
        }
    }, 1200);
}

function openPresent() {
    // Select a random book from the genre
    const books = bookDatabase[currentGenre];
    selectedBook = books[Math.floor(Math.random() * books.length)];
    
    // Add sparkle effects
    addSparkleEffects();
    
    // Open the present with enhanced animation
    elements.presentLid.classList.add('open');
    
    // Add glow effect to the present box
    const presentBox = document.querySelector('.present-box');
    if (presentBox) {
        presentBox.style.animation = 'glow 2s ease-in-out infinite';
    }
    
    // Reveal the interior after lid opens
    setTimeout(() => {
        const presentInterior = document.getElementById('present-interior');
        if (presentInterior) {
            presentInterior.classList.add('revealed');
        }
    }, 1000);
    
    // Show the book after animation
    setTimeout(() => {
        closePresentPopup();
        showBookReveal();
    }, 2500);
}

function addSparkleEffects() {
    const presentContainer = document.querySelector('.present-container');
    if (!presentContainer) return;
    
    // Remove existing sparkles
    const existingSparkles = presentContainer.querySelectorAll('.sparkle');
    existingSparkles.forEach(sparkle => sparkle.remove());
    
    // Add new sparkles
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        presentContainer.appendChild(sparkle);
    }
}

function openBox() {
    // Select a random book from the genre
    const books = bookDatabase[currentGenre];
    selectedBook = books[Math.floor(Math.random() * books.length)];
    
    // Open the box
    elements.boxLid.classList.add('open');
    
    // Show the book after animation
    setTimeout(() => {
        showBookReveal();
    }, 1500);
}

function showBookReveal() {
    // Update book information
    elements.bookTitle.textContent = selectedBook.title;
    elements.bookAuthor.textContent = `by ${selectedBook.author}`;
    elements.bookGenreBadge.textContent = currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1);
    elements.revealedTitle.textContent = selectedBook.title;
    elements.revealedAuthor.textContent = `by ${selectedBook.author}`;
    elements.bookDescription.textContent = selectedBook.description;
    elements.bookPrice.textContent = '5.00';
    
    // Add book reveal animation class
    const bookRevealContainer = document.querySelector('.book-reveal-container');
    if (bookRevealContainer) {
        bookRevealContainer.classList.add('book-reveal');
    }
    
    // Show the book reveal screen
    showScreen('book-reveal');
    
    // Add celebration sparkles around the book
    setTimeout(() => {
        addBookSparkles();
    }, 500);
}

function addBookSparkles() {
    const bookRevealContainer = document.querySelector('.book-reveal-container');
    if (!bookRevealContainer) return;
    
    // Remove existing sparkles
    const existingSparkles = bookRevealContainer.querySelectorAll('.sparkle');
    existingSparkles.forEach(sparkle => sparkle.remove());
    
    // Add celebration sparkles
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.width = '12px';
        sparkle.style.height = '12px';
        sparkle.style.background = '#FFD700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 10px #FFD700';
        bookRevealContainer.appendChild(sparkle);
    }
}

function revealBook() {
    // Remove blur from book content
    document.querySelectorAll('.blurred-content').forEach(element => {
        element.classList.add('revealed');
    });
    
    // Change button text and functionality
    const revealBtn = document.getElementById('reveal-book');
    revealBtn.textContent = 'Buy Now';
    
    // Remove the old event listener and add new one
    revealBtn.removeEventListener('click', revealBook);
    revealBtn.addEventListener('click', function() {
        proceedToPurchase(false);
    });
}

function proceedToPurchase(keepMystery) {
    isMystery = keepMystery;
    
    if (keepMystery) {
        // Show mystery purchase details
        elements.purchaseTitle.textContent = "Mystery Book";
        elements.purchaseAuthor.textContent = `Genre: ${currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1)}`;
        elements.purchasePrice.textContent = "£0.30"; // Fixed price for mystery books
        
        const total = 0.30 + 0.00; // £0.30 book + free shipping
        elements.purchaseTotal.textContent = `£${total.toFixed(2)}`;
    } else {
        // Use the revealed book details
        elements.purchaseTitle.textContent = selectedBook.title;
        elements.purchaseAuthor.textContent = `by ${selectedBook.author}`;
        elements.purchasePrice.textContent = "£0.30";
        
        const total = 0.30 + 0.00; // £0.30 book + free shipping
        elements.purchaseTotal.textContent = `£${total.toFixed(2)}`;
    }
    
    showScreen('purchase-screen');
}

function processPurchase() {
    // Add to cart
    cartCount++;
    updateCartCount();
    
    // Generate order number
    const orderNumber = Math.floor(Math.random() * 100000) + 10000;
    elements.orderNumber.textContent = orderNumber;
    
    // Show success screen
    showScreen('success-screen');
}

function updateCartCount() {
    if (elements.cartCount) {
        elements.cartCount.textContent = cartCount;
    }
}

function showCart() {
    if (cartCount === 0) {
        alert('Your cart is empty. Start by selecting a genre!');
    } else {
        alert(`You have ${cartCount} item(s) in your cart. Complete your purchase to proceed!`);
    }
}

function startNewOrder() {
    // Reset state
    currentGenre = null;
    selectedBook = null;
    isMystery = true;
    
    // Reset box animation
    elements.boxLid.classList.remove('open');
    elements.mysteryBox.className = 'mystery-box';
    
    // Reset form
    elements.checkoutForm.reset();
    
    // Reset blur effects
    document.querySelectorAll('.blurred-content').forEach(element => {
        element.classList.remove('revealed');
    });
    
    // Reset reveal button
    const revealBtn = document.getElementById('reveal-book');
    revealBtn.textContent = 'Reveal Book';
    // Clone the button to remove all event listeners
    const newBtn = revealBtn.cloneNode(true);
    revealBtn.parentNode.replaceChild(newBtn, revealBtn);
    newBtn.addEventListener('click', revealBook);
    
    // Reset book content to default
    document.getElementById('book-title').textContent = 'Book Title';
    document.getElementById('book-author').textContent = 'by Author Name';
    document.getElementById('book-genre-badge').textContent = 'Genre';
    document.getElementById('revealed-title').textContent = 'Your Mystery Book';
    document.getElementById('revealed-author').textContent = 'by Author Name';
    document.getElementById('book-description').textContent = 'Book description will appear here...';
    document.getElementById('book-price').textContent = '0.00';
    
    // Go back to genre selection
    showScreen('genre-selection');
}

function goToStart() {
    startNewOrder();
}

// Stripe Payment Functions
async function initializeStripe() {
    try {
        console.log('Initializing Stripe Checkout...');
        
        // Check if Stripe is loaded
        if (typeof Stripe === 'undefined') {
            console.error('Stripe is not loaded!');
            return;
        }
        
        console.log('Stripe Checkout ready');
    } catch (error) {
        console.error('Error initializing Stripe:', error);
    }
}

function showFallbackCard() {
    console.log('Showing fallback card inputs...');
    const cardElement = document.getElementById('card-element');
    const fallbackCard = document.getElementById('fallback-card');
    
    console.log('Card element:', cardElement);
    console.log('Fallback card:', fallbackCard);
    
    if (cardElement && fallbackCard) {
        cardElement.style.display = 'none';
        fallbackCard.style.display = 'block';
        console.log('Fallback card inputs should now be visible');
    } else {
        console.error('Could not find card elements!');
    }
}

async function handlePayment(event) {
    event.preventDefault();
    
    console.log('Redirecting to Stripe Checkout...');
    
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    // Show loading state
    submitBtn.disabled = true;
    buttonText.textContent = 'Redirecting to Stripe...';
    spinner.classList.remove('hidden');
    
    try {
        // Create Stripe Checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookTitle: selectedBook ? selectedBook.title : 'Mystery Book',
                customerEmail: document.getElementById('email').value,
                customerName: document.getElementById('name').value,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const {sessionId} = await response.json();
        console.log('Checkout session created:', sessionId);
        
        // Redirect to Stripe Checkout
        const {error} = await stripe.redirectToCheckout({
            sessionId: sessionId
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
    } catch (error) {
        console.error('Checkout error:', error);
        document.getElementById('card-errors').textContent = error.message;
        
        // Reset button state
        submitBtn.disabled = false;
        buttonText.textContent = 'Complete Purchase - £0.30';
        spinner.classList.add('hidden');
    }
}

function showSuccessScreen(paymentIntentId) {
    elements.orderNumber.textContent = paymentIntentId.slice(-8);
    showScreen('success-screen');
}

function showScreen(screenName) {
    // Get current active screen
    const currentScreen = Object.values(screens).find(screen => screen.classList.contains('active'));
    
    // Convert kebab-case to camelCase for screen lookup
    const screenKey = screenName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const targetScreen = screens[screenKey];
    
    if (!targetScreen) return;
    
    // If there's a current screen, animate it out first
    if (currentScreen && currentScreen !== targetScreen) {
        currentScreen.classList.add('transitioning-out');
        
        // After transition out completes, show new screen
        setTimeout(() => {
            // Hide all screens
            Object.values(screens).forEach(screen => {
                screen.classList.remove('active', 'transitioning-out', 'transitioning-in');
            });
            
            // Show new screen with transition in
            targetScreen.classList.add('transitioning-in');
            
            setTimeout(() => {
                targetScreen.classList.remove('transitioning-in');
                targetScreen.classList.add('active');
            }, 50);
            
        }, 400);
    } else {
        // No current screen, just show the target
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active', 'transitioning-out', 'transitioning-in');
        });
        targetScreen.classList.add('active');
    }
    
    // Reinitialize Stripe if showing purchase screen
    if (screenName === 'purchase-screen') {
        setTimeout(() => {
            console.log('Reinitializing Stripe for purchase screen...');
            initializeStripe();
        }, 500);
    }
}

// Add some visual effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe
    initializeStripe();
    
    // Make sure fallback card is visible initially
    setTimeout(() => {
        showFallbackCard();
    }, 1000);
    
    // Add floating particles effect
    createFloatingParticles();
});

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card number formatting and validation
function formatCardNumber(input) {
    // Remove all non-numeric characters
    let value = input.value.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    if (value.length > 19) {
        value = value.substring(0, 19);
    }
    
    input.value = value;
    
    // Validate card number length
    const cardNumber = value.replace(/\s/g, '');
    const cardNumberInput = document.getElementById('card-number');
    
    console.log('Card number validation:', { value, cardNumber, length: cardNumber.length });
    
    if (cardNumber.length < 13) {
        cardNumberInput.setCustomValidity('Card number must be at least 13 digits');
        console.log('Card number too short:', cardNumber.length);
    } else if (cardNumber.length > 19) {
        cardNumberInput.setCustomValidity('Card number cannot exceed 19 digits');
        console.log('Card number too long:', cardNumber.length);
    } else if (cardNumber.length >= 13 && cardNumber.length <= 19) {
        cardNumberInput.setCustomValidity('');
        console.log('Card number valid:', cardNumber.length);
    }
    
    // Check if there are any validation errors
    const isValid = cardNumberInput.checkValidity();
    console.log('Card number validity check:', isValid);
    
    if (!isValid) {
        console.log('Validation message:', cardNumberInput.validationMessage);
    }
}

// Initialize card number formatting when page loads
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
        
        // Also format on paste
        cardNumberInput.addEventListener('paste', function() {
            setTimeout(() => formatCardNumber(this), 10);
        });
        
        // Clear any existing validation errors on page load
        setTimeout(() => {
            cardNumberInput.setCustomValidity('');
            const cardErrors = document.getElementById('card-errors');
            if (cardErrors) {
                cardErrors.textContent = '';
            }
        }, 100);
    }
    
    
    // Add validation for expiry field
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
            
            // Validate expiry format
            if (value.length === 5) {
                const [month, year] = value.split('/');
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear() % 100;
                const currentMonth = currentDate.getMonth() + 1;
                
                if (parseInt(month) < 1 || parseInt(month) > 12) {
                    this.setCustomValidity('Invalid month');
                } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    this.setCustomValidity('Card has expired');
                } else {
                    this.setCustomValidity('');
                }
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Add validation for CVC field
    const cvcInput = document.getElementById('card-cvc');
    if (cvcInput) {
        cvcInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
            
            if (this.value.length < 3) {
                this.setCustomValidity('CVC must be at least 3 digits');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});
c