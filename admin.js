// 1. Importation des fonctions Firebase via les liens officiels (version 10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Ta configuration Firebase exacte
const firebaseConfig = {
  apiKey: "AIzaSyA1QahLqwicaJ7mSHlpq5nQ3w2EwMHePiE",
  authDomain: "clubechec-1ac69.firebaseapp.com",
  projectId: "clubechec-1ac69",
  storageBucket: "clubechec-1ac69.firebasestorage.app",
  messagingSenderId: "1084201134964",
  appId: "1:1084201134964:web:ed31998fa24b1baddb5a21",
  measurementId: "G-V1SBKD6E7P"
};

// 3. Initialisation de Firebase et connexion à ta base de données (Firestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Écoute du formulaire pour ajouter un joueur
const form = document.getElementById('add-player-form');

// On s'assure que le formulaire existe bien sur la page avant d'écouter les clics
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs tapées par toi ou ton copain
        const nomJoueur = document.getElementById('nom').value;
        const titreJoueur = document.getElementById('titre').value;
        const eloJoueur = document.getElementById('elo').value;

        try {
            // Envoi direct dans la collection "joueurs"
            await addDoc(collection(db, "joueurs"), {
                nom: nomJoueur,
                titre: titreJoueur,
                elo: Number(eloJoueur) // Force la valeur en mode "Nombre" pour le classement
            });

            // Affichage du message de succès en vert
            const messageSucces = document.getElementById('message-succes');
            messageSucces.style.display = 'block';
            form.reset(); // Vide les cases du formulaire

            // Fait disparaître le message après 3 secondes
            setTimeout(() => {
                messageSucces.style.display = 'none';
            }, 3000);

        } catch (e) {
            console.error("Erreur détaillée de Firebase : ", e);
            alert("Impossible d'ajouter le joueur. Vérifie que tu as bien mis les règles Firestore sur 'true' dans la console Firebase.");
        }
    });
} else {
    console.error("Le formulaire 'add-player-form' est introuvable sur cette page.");
}