// Sample student data with performance in five subjects
const students = [
    { name: 'Alice Johnson', math: 90, english: 85, science: 88, history: 92, art: 80 },
    { name: 'Bob Smith', math: 75, english: 78, science: 72, history: 70, art: 85 },
    { name: 'Charlie Davis', math: 60, english: 65, science: 68, history: 55, art: 60 },
    { name: 'Diana Wilson', math: 95, english: 90, science: 92, history: 88, art: 87 },
    { name: 'Ethan Brown', math: 80, english: 82, science: 78, history: 76, art: 75 },
    { name: 'Fiona Miller', math: 50, english: 55, science: 58, history: 45, art: 60 },
    { name: 'George Clark', math: 40, english: 42, science: 45, history: 38, art: 40 },
];

// Populate student table
const studentTableBody = document.getElementById('studentTableBody');
const riskList = document.getElementById('riskList');

const populateTable = (students) => {
    studentTableBody.innerHTML = '';
    riskList.innerHTML = ''; // Clear risk list
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.math}</td>
            <td>${student.english}</td>
            <td>${student.science}</td>
            <td>${student.history}</td>
            <td>${student.art}</td>
            <td><button onclick="showPerformanceChart('${student.name}')">View Chart</button></td>
        `;
        studentTableBody.appendChild(row);

        // Check for students at risk and display their subjects
        const subjects = ['math', 'english', 'science', 'history', 'art'];
        const atRiskSubjects = subjects.filter(subject => student[subject] < 60);
        if (atRiskSubjects.length > 0) {
            const riskItem = document.createElement('li');
            riskItem.textContent = `${student.name} - Improve in: ${atRiskSubjects.join(', ')}`;
            riskList.appendChild(riskItem);
        }
    });
};
populateTable(students);

// Calculate average grade
const averageGradeElement = document.getElementById('averageGrade');
const grades = students.map(student => (student.math + student.english + student.science + student.history + student.art) / 5);
const averageGrade = grades.reduce((a, b) => a + b, 0) / grades.length;
const averageGradeLetter = averageGrade >= 90 ? 'A' : averageGrade >= 80 ? 'B' : averageGrade >= 70 ? 'C' : averageGrade >= 60 ? 'D' : 'F';
averageGradeElement.textContent = averageGradeLetter;

// Calculate students at risk
const studentsAtRiskElement = document.getElementById('studentsAtRisk');
const studentsAtRisk = students.filter(student => student.math < 60 || student.english < 60 || student.science < 60 || student.history < 60 || student.art < 60).length;
studentsAtRiskElement.textContent = studentsAtRisk;

// Total students
const totalStudentsElement = document.getElementById('totalStudents');
totalStudentsElement.textContent = students.length;

// Chart.js setup for subject performance
const ctx = document.getElementById('subjectPerformanceChart').getContext('2d');
const subjects = ['Math', 'English', 'Science', 'History', 'Art'];
const subjectAverages = subjects.map(subject => {
    const total = students.reduce((sum, student) => sum + student[subject.toLowerCase()], 0);
    return total / students.length;
});

const subjectPerformanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: subjects,
        datasets: [{
            label: 'Average Score',
            data: subjectAverages,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Search students
const searchStudents = () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student => student.name.toLowerCase().includes(query));
    populateTable(filteredStudents);
};

// Filter by subject
const filterBySubject = () => {
    const subject = document.getElementById('subjectFilter').value;
    if (subject === 'all') {
        populateTable(students);
    } else {
        const filteredStudents = students.filter(student => student[subject] < 60);
        populateTable(filteredStudents);
    }
};

// Show performance chart for individual student
const showPerformanceChart = (studentName) => {
    const student = students.find(s => s.name === studentName);
    const ctx = document.createElement('canvas');
    ctx.id = 'individualPerformanceChart';
    document.body.appendChild(ctx); // Append chart to body or a modal

    const studentSubjects = ['Math', 'English', 'Science', 'History', 'Art'];
    const studentScores = studentSubjects.map(subject => student[subject.toLowerCase()]);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: studentSubjects,
            datasets: [{
                label: studentName,
                data: studentScores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
};

const authenticateUser = () => {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    
    // Basic authentication check
    if (username === 'educator' && password === 'password') {
        alert('Welcome!');
    } else {
        alert('Invalid credentials');
        window.location.reload(); // Reload to retry
    }};

// Call on page load
authenticateUser();
const progressData = {
    'Alice Johnson': [85, 90, 92], // mock data for past grades
    'Bob Smith': [70, 75, 80]
};

const displayProgressTracking = () => {
    const progressContainer = document.getElementById('progressData');
    for (const [student, grades] of Object.entries(progressData)) {
        const studentDiv = document.createElement('div');
        studentDiv.textContent = `${student}: ${grades.join(', ')}`;
        progressContainer.appendChild(studentDiv);
    }
};

// Call this function on page load
displayProgressTracking();
const toggleMetrics = (metric) => {
    // Store user's preference for visible metrics
    const preferences = JSON.parse(localStorage.getItem('dashboardPreferences')) || {};
    preferences[metric] = !preferences[metric];
    localStorage.setItem('dashboardPreferences', JSON.stringify(preferences));
};

// Call toggleMetrics() on button click for each metric you want to toggle.

const comparePerformance = (studentName) => {
    const student = students.find(s => s.name === studentName);
    const avgMath = students.reduce((sum, s) => sum + s.math, 0) / students.length;
    const comparison = student.math > avgMath ? "above" : "below";
    alert(`${student.name}'s Math score is ${comparison} average.`);
};
const submitFeedback = () => {
    const feedback = document.getElementById('feedbackInput').value;
    console.log('Feedback submitted:', feedback); // Replace with actual handling logic
    alert('Feedback submitted successfully!');
};

const checkBadges = () => {
    students.forEach(student => {
        if (student.math > 90) {
            console.log(`${student.name} earned a Math Excellence Badge!`);
        }
    });
};

// Call this on page load
checkBadges();
