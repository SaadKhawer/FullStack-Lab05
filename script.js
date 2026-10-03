

/* =====================================================
   Lab 05 - ES6 Features, Modules, Callbacks,
   Promises and Async/Await
   Course: Full Stack Web Development (CS-301L)
   NOTE: loaded with <script type="module">
   Run with Live Server (modules do not work on file://)
===================================================== */

import formatResult, {
    COURSE_CODE,
    calculateTotal,
    calculateAverage,
    getGrade
} from "./lab05-utils.js";

/* =====================================================
   LAB 05
   HELPER FUNCTION
===================================================== */
function lab05Append(id, html) {
    document.getElementById(id).innerHTML += html + "<br>";
}

/* =====================================================
   LAB 05
   1. SPREAD OPERATOR
===================================================== */
const lab05Frontend = ["HTML", "CSS", "JavaScript"];
const lab05Backend = ["Node.js", "Express", "MongoDB"];

// Combine two arrays
const lab05FullStack = [...lab05Frontend, ...lab05Backend];

// Copy an array
const lab05FrontendCopy = [...lab05Frontend];
lab05FrontendCopy.push("Bootstrap");

// Copy and update an object
const lab05Student = { name: "Ali", semester: 6 };
const lab05UpdatedStudent = {
    ...lab05Student,
    semester: 7,
    cgpa: 3.45
};

// Spread into function arguments
const lab05MarksList = [45, 72, 38, 81];
const lab05HighestMark = Math.max(...lab05MarksList);

document.getElementById("spreadOutput").innerHTML =
    "Full Stack: " + lab05FullStack.join(", ") +
    "<br><br>" +
    "Copy after push: " + lab05FrontendCopy.join(", ") +
    "<br>" +
    "Original array: " + lab05Frontend.join(", ") +
    "<br><br>" +
    "Original object: " + lab05Student.name +
    ", Semester " + lab05Student.semester +
    "<br>" +
    "Updated object: " + lab05UpdatedStudent.name +
    ", Semester " + lab05UpdatedStudent.semester +
    ", CGPA " + lab05UpdatedStudent.cgpa +
    "<br><br>" +
    "Highest Mark: " + lab05HighestMark;

/* =====================================================
   LAB 05
   2. REST PARAMETERS
===================================================== */
function lab05CalculateTotal(...marks) {
    let total = 0;
    for (const mark of marks) {
        total += mark;
    }
    return total;
}

function lab05Enroll(studentName, ...courses) {
    return studentName + " enrolled in " +
        courses.length + " course(s): " +
        courses.join(", ");
}

// Rest in array destructuring
const [lab05First, lab05Second, ...lab05Remaining] =
    lab05FullStack;

document.getElementById("restOutput").innerHTML =
    "Total (3 marks): " +
    lab05CalculateTotal(18, 22, 42) + "<br>" +
    "Total (5 marks): " +
    lab05CalculateTotal(10, 20, 30, 40, 50) +
    "<br><br>" +
    lab05Enroll(
        "Sara",
        "Web Development",
        "Database Systems",
        "Artificial Intelligence"
    ) +
    "<br><br>" +
    "First: " + lab05First + "<br>" +
    "Second: " + lab05Second + "<br>" +
    "Remaining: " + lab05Remaining.join(", ");

/* =====================================================
   LAB 05
   3. MORE ES6 FEATURES
===================================================== */
function lab05Greet(
    name = "Student",
    course = "CS-301L"
) {
    return `Welcome ${name} to ${course}`;
}

function lab05CreateStudent(name, semester, cgpa) {
    return { name, semester, cgpa };
}

const lab05NewStudent =
    lab05CreateStudent("Ahmed", 5, 3.2);

document.getElementById("es6Output").innerHTML =
    lab05Greet() + "<br>" +
    lab05Greet("Ahmed") + "<br>" +
    lab05Greet("Sara", "Database Systems") +
    "<br><br>" +
    `Name: ${lab05NewStudent.name}<br>` +
    `Semester: ${lab05NewStudent.semester}<br>` +
    `CGPA: ${lab05NewStudent.cgpa}`;

/* =====================================================
   LAB 05
   4. JAVASCRIPT MODULES
===================================================== */
const lab05ModuleTotal = calculateTotal(18, 22, 42);

document.getElementById("moduleOutput").innerHTML =
    "Course Code: " + COURSE_CODE + "<br>" +
    "Total: " + lab05ModuleTotal + "<br>" +
    "Average: " +
    calculateAverage(18, 22, 42).toFixed(2) + "<br>" +
    "Grade: " + getGrade(lab05ModuleTotal) +
    "<br><br>" +
    formatResult("Sara", 91);

/* =====================================================
   LAB 05
   5. FUNCTION CALLBACKS
===================================================== */
function lab05CalculateResult(
    assignment,
    midterm,
    finalExam,
    callback
) {
    const total = assignment + midterm + finalExam;
    callback(total);
}

// Callback as a normal function
lab05CalculateResult(18, 22, 42, function (total) {
    lab05Append("callbackOutput", "Total Marks: " + total);
});

// Callback as an arrow function
lab05CalculateResult(18, 22, 42, (total) => {
    lab05Append(
        "callbackOutput",
        "Grade: " + getGrade(total)
    );
});

// Asynchronous callback
lab05Append(
    "callbackOutput",
    "<br><strong>Asynchronous callback:</strong>"
);
lab05Append("callbackOutput", "1. Start");

setTimeout(function () {
    lab05Append(
        "callbackOutput",
        "3. Callback executed after 2 seconds"
    );
}, 2000);

lab05Append("callbackOutput", "2. End of code");

/* =====================================================
   LAB 05
   6. NESTED CALLBACKS
===================================================== */
function lab05Login(user, callback) {
    setTimeout(function () {
        lab05Append(
            "nestedCallbackOutput",
            "Step 1: " + user + " logged in"
        );
        callback(user);
    }, 1000);
}

function lab05LoadCourses(user, callback) {
    setTimeout(function () {
        const courses = [
            "Web Development",
            "Database Systems",
            "Artificial Intelligence"
        ];
        lab05Append(
            "nestedCallbackOutput",
            "Step 2: " + courses.length +
            " courses loaded for " + user
        );
        callback(courses);
    }, 1000);
}

function lab05RegisterCourses(courses, callback) {
    setTimeout(function () {
        lab05Append(
            "nestedCallbackOutput",
            "Step 3: Registered in " +
            courses.length + " courses"
        );
        callback(courses.length);
    }, 1000);
}

function lab05SendConfirmation(count, callback) {
    setTimeout(function () {
        lab05Append(
            "nestedCallbackOutput",
            "Step 4: Confirmation sent for " +
            count + " courses"
        );
        callback();
    }, 1000);
}

lab05Login("Ali", function (user) {
    lab05LoadCourses(user, function (courses) {
        lab05RegisterCourses(courses, function (count) {
            lab05SendConfirmation(count, function () {
                lab05Append(
                    "nestedCallbackOutput",
                    "<strong>Registration complete!</strong>"
                );
            });
        });
    });
});

/* =====================================================
   LAB 05
   7. PROMISES
===================================================== */
function lab05CheckEligibility(cgpa) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (cgpa >= 2.0) {
                resolve("Eligible for the next semester");
            } else {
                reject("Academic Warning: CGPA below 2.0");
            }
        }, 1000);
    });
}

function lab05ShowEligibility(name, cgpa) {
    lab05CheckEligibility(cgpa)
        .then((message) => {
            lab05Append(
                "promiseOutput",
                `${name} (CGPA ${cgpa.toFixed(2)}): ${message}`
            );
        })
        .catch((error) => {
            lab05Append(
                "promiseOutput",
                `${name} (CGPA ${cgpa.toFixed(2)}): ${error}`
            );
        })
        .finally(() => {
            lab05Append(
                "promiseOutput",
                `${name}: check finished<br>`
            );
        });
}

lab05Append("promiseOutput", "Checking eligibility...<br>");
lab05ShowEligibility("Ali", 3.45);
lab05ShowEligibility("Ahmed", 1.8);

/* =====================================================
   LAB 05
   8. ASYNC / AWAIT
===================================================== */
function lab05LoginPromise(user) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (user) {
                resolve(user);
            } else {
                reject("Invalid user: login failed");
            }
        }, 1000);
    });
}

function lab05LoadCoursesPromise(user) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([
                "Web Development",
                "Database Systems",
                "Artificial Intelligence"
            ]);
        }, 1000);
    });
}

function lab05RegisterPromise(courses) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(courses.length);
        }, 1000);
    });
}

async function lab05RegisterStudent(user) {
    try {
        lab05Append("asyncOutput", "Starting registration...");

        const loggedUser = await lab05LoginPromise(user);
        lab05Append(
            "asyncOutput",
            "Step 1: " + loggedUser + " logged in"
        );

        const courses =
            await lab05LoadCoursesPromise(loggedUser);
        lab05Append(
            "asyncOutput",
            "Step 2: Courses loaded: " + courses.join(", ")
        );

        const count = await lab05RegisterPromise(courses);
        lab05Append(
            "asyncOutput",
            "Step 3: " + count + " courses registered"
        );
    } catch (error) {
        lab05Append(
            "asyncOutput",
            "<strong>Error: " + error + "</strong>"
        );
    } finally {
        lab05Append(
            "asyncOutput",
            "Registration process finished<br>"
        );
    }
}

async function lab05RunAsyncDemo() {
    await lab05RegisterStudent("Ali");  // succeeds
    await lab05RegisterStudent("");     // fails
}

lab05RunAsyncDemo();

/* =====================================================
   LAB 05
   9. STUDENT RESULT PORTAL
===================================================== */
function lab05FetchStudents() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const students = [
                {
                    name: "Ali", semester: 6,
                    assignment: 18, midterm: 22, finalExam: 42
                },
                {
                    name: "Ahmed", semester: 5,
                    assignment: 15, midterm: 20, finalExam: 32
                },
                {
                    name: "Sara", semester: 6,
                    assignment: 20, midterm: 28, finalExam: 43
                },
                {
                    name: "Ayesha", semester: 4,
                    assignment: 10, midterm: 12, finalExam: 26
                }
            ];
            resolve(students);
        }, 1500);
    });
}

// Arrow function + ternary operator
const lab05GetStatus = (marks) =>
    marks >= 50 ? "Passed" : "Failed";

async function lab05LoadPortal() {
    const output =
        document.getElementById("studentPortalOutput");
    output.innerHTML = "Loading student data...";

    try {
        const students = await lab05FetchStudents();
        let html = "";

        students.forEach((student) => {
            // Rest in object destructuring
            const { name, semester, ...scores } = student;

            // Spread the remaining marks into the function
            const total =
                calculateTotal(...Object.values(scores));
            const grade = getGrade(total);
            const status = lab05GetStatus(total);

            html += `
        <div class="border rounded p-3 mb-3">
          <h5>${name}</h5>
          <p>
            <strong>Semester:</strong> ${semester}<br>
            <strong>Total Marks:</strong> ${total}<br>
            <strong>Grade:</strong> ${grade}<br>
            <strong>Status:</strong> ${status}
          </p>
        </div>`;
        });

        output.innerHTML = html;
    } catch (error) {
        output.innerHTML = "Error: " + error;
    }
}

document
    .getElementById("loadPortalBtn")
    .addEventListener("click", lab05LoadPortal);
