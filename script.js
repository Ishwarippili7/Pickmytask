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
    // In a real app, this would come from Firebase
    document.getElementById('user-name').textContent = 'Rajesh Kumar';
    document.getElementById('user-phone').textContent = '+91 9876543210';
    document.getElementById('user-email').textContent = 'rajesh@example.com';
    document.getElementById('user-balance').textContent = '₹450.00';
    document.getElementById('wallet-balance-display').textContent = '₹450.00';
    document.getElementById('completed-tasks').textContent = '5';
    document.getElementById('total-earnings').textContent = '₹450';
    document.getElementById('user-referrals').textContent = '3';
    document.getElementById('member-since').textContent = '45';
    document.getElementById('total-referrals').textContent = '3';
    document.getElementById('referral-earnings').textContent = '₹150';
}

// Load tasks from Firebase
function loadTasks() {
    const allTasksContainer = document.getElementById('all-tasks');
    const bankingContainer = document.getElementById('banking-tasks');
    const financeContainer = document.getElementById('finance-tasks');
    const otherContainer = document.getElementById('other-tasks');
    
    // Clear existing content
    allTasksContainer.innerHTML = '';
    bankingContainer.innerHTML = '';
    financeContainer.innerHTML = '';
    otherContainer.innerHTML = '';
    
    // Load tasks from Firebase
    db.collection('tasks').where('status', '==', 'active').get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // If no tasks exist, add sample tasks
                addSampleTasks();
                return;
            }
            
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                const taskId = doc.id;
                
                const taskHTML = `
                    <div class="task-card">
                        <div class="task-category">${task.category}</div>
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <div class="task-meta">
                            <div class="task-reward">₹${task.reward}</div>
                            <a href="${task.link}" target="_blank" class="btn" data-task-id="${taskId}">Start Task</a>
                        </div>
                    </div>
                `;
                
                // Add to all tasks
                allTasksContainer.innerHTML += taskHTML;
                
                // Add to category-specific containers
                if (task.category === 'banking') {
                    bankingContainer.innerHTML += taskHTML;
                } else if (task.category === 'finance') {
                    financeContainer.innerHTML += taskHTML;
                } else if (task.category === 'other') {
                    otherContainer.innerHTML += taskHTML;
                }
            });
        })
        .catch((error) => {
            console.error('Error loading tasks: ', error);
            // If there's an error, show sample tasks
            showSampleTasks();
        });
}

// Add sample tasks to Firebase (for first-time setup)
function addSampleTasks() {
    const sampleTasks = [
        {
            title: "Airtel Payments Bank Account",
            category: "banking",
            description: "Open an Airtel Payments Bank account through our link and earn ₹100 upon successful verification.",
            reward: 100,
            link: "https://airtelbank.com",
            requirements: "Aadhaar Card, PAN Card",
            duration: 7,
            featured: true,
            status: "active",
            createdAt: new Date()
        },
        {
            title: "Credit Card Application", 
            category: "finance",
            description: "Apply for a credit card through our partner bank and earn ₹150 upon approval.",
            reward: 150,
            link: "https://bank.com/credit-card",
            requirements: "Income Proof, Address Proof",
            duration: 14,
            featured: true,
            status: "active",
            createdAt: new Date()
        },
        {
            title: "Trading Account Opening",
            category: "finance", 
            description: "Open a trading account with our broker partner and earn ₹200 after your first trade.",
            reward: 200,
            link: "https://tradingplatform.com",
            requirements: "PAN Card, Bank Account",
            duration: 3,
            featured: true,
            status: "active",
            createdAt: new Date()
        },
        {
            title: "Insurance Policy Purchase",
            category: "finance",
            description: "Purchase a life insurance policy through our platform and earn ₹300.",
            reward: 300,
            link: "https://insurance.com",
            requirements: "Age 18+, Income Proof",
            duration: 30,
            featured: false,
            status: "active",
            createdAt: new Date()
        },
        {
            title: "Mutual Fund Investment",
            category: "finance",
            description: "Invest in mutual funds through our partner and earn ₹250 on your first investment.",
            reward: 250,
            link: "https://mutualfunds.com",
            requirements: "PAN Card, KYC",
            duration: 7,
            featured: false,
            status: "active",
            createdAt: new Date()
        }
    ];
    
    sampleTasks.forEach(task => {
        db.collection('tasks').add(task)
            .then((docRef) => {
                console.log('Sample task added with ID: ', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding sample task: ', error);
            });
    });
    
    // Reload tasks after adding samples
    setTimeout(loadTasks, 1000);
}

// Show sample tasks (fallback if Firebase fails)
function showSampleTasks() {
    const sampleTasks = [
        {
            title: "Airtel Payments Bank Account",
            category: "banking",
            description: "Open an Airtel Payments Bank account through our link and earn ₹100 upon successful verification.",
            reward: 100,
            link: "https://airtelbank.com"
        },
        {
            title: "Credit Card Application",
            category: "finance", 
            description: "Apply for a credit card through our partner bank and earn ₹150 upon approval.",
            reward: 150,
            link: "https://bank.com/credit-card"
        },
        {
            title: "Trading Account Opening",
            category: "finance",
            description: "Open a trading account with our broker partner and earn ₹200 after your first trade.",
            reward: 200,
            link: "https://tradingplatform.com"
        }
    ];
    
    const allTasksContainer = document.getElementById('all-tasks');
    const bankingContainer = document.getElementById('banking-tasks');
    const financeContainer = document.getElementById('finance-tasks');
    
    sampleTasks.forEach(task => {
        const taskHTML = `
            <div class="task-card">
                <div class="task-category">${task.category}</div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="task-meta">
                    <div class="task-reward">₹${task.reward}</div>
                    <a href="${task.link}" target="_blank" class="btn">Start Task</a>
                </div>
            </div>
        `;
        
        allTasksContainer.innerHTML += taskHTML;
        
        if (task.category === 'banking') {
            bankingContainer.innerHTML += taskHTML;
        } else if (task.category === 'finance') {
            financeContainer.innerHTML += taskHTML;
        }
    });
}

// Load transactions (simulated)
function loadTransactions() {
    const transactions = [
        { description: "Task Completion: Airtel Bank", date: "15 Oct 2023", amount: 100, type: "positive" },
        { description: "Task Completion: Credit Card", date: "12 Oct 2023", amount: 150, type: "positive" },
        { description: "Referral Bonus", date: "10 Oct 2023", amount: 50, type: "positive" },
        { description: "Withdrawal to Bank", date: "5 Oct 2023", amount: 200, type: "negative" }
    ];
    
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    
    transactions.forEach(transaction => {
        const transactionHTML = `
            <li class="transaction-item">
                <div class="transaction-details">
                    <div>${transaction.description}</div>
                    <div style="font-size: 0.8rem; color: var(--gray);">${transaction.date}</div>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'positive' ? '+' : '-'}₹${transaction.amount}
                </div>
            </li>
        `;
        transactionList.innerHTML += transactionHTML;
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Show login page by default
    document.getElementById('login').classList.add('active');
    document.getElementById('home').classList.remove('active');
    
    // Load tasks and transactions
    loadTasks();
    loadTransactions();
});

// Footer navigation
document.querySelectorAll('.footer-section a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('data-page')) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Find and activate the corresponding nav link
            navLinks.forEach(item => {
                if (item.getAttribute('data-page') === pageId) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Task click handlers (for demo)
document.addEventListener('click', function(e) {
    if (e.target.closest('.task-card .btn')) {
        e.preventDefault();
        const taskCard = e.target.closest('.task-card');
        const taskTitle = taskCard.querySelector('h3').textContent;
        alert(`Starting task: ${taskTitle}\n\nYou will be redirected to complete this task.`);
        // In real app, this would redirect to the task link
    }
});
