import formatStudentResult, { 
    DEPARTMENT_NAME, 
    calculateTotal as calcTotal, 
    calculateAverage, 
    getGrade, 
    getStatus 
} from './studentUtils.js';

function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function appendHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML += html;
}

// ==========================================
// Task 1
// ==========================================
function task1() {
    const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
    const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
    const student = { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
    const cgpas = [3.1, 3.5, 3.8, 3.2, 3.9];

    const allCourses = [...coreCourses, ...electiveCourses];
    const copyCourses = [...allCourses, "Software Engineering"];
    const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };
    const highestCGPA = Math.max(...cgpas);

    setHtml('spreadOutput', `
        <div class="info-widget">
            <strong>Core Courses:</strong> ${coreCourses.join(", ")}<br>
            <strong>Elective Courses:</strong> ${electiveCourses.join(", ")}<br>
            <strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}<br>
            <strong>Copy after adding a course (${copyCourses.length}):</strong> ${copyCourses.join(", ")}<br>
            <strong>Original still has ${allCourses.length} courses</strong><br><br>
            <strong>Original Student:</strong> ${student.name}, Semester ${student.semester}<br>
            <strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}<br>
            <strong>Highest CGPA:</strong> ${highestCGPA}
        </div>
    `);

    function enrollStudent(name, ...courses) {
        return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
    }
    const calculateAverageCGPA = (...cgpasArgs) => {
        const sum = cgpasArgs.reduce((acc, val) => acc + val, 0);
        return (sum / cgpasArgs.length).toFixed(2);
    };

    setHtml('restOutput', `
        <div class="info-widget">
            ${enrollStudent(student.name, "Web Development", "Database Systems", "AI")}<br>
            <strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpas)}
        </div>
    `);

    function getStudentInfo(name, department = "Computer Science") {
        return `Department (default): ${department}`;
    }
    setHtml('es6Output', `<div class="info-widget">${getStudentInfo(student.name)}</div>`);
}

// ==========================================
// Task 2
// ==========================================
function task2() {
    let output = `<h5 class="text-primary">Department: ${DEPARTMENT_NAME}</h5><hr>`;
    
    const students = [
        { name: "Sara", rollNumber: "BSCS-023", assignment: 28, midterm: 20, finalExam: 34 },
        { name: "Ahmed", rollNumber: "BSCS-002", assignment: 20, midterm: 15, finalExam: 32 },
        { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 10, finalExam: 28 },
        { name: "Hassan", rollNumber: "BSCS-031", assignment: 25, midterm: 22, finalExam: 38 }
    ];

    output += `<div class="row">`;
    students.forEach(s => {
        const { name, rollNumber, assignment, midterm, finalExam } = s;
        const total = calcTotal(assignment, midterm, finalExam);
        const average = calculateAverage(assignment, midterm, finalExam).toFixed(2);
        const grade = getGrade(total);
        const status = getStatus(total);
        
        output += `
            <div class="col-md-6 mb-3">
                <div class="card p-3">
                    <strong>${name} (${rollNumber})</strong><br>
                    Total: ${total} | Average: ${average}<br>
                    Grade: ${grade} | Status: ${status}
                </div>
            </div>
        `;
    });
    output += `</div>`;
    setHtml('moduleOutput', output);
}

// ==========================================
// Task 3
// ==========================================
function task3() {
    function verifyStudent(roll, callback) {
        setTimeout(() => {
            if (!roll) callback("Roll number is required", null);
            else callback(null, `Student ${roll} verified`);
        }, 1000);
    }
    function loadExamPaper(callback) { setTimeout(() => callback("Exam paper loaded"), 1500); }
    function submitAnswers(callback) { setTimeout(() => callback("Answers submitted"), 2000); }
    function generateResult(callback) { setTimeout(() => callback("Result generated: 82 marks"), 1000); }

    function runWorkflow(roll, targetId) {
        setHtml(targetId, `<div class="info-widget">Exam workflow started...</div>`);
        let timeOffset = 0;
        
        verifyStudent(roll, (error, data) => {
            timeOffset += 1;
            if (error) {
                appendHtml(targetId, `<div class="alert alert-danger mt-2">Error: ${error}</div>`);
                return;
            }
            appendHtml(targetId, `<div class="info-widget">Step 1: ${data} (after ${timeOffset}s)</div>`);
            
            loadExamPaper((msg) => {
                timeOffset += 1.5;
                appendHtml(targetId, `<div class="info-widget">Step 2: ${msg} (after ${timeOffset}s)</div>`);
                
                submitAnswers((msg) => {
                    timeOffset += 2;
                    appendHtml(targetId, `<div class="info-widget">Step 3: ${msg} (after ${timeOffset}s)</div>`);
                    
                    generateResult((msg) => {
                        timeOffset += 1;
                        appendHtml(targetId, `<div class="info-widget">Step 4: ${msg} (after ${timeOffset}s)</div>`);
                        appendHtml(targetId, `<div class="alert alert-success mt-2">Exam completed successfully!</div>`);
                    });
                });
            });
        });
    }

    runWorkflow("BSCS-001", "nestedCallbackOutput");
    runWorkflow("", "callbackOutput");
}

// ==========================================
// Task 4
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

function testPromiseChain() {
    const out = 'promiseOutput';
    setHtml(out, `Searching for roll number BSCS-001...<br>`);
    
    findStudent("BSCS-001")
        .then(student => calculateResult(student).then(result => ({ student, result })))
        .then(({ student, result }) => {
            appendHtml(out, `
                <div class="card p-3 mt-2">
                    <strong>Student: ${student.name} (${student.rollNumber})</strong><br>
                    Total: ${result.total} | Average: ${result.average}<br>
                    Grade: ${result.grade} | Status: ${result.status}
                </div>
            `);
        })
        .catch(err => appendHtml(out, `<div class="alert alert-danger mt-2">Error: ${err}</div>`));
}

async function testAsyncAwait(rollNo = "BSCS-999") {
    const out = 'asyncOutput';
    setHtml(out, `Searching for roll number ${rollNo}...<br>`);
    try {
        const student = await findStudent(rollNo);
        const result = await calculateResult(student);
        setHtml(out, `
            <div class="card p-3 mt-2">
                <strong>${student.name} (${student.rollNumber})</strong><br>
                Grade: ${result.grade} | Status: ${result.status}
            </div>
        `);
    } catch (err) {
        setHtml(out, `<div class="alert alert-danger mt-2">Error: ${err}</div>`);
    }
}

async function loadAllResults() {
    const out = 'studentPortalOutput';
    setHtml(out, `Loading all results...<br>`);

    try {
        const promises = dbStudents.map(student => 
            calculateResult(student).then(res => ({ student, res }))
        );
        const allResults = await Promise.all(promises);
        
        let htmlOutput = '<ul class="list-group mt-3">';
        let passedCount = 0; let failedCount = 0;

        allResults.forEach(({student, res}) => {
            if (res.status === "Pass") passedCount++; else failedCount++;
            htmlOutput += `
                <li class="list-group-item">
                    <strong>Student: ${student.name}</strong> | Roll No: ${student.rollNumber} | Grade: ${res.grade} | Status: ${res.status}
                </li>
            `;
        });
        htmlOutput += '</ul>';
        htmlOutput += `
            <div class="alert alert-info mt-3">
                <strong>Final Statistics:</strong> Total Students: ${allResults.length} | Passed: ${passedCount} | Failed: ${failedCount}
            </div>
        `;
        
        setHtml(out, htmlOutput);
    } catch (err) {
        setHtml(out, `<div class="alert alert-danger mt-2">Error: ${err}</div>`);
    }
}

const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const roll = document.getElementById('search-roll').value.trim();
        if (roll) {
            const out = 'studentPortalOutput';
            setHtml(out, `Searching...<br>`);
            findStudent(roll).then(student => calculateResult(student).then(result => {
                setHtml(out, `
                    <div class="card p-3 mt-2">
                        <strong>${student.name}</strong><br>
                        Grade: ${result.grade} | Status: ${result.status}
                    </div>
                `);
            })).catch(err => {
                setHtml(out, `<div class="alert alert-danger mt-2">Error: ${err}</div>`);
            });
        }
    });
}

const loadPortalBtn = document.getElementById('loadPortalBtn');
if (loadPortalBtn) {
    loadPortalBtn.addEventListener('click', loadAllResults);
}

// Initialize
task1();
task2();
task3();
testPromiseChain();
testAsyncAwait();
