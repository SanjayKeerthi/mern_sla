import './style.css'

const app = document.querySelector('#app');

// State
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  rooms: [
    { id: 1, name: 'Deluxe Ocean View', price: 299, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Presidential Suite', price: 599, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Executive Room', price: 199, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ]
};

// Router
const navigate = (path) => {
  window.history.pushState({}, '', path);
  render();
};

window.addEventListener('popstate', render);

// Views
const Navbar = () => {
  const user = state.user;
  return `
    <nav class="navbar">
      <a href="/" class="logo" data-link>LuxeStays</a>
      <div class="nav-links">
        <a href="/" data-link>Home</a>
        <a href="#rooms">Rooms</a>
        <a href="#amenities">Amenities</a>
        ${user 
          ? `<a href="#" id="logoutBtn">Logout (${user.name})</a>` 
          : `<a href="/login" data-link>Login</a><a href="/signup" data-link>Sign Up</a>`
        }
      </div>
    </nav>
  `;
};

const Footer = () => `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-col">
          <h3>LuxeStays</h3>
          <p>Experience the epitome of luxury and comfort.</p>
        </div>
        <div class="footer-col">
          <h3>Contact Us</h3>
          <p>123 Luxury Ave, Beverly Hills, CA</p>
          <p>+1 (555) 123-4567</p>
          <p>reservations@luxestays.com</p>
        </div>
      </div>
      <div class="copyright">
        &copy; 2024 LuxeStays Hotels. All rights reserved.
      </div>
    </div>
  </footer>
`;

const HomeView = () => `
  ${Navbar()}
  <header class="hero">
    <h1>Welcome to LuxeStays</h1>
    <p>Discover a world of refined luxury and timeless elegance.</p>
    <button class="btn btn-primary" onclick="window.location.hash='#rooms'">View Rooms</button>
  </header>
  
  <section id="amenities" class="section container">
    <h2 class="section-title">World-Class Amenities</h2>
    <div class="amenities-grid">
      <div class="amenity-item">
        <h3>Infinity Pool</h3>
        <p>Relax in our temperature-controlled infinity pool offering stunning views.</p>
      </div>
      <div class="amenity-item">
        <h3>Fine Dining</h3>
        <p>Savor exquisite culinary delights prepared by our award-winning chefs.</p>
      </div>
      <div class="amenity-item">
        <h3>Spa & Wellness</h3>
        <p>Rejuvenate your senses with our comprehensive spa treatments.</p>
      </div>
    </div>
  </section>

  <section id="rooms" class="section container">
    <h2 class="section-title">Our Rooms</h2>
    <div class="rooms-grid">
      ${state.rooms.map(room => `
        <div class="room-card">
          <img src="${room.image}" alt="${room.name}" class="room-img">
          <div class="room-info">
            <h3>${room.name}</h3>
            <p>Starting at $${room.price}/night</p>
            <button class="btn btn-primary book-btn" data-id="${room.id}">Book Now</button>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  ${Footer()}
`;

const LoginView = () => `
  <div class="auth-container">
    <div class="auth-box">
      <h2 class="auth-title">Welcome Back</h2>
      <form id="loginForm" class="auth-form">
        <input type="email" id="email" placeholder="Email Address" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" class="btn btn-primary" style="width: 100%">Login</button>
      </form>
      <p style="margin-top: 15px; text-align: center;">
        Don't have an account? <a href="/signup" data-link>Sign Up</a>
      </p>
      <p style="margin-top: 10px; text-align: center;">
        <a href="/" data-link>Back to Home</a>
      </p>
    </div>
  </div>
`;

const SignupView = () => `
  <div class="auth-container">
    <div class="auth-box">
      <h2 class="auth-title">Create Account</h2>
      <form id="signupForm" class="auth-form">
        <input type="text" id="name" placeholder="Full Name" required>
        <input type="email" id="email" placeholder="Email Address" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit" class="btn btn-primary" style="width: 100%">Sign Up</button>
      </form>
      <p style="margin-top: 15px; text-align: center;">
        Already have an account? <a href="/login" data-link>Login</a>
      </p>
    </div>
  </div>
`;

// Logic Handlers
function setupEventListeners() {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigate(e.target.getAttribute('href'));
    }
    
    if (e.target.id === 'logoutBtn') {
      e.preventDefault();
      localStorage.removeItem('user');
      state.user = null;
      navigate('/');
    }

    if (e.target.classList.contains('book-btn')) {
      if (!state.user) {
        alert('Please login to book a room.');
        navigate('/login');
      } else {
        alert('Booking functionality coming soon!');
      }
    }
  });

  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      
      if (email && password) {
        // Mock Login
        const mockUser = { name: email.split('@')[0], email };
        localStorage.setItem('user', JSON.stringify(mockUser));
        state.user = mockUser;
        navigate('/');
      }
    });
  }

  const signupForm = document.querySelector('#signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      if (name && email && password) {
        // Mock Signup
        const newUser = { name, email };
        localStorage.setItem('user', JSON.stringify(newUser));
        state.user = newUser;
        navigate('/');
      }
    });
  }
}

function render() {
  const path = window.location.pathname;
  
  if (path === '/login') {
    app.innerHTML = LoginView();
  } else if (path === '/signup') {
    app.innerHTML = SignupView();
  } else {
    app.innerHTML = HomeView();
  }
  
  setupEventListeners();
}

// Initial Render
render();
