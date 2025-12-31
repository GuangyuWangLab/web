# Wang Lab Website

A modern, responsive static website for the Wang Lab at Houston Methodist / Weill Cornell Medical College. Built with static HTML/CSS/JS and managed via a lightweight custom Python CMS.

## 🚀 Quick Start

### 1. Get the Code
Clone the repository to your local machine:

```bash
git clone https://github.com/GuangyuWangLab2021/web.git
cd web
```

### 2. Prerequisites
You need Python 3 installed.
Install the required dependencies:

```bash
pip install flask jinja2
```

### 3. Admin CMS (Recommended)
To manage content (Team, News, Publications, etc.) via a visual interface:

```bash
python3 cms/app.py
```
- The browser will **automatically open** to **http://127.0.0.1:5000**.
- Edit content and click **"Publish Changes"**.
- This automatically saves your changes and **rebuilds the entire website** (updates HTML files).

### 4. Manual Build / Advanced
If you prefer to edit the JSON data files manually in `cms/data/`, you must run the build script to update the HTML:

```bash
python3 cms/build.py
```

### 5. Deploying Updates
After publishing changes via the CMS (or building manually), push the updated files to GitHub:

```bash
git add .
git commit -m "Update website content"
git push
```

## 📂 Project Structure

```
.
├── index.html           # Homepage
├── team.html, etc.      # Generated Pages
├── css/                 # Global Styles (style.css)
├── js/                  # Global Scripts (main.js)
├── assets/              # Images, icons, videos
├── cms/                 # CMS System
│   ├── app.py           # Admin Dashboard (Flask App)
│   ├── build.py         # Static Site Generator Script
│   ├── data/            # Content Data (JSON Source of Truth)
│   └── templates/       # HTML Templates (Jinja2)
└── README.md            # This file
```│   ├── data/            # Content Data (JSON Source of Truth)
│   └── templates/       # HTML Templates (Jinja2)
└── README.md            # This file
```

## 📱 Features
- **Responsive Design**: optimized for Mobile, Tablet, and Desktop.
- **Mobile Navbar**: Collapsible hamburger menu on small screens.
- **Static Generation**: High performance, security, and easy hosting (GitHub Pages compatible).
- **Custom CMS**: Local admin dashboard for easy content updates without coding.
