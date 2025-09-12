# Game Store Website

## Project Description

The **Game Store Website** is a simple, responsive web application built using only **HTML, CSS, and JavaScript**. It allows users to browse, search, and view details of games available for purchase. The site is designed to provide a smooth shopping experience without the use of frontend frameworks or libraries, making it lightweight and easy to maintain.

## Key Features

### User Features
- **Home Page**: Displays featured games and promotions.  
- **Game Catalog**: Browse all available games with images, prices, and descriptions.  
- **Search Functionality**: Search games by title or category using JavaScript.  
- **Game Detail Page**: View detailed information, screenshots, and price of a selected game.  
- **Shopping Cart (Frontend only)**: Add games to cart, update quantities, and calculate total price.  
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices.  

## Project Structure

```
game-store-website/
├── index.html # Main home page
├── games.html # Game catalog page
├── game-detail.html # Individual game detail page
├── cart.html # Shopping cart page
├── css/ # Stylesheets
│ └── style.css # Main stylesheet
├── js/ # JavaScript files
│ ├── main.js # General site functionality
│ ├── search.js # Search and filtering logic
│ ├── cart.js # Shopping cart logic
│ └── data.js # Game data (JSON or JS objects)
├── images/ # Game images and assets
│ └── [game-thumbnails]
├── README.md # Project documentation
└── .gitignore # Git ignore rules
```
## Technology Stack

- **HTML5**: Structure and semantic markup  
- **CSS3**: Styling and responsive layout (Flexbox & Grid)  
- **JavaScript (ES6+)**: Interactivity, DOM manipulation, and client-side logic  

_No external frameworks (e.g., React, Angular, Vue) or libraries are used._  

## Architecture Overview

- **Static Frontend**: Pure HTML, CSS, and JavaScript files served directly.  
- **Data Handling**: Game information stored as static JSON/JS objects (`data.js`).  
- **JavaScript Modules**: Separate scripts for search, cart, and general site logic.  
- **Responsive Design**: Media queries in CSS ensure the site adapts to different screen sizes.  

## Development Setup

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari).  
- A simple HTTP server (optional, e.g., `live-server` or Python’s `http.server`) for testing.  

### Run Locally

```
# Clone the repository
git clone https://github.com/hnim3103/game-store-website.git
cd game-store-website

# Open index.html directly in a browser
# OR run with a local server for smoother experience
npx live-server
```
The website will be available at http://localhost:8080 (or whichever port your server uses).

### Future Enhancements

- Add backend integration for real purchases (Node.js, PHP, or Python).
- Implement user accounts with login/signup.
- Enable wishlist and order history.
- Add sorting and advanced filtering (by price, genre, release date).
- Improve UI/UX with animations and transitions.
- Support payment gateway integration.