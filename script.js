const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');


menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

// Theme toggle (persisted in localStorage, falls back to system preference)
(() => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            root.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    applyTheme(initial);

    themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("fvaGfl7hublYCKXJV"); // Replace with your EmailJS public key

    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    // If button is outside the form, trigger submit manually
    submitBtn.addEventListener("click", () => {
        // This triggers the form's submit event
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent page reload

        // Optional: disable button while sending
        submitBtn.textContent = "Sending...";
        submitBtn.style.pointerEvents = "none";

        emailjs.sendForm("service_bfs8zus", "template_vm1vv9b", form)
            .then((response) => {
                alert("✅ Message sent successfully!");
                form.reset();
                submitBtn.textContent = "Submit";
                submitBtn.style.pointerEvents = "";
            })
            .catch((error) => {
                console.error("❌ Failed to send message:", error);
                alert("Failed to send message. Check console for details.");
                submitBtn.textContent = "Submit";
                submitBtn.style.pointerEvents = "";
            });
    });
});