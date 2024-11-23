document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const skillSection = document.querySelector(".skill-section");
    const navLinks = document.querySelectorAll(".nav_link");
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");
    const backToTopButton = document.createElement("button");

    // Add "Back to Top" button dynamically
    backToTopButton.classList.add("back-to-top");
    backToTopButton.textContent = "↑";
    document.body.appendChild(backToTopButton);

    // IntersectionObserver for animation on scroll
    if (skillSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillSection.classList.add("animate");
                    observer.unobserve(skillSection); // Stop observing after animation starts
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        observer.observe(skillSection);
    }

    // Smooth scroll to sections
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Highlight active link as user scrolls
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const navLink = document.querySelector(`.nav_link[href="#${entry.target.id}"]`);
                if (entry.isIntersecting && navLink) {
                    navLinks.forEach((link) => link.classList.remove("active"));
                    navLink.classList.add("active");
                }
            });
        },
        { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    document.querySelectorAll("section").forEach((section) => {
        sectionObserver.observe(section);
    });


    // Back-to-top button functionality
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
