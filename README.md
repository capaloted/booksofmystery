# Books of Mystery - Mystery Book Subscription Service

A beautiful web application that delivers mystery books to your door. Users select a genre and receive a randomly selected book from that category.

## Features

- 🎨 Beautiful, responsive design
- 📚 30+ books across 6 genres (Mystery, Thriller, Horror, Romance, Fantasy, Sci-Fi)
- 💳 Stripe payment integration
- 📊 CSV-based book management system
- 🎁 Smooth animations and transitions
- 🔧 Admin panel for book management

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Payment:** Stripe
- **Database:** CSV files
- **Hosting:** Vercel

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Visit: `http://localhost:3000`

## Deployment to Vercel

### Step 1: Create GitHub Repository
1. Create a new repository on GitHub
2. Push your code to GitHub

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Deploy!

### Step 3: Configure Environment Variables
In your Vercel dashboard:
1. Go to Project Settings
2. Go to Environment Variables
3. Add: `STRIPE_SECRET_KEY` = your Stripe secret key

## Environment Variables

- `STRIPE_SECRET_KEY` - Your Stripe secret key (required for payments)

## File Structure

```
booksofmystery/
├── server.js          # Main server file
├── index.html         # Main website
├── admin.html         # Admin panel
├── script.js          # Frontend JavaScript
├── styles.css         # Styling
├── books.csv          # Book database
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies
```

## Admin Panel

Access the admin panel at `/admin` to:
- View all books
- Add new books
- Edit existing books
- Download/upload CSV files
- Manage your book collection

## CSV Management

Books are stored in `books.csv` with the format:
```csv
genre,title,author,description,price
mystery,Book Title,Author Name,Book description,5.00
```

## Support

For issues or questions, please contact the developer.

## License

Private project - All rights reserved.