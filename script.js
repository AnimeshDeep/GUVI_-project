const students = [
  { roll: 1, name: 'Abhay Sharma' },
  { roll: 2, name: 'Abhiraj Singh' },
  { roll: 3, name: 'Abhinav Kumar' },
  { roll: 4, name: 'Abhinav Shahi' },
  { roll: 5, name: 'Adarsh Raj' },
  { roll: 6, name: 'Adarsh Ratan' },
  { roll: 7, name: 'Ajay Pujara' },
  { roll: 8, name: 'Ambar Raj' },
  { roll: 9, name: 'Amvi Srivastava' },
  { roll: 10, name: 'Animesh Deep' },
  { roll: 11, name: 'Anshuman Kumar Singh' },
  { roll: 12, name: 'Angel raipurya' },
  { roll: 13, name: 'Aviral pandey' },
  { roll: 14, name: 'Aryan Chaudhary' },
  { roll: 15, name: 'Ayush Kumar' },
  { roll: 16, name: 'Ayush tiwari' },
  { roll: 17, name: 'ayush shivhare' },
  { roll: 18, name: 'Divyabhishek' },
  { roll: 19, name: 'Harshit Kumar' },
  { roll: 20, name: 'Harsh Singh' },
  { roll: 21, name: 'Hrishikesh Saraswati' },
  { roll: 22, name: 'KANHAIYA Tyagi' },
  { roll: 23, name: 'Kshitij Yadav' },
  { roll: 24, name: 'Krishna Garg' },
  { roll: 25, name: 'Krishna sharma' },
  { roll: 26, name: 'manya bhardwaj' },
  { roll: 27, name: 'Mohammad Anas' },
  { roll: 28, name: 'Nikhil Kumar Singh' },
  { roll: 29, name: 'Om Hari Sharma' },
  { roll: 30, name: 'PEEYUSH .' },
  { roll: 31, name: 'Prashant .' },
  { roll: 32, name: 'Raushan Kumar' },
  { roll: 33, name: 'Riddhima singh' },
  { roll: 34, name: 'Ritik Patel' },
  { roll: 35, name: 'Rohit Shukla' },
  { roll: 36, name: 'Samit awasthi' },
  { roll: 37, name: 'Sandhya Kumari' },
  { roll: 38, name: 'Shashwat dubey' },
  { roll: 39, name: 'Shikha Singh' },
  { roll: 40, name: 'Shivam Gupta' },
  { roll: 41, name: 'Shivangi Yadav' },
  { roll: 42, name: 'SHAKIB ABBAS' },
  { roll: 43, name: 'SHRIYA PANDEY' },
  { roll: 44, name: 'Shubham mishra' },
  { roll: 45, name: 'Tanya Chandra' },
  { roll: 46, name: 'TANISHK CHATURVEDI' },
  { roll: 47, name: 'Tahasen anjun' },
  { roll: 48, name: 'Tuzammil Firoz' },
  { roll: 49, name: 'VAIBHAV KHANNA' },
  { roll: 50, name: 'Vaibhav Jeet Singh' },
  { roll: 51, name: 'Vivek Kumar Singh' }
];


const password = 'admin123';

function handleLogin() {
  const input = document.getElementById('admin-password').value;
  if (input === password) {
    const loginDiv = document.querySelector('.admin-login');
    const mainContent = document.querySelector('.main-content');

    loginDiv.classList.add('fade-out');
    setTimeout(() => {
      loginDiv.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.classList.add('fade-in');

      // Enable dark mode toggle button after login
      document.querySelector('button[onclick="toggleDarkMode()"]').disabled = false;
    }, 300);
  } else {
    showModal('Incorrect password.');
  }
}

function loadStudents() {
  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');
    row.classList.add('slide-up');
    row.innerHTML = `
      <td>${student.roll}</td>
      <td>${student.name}</td>
      <td>
        <label><input type="radio" name="status-${student.roll}" value="Present" checked> Present</label>
        <label><input type="radio" name="status-${student.roll}" value="Absent"> Absent</label>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function submitAttendance() {
  const submitBtn = document.querySelector('button[onclick="submitAttendance()"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  setTimeout(() => {
    const records = [];
    const date = new Date().toLocaleDateString();
    students.forEach(student => {
      const status = document.querySelector(`input[name="status-${student.roll}"]:checked`).value;
      records.push({ roll: student.roll, name: student.name, status });
    });
    const data = JSON.parse(localStorage.getItem('attendance')) || {};
    data[date] = records;
    localStorage.setItem('attendance', JSON.stringify(data));
    showModal('Attendance submitted!');
    displayHistory();

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Attendance';
  }, 700);
}

function displayHistory() {
  const data = JSON.parse(localStorage.getItem('attendance')) || {};
  const historyDiv = document.getElementById('attendanceHistory');
  historyDiv.innerHTML = '';
  for (let date in data) {
    const record = document.createElement('div');
    record.className = 'history-record fade-in';
    record.innerHTML = `<h3>${date}</h3><ul>` +
      data[date].map(r => `<li>${r.roll}. ${r.name} - ${r.status}</li>`).join('') + '</ul>';
    historyDiv.appendChild(record);
  }
}

function exportToCSV() {
  const data = JSON.parse(localStorage.getItem('attendance')) || {};
  let csv = 'Date,Roll No,Name,Status\n';
  for (let date in data) {
    data[date].forEach(record => {
      csv += `${date},${record.roll},${record.name},${record.status}\n`;
    });
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'attendance.csv';
  link.click();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.add('theme-transition');
  setTimeout(() => document.body.classList.remove('theme-transition'), 400);
}

function filterStudents() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.getElementById('studentTableBody').getElementsByTagName('tr');
  Array.from(rows).forEach(row => {
    const name = row.cells[1].textContent.toLowerCase();
    row.style.display = name.includes(input) ? '' : 'none';
    if (name.includes(input)) {
      row.classList.add('fade-in');
    }
  });
}

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.style.display = 'block';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 2200);
}

// Load students and history on page load
window.onload = () => {
  loadStudents();
  displayHistory();

  // Initially disable dark mode toggle until login
  document.querySelector('button[onclick="toggleDarkMode()"]').disabled = true;
};
