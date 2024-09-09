// Importa i moduli necessari
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

// Crea un'applicazione Express
const app = express();

// NON SERVE SU VERCEL
const port = process.env.PORT || 3000;

// Configura il middleware per servire file statici dalla directory corrente
app.use(express.static(path.join(__dirname, 'public')));

// Configura il middleware per il parsing del corpo delle richieste JSON
app.use(bodyParser.json());

// Configura Nodemailer per Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Usa la variabile d'ambiente per l'email
        pass: process.env.GMAIL_PASS  // Usa la variabile d'ambiente per la password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Gestisce le richieste POST alla rotta '/submit-form'
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Dati del modulo ricevuti:', formData); // debug

    // Configura i dati dell'email
    const mailOptions = {
        from: process.env.GMAIL_USER, // Usa la variabile d'ambiente per l'email del mittente
        to: process.env.RECIPIENT_EMAIL, // Usa la variabile d'ambiente per l'email del destinatario
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

    console.log('Tentativo di invio email con queste opzioni:', mailOptions);

    // Invia l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Errore nell\'invio dell\'email:', error);
            res.status(500).json({ success: false, message: 'Errore nell\'invio dell\'email' }); // Risposta con l'errore
        } else {
            console.log('Email inviata:', info.response);
            res.json({ success: true }); // Risposta di successo
        }
    });
});

// Servi il file index.html dalla radice
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvia il server e ascolta sulla porta specificata, Senza questo non si visualizza su vercel.app
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});










