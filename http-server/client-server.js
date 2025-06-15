const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#userTable tbody");

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function displayUsers() {
  const users = getUsers();
  tableBody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.dob}</td>
      <td>${user.accepted ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const dob = form.dob.value;
  const accepted = form.acceptTerms.checked;

  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  saveUser({ name, email, dob, accepted });
  displayUsers();
  form.reset();
});

displayUsers();
