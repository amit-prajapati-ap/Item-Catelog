# 🛍️ Item Catalog Web Application

This project was developed as part of an internship assignment for **AMRR TechSols Pvt Ltd**. It is a full-stack web application that allows users to **add new fashion/lifestyle items** and **view existing items** in a clean, responsive UI.

🔗 **Live Demo**: [https://item-catelog.vercel.app](https://item-catelog.vercel.app)  
💻 **Source Code**: [GitHub Repo](https://github.com/amit-prajapati-ap/Item-Catelog)

---

## 📌 Features

### 1. Add Item Page (`/add`)
- ✅ Form-based UI to add an item.
- ✅ Fields: 
  - Item Name
  - Item Type (e.g., Shirt, Pant, Shoes, Sports Gear, etc.)
  - Item Description
  - Cover Image (single file upload)
  - Additional Images (multiple files upload)
- ✅ On successful submission: Displays `"Item successfully added"` message.
- ✅ Basic HTML5 + JavaScript form validation.

### 2. View Items Page (`/`)
- ✅ Displays all items with:
  - Cover Image
  - Item Name
- ✅ Auto-refresh on adding new item (persistent data via MongoDB).

### 3. Item Details Page (`/item/:id`)
- ✅ Opens full detail view when clicking on an item.
- ✅ Features a **carousel** to display all item images.
- ✅ Includes an **"Enquire" button**.

### 4. Bonus Features Implemented
- ✅ **Real-time Data Persistence** using MongoDB (Atlas) via Node.js API.
- ✅ **Email Notification** on "Enquire" button using Nodemailer (to a static email).

---

## ⚙️ Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Redux Toolkit (for state management)
- TailwindCSS (UI styling)
- React Slick (carousel)

### Backend
- Node.js + Express.js
- MongoDB (via Mongoose)
- Multer (file upload)
- Nodemailer (email functionality)
- Cloudinary (image hosting)

---

## 📂 Project Structure

``` Item-Catelog/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── index.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ └── App.jsx
│ └── vite.config.js
```


---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas URI
- Cloudinary account
- Email credentials for Nodemailer

### 1. Clone Repository
```bash
git clone https://github.com/amit-prajapati-ap/Item-Catelog
cd Item-Catelog

cd backend
npm install
# Create `.env` file
PORT=7000
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_TO=static_receiver@example.com
npm run dev

cd ../frontend
npm install
npm run dev
