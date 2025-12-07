const API = "http://localhost:3000";

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    fetch(`${API}/student/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }).then(res => res.json())
    .then(data => {
        if(data.success){
            localStorage.setItem("studentId", data.student.id);
            alert("Login successful!");
            window.location = "dashboard.html";
        } else {
            alert(data.message);
        }
    });
}

function register() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    fetch(`${API}/student/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    }).then(res => res.json())
    .then(data => {
        if(data.success){
            alert("Registration successful! Login now.");
        }
    });
}
