# Game Store Website

## Project Description

The **Game Store Website** is a simple, responsive web application built using only **HTML, CSS, and JavaScript**. It allows users to browse, search, and view details of games available for purchase. The site is designed to provide a smooth shopping experience without the use of frontend frameworks or libraries, making it lightweight and easy to maintain.

## Key Features

### User Features
- **Home Page**: Displays featured games and promotions.  
- **Game Catalog**: Browse all available games with images, prices, and descriptions.  
- **Simple Authentication**: Simple flow with client and user.
- **Game Detail Page**: View detailed information, screenshots, and price of a selected game.  
- **Shopping Cart (Frontend only)**: Add games to cart, update quantities, and calculate total price.  
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices.  

## Project Structure

```
game-store-website/
├── index.html # Loading page
├── components/ # Implement components to reuse
│ ├── footer/ # Footer implement
│ └──header/ # Header implement
│   └── header.html
│   └── header.css
├── docs/ # Project documentation
├── html/ #HTML files
├── styles/ # Stylesheets
├── scripts/ # JavaScript files
├── img/ # Game images and assets
└── README.md # Project documentation
```
## Technology Stack

- **HTML5**: Structure and semantic markup  
- **CSS3**: Styling and responsive layout (Flexbox & Grid)  
- **JavaScript (ES6+)**: Interactivity, DOM manipulation, and client-side logic  

_No external frameworks (e.g., React, Angular, Vue) or libraries are used._  

## Architecture Overview

- **Static Frontend**: Pure HTML, CSS, and JavaScript files served directly.  
- **Responsive Design**: Media queries in CSS ensure the site adapts to different screen sizes.  

## Development Setup

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari).  

### Future Enhancements

- Add backend integration for real purchases (Node.js, PHP, or Python).
- Implement user accounts with login/signup.
- Enable wishlist and order history.
- Add sorting and advanced filtering (by price, genre, release date).
- Improve UI/UX with animations and transitions.
- Support payment gateway integration.
