# Image Steganography Web App

A simple full-stack web app to hide and reveal secret messages inside images using image steganography.

## Features

- Encode a secret message into an image
- Decode hidden messages from images
- Node.js backend with Python processing
- Optional React.js frontend
- REST API support

## Technologies Used

- Backend: Node.js, Express, Multer, CORS
- Python: OpenCV (cv2)
- Frontend: React.js (optional)
- Version Control: Git and GitHub

## Project Structure

image-steganography-web/
│
├── backend/ # Node.js server
│ ├── uploads/ # For input/output image files
│ └── app.js # Main backend file
│
├── frontend/ # React frontend (optional)
│ └── (components, styles)
│
├── steganography.py # Python script for encode/decode
└── README.md # This file

shell
Copy
Edit

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/shrutitac17/image-steganography-web.git
cd image-steganography-web

shell
Copy
Edit

### 2. Install Python dependencies

Make sure Python and OpenCV are installed:

pip install opencv-python

shell
Copy
Edit

### 3. Run Backend Server

cd backend
npm install
node app.js

nginx
Copy
Edit

Backend will run at `http://localhost:5000`

### 4. (Optional) Run Frontend

cd frontend
npm install
npm start

nginx
Copy
Edit

Frontend will run at `http://localhost:3000`

## Usage (Manual)

Encode a message:

python steganography.py encode input.png "your secret message"

yaml
Copy
Edit

Decode the message:

python steganography.py decode encoded.png

markdown
Copy
Edit

## Author

**Shruti Tiwari**  
GitHub: [shrutitac17](https://github.com/shrutitac17)
  
