// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxZDhz-UaVkKmGAxRGYXLVnDARvdowS9M",
    authDomain: "pickmytask-ce779.firebaseapp.com",
    databaseURL: "https://pickmytask-ce779-default-rtdb.firebaseio.com",
    projectId: "pickmytask-ce779",
    storageBucket: "pickmytask-ce779.firebasestorage.app",
    messagingSenderId: "896001628856",
    appId: "1:896001628856:web:63cb19143be6792c21724d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Navigation between pages
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const pageId = this.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
    });
});

// Tab functionality
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show the selected tab content
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// Login functionality
document.getElementById('login-submit').addEventListener('click', function() {
    const phone = document.getElementById('login-phone').value;
    const password = document.getElementById('login-password').value;
    
    if(phone && password) {
        // For demo, we'll simulate login since we don't have actual auth setup
        simulateLogin();
    } else {
        alert('Please enter both phone number and password.');
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Show login page
    document.getElementById('login').classList.add('active');
    document.getElementById('home').classList.remove('active');
    
    // Update nav
    navLinks.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('data-page') === 'home') {
            item.classList.add('active');
        }
    });
    
    // Show login button, hide user info
    document.getElementById('login-btn').style.display = 'inline-flex';
    document.getElementById('user-balance').style.display = 'none';
});

// Login button in header
document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Show login page
    document.getElementById('login').classList.add('active');
    document.getElementById('home').classList.remove('active');
    
    // Update nav
    navLinks.forEach(item => {
        item.classList.remove('active');
    });
});

// Share referral code
document.getElementById('share-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const referralCode = document.querySelector('.referral-code').textContent;
    
    // In a real app, this would use the Web Share API or copy to clipboard
    if (navigator.share) {
        navigator.share({
            title: 'Join Pick My Task',
            text: `Use my referral code ${referralCode} to earn money!`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(referralCode).then(() => {
            alert(`Referral code ${referralCode} copied to clipboard! Share it with your friends.`);
        });
    }
});

// Simulate login (for demo purposes)
function simulateLogin() {
    // Hide login page
    document.getElementById('login').classList.remove('active');
    
    // Show home page
    document.getElementById('home').classList.add('active');
    
    // Update nav
    navLinks.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('data-page') === 'home') {
            item.classList.add('active');
        }
    });
    
    // Hide login button, show user info
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('user-balance').style.display = 'inline';
    
    // Load user data
    loadUserData();
    loadTasks();
    loadTransactions();
    
    alert('Login successful! Welcome to Pick My Task.');
}

// Load user data (simulated)
function loadUserData() {
    // In a￼Enter
