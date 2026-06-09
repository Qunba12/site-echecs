import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// NOUVEAU : On importe les fonctions d'authentification
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1QahLqwicaJ7mSHlpq5nQ3w2EwMHePiE",
  authDomain: "clubechec-1ac69.firebaseapp.com",
  projectId: "clubechec-1ac69",
  storageBucket: "clubechec-1ac69.firebasestorage.app",
  messagingSenderId: "1084201134964",
  appId: "1:1084201134964:web:ed31998fa24b1baddb5a21",
  measurementId: "G-V1SBKD6E7P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // On initialise la sécurité

const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const loginBtn = document.getElementById('login-btn');
const addPlayerForm = document.getElementById('add-player-form');

// Vérifie en permanence si tu es connecté
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si connecté : on cache la connexion et on montre l'espace admin
    loginSection.style.display = 'none';
    adminSection.style.display = 'block';
  } else {
    // Si non connecté : on montre la connexion
    loginSection.style.display = 'block';
    adminSection.style.display = 'none';
  }
});

// Quand on clique sur "Se connecter"
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById('login-error').style.display = 'none';
  } catch (error) {
    document.getElementById('login-error').style.display = 'block';
  }
});

// L'ajout de joueur (inchangé, mais désormais protégé)
if (addPlayerForm) {
    addPlayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nomJoueur = document.getElementById('nom').value;
        const titreJoueur = document.getElementById('titre').value;
        const eloJoueur = document.getElementById('elo').value;

        try {
            await addDoc(collection(db, "joueurs"), {
                nom: nomJoueur,
                titre: titreJoueur,
                elo: Number(eloJoueur)
            });
            const messageSucces = document.getElementById('message-succes');
            messageSucces.style.display = 'block';
            addPlayerForm.reset();
            setTimeout(() => { messageSucces.style.display = 'none'; }, 3000);
        } catch (e) {
            console.error(e);
            alert("Erreur. Action non autorisée.");
        }
    });
}