// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Elements Selection =====
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const skillBars = document.querySelectorAll('.skill-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const backToTop = document.querySelector('.back-to-top');

    // ===== Header Scroll Effect =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate skill bars when they come into view
        animateOnScroll();
    });

    // ===== Mobile Menu Toggle =====
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
    });

    // Close mobile menu when a nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
        });
    });

    // ===== Dark/Light Theme Toggle =====
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial theme based on localStorage
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        
        // Update theme icon
        if (isDarkMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    });

    // ===== Active Navigation Link =====
    // Function to set the active navigation link based on scroll position
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinksItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Set active nav link on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Set active nav link on page load
    setActiveNavLink();

    // ===== Skill Bars Animation =====
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                animateSkillBars();
            }
        }
    }
    
    // Initial check for elements in view
    setTimeout(animateOnScroll, 500);

    // ===== Project Filtering =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== Contact Form Validation =====
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        
        // Form input event listeners for real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        subjectInput.addEventListener('blur', validateSubject);
        messageInput.addEventListener('blur', validateMessage);
        
        // Input validation functions
        function validateName() {
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameInput.parentElement.classList.add('error');
                return false;
            } else if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.parentElement.classList.add('error');
                return false;
            } else {
                nameError.textContent = '';
                nameInput.parentElement.classList.remove('error');
                return true;
            }
        }
        
        function validateEmail() {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailInput.parentElement.classList.add('error');
                return false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.parentElement.classList.add('error');
                return false;
            } else {
                emailError.textContent = '';
                emailInput.parentElement.classList.remove('error');
                return true;
            }
        }
        
        function validateSubject() {
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Subject is required';
                subjectInput.parentElement.classList.add('error');
                return false;
            } else if (subjectInput.value.trim().length < 3) {
                subjectError.textContent = 'Subject must be at least 3 characters';
                subjectInput.parentElement.classList.add('error');
                return false;
            } else {
                subjectError.textContent = '';
                subjectInput.parentElement.classList.remove('error');
                return true;
            }
        }
        
        function validateMessage() {
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageInput.parentElement.classList.add('error');
                return false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.parentElement.classList.add('error');
                return false;
            } else {
                messageError.textContent = '';
                messageInput.parentElement.classList.remove('error');
                return true;
            }
        }
        
        // Form submission
        // contactForm.addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     // Validate all fields
        //     const isNameValid = validateName();
        //     const isEmailValid = validateEmail();
        //     const isSubjectValid = validateSubject();
        //     const isMessageValid = validateMessage();
            
        //     // If all validations pass
        //     if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        //         // Get form data
        //         const formData = {
        //             name: nameInput.value.trim(),
        //             email: emailInput.value.trim(),
        //             subject: subjectInput.value.trim(),
        //             message: messageInput.value.trim()
        //         };
                
        //         // You would typically send this data to a backend service
        //         // For this example, we'll just log it and show a success message
        //         console.log('Form data:', formData);
                
        //         // Show success message (in a real app, do this after successful submission)
        //         const successMessage = document.createElement('div');
        //         successMessage.className = 'success-message';
        //         successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        //         successMessage.style.color = 'var(--success)';
        //         successMessage.style.padding = '1rem';
        //         successMessage.style.marginTop = '1rem';
        //         successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        //         successMessage.style.borderRadius = 'var(--radius-md)';
                
        //         // Add message to form
        //         contactForm.appendChild(successMessage);
                
        //         // Reset form
        //         contactForm.reset();
                
        //         // Remove success message after 5 seconds
        //         setTimeout(() => {
        //             successMessage.remove();
        //         }, 5000);
        //     }
        // });
    }
    document.getElementById("btn primary-btn").addEventListener("click", function() {
        // Create a hidden anchor element
        const link = document.createElement("a");
        link.href = "E:\Naveen assigment\step_p0\Yaswanth's Resume"; // Replace with your CV's path
        link.download = "Yaswanth's Resume.pdf"; // Customize the downloaded filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    // ===== Smooth Scrolling for Internal Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Parallax Effect for Hero Section =====
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });
    }

    // ===== Back to Top Button =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    backToTop.style.display = 'none';
                }
            }, 300);
        }
    });

    // ===== Animation on Page Load =====
    function fadeInElements() {
        const elements = document.querySelectorAll('.hero-content, .hero-image, .section-header, .about-content, .skills-content, .projects-grid, .contact-content');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }
    
    // Add initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.hero-content, .hero-image, .section-header, .about-content, .skills-content, .projects-grid, .contact-content');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animations after a short delay
    setTimeout(fadeInElements, 500);
    
    // ===== Image Placeholders =====
    // Function to handle image loading errors and replace with fallback
    function handleImageError(img) {
        // If image fails to load, replace with a colored placeholder
        img.onerror = function() {
            // Generate random pastel color
            const hue = Math.floor(Math.random() * 360);
            const pastelColor = `hsl(${hue}, 70%, 80%)`;
            
            // Apply colored background and add some styling
            this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22100%25%22 height%3D%22100%25%22 fill%3D%22%23' + pastelColor.replace('#', '') + '%22%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22%2F%3E%3C%2Fsvg%3E';
            this.style.objectFit = 'cover';
            
            // Add an icon or text to indicate placeholder
            const parent = this.parentElement;
            if (!parent.querySelector('.placeholder-text')) {
                const placeholderText = document.createElement('div');
                placeholderText.className = 'placeholder-text';
                placeholderText.innerHTML = '<i class="fas fa-image"></i>';
                placeholderText.style.position = 'absolute';
                placeholderText.style.top = '50%';
                placeholderText.style.left = '50%';
                placeholderText.style.transform = 'translate(-50%, -50%)';
                placeholderText.style.color = '#ffffff';
                placeholderText.style.fontSize = '2rem';
                placeholderText.style.textAlign = 'center';
                
                // Ensure parent has position relative
                if (getComputedStyle(parent).position === 'static') {
                    parent.style.position = 'relative';
                }
                
                parent.appendChild(placeholderText);
            }
        };
    }
    
    // Apply to all images
    document.querySelectorAll('img').forEach(img => {
        handleImageError(img);
    });
});
// var script = "Script";
//   var length= script.length;
//  console.log("res", script.length)
//  let longString = "My long string is long";
//  // longString.slice(3, 14);
//   console.log("this", longString.slice(1, 20));


//  var  name = "Hello there, how are you doing?"
//   sum =name.toLowerCase();
//   var firstcharcter= name[1];
//   var characters=lowerstring[0];
//   var firstcharcteruppcase=firstcharcter.toUpperCase()
//   var restOfString =lowerstring.slice(5);

// console.log("f",restOfString);

// var sillyString = "heLlo THERE, hOW ARE yOu doINg?";
// sillyString=sillyString[0].toUpperCase() + sillyString.slice(2).toLowerCase();

// console.log("silly",this.sillyString);

//   let age= 13;
//   var accompanied = true;
//    if(age>= 13|| age>13 && accompanied ){
//     console.log("your re allowed")

//    }else{
//     console.log("you not allowed");
    
//    }