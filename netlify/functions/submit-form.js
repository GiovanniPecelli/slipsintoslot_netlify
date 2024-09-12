const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    console.log('Evento ricevuto:', event);  // Log dell'evento per verificare che la funzione venga chiamata correttamente

    // Verifica se il metodo è POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Metodo non consentito, utilizza POST.' })
        };
    }

    try {
        const formData = JSON.parse(event.body);
        console.log('Dati del modulo:', formData);  // Log dei dati del modulo per verificare che vengano ricevuti correttamente

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Nuova richiesta di contatto da ${formData.name}`,
            text: `
                Hai ricevuto una nuova richiesta di contatto:
                Nome: ${formData.name}
                Email: ${formData.email}
                Oggetto: ${formData.subject}
                Messaggio: ${formData.message}
            `,
            html: `
                <h1>Hai ricevuto una nuova richiesta di contatto:</h1>
                <p><strong>Nome:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Oggetto:</strong> ${formData.subject}</p>
                <p><strong>Messaggio:</strong> ${formData.message}</p>
            `
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);
        console.log('Email inviata con successo');

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Errore nell\'invio dell\'email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Errore nell\'invio dell\'email' })
        };
    }
};

