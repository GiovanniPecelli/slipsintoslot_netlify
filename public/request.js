document.addEventListener('DOMContentLoaded', function() {
    // Assicurati che il modulo esista prima di aggiungere l'event listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del modulo

            // Creazione delle costanti ottenute dai moduli del submit
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('additional').value // Assicurati che l'ID sia corretto
            };

            console.log("Dati del form:", formData);  // Aggiungi questo per verificare se i dati del form sono raccolti correttamente

            // Invia una richiesta POST al server con i dati del modulo
            fetch('https://slipsintoslot.netlify.app/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
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