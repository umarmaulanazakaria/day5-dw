interface StudentType {
  name: string;
  class: string;
  score: number;
}

const students: StudentType[] = [
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

function getRequiredElement<T extends HTMLElement>(id: string): T {
  const element: HTMLElement | null = document.getElementById(id);

  if (element === null) {
    throw new Error(`Elemen HTML dengan id "${id}" tidak ditemukan.`);
  }

  return element as T;
}

const searchForm: HTMLFormElement =
  getRequiredElement<HTMLFormElement>("searchForm");
const searchInput: HTMLInputElement =
  getRequiredElement<HTMLInputElement>("searchInput");
const studentTableBody: HTMLTableSectionElement =
  getRequiredElement<HTMLTableSectionElement>("tabelsiswa");
const resultCount: HTMLParagraphElement =
  getRequiredElement<HTMLParagraphElement>("hasilsiswa");
const averageScore: HTMLElement =
  getRequiredElement<HTMLElement>("rataratanilai");

function renderStudents(studentData: StudentType[]): void {
  // .map() mengubah setiap object siswa menjadi string baris tabel.
  const tableRows: string = studentData
    .map((student: StudentType, index: number): string => {
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
  } else {
    studentTableBody.innerHTML = tableRows;
  }

  const totalScore: number = studentData.reduce(
    (total: number, student: StudentType): number => {
      return total + student.score;
    },
    0,
  );

  const average: number =
    studentData.length > 0 ? totalScore / studentData.length : 0;

  resultCount.textContent = `${studentData.length} siswa ditampilkan`;
  averageScore.textContent = average.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function searchStudents(): void {
  const keyword: string = searchInput.value.trim().toLowerCase();

  const filteredStudents: StudentType[] = students.filter(
    (student: StudentType): boolean => {
      return student.name.toLowerCase().includes(keyword);
    },
  );

  renderStudents(filteredStudents);
}

searchInput.addEventListener("input", searchStudents);

searchForm.addEventListener("submit", (event: SubmitEvent): void => {
  event.preventDefault();
  searchStudents();
});

renderStudents(students);
