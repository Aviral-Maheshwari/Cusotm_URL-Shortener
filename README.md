# URL Shortener

A simple and efficient URL shortener application built with Node.js, Express, and MongoDB. This application allows users to shorten long URLs and provides a way to track how many times each short URL has been accessed.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shorten long URLs
- Redirect to the original URL when accessing the shortened link
- Track visit history for each short URL
- Simple and user-friendly interface

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **URL Shortening**: `shortid` package for generating unique short IDs

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener.git
2. Navigate to the project directory:
   ```bash
   cd url-shortener
3. Install the dependencies:
   ```bash
   npm install
4. Start your MongoDB server (if it's not running):
   ```bash
   mongod
5. Run the application:
   ```bash
   node index.js

### API Endpoints


