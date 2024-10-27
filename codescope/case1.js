let students = [
    { name: "Alice", grades: [80, 75, 50] },  // MATH, ENGLISH, PHYSICS
    { name: "Robert", grades: [89, 25, 70] },
    { name: "Antony", grades: [45, 65, 80] },
    { name: "Bree", grades: [62, 72, 70] }
];

// Function to calculate the average grade
function getGrades(grades) {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }
    return sum / grades.length;
}

// Function to determine if the student passes or fails
function criteria(averageGrade) {
    if (averageGrade >= 50) {
        console.log("Student Pass");
    } else {
        console.log("Student Fail");
    }
}

// Function to categorize the student's performance
function categorization(averageGrade) {
    if (averageGrade > 90) {
        console.log("Category: Excellent");
    } else if (averageGrade > 70) {
        console.log("Category: Good");
    } else if (averageGrade > 50) {
        console.log("Category: Average");
    } else {
        console.log("Category: Fail");
    }
}

// Generate report for each student
for (let j = 0; j < students.length; j++) {
    console.log("Name: " + students[j].name);
    let averageGrade = getGrades(students[j].grades);
    console.log("Major:", averageGrade.toFixed(2));  // Display average grade with two decimal places
    criteria(averageGrade);
    categorization(averageGrade);
    console.log("-----");  // Separator for each student's report
}
