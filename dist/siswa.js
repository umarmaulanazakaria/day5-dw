"use strict";

const students = [
    { name: "Ahmad Fauzan", class: "10A", score: 88 },
    { name: "Budi Santoso", class: "10B", score: 76 },
    { name: "Citra Lestari", class: "10A", score: 92 },
    { name: "Dinda Maharani", class: "10C", score: 85 },
    { name: "Eko Prasetyo", class: "10B", score: 70 },
    { name: "Farhan Akbar", class: "10A", score: 81 },
    { name: "Gita Permata", class: "10C", score: 95 },
    { name: "Hendra Wijaya", class: "10B", score: 79 },
    { name: "Intan Sari", class: "10A", score: 87 },
    { name: "Joko Saputra", class: "10C", score: 73 },
];

function getRequiredElement(id) {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Elemen HTML dengan id "${id}" tidak ditemukan.`);
    }
    return element;
}

const searchForm = getRequiredElement("searchForm");
const searchInput = getRequiredElement("searchInput");
const studentTableBody = getRequiredElement("tabelsiswa");
const resultCount = getRequiredElement("hasilsiswa");
const averageScore = getRequiredElement("rataratanilai");

function renderStudents(studentData) {
    
    const tableRows = studentData
        .map((student, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.class}</td>
          <td>${student.score}</td>
        </tr>
      `;
    })
        .join("");
    if (studentData.length === 0) {
        studentTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="data-kosong">
          Data siswa tidak ditemukan.
        </td>
      </tr>
    `;
    }
    else {
        studentTableBody.innerHTML = tableRows;
    }
    
    const totalScore = studentData.reduce((total, student) => {
        return total + student.score;
    }, 0);
    
    const average = studentData.length > 0 ? totalScore / studentData.length : 0;
    resultCount.textContent = `${studentData.length} siswa ditampilkan`;
    averageScore.textContent = average.toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function searchStudents() {
    const keyword = searchInput.value.trim().toLowerCase();
    // .filter() tetap menghasilkan Array of Objects bertipe StudentType[].
    const filteredStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(keyword);
    });
    renderStudents(filteredStudents);
}

searchInput.addEventListener("input", searchStudents);
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchStudents();
});

renderStudents(students);
