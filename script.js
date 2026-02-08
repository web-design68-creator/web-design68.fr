// ===== Menu mobile =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger?.addEventListener("click", () => nav.classList.toggle("is-open"));
nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));

// ===== Active link auto =====
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav a").forEach((link) => {
  if (link.getAttribute("data-page") === currentPage) link.classList.add("active");
});

// ===== Navbar scrolled =====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (!header) return;
  window.scrollY > 10 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
});

// ===== Footer year =====
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ===== Form AJAX (PHP) =====
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
const submitBtn = document.getElementById("submitBtn");

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const project = document.getElementById("project").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !project || !message) {
    note.textContent = "Merci de remplir tous les champs obligatoires.";
    return;
  }

  if (!isEmailValid(email)) {
    note.textContent = "Email invalide.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  note.textContent = "Envoi en cours...";

  try {
    const formData = new FormData(form);

    const res = await fetch("api/send-mail.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      note.textContent = "Message envoyé ✅ Je te réponds rapidement !";
      form.reset();
    } else {
      note.textContent = data.message || "Erreur : envoi impossible.";
    }
  } catch (err) {
    note.textContent = "Erreur réseau. Réessaie plus tard.";
  }

  submitBtn.disabled = false;
  submitBtn.style.opacity = "1";
});
