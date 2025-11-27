// Author: Rex Odomero Oghenerobo
// Date: Monday, 29 October 2025.
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
    const CHECK = '✅';
    const CROSS = '❌';
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const form = document.getElementById("addCourseForm");
    const table = document.getElementById("timetable").querySelector("tbody");
    const courseInput = document.getElementById("courseName");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const courseName = courseInput.value.trim();
        if (!courseName) return;

        const checkedDays = new Set(
            Array.from(form.querySelectorAll('input[name="day"]:checked'))
                .map((cb) => cb.value)
        );

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = courseName;
        row.appendChild(nameCell);

        dayOrder.forEach((day) => {
            const cell = document.createElement("td");
            cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
            cell.dataset.day = day;
            cell.className = "day-cell";
            row.appendChild(cell);
        });

        table.appendChild(row);
        form.reset();
        courseInput.focus();
    });
});
