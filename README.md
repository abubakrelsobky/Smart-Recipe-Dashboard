# Smart Recipe Dashboard 🍳

**Submitted by:** Abubakr El Sobky

A modern recipe dashboard that allows users to explore recipes with intelligent filtering and interactive data visualization.

**🚀 Deployed on Netlify:** [https://68b4d48001a91f3b1e917718--smart-recipe-dashboard.netlify.app/](https://68b4d48001a91f3b1e917718--smart-recipe-dashboard.netlify.app/)

**📹 Quick Demo:** [View Walkthrough](./Smart%20Recipe%20Dashboard%20Demo.gif)

## 🌟 Features

### Core Functionality

- **Multi-Filter Search**: Filter recipes by category, area, and ingredients
- **Interactive Charts**: Visual ingredient comlexity analysis using Recharts
- **Detailed Recipe Views**: Complete recipe information with ingredients and instructions
- **Responsive Design**: Clean, modern UI that works on all devices

### AI-Enhanced Experience 🧠

- **Smart Recipe Summaries**: Get AI-generated recipe summaries powered by Google Gemini
- **One-Click Analysis**: Instantly understand what makes each recipe special

## ⚙️ Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: CSS3 with modern layouts
- **Charts**: Recharts library
- **Data**: TheMealDB API integration
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/abubakrelsobky/Smart-Recipe-Dashboard.git
cd Smart-Recipe-Dashboard

# Install dependencies
npm install

# Set up environment variables (if needed)
cp .env.example .env

# Start development server
npm run dev
```

## 📱 How to Use

1. **Browse Recipes**: Explore the recipe collection on the main page
2. **Apply Filters**: Use category, area, and ingredient filters to find specific recipes
3. **View Charts**: Analyze cooking times with the interactive line chart
4. **Get Summaries**: Click the 🧠 button on any recipe for an engaging summary
5. **View Details**: Click on recipes to see full instructions and ingredients

## 📊 Project Structure

```
src/
├── components/
│   ├── RecipeCard.jsx     # Individual recipe display
│   ├── RecipeChart.jsx    # Cooking time visualization
│   └── RecipeDetail.jsx   # Detailed recipe view
├── routes/
│   ├── Layout.jsx         # App layout and navigation
│   ├── DetailView.jsx     # Recipe detail page
│   └── NotFound.jsx       # 404 error page
├── utils/
│   └── AISummary.js       # Recipe summary generation
└── App.jsx                # Main application logic
```

## License

Licensed under the Apache License, Version 2.0. See LICENSE file for details.
