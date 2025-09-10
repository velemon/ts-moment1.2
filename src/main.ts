// Interface for course information
interface CourseInfo {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}

let courses: CourseInfo[] = [];

// Load courses from localStorage on startup
function loadCourses(): void {
  const saved = localStorage.getItem("courses");
  if (saved) {
    courses = JSON.parse(saved);
  }
}

// Save courses to localStorage
function saveCourses(): void {
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Add a new course
function addCourse(course: CourseInfo): boolean {
  // Validate unique code
  if (courses.some(c => c.code === course.code)) {
    alert("Kurskoden måste vara unik!");
    return false;
  }

  // Validate progression
  if (!['A', 'B', 'C'].includes(course.progression)) {
    alert("Progression måste vara A, B eller C!");
    return false;
  }

  courses.push(course);
  saveCourses();
  displayCourses();
  return true;
}

// Display courses in the list
function displayCourses(): void {
  const list = document.getElementById("course-list") as HTMLDivElement;
  list.innerHTML = "";

  courses.forEach(course => {
    const item = document.createElement("div");
    item.innerHTML = `
      <h3>${course.code} - ${course.name}</h3>
      <p>Progression: ${course.progression}</p>
      <a href="${course.syllabus}" target="_blank">Kursplan</a>
    `;
    list.appendChild(item);
  });
}

// Initial load
loadCourses();
displayCourses();

document.getElementById("course-form")?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const code = (document.getElementById("code") as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const progression = (document.getElementById("progression") as HTMLSelectElement).value as 'A' | 'B' | 'C';
  const syllabus = (document.getElementById("syllabus") as HTMLInputElement).value;

  const newCourse: CourseInfo = { code, name, progression, syllabus };

  addCourse(newCourse);
  (e.target as HTMLFormElement).reset();
});