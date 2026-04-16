const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, update, remove } = require("firebase/database");

// 🔹 Paste your config here
const firebaseConfig = {
  apiKey: "AIzaSyBrMafNyAHyVYCI65FV-_uIKTToaeZ9sUk",
  authDomain: "test-22dad.firebaseapp.com",
  databaseURL: "https://test-22dad-default-rtdb.firebaseio.com",
  projectId: "test-22dad",
  storageBucket: "test-22dad.firebasestorage.app",
  messagingSenderId: "623048576843",
  appId: "1:623048576843:web:6bec54ac9b0ac58a3922ce",
  measurementId: "G-TTWB3SD0PR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ================= CRUD =================

// ✅ CREATE
function addStudent(id, name, age) {
    set(ref(db, 'students/' + id), {
        name: name,
        age: age
    });
    console.log("Student added");
}

// ✅ READ
async function getStudents() {
    const snapshot = await get(ref(db, 'students'));
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data");
    }
}

// ✅ UPDATE
function updateStudent(id) {
    update(ref(db, 'students/' + id), {
        age: 25
    });
    console.log("Student updated");
}

// ✅ DELETE
function deleteStudent(id) {
    remove(ref(db, 'students/' + id));
    console.log("Student deleted");
}

// ================= RUN =================

addStudent(4, "Upender", 22);

setTimeout(async () => {
    await getStudents();
    updateStudent(1);
    deleteStudent(2);
}, 2000);