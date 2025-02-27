document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute("href").substring(1); // Get the section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector("header").offsetHeight; // Get header height
                const targetPosition = targetSection.offsetTop - headerHeight; // Offset for fixed header

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Handling with Formspree
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                document.getElementById("formMessages").innerHTML = "<p style='color:green;'>Message Sent Successfully!</p>";
                form.reset();
            } else {
                document.getElementById("formMessages").innerHTML = "<p style='color:red;'>Error sending message. Try again later.</p>";
            }
        } catch (error) {
            document.getElementById("formMessages").innerHTML = "<p style='color:red;'>Something went wrong. Please try again.</p>";
        }
    });
});
