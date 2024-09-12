document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('additional').value
            };

            console.log("Dati del form:", formData);

            fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Errore nella risposta del server');
                }
            })
            
            .then(data => {
                if (data.success) {
                    alert('Your request has been submitted. You will be personally contacted via email as soon as possible.');
                } else {
                    alert('There was an error submitting the form');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem submitting your request. Please try again later.');
            });
        });
    } else {
        console.error('Il modulo contatti non è stato trovato, attendere qualche minuto.');
    }
});
