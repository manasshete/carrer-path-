// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 15 + 'px';
    cursor.style.top = e.clientY - 15 + 'px';
    cursorDot.style.left = e.clientX - 3 + 'px';
    cursorDot.style.top = e.clientY - 3 + 'px';
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.roadmap-card, .about-card, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// ROADMAP GENERATION
// ============================================
const roadmapData = {
    'Crack NEET 2026': {
        topics: [
            { name: 'Biology Fundamentals', description: 'Cell structure, genetics, and human physiology', time: '3 months' },
            { name: 'Chemistry Basics', description: 'Atomic structure, bonding, and reactions', time: '3 months' },
            { name: 'Physics Concepts', description: 'Mechanics, thermodynamics, and waves', time: '3 months' },
            { name: 'Advanced Biology', description: 'Ecology, evolution, and body systems', time: '2 months' },
            { name: 'Organic Chemistry', description: 'Hydrocarbons, functional groups, reactions', time: '2 months' },
            { name: 'Modern Physics', description: 'Quantum mechanics and nuclear physics', time: '2 months' },
            { name: 'Practice Tests', description: 'Full-length mock exams and problem solving', time: '2 months' }
        ]
    },
    'Master Python Programming': {
        topics: [
            { name: 'Python Basics', description: 'Syntax, variables, data types, and operators', time: '2 weeks' },
            { name: 'Control Flow', description: 'Conditionals, loops, and functions', time: '2 weeks' },
            { name: 'Data Structures', description: 'Lists, tuples, dictionaries, and sets', time: '3 weeks' },
            { name: 'Object-Oriented Programming', description: 'Classes, inheritance, and polymorphism', time: '3 weeks' },
            { name: 'File Handling & Modules', description: 'Working with files and importing libraries', time: '2 weeks' },
            { name: 'Advanced Concepts', description: 'Decorators, generators, and context managers', time: '3 weeks' },
            { name: 'Projects & Practice', description: 'Build real-world applications', time: '4 weeks' }
        ]
    },
    'Learn Web Development': {
        topics: [
            { name: 'HTML Fundamentals', description: 'Semantic markup and document structure', time: '1 week' },
            { name: 'CSS Styling', description: 'Layouts, flexbox, grid, and animations', time: '2 weeks' },
            { name: 'JavaScript Basics', description: 'DOM manipulation and event handling', time: '2 weeks' },
            { name: 'React Framework', description: 'Components, hooks, and state management', time: '3 weeks' },
            { name: 'Backend Development', description: 'Node.js, Express, and databases', time: '3 weeks' },
            { name: 'Full Stack Integration', description: 'Connecting frontend and backend', time: '2 weeks' },
            { name: 'Deployment & DevOps', description: 'Hosting, CI/CD, and monitoring', time: '2 weeks' }
        ]
    }
};

function generateRoadmap(goal) {
    const data = roadmapData[goal] || generateCustomRoadmap(goal);
    const roadmapContent = document.getElementById('roadmapContent');
    
    let html = `
        <div class="roadmap-card">
            <div class="roadmap-header">
                <h2 class="roadmap-title">${goal}</h2>
                <p class="roadmap-subtitle">Your personalized learning path</p>
            </div>
    `;

    data.topics.forEach((topic, index) => {
        const progress = Math.floor(Math.random() * 100);
        const topicId = `topic-${index}`;
        
        html += `
            <div class="topic-item" id="${topicId}">
                <div class="topic-number">${index + 1}</div>
                <div class="topic-name">${topic.name}</div>
                <div class="topic-description">${topic.description}</div>
                
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span id="progress-${index}">${progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="time-estimate">⏱️ Estimated: ${topic.time}</div>
                
                <div class="topic-actions">
                    <button class="action-btn" onclick="updateProgress(${index})">Update Progress</button>
                    <button class="action-btn ${progress === 100 ? 'completed' : ''}" onclick="toggleComplete(${index}, this)">
                        ${progress === 100 ? '✓ Completed' : 'Mark Complete'}
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    roadmapContent.innerHTML = html;
    
    // Save to localStorage
    saveRoadmap(goal, data);
    
    // Trigger animations
    document.querySelectorAll('.topic-item').forEach((el, i) => {
        el.style.animation = `fadeInUp 0.6s ease ${i * 0.1}s both`;
    });
}

function generateCustomRoadmap(goal) {
    const topics = [
        { name: `${goal} - Fundamentals`, description: 'Learn the core concepts and basics', time: '4 weeks' },
        { name: `${goal} - Intermediate`, description: 'Build on your foundation with advanced topics', time: '6 weeks' },
        { name: `${goal} - Advanced`, description: 'Master complex concepts and techniques', time: '6 weeks' },
        { name: `${goal} - Projects`, description: 'Apply your knowledge to real-world projects', time: '4 weeks' },
        { name: `${goal} - Mastery`, description: 'Achieve expertise and continuous improvement', time: 'Ongoing' }
    ];
    
    return { topics };
}

function updateProgress(index) {
    const progressSpan = document.getElementById(`progress-${index}`);
    const currentProgress = parseInt(progressSpan.textContent);
    const newProgress = Math.min(currentProgress + 10, 100);
    
    progressSpan.textContent = newProgress + '%';
    
    const progressFill = document.querySelector(`#topic-${index} .progress-fill`);
    progressFill.style.width = newProgress + '%';
    
    // Add animation
    progressFill.style.animation = 'none';
    setTimeout(() => {
        progressFill.style.animation = 'pulse 0.5s ease';
    }, 10);
    
    saveProgress();
}

function toggleComplete(index, button) {
    button.classList.toggle('completed');
    button.textContent = button.classList.contains('completed') ? '✓ Completed' : 'Mark Complete';
    
    if (button.classList.contains('completed')) {
        document.getElementById(`progress-${index}`).textContent = '100%';
        document.querySelector(`#topic-${index} .progress-fill`).style.width = '100%';
    }
    
    saveProgress();
}

// ============================================
// FORM VALIDATION
// ============================================
const contactForm = document.getElementById('contactForm');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }
    
    // Email validation
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    // Subject validation
    if (subject.length < 3) {
        document.getElementById('subjectError').textContent = 'Subject must be at least 3 characters';
        isValid = false;
    } else {
        document.getElementById('subjectError').textContent = '';
    }
    
    // Message validation
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }
    
    return isValid;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = 'Sending...';
        formStatus.className = '';
        
        // Simulate sending
        setTimeout(() => {
            formStatus.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
            formStatus.className = 'success';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1500);
    }
});

// ============================================
// CHATBOT
// ============================================
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

const chatbotResponses = {
    'python': 'Python is a versatile language! Start with basics like variables and loops, then move to functions and OOP. Practice with small projects!',
    'web': 'Web development involves HTML for structure, CSS for styling, and JavaScript for interactivity. Learn React or Vue for modern frameworks!',
    'neet': 'NEET requires strong fundamentals in Biology, Chemistry, and Physics. Focus on NCERT books and practice previous year papers.',
    'study': 'Effective studying involves: 1) Active recall, 2) Spaced repetition, 3) Practice problems, 4) Teaching others, 5) Regular breaks.',
    'motivation': 'Remember why you started! Break goals into smaller milestones, celebrate progress, and don\'t compare your journey with others.',
    'time': 'Time management tip: Use the Pomodoro technique (25 min focus + 5 min break), prioritize important tasks, and eliminate distractions.',
    'default': 'That\'s a great question! I\'d recommend breaking it down into smaller topics and practicing consistently. What specific area would you like help with?'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(chatbotResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    return chatbotResponses.default;
}

function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendChatMessage() {
    const message = chatbotInput.value.trim();
    
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

chatbotSend.addEventListener('click', sendChatMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// ============================================
// EXAMPLE GOALS
// ============================================
document.querySelectorAll('.example-goal').forEach(btn => {
    btn.addEventListener('click', () => {
        const goal = btn.dataset.goal;
        document.getElementById('goalInput').value = goal;
        generateRoadmap(goal);
        
        // Scroll to roadmap
        setTimeout(() => {
            document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
});

// ============================================
// GENERATE BUTTON
// ============================================
document.getElementById('generateBtn').addEventListener('click', () => {
    const goal = document.getElementById('goalInput').value.trim();
    
    if (goal.length > 0) {
        generateRoadmap(goal);
        
        // Scroll to roadmap
        setTimeout(() => {
            document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        alert('Please enter a learning goal!');
    }
});

// ============================================
// LOCALSTORAGE
// ============================================
function saveRoadmap(goal, data) {
    localStorage.setItem('currentGoal', goal);
    localStorage.setItem('roadmapData', JSON.stringify(data));
}

function saveProgress() {
    const progress = {};
    document.querySelectorAll('.topic-item').forEach((item, index) => {
        const progressText = document.getElementById(`progress-${index}`).textContent;
        progress[index] = progressText;
    });
    localStorage.setItem('topicProgress', JSON.stringify(progress));
}

function loadProgress() {
    const savedGoal = localStorage.getItem('currentGoal');
    const savedProgress = localStorage.getItem('topicProgress');
    
    if (savedGoal) {
        generateRoadmap(savedGoal);
        
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            Object.keys(progress).forEach(index => {
                const progressSpan = document.getElementById(`progress-${index}`);
                if (progressSpan) {
                    progressSpan.textContent = progress[index];
                    const progressFill = document.querySelector(`#topic-${index} .progress-fill`);
                    if (progressFill) {
                        progressFill.style.width = progress[index];
                    }
                }
            });
        }
    }
}

// Load saved progress on page load
window.addEventListener('load', loadProgress);

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 136, 0.5); }
        50% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.8); }
    }
`;
document.head.appendChild(style);