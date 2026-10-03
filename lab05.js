import formatStudentResult, { 
    DEPARTMENT_NAME, 
    calculateTotal as calcTotal, 
    calculateAverage, 
    getGrade, 
    getStatus 
} from './studentUtils.js';

// Helper to safely append HTML to an element
function appendHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML += html + "<br>";
}
function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

// ==========================================
// Task 1 — University Course Enrollment Manager
// ==========================================
function task1() {
    const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
    const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
    const student = { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
    const cgpas = [3.1, 3.5, 3.8, 3.2, 3.9];

    // 1 & 2. Merge and copy
    const allCourses = [...coreCourses, ...electiveCourses];
    const copyCourses = [...allCourses, "Software Engineering"];

    // 3. Update student
    const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };

    // 6. Math.max
    const highestCGPA = Math.max(...cgpas);

    setHtml('spreadOutput', `
        <strong>Core Courses:</strong> ${coreCourses.join(", ")}<br>
        <strong>Elective Courses:</strong> ${electiveCourses.join(", ")}<br>
        <strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}<br>
        <strong>Copy after adding a course (${copyCourses.length}):</strong> ${copyCourses.join(", ")}<br>
        <strong>Original still has ${allCourses.length} courses</strong><br>
        <br>
        <strong>Original Student:</strong> ${student.name}, Semester ${student.semester}<br>
        <strong>Updated Student:</strong> ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}<br>
        <strong>Highest CGPA:</strong> ${highestCGPA}
    `);

    // 4 & 5. Rest parameters
    function enrollStudent(name, ...courses) {
        return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
    }
    const calculateAverageCGPA = (...cgpasArgs) => {
        const sum = cgpasArgs.reduce((acc, val) => acc + val, 0);
        return (sum / cgpasArgs.length).toFixed(2);
    };

    setHtml('restOutput', `
        ${enrollStudent(student.name, "Web Development", "Database Systems", "Artificial Intelligence")}<br>
        <strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpas)}
    `);

    // 7. Default parameters
    function getStudentInfo(name, department = "Computer Science") {
        return `Department (default): ${department}`;
    }
    setHtml('es6Output', getStudentInfo(student.name));
}

// ==========================================
// Task 2 — Student Utility Module
// ==========================================
function task2() {
    let output = `<strong>Department: ${DEPARTMENT_NAME}</strong><br><br>`;
    
    const students = [
        { name: "Sara", rollNumber: "BSCS-023", assignment: 28, midterm: 20, finalExam: 34 },
        { name: "Ahmed", rollNumber: "BSCS-002", assignment: 20, midterm: 15, finalExam: 32 },
        { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 10, finalExam: 28 },
        { name: "Hassan", rollNumber: "BSCS-031", assignment: 25, midterm: 22, finalExam: 38 }
    ];

    students.forEach(s => {
        const { name, rollNumber, assignment, midterm, finalExam } = s;
        const total = calcTotal(assignment, midterm, finalExam);
        const average = calculateAverage(assignment, midterm, finalExam).toFixed(2);
        const grade = getGrade(total);
        const status = getStatus(total);
        
        const formattedStr = formatStudentResult(name, rollNumber, total).replace(/\n/g, '<br>');
        output += `
            <div class="card p-3 mb-2 bg-light">
                ${formattedStr}<br>
                Average: ${average}<br>
                Grade: ${grade}<br>
                Status: ${status}
            </div>
        `;
    });
    setHtml('moduleOutput', output);
}

// ==========================================
// Task 3 — Online Examination Workflow
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
        setHtml(targetId, `<strong>Exam workflow started...</strong><br>`);
        let timeOffset = 0;
        
        verifyStudent(roll, (error, data) => {
            timeOffset += 1;
            if (error) {
                appendHtml(targetId, `<span class="text-danger">Error: ${error}</span>`);
                return;
            }
            appendHtml(targetId, `Step 1: ${data} (after ${timeOffset} second)`);
            
            loadExamPaper((msg) => {
                timeOffset += 1.5;
                appendHtml(targetId, `Step 2: ${msg} (after ${timeOffset} seconds)`);
                
                submitAnswers((msg) => {
                    timeOffset += 2;
                    appendHtml(targetId, `Step 3: ${msg} (after ${timeOffset} seconds)`);
                    
                    generateResult((msg) => {
                        timeOffset += 1;
                        appendHtml(targetId, `Step 4: ${msg} (after ${timeOffset} seconds)`);
                        appendHtml(targetId, `<strong>Exam completed successfully!</strong>`);
                    });
                });
            });
        });
    }

    // Run valid roll number in nestedCallbackOutput
    runWorkflow("BSCS-001", "nestedCallbackOutput");
    
    // Run empty roll number in callbackOutput to show error handling
    runWorkflow("", "callbackOutput");
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

// Part A: Promise Chain
function testPromiseChain() {
    const out = 'promiseOutput';
    setHtml(out, "Searching for roll number BSCS-001 (Promise Chain)...<br>");
    
    findStudent("BSCS-001")
        .then(student => calculateResult(student).then(result => ({ student, result })))
        .then(({ student, result }) => {
            appendHtml(out, `----------------------------------------------<br>
                Student: ${student.name}<br>Roll No: ${student.rollNumber}<br>
                Total: ${result.total}<br>Average: ${result.average}<br>
                Grade: ${result.grade}<br>Status: ${result.status}<br>
                ----------------------------------------------`);
        })
        .catch(err => appendHtml(out, `<span class="text-danger">Error: ${err}</span>`))
        .finally(() => appendHtml(out, "Search completed"));
}

// Part B: Async Await
async function testAsyncAwait() {
    const out = 'asyncOutput';
    setHtml(out, "Searching for roll number BSCS-999 (Async/Await)...<br>Searching...<br>");
    try {
        const student = await findStudent("BSCS-999");
        const result = await calculateResult(student);
        appendHtml(out, `Student: ${student.name}`);
    } catch (err) {
        appendHtml(out, `<span class="text-danger">Error: ${err}</span>`);
    } finally {
        appendHtml(out, "Search completed");
    }
}

// Part D: Load All Results (Triggered by Button)
async function loadAllResults() {
    const out = 'studentPortalOutput';
    setHtml(out, "Loading all results...<br>");

    try {
        const promises = dbStudents.map(student => 
            calculateResult(student).then(res => ({ student, res }))
        );
        const allResults = await Promise.all(promises);
        
        let htmlOutput = '----------------------------------------------<br>';
        let passedCount = 0; let failedCount = 0;

        allResults.forEach(({student, res}) => {
            if (res.status === "Pass") passedCount++; else failedCount++;
            htmlOutput += `Student: ${student.name} Roll No: ${student.rollNumber} Grade: ${res.grade} Status: ${res.status}<br>`;
        });
        htmlOutput += '----------------------------------------------<br>';
        htmlOutput += `<strong>Final Statistics</strong><br>Total Students: ${allResults.length}<br>Passed: ${passedCount}<br>Failed: ${failedCount}`;
        
        setHtml(out, htmlOutput);
    } catch (err) {
        setHtml(out, `<span class="text-danger">Error: ${err}</span>`);
    }
}

const loadPortalBtn = document.getElementById('loadPortalBtn');
if (loadPortalBtn) {
    // Remove the old script.js event listener if any by cloning (optional) but we just add ours
    loadPortalBtn.addEventListener('click', loadAllResults);
}

// Initialize
task1();
task2();
task3();
testPromiseChain();
testAsyncAwait();
