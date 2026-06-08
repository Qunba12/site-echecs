// 1. On importe les fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Ta configuration Firebase (à copier depuis ta console Firebase)
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "clubechec-1ac69.firebaseapp.com",
  projectId: "clubechec-1ac69",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// 3. On initialise Firebase et la base de données
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. On écoute quand tu cliques sur "Ajouter"
const form = document.getElementById('add-player-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la page de recharger

    // On récupère les valeurs tapées dans les cases
    const nomJoueur = document.getElementById('nom').value;
    const titreJoueur = document.getElementById('titre').value;
    const eloJoueur = document.getElementById('elo').value;

    try {
        // On envoie tout ça dans la collection "joueurs" sur Firestore
        const docRef = await addDoc(collection(db, "joueurs"), {
            nom: nomJoueur,
            titre: titreJoueur,
            elo: Number(eloJoueur) // On s'assure que l'Elo est bien un nombre
        });

        // On affiche un petit message de succès et on vide le formulaire
        document.getElementById('message-succes').style.display = 'block';
        form.reset();

        setTimeout(() => {
            document.getElementById('message-succes').style.display = 'none';
        }, 3000);

    } catch (e) {
        console.error("Erreur lors de l'ajout : ", e);
        alert("Une erreur est survenue.");
    }
});