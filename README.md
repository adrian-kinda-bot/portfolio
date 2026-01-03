# Portfolio Website

A modern, professional portfolio website built with **Tailwind CSS** and featuring an interactive projects carousel.

## Features

- **Tailwind CSS**: Modern utility-first CSS framework for professional styling
- **Responsive Design**: Works seamlessly on all devices (desktop, tablet, mobile)
- **Projects Carousel**: Showcase your projects with screenshots in an interactive carousel
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Auto-play Carousel**: Projects automatically rotate (pauses on hover)
- **Easy to Customize**: Simple data structure for adding/removing projects
- **Professional Design**: Clean, modern UI with smooth animations and transitions

## How to Add Projects

To add your personal projects with screenshots, edit the `script.js` file and modify the `projects` array:

### Step 1: Prepare Your Screenshots

1. Create an `images` folder in your project directory
2. Add your project screenshots (recommended size: 800x500px or similar aspect ratio)
3. Name them descriptively (e.g., `project1-screenshot.png`)

### Step 2: Add Project Data

Open `script.js` and find the `projects` array. Add a new project object like this:

```javascript
{
  title: "Your Project Name",
  description: "A detailed description of your project, what it does, and key features.",
  image: "images/your-screenshot.png",  // Path to your screenshot
  technologies: ["Ruby on Rails", "JavaScript", "PostgreSQL"],  // Technologies used
  liveUrl: "https://your-live-demo.com",  // Live demo URL (use "#" if not available)
  githubUrl: "https://github.com/yourusername/project"  // GitHub URL (use "#" if private)
}
```

### Example:

```javascript
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application built with Ruby on Rails. Features include user authentication, payment processing, and inventory management.",
    image: "images/ecommerce-screenshot.png",
    technologies: ["Ruby on Rails", "PostgreSQL", "Stripe API", "Bootstrap"],
    liveUrl: "https://my-ecommerce-demo.herokuapp.com",
    githubUrl: "https://github.com/adriannicolai/ecommerce-app"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and team collaboration features.",
    image: "images/taskapp-screenshot.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/adriannicolai/task-app"
  }
  // Add more projects here...
];
```

### Step 3: Save and Test

1. Save the `script.js` file
2. Refresh your browser to see the new project in the carousel

## Project Structure

```
portfolio/
├── index.html          # Main HTML file (uses Tailwind CSS)
├── index.css           # Minimal custom CSS for carousel transitions
├── script.js           # JavaScript with project data and carousel logic
├── images/             # Folder for project screenshots (create this)
│   ├── project1.png
│   ├── project2.png
│   └── ...
└── README.md           # This file
```

## Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **JavaScript**: Vanilla JS for carousel functionality
- **Font Awesome**: Icons
- **Inter Font**: Modern, professional typography

## Customization Tips

### Changing Carousel Speed

In `script.js`, find the `startAutoPlay()` function and change the interval:

```javascript
autoPlayInterval = setInterval(nextSlide, 5000); // Change 5000 to desired milliseconds
```

### Disabling Auto-play

To disable auto-play, comment out or remove the `startAutoPlay()` call in the `DOMContentLoaded` event listener.

### Styling

- **Tailwind Configuration**: Colors and theme can be customized in the `<script>` tag in `index.html` where Tailwind is configured
- **Primary Color**: Currently set to `#f9004d` (can be changed in Tailwind config)
- **Custom Styles**: Minimal custom CSS in `index.css` for carousel-specific transitions
- **Responsive Breakpoints**: Uses Tailwind's default breakpoints (sm, md, lg, xl)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This portfolio is set up for GitHub Pages deployment. The `static.yml` workflow file will automatically deploy your site when you push to the `master` branch.

## License

Feel free to use this portfolio template for your own projects!

