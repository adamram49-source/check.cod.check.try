console.log("JS LOADED");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "PUT_YOUR_KEY",
  authDomain: "PUT_YOUR_DOMAIN",
  databaseURL: "PUT_YOUR_DB_URL",
  projectId: "PUT_YOUR_ID",
  storageBucket: "PUT_YOUR_BUCKET",
  messagingSenderId: "PUT_YOUR_SENDER",
  appId: "PUT_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("createGameBtn").addEventListener("click", () => {
  const gameCode = Math.random().toString(36).substring(2, 7);

  set(ref(db, "games/" + gameCode), {
    createdAt: Date.now()
  });

  alert("קוד המשחק: " + gameCode);
});

document.getElementById("joinGameBtn").addEventListener("click", async () => {
  const code = document.getElementById("gameCodeInput").value;

  const snapshot = await get(ref(db, "games/" + code));

  if (snapshot.exists()) {
    alert("הצטרפת למשחק!");
  } else {
    alert("קוד לא קיים");
  }
});
