# StaySphere 🏨

StaySphere is a full-stack hotel booking platform that allows users to explore available hotel listings, create their own listings, and manage bookings. It provides user authentication and supports admin-level listing management.

## 🌐 Live Demo

👉 [Visit StaySphere](https://staysphere-project-4lc1.onrender.com)

## ✨ Features

- 🏨 View hotel/property listings with images, title, price, and location
- 🧑‍💼 User authentication (Sign up, Log in, Logout)
- ➕ Add new listings (for logged-in users)
- ✏️ Edit and delete your own listings
- 🛡️ Basic authorization to restrict listing modification to the listing owner
- 📱 Fully responsive design using Bootstrap

## 📸 Screenshots

> SIGN UP
![img.png](image/img.png)
> SIGN IN
![img_1.png](image/img_1.png)

> All the Hotels (Explore Page)
> ![img_2.png](image/img_2.png)
> Show Amount + GST %
> ![img_3.png](image/img_3.png)
> Give Rating to hotel with Comments (also check others rating)
> ![img_4.png](image/img_4.png)
> Edit the Hotel Details
> ![img_5.png](image/img_5.png)
> Create New Listings of Hotel
> ![img_6.png](image/img_6.png)


## 🛠️ Tech Stack

### Frontend:
- EJS Templates
- HTML5, CSS3, Bootstrap 5

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB
- Mongoose ODM

### Other Packages:
- express-session
- connect-mongo
- method-override
- dotenv
- multer (for image uploads)
- cloudinary (for image storage)

### Deployment:
- Render (Full-stack app hosted on Render)

## 🚀 Getting Started Locally

### Clone and install dependencies
```bash
git clone https://github.com/your-username/staysphere.git
cd staysphere
npm install
