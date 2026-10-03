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
        <div class="info-widget"><i class="fa-solid fa-book text-primary me-2"></i> <strong>Core:</strong> ${coreCourses.join(", ")}</div>
        <div class="info-widget"><i class="fa-solid fa-book-open text-info me-2"></i> <strong>Elective:</strong> ${electiveCourses.join(", ")}</div>
        <div class="info-widget"><i class="fa-solid fa-layer-group text-success me-2"></i> <strong>All (${allCourses.length}):</strong> ${allCourses.join(", ")}</div>
        <div class="info-widget"><i class="fa-solid fa-clone text-warning me-2"></i> <strong>Copied (+1):</strong> ${copyCourses.join(", ")}</div>
        <div class="info-widget mt-3"><i class="fa-solid fa-user text-primary me-2"></i> <strong>Original Student:</strong> ${student.name}, Sem ${student.semester}</div>
        <div class="info-widget"><i class="fa-solid fa-user-check text-success me-2"></i> <strong>Updated Student:</strong> ${updatedStudent.name}, Sem ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}</div>
        <div class="info-widget bg-primary text-white border-0 mt-3"><i class="fa-solid fa-trophy text-warning me-2"></i> <strong>Highest CGPA:</strong> ${highestCGPA}</div>
    `);

    function enrollStudent(name, ...courses) {
        return `<i class="fa-solid fa-graduation-cap me-2"></i><strong>${name}</strong> enrolled in <span class="badge bg-primary">${courses.length} courses</span>:<br><span class="text-muted small">${courses.join(", ")}</span>`;
    }
    const calculateAverageCGPA = (...cgpasArgs) => {
        const sum = cgpasArgs.reduce((acc, val) => acc + val, 0);
        return (sum / cgpasArgs.length).toFixed(2);
    };

    setHtml('restOutput', `
        <div class="info-widget border-success">${enrollStudent(student.name, "Web Development", "Database Systems", "AI")}</div>
        <div class="info-widget bg-dark text-white border-0 mt-2"><i class="fa-solid fa-calculator text-info me-2"></i> <strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpas)}</div>
    `);

    function getStudentInfo(name, department = "Computer Science") {
        return `<i class="fa-solid fa-building-columns text-primary me-2"></i> <strong>Department (default):</strong> ${department}`;
    }
    setHtml('es6Output', `<div class="info-widget">${getStudentInfo(student.name)}</div>`);
}

// ==========================================
// Task 2
// ==========================================
function task2() {
    let output = `<h5 class="text-primary mb-3"><i class="fa-solid fa-building me-2"></i>${DEPARTMENT_NAME}</h5><div class="row g-3">`;
    
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
        
        const badgeColor = status === 'Pass' ? 'bg-success' : 'bg-danger';
        
        output += `
            <div class="col-md-6">
                <div class="card shadow-sm border-0 h-100" style="background: rgba(255,255,255,0.7);">
                    <div class="card-body">
                        <h6 class="fw-bold mb-0 text-primary">${name}</h6>
                        <small class="text-muted">${rollNumber}</small>
                        <hr class="my-2">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span><i class="fa-solid fa-chart-line text-info me-1"></i> Total</span> <strong>${total}</strong>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span><i class="fa-solid fa-percent text-warning me-1"></i> Avg</span> <strong>${average}</strong>
                        </div>
                        <span class="badge bg-dark">${grade} Grade</span>
                        <span class="badge ${badgeColor}">${status}</span>
                    </div>
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
        setHtml(targetId, `<div class="alert alert-primary shadow-sm"><i class="fa-solid fa-spinner fa-spin me-2"></i> Exam workflow started...</div>`);
        let timeOffset = 0;
        
        verifyStudent(roll, (error, data) => {
            timeOffset += 1;
            if (error) {
                appendHtml(targetId, `<div class="alert alert-danger shadow-sm mt-2"><i class="fa-solid fa-triangle-exclamation me-2"></i> <strong>Error:</strong> ${error}</div>`);
                return;
            }
            appendHtml(targetId, `<div class="info-widget border-info"><i class="fa-solid fa-user-check text-info me-2"></i> Step 1: ${data} <span class="badge bg-secondary float-end">${timeOffset}s</span></div>`);
            
            loadExamPaper((msg) => {
                timeOffset += 1.5;
                appendHtml(targetId, `<div class="info-widget border-warning"><i class="fa-solid fa-file-lines text-warning me-2"></i> Step 2: ${msg} <span class="badge bg-secondary float-end">${timeOffset}s</span></div>`);
                
                submitAnswers((msg) => {
                    timeOffset += 2;
                    appendHtml(targetId, `<div class="info-widget border-primary"><i class="fa-solid fa-upload text-primary me-2"></i> Step 3: ${msg} <span class="badge bg-secondary float-end">${timeOffset}s</span></div>`);
                    
                    generateResult((msg) => {
                        timeOffset += 1;
                        appendHtml(targetId, `<div class="info-widget border-success"><i class="fa-solid fa-square-poll-vertical text-success me-2"></i> Step 4: ${msg} <span class="badge bg-secondary float-end">${timeOffset}s</span></div>`);
                        appendHtml(targetId, `<div class="alert alert-success shadow-sm mt-3"><i class="fa-solid fa-circle-check me-2"></i> <strong>Exam completed successfully!</strong></div>`);
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
            else reject("Student not found in DB.");
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
    setHtml(out, `<div class="text-primary mb-2"><i class="fa-solid fa-magnifying-glass fa-beat-fade me-2"></i> Searching for <strong>BSCS-001</strong> via Promises...</div>`);
    
    findStudent("BSCS-001")
        .then(student => calculateResult(student).then(result => ({ student, result })))
        .then(({ student, result }) => {
            const badgeClass = result.status === 'Pass' ? 'bg-success' : 'bg-danger';
            appendHtml(out, `
                <div class="card shadow-sm border-0 border-start border-4 border-primary">
                    <div class="card-body">
                        <h6 class="text-primary fw-bold">${student.name} <span class="badge bg-light text-dark float-end">${student.rollNumber}</span></h6>
                        <div class="d-flex justify-content-between mt-3">
                            <span class="text-muted"><i class="fa-solid fa-star text-warning"></i> Total: <strong>${result.total}</strong></span>
                            <span class="badge ${badgeClass}">${result.status}</span>
                        </div>
                    </div>
                </div>
            `);
        })
        .catch(err => appendHtml(out, `<div class="alert alert-danger"><i class="fa-solid fa-circle-xmark me-2"></i> ${err}</div>`));
}

async function testAsyncAwait(rollNo = "BSCS-999") {
    const out = 'asyncOutput';
    setHtml(out, `<div class="text-primary mb-2"><i class="fa-solid fa-magnifying-glass fa-beat-fade me-2"></i> Searching for <strong>${rollNo}</strong> via Async/Await...</div>`);
    try {
        const student = await findStudent(rollNo);
        const result = await calculateResult(student);
        const badgeClass = result.status === 'Pass' ? 'bg-success' : 'bg-danger';
        setHtml(out, `
            <div class="alert alert-success border-0 shadow-sm">
                <h6 class="alert-heading fw-bold mb-1"><i class="fa-solid fa-circle-check me-2"></i> ${student.name}</h6>
                <small>Grade: ${result.grade} | Status: <span class="badge ${badgeClass}">${result.status}</span></small>
            </div>
        `);
    } catch (err) {
        setHtml(out, `<div class="alert alert-danger border-0 shadow-sm"><i class="fa-solid fa-circle-xmark me-2"></i> ${err}</div>`);
    }
}

async function loadAllResults() {
    const out = 'studentPortalOutput';
    setHtml(out, `<div class="text-center p-4"><i class="fa-solid fa-circle-notch fa-spin fa-2x text-primary mb-2"></i><br>Loading all results...</div>`);

    try {
        const promises = dbStudents.map(student => 
            calculateResult(student).then(res => ({ student, res }))
        );
        const allResults = await Promise.all(promises);
        
        let htmlOutput = '<div class="row g-3 mt-2">';
        let passedCount = 0; let failedCount = 0;

        allResults.forEach(({student, res}) => {
            if (res.status === "Pass") passedCount++; else failedCount++;
            const badgeClass = res.status === 'Pass' ? 'bg-success' : 'bg-danger';
            const icon = res.status === 'Pass' ? 'fa-check' : 'fa-xmark';
            htmlOutput += `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm" style="background: linear-gradient(145deg, #ffffff, #f8fafc);">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h6 class="card-title fw-bold text-dark mb-0">${student.name}</h6>
                                <span class="badge bg-light text-muted">${student.rollNumber}</span>
                            </div>
                            <hr class="my-2 opacity-25">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-muted small fw-bold">Grade: ${res.grade}</span>
                                <span class="badge ${badgeClass} rounded-pill px-3"><i class="fa-solid ${icon} me-1"></i> ${res.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        htmlOutput += '</div>';
        htmlOutput += `
            <div class="card bg-dark text-white border-0 shadow-lg mt-4">
                <div class="card-body d-flex justify-content-around align-items-center p-4">
                    <div class="text-center">
                        <i class="fa-solid fa-users fa-2x text-primary mb-2"></i>
                        <h4 class="mb-0 fw-bold">${allResults.length}</h4>
                        <small class="text-muted">Total Students</small>
                    </div>
                    <div class="text-center">
                        <i class="fa-solid fa-award fa-2x text-success mb-2"></i>
                        <h4 class="mb-0 fw-bold">${passedCount}</h4>
                        <small class="text-muted">Passed</small>
                    </div>
                    <div class="text-center">
                        <i class="fa-solid fa-triangle-exclamation fa-2x text-danger mb-2"></i>
                        <h4 class="mb-0 fw-bold">${failedCount}</h4>
                        <small class="text-muted">Failed</small>
                    </div>
                </div>
            </div>
        `;
        
        setHtml(out, htmlOutput);
    } catch (err) {
        setHtml(out, `<div class="alert alert-danger"><i class="fa-solid fa-triangle-exclamation me-2"></i> ${err}</div>`);
    }
}

const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const roll = document.getElementById('search-roll').value.trim();
        // Since the UI element in the original HTML is asyncOutput, we reuse it or redirect.
        // Wait, the user's original HTML has an input in section 9 but we mapped it earlier.
        // Let's output the result inside studentPortalOutput if they search.
        if (roll) {
            const out = 'studentPortalOutput';
            setHtml(out, `<div class="text-primary mt-3"><i class="fa-solid fa-magnifying-glass fa-beat-fade me-2"></i> Searching...</div>`);
            findStudent(roll).then(student => calculateResult(student).then(result => {
                const badgeClass = result.status === 'Pass' ? 'bg-success' : 'bg-danger';
                setHtml(out, `
                    <div class="alert alert-success border-0 shadow-sm mt-3">
                        <h5 class="fw-bold"><i class="fa-solid fa-user-check me-2"></i>${student.name}</h5>
                        <p class="mb-0 mt-2">Grade: <strong>${result.grade}</strong> &bull; Status: <span class="badge ${badgeClass}">${result.status}</span></p>
                    </div>
                `);
            })).catch(err => {
                setHtml(out, `<div class="alert alert-danger border-0 shadow-sm mt-3"><i class="fa-solid fa-circle-xmark me-2"></i> ${err}</div>`);
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
