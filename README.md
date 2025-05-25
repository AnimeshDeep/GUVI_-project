A simple and responsive web-based student attendance tracker built with HTML, CSS, and JavaScript. It allows teachers or admins to mark attendance, save records locally, view history, export data as CSV, and switch between dark/light modes.


🛠️ Setup Instructions-

Clone or download the repository:
git clone https://github.com/your-username/student-attendance-tracker.git
cd student-attendance-tracker
Open the index.html file directly in your web browser


Features-

🧑‍🏫 Admin login (with basic password protection)
✅ Mark students as Present or Absent
🕓 View daily attendance history
📤 Export records to CSV
🎨 Dark/Light mode toggle
🔍 Search/filter students
📱 Fully responsive (mobile + laptop)



🔑 Admin Login

Default Password: admin123
Change it in script.js by modifying the password variable:
const password = 'yourNewPassword';


💾 Data Storage

Attendance is stored using the browser’s localStorage
Data persists across sessions unless cleared from browser


📤 Export Attendance

Click the "Export to CSV" button to download attendance data in .csv format
Opens in Excel, Google Sheets, or any spreadsheet software



📱 Responsive Design

Adjusts layout for mobile devices (tables become stacked)
Optimized for screens from 320px to 1440px
🧩 Customization

Edit the students array in script.js to manage your class list
Customize colors, fonts, or animations in style.css
Update structure via index.html if needed
