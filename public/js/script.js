document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
  
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        const formData = new FormData(contactForm);
        const data = new URLSearchParams(formData);
  
        fetch('/contact', {
          method: 'POST',
          body: data
        })
        .then(response => response.text())
        .then(message => {
          // Display a browser prompt (alert) with the response message
          alert(message);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error processing your message.');
        });
      });
    }
  });
  