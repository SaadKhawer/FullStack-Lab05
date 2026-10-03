// studentUtils.js

// Named export: constant
export const DEPARTMENT_NAME = "Computer Science";

// Named export: calculateTotal using rest parameter
export function calculateTotal(...marks) {
    return marks.reduce((sum, mark) => sum + mark, 0);
}

// Named export: calculateAverage as an arrow function
export const calculateAverage = (...marks) => {
    if (marks.length === 0) return 0;
    const total = calculateTotal(...marks);
    return total / marks.length;
};

// Named export: getGrade
export function getGrade(marks) {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

// Named export: getStatus as an arrow function using ternary operator
export const getStatus = (marks) => (marks >= 50 ? "Pass" : "Fail");

// Default export: formatStudentResult using a template literal
export default function formatStudentResult(name, rollNumber, total) {
    return `Student: ${name}
Roll No: ${rollNumber}
Total: ${total}`;
}
