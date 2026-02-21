// =========================
// GLOBAL TIMER VARIABLES
// =========================
let timerInterval;
let totalSeconds = 0;

// =========================
// LOGIN FUNCTION
// =========================
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user && pass) {
        localStorage.setItem("user", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Please enter login details.");
    }
}

// =========================
// SHOW USERNAME ON DASHBOARD
// =========================
window.onload = function () {
    let user = localStorage.getItem("user");
    if (user && document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerText =
            "Hello, " + user + "! Let's optimize your academic journey.";
    }
};

// =========================
// TIMER FUNCTIONS
// =========================
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function () {
            totalSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    document.getElementById("timerDisplay").innerText =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}

// =========================
// MAIN DASHBOARD GENERATION
// =========================
function generateSystem() {

    let subjects = parseInt(document.getElementById("subjects").value);
    let days = parseInt(document.getElementById("days").value);
    let hours = parseInt(document.getElementById("hours").value);
    let sleep = parseInt(document.getElementById("sleep").value);

    let subjectName = document.getElementById("subjectName").value;
    let studyTime = parseInt(document.getElementById("studyTime").value);
    let level = document.getElementById("level").value;

    let letter = document.getElementById("letter").value;
    let unlockDate = document.getElementById("unlockDate").value;

    if (!subjects || !days || !hours || !sleep || !subjectName || !studyTime || !letter || !unlockDate) {
        document.getElementById("modalResult").innerHTML = "Please fill all fields.";
        document.getElementById("dashboardModal").style.display = "block";
        return;
    }

    // Study Calculations
    let totalStudyNeeded = subjects * 10;
    let dailyRequired = totalStudyNeeded / days;

    // Burnout Calculation
    let burnoutScore = 0;
    if (sleep < 5) burnoutScore += 50;
    if (hours > 8) burnoutScore += 30;
    if (totalStudyNeeded > (hours * days)) burnoutScore += 20;

    let healthScore = 100 - burnoutScore;

    let burnoutLevel = burnoutScore >= 60 ? "⚠️ High Burnout Risk"
        : burnoutScore >= 30 ? "⚠️ Moderate Burnout Risk"
        : "✅ Low Burnout Risk";

    let studentType = "";
    if (hours > 8 && sleep < 6)
        studentType = "⚡ The Overworking Achiever";
    else if (hours < 3 && subjects > 4)
        studentType = "⏳ The Last-Minute Warrior";
    else
        studentType = "📚 The Smart Strategist";

    // Study Buddy Matching
    let students = [
        { name: "Arjun", subject: "Math", time: 18, level: "Intermediate" },
        { name: "Meera", subject: "Physics", time: 20, level: "Beginner" },
        { name: "Rahul", subject: "Math", time: 17, level: "Intermediate" },
        { name: "Ananya", subject: "Chemistry", time: 19, level: "Advanced" }
    ];

    let match = null;

    for (let i = 0; i < students.length; i++) {
        if (
            students[i].subject.toLowerCase() === subjectName.toLowerCase() &&
            Math.abs(students[i].time - studyTime) <= 1 &&
            students[i].level === level
        ) {
            match = students[i];
            break;
        }
    }

    let buddyMessage = match
        ? "🎓 Micro Study Circle Matched: " + match.name
        : "No exact match found.";

    // Letter Logic
    let today = new Date();
    let selectedDate = new Date(unlockDate);

    let letterMessage = today >= selectedDate
        ? "🔓 Your Letter: <br>" + letter
        : "🔒 Letter Locked Until " + unlockDate;

    // Motivational Quotes
    let quotes = [
        "🌟 Future you is watching. Don't quit.",
        "📚 Small daily effort builds big success.",
        "🔥 Consistency beats intensity.",
        "🎓 Your graduation day is getting closer.",
        "💪 Discipline today, freedom tomorrow.",
        "🚀 You are closer than you think.",
        "✨ The future belongs to those who prepare today."
    ];

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Display in RIGHT section only
    document.getElementById("modalResult").innerHTML =

        "<h2>📊 Academic Dashboard</h2>" +

        "<p><strong>Daily Study Required:</strong> " + dailyRequired.toFixed(1) + " hrs</p>" +
        (dailyRequired > hours ?
            "<p style='color:red;'><strong>⚠ Overload Alert:</strong> Not realistically achievable in available time.</p>"
            : "") +

        "<p><strong>Burnout Status:</strong> " + burnoutLevel + "</p>" +
        "<p><strong>Academic Health Score:</strong> " + healthScore + "/100</p>" +

        "<h3>🧠 Student Type</h3>" +
        "<p>" + studentType + "</p>" +

        "<h3>🤝 Study Circle</h3>" +
        "<p>" + buddyMessage + "</p>" +

        "<h3>💌 Future Letter</h3>" +
        "<p>" + letterMessage + "</p>" +

        "<h3>✨ AI Motivation</h3>" +
        "<p style='font-style:italic; color:#7b5fc9;'>" + randomQuote + "</p>";

    document.getElementById("dashboardModal").style.display = "block";
}

// =========================
// CLOSE MODAL
// =========================
function closeModal() {
    document.getElementById("dashboardModal").style.display = "none";
}