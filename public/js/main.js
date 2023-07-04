const server = 'http://localhost:3000';
var studentId;
var studentName;
var studentGrade;

async function fetchStudents() {
    const url = server + '/students';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const students = await response.json();
    populateContent(students);

     // Display chart
     var gradeData = students;

     // Create an object to store the grades and their frequency
     var grades = {};
     gradeData.forEach(function(item) {
       if (grades[item.grade]) {
         grades[item.grade]++;
       } else {
         grades[item.grade] = 1;
       }
     });
 
     // Convert the grades object to an array of objects with x and y properties
     var xyValues = Object.keys(grades).map(function(key) {
       return {x: key, y: grades[key]};
     });
 
     new Chart("myChart", {
       type: "scatter",
       data: {
         datasets: [{
           pointRadius: 4,
           pointBackgroundColor: "rgb(0,0,255)",
           data: xyValues
         }]
       },
       options: {
         legend: {display: false},
         scales: {
           xAxes: [{ticks: {min: 0}}],
           yAxes: [{ticks: {min: 0, stepSize: 1}}],
         }
       }
     });
 }

async function addStudent() {
    const url = server + '/students';
    const student = {id: studentId, name: studentName, grade: studentGrade};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(student)
    }
    const response = await fetch(url, options);
}

function populateContent(students) {
    var table = document.getElementById('content');
    table.innerHTML = "<tr><th>Student Id</th><th>Full Name</th><th>Grade</th></tr>";
    students.forEach(student => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(student.id);
        dataId.appendChild(textId);

        var dataName = document.createElement('td');
        var textName = document.createTextNode(student.name);
        dataName.appendChild(textName);

        var dataGrade = document.createElement('td');
        var textGrade = document.createTextNode(student.grade);
        dataGrade.appendChild(textGrade);

        row.appendChild(dataId);
        row.appendChild(dataName);
        row.appendChild(dataGrade);
        table.appendChild(row);
    });
}

document.querySelector('form').addEventListener('submit', (e) => {
    studentId = document.getElementById('studentId').value;
    studentName = document.getElementById('studentName').value;
    studentGrade = document.getElementById('studentGrade').value;
    if (studentId && studentName && studentGrade) {
        studentId = parseInt(studentId);
        studentGrade = parseInt(studentGrade);
        addStudent();
        fetchStudents();
    }
    e.preventDefault();
});
