// lab05.js

import formatStudentResult, { 
    DEPARTMENT_NAME, 
    calculateTotal as calcTotal, // Importing with alias
    calculateAverage, 
    getGrade, 
    getStatus 
} from './studentUtils.js';

// --- Helper for displaying output ---
function displayOutput(sectionId, content) {
    const section = document.getElementById(sectionId);
    if (section) {
        const div = document.createElement('div');
        div.innerHTML = content;
        section.appendChild(div);
    }
}

function displayCard(sectionId, content) {
    const html = `<div class="card">${content}</div>`;
    displayOutput(sectionId, html);
}

function clearOutput(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = '';
    }
}

// ==========================================
// Task 1 — University Course Enrollment Manager
// ==========================================
function task1() {
    const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
    const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
    const student = { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
    const cgpas = [3.1, 3.5, 3.8, 3.2, 3.9];

    // 1. Merge coreCourses and electiveCourses into allCourses using the spread operator
    const allCourses = [...coreCourses, ...electiveCourses];
    
    // 2. Create a copy of allCourses using spread and add one new course to the copy only
    const copyCourses = [...allCourses, "Software Engineering"];

    // 3. Create an updated student object using spread
    const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };

    // 4. enrollStudent function using a rest parameter
    function enrollStudent(name, ...courses) {
        return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
    }

    // 5. calculateAverageCGPA using a rest parameter and an arrow function
    const calculateAverageCGPA = (...cgpasArgs) => {
        const sum = cgpasArgs.reduce((acc, val) => acc + val, 0);
        return (sum / cgpasArgs.length).toFixed(2);
    };

    // 6. Find the highest CGPA using Math.max() with the spread operator
    const highestCGPA = Math.max(...cgpas);

    // 7. Function with a default parameter
    function getStudentInfo(name, department = "Computer Science") {
        return `Department (default): ${department}`;
    }

    // 8. Template literals for messages
    // 9. Display the results in a Bootstrap-style card
    const outputHtml = `
        <strong>Core Courses:</strong> ${coreCourses.join(", ")}<br>
        <strong>Elective Courses:</strong> ${electiveCourses.join(", ")}<br>
        <strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}<br>
        <strong>Copy after adding a course (${copyCourses.length}):</strong> ${copyCourses.join(", ")}<br>
        <strong>Original still has ${allCourses.length} courses</strong><br>
        <br>
        <strong>Original Student:</strong> ${student.name}, Semester ${student.semester}<br>
        <strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}<br>
        <br>
        ${enrollStudent(student.name, "Web Development", "Database Systems", "Artificial Intelligence")}<br>
        <br>
        <strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpas)}<br>
        <strong>Highest CGPA:</strong> ${highestCGPA}<br>
        <br>
        ${getStudentInfo(student.name)}
    `;

    displayCard('task1-output', outputHtml);
}

// ==========================================
// Task 2 — Student Utility Module
// ==========================================
function task2() {
    displayOutput('task2-output', `<h4>Department: ${DEPARTMENT_NAME}</h4>`);
    
    const students = [
        { name: "Sara", rollNumber: "BSCS-023", assignment: 28, midterm: 20, finalExam: 34 },
        { name: "Ahmed", rollNumber: "BSCS-002", assignment: 20, midterm: 15, finalExam: 32 },
        { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 10, finalExam: 28 },
        { name: "Hassan", rollNumber: "BSCS-031", assignment: 25, midterm: 22, finalExam: 38 }
    ];

    students.forEach(studentObj => {
        // Object destructuring
        const { name, rollNumber, assignment, midterm, finalExam } = studentObj;
        
        const total = calcTotal(assignment, midterm, finalExam);
        const average = calculateAverage(assignment, midterm, finalExam).toFixed(2);
        const grade = getGrade(total);
        const status = getStatus(total);
        
        // formatStudentResult(name, rollNumber, total) returns a formatted string (multiline)
        // Convert \n to <br> for HTML display
        const formattedStr = formatStudentResult(name, rollNumber, total).replace(/\n/g, '<br>');
        
        const cardContent = `
            ${formattedStr}<br>
            Average: ${average}<br>
            Grade: ${grade}<br>
            Status: ${status}
        `;
        displayCard('task2-output', cardContent);
    });
}

// ==========================================
// Task 3 — Online Examination Workflow
// ==========================================
function task3() {
    // 1. Functions with setTimeout
    function verifyStudent(roll, callback) {
        setTimeout(() => {
            if (!roll) {
                // Error-first callback
                callback("Roll number is required", null);
            } else {
                callback(null, `Student ${roll} verified`);
            }
        }, 1000);
    }

    function loadExamPaper(callback) {
        setTimeout(() => {
            callback("Exam paper loaded");
        }, 1500);
    }

    function submitAnswers(callback) {
        setTimeout(() => {
            callback("Answers submitted");
        }, 2000);
    }

    function generateResult(callback) {
        setTimeout(() => {
            callback("Result generated: 82 marks");
        }, 1000);
    }

    function runWorkflow(roll) {
        const outputId = 'task3-output';
        
        let workflowOutput = `<strong>Workflow for '${roll === "" ? "Empty Roll" : roll}':</strong><br>Exam workflow started...<br>`;
        displayOutput(outputId, workflowOutput);

        let timeOffset = 0;
        
        // This nested structure is called "callback hell" because it leads to deeply nested code 
        // that forms a pyramid shape, making it hard to read, maintain, and debug.
        
        verifyStudent(roll, (error, data) => {
            timeOffset += 1; // 1s
            if (error) {
                displayOutput(outputId, `<span class="error">Error: ${error}</span><br><br>`);
                return; // Stop if error
            }
            displayOutput(outputId, `Step 1: ${data} (after ${timeOffset} second)<br>`);
            
            loadExamPaper((msg) => {
                timeOffset += 1.5; // 1.5s
                displayOutput(outputId, `Step 2: ${msg} (after ${timeOffset} seconds)<br>`);
                
                submitAnswers((msg) => {
                    timeOffset += 2; // 2s
                    displayOutput(outputId, `Step 3: ${msg} (after ${timeOffset} seconds)<br>`);
                    
                    generateResult((msg) => {
                        timeOffset += 1; // 1s
                        displayOutput(outputId, `Step 4: ${msg} (after ${timeOffset} seconds)<br>`);
                        displayOutput(outputId, `<strong>Exam completed successfully!</strong><br><br>`);
                    });
                });
            });
        });
    }

    // Test with valid roll number, then test with empty roll number after a delay
    runWorkflow("BSCS-001");
    setTimeout(() => {
        runWorkflow("");
    }, 6500);
}

// ==========================================
// Task 4 — University Result Portal
// ==========================================
const dbStudents = [
    { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 28, midterm: 20, finalExam: 34 },
    { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 6, assignment: 20, midterm: 15, finalExam: 32 },
    { name: "Sara", rollNumber: "BSCS-023", department: "Computer Science", semester: 6, assignment: 29, midterm: 22, finalExam: 35 },
    { name: "Ayesha", rollNumber: "BSCS-014", department: "Computer Science", semester: 6, assignment: 10, midterm: 10, finalExam: 28 },
    { name: "Hassan", rollNumber: "BSCS-031", department: "Computer Science", semester: 6, assignment: 25, midterm: 22, finalExam: 38 }
];

function findStudent(rollNumber) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const student = dbStudents.find(s => s.rollNumber === rollNumber);
            if (student) resolve(student);
            else reject("Student not found");
        }, 1000);
    });
}

function calculateResult(student) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const { assignment, midterm, finalExam } = student;
            const total = calcTotal(assignment, midterm, finalExam);
            const average = calculateAverage(assignment, midterm, finalExam).toFixed(2);
            const grade = getGrade(total);
            const status = getStatus(total);
            resolve({ total, average, grade, status });
        }, 1000);
    });
}

// Part A: Promise Chain demonstration on load
function testPromiseChain() {
    const out = 'task4-output';
    displayOutput(out, "Searching for roll number BSCS-001 (Promise Chain)...<br>");
    
    findStudent("BSCS-001")
        .then(student => {
            return calculateResult(student).then(result => ({ student, result }));
        })
        .then(({ student, result }) => {
            const cardHtml = `
                <hr>
                Student: ${student.name}<br>
                Roll No: ${student.rollNumber}<br>
                Department: ${student.department}<br>
                Semester: ${student.semester}<br>
                Total: ${result.total}<br>
                Average: ${result.average}<br>
                Grade: ${result.grade}<br>
                Status: ${result.status}<br>
                <hr>
            `;
            displayCard(out, cardHtml);
        })
        .catch(err => {
            displayOutput(out, `<span class="error">Error: ${err}</span><br>`);
        })
        .finally(() => {
            displayOutput(out, "Search completed (Promise Chain)<br><br>");
        });
}

// Part B & C: Async/Await Search Form
async function showResult(rollNumber) {
    const out = 'task4-output';
    clearOutput(out);
    displayOutput(out, `Searching for roll number ${rollNumber}:<br>Searching...<br>`);

    try {
        const student = await findStudent(rollNumber);
        const result = await calculateResult(student);
        const cardHtml = `
            <hr>
            Student: ${student.name}<br>
            Roll No: ${student.rollNumber}<br>
            Department: ${student.department}<br>
            Semester: ${student.semester}<br>
            Total: ${result.total}<br>
            Average: ${result.average}<br>
            Grade: ${result.grade}<br>
            Status: ${result.status}<br>
            <hr>
        `;
        displayOutput(out, cardHtml);
    } catch (err) {
        displayOutput(out, `<span class="error">Error: ${err}</span><br>`);
    } finally {
        displayOutput(out, "Search completed<br><br>");
    }
}

// Setup Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const roll = document.getElementById('search-roll').value.trim();
    if (roll) {
        showResult(roll);
    }
});

// Part D: Load All Results
async function loadAllResults() {
    const out = 'task4-output';
    clearOutput(out);
    displayOutput(out, "Loading all results...<br>");

    try {
        const promises = dbStudents.map(student => 
            calculateResult(student).then(res => ({ student, res }))
        );
        
        // Promise.all to calculate results concurrently
        const allResults = await Promise.all(promises);
        
        let htmlOutput = '<hr>';
        let passedCount = 0;
        let failedCount = 0;

        allResults.forEach(({student, res}) => {
            if (res.status === "Pass") passedCount++;
            else failedCount++;
            
            htmlOutput += `Student: ${student.name} Roll No: ${student.rollNumber} Grade: ${res.grade} Status: ${res.status}<br>`;
        });

        htmlOutput += '<hr>';
        
        const stats = `
            <strong>Final Statistics</strong><br>
            Total Students: ${allResults.length}<br>
            Passed Students: ${passedCount}<br>
            Failed Students: ${failedCount}<br>
        `;
        htmlOutput += stats;
        
        // Clear "Loading all results..." and show data
        clearOutput(out);
        displayCard(out, htmlOutput);

    } catch (err) {
        displayOutput(out, `<span class="error">Error loading all results: ${err}</span><br>`);
    }
}

document.getElementById('load-all-btn').addEventListener('click', () => {
    loadAllResults();
});

// --- Initialize Tasks ---
task1();
task2();
task3();
testPromiseChain();
