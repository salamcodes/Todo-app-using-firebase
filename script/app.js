import { collection, addDoc, where, getDocs, Timestamp, query, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"
import { db, auth } from "./firebaseconfig.js";

const form = document.querySelector(".form")
const title = document.querySelector(".title");
const desc = document.querySelector(".description");
const todoContainer = document.querySelector(".allTodos");
const del = document.querySelectorAll(".delete-btn");
const logOut = document.querySelector("#logout");
let allTodo = [];

logOut.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "index.html";
    }).catch((error) => {
        alert(error);
    });
})
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("User ID ==>", uid);
        getData(uid);
    } else {
        window.location = "login.html";
    };
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    console.log(title.value, desc.value);
    const userData = {
        title: title.value,
        description: desc.value,
        uid: user.uid,
        time: Timestamp.fromDate(new Date())
    };

    try {
        const docRef = await addDoc(collection(db, "todos"), userData);
        console.log("Document written with ID: ", docRef.id);
        allTodo.push({ ...userData, docId: docRef.id });
        renderTodo(allTodo);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    title.value = '';
    desc.value = '';
});

async function getData(uid) {
    const q = query(collection(db, "todos"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        allTodo.unshift({ ...doc.data(), docId: doc.id });
    });
    renderTodo(allTodo);
}

// getData();

function renderTodo(arr) {
    todoContainer.innerHTML = "";
    arr.forEach((item) => {
        todoContainer.innerHTML += `<div class="todo">
            <h1>Title: ${item.title}</h1>
            <h2>Description: ${item.description}.</h2>
            <div class="todo-buttons">
                <button class="edit-btn" data-id=${item.docId}>Edit</button>
                <button  class="delete-btn" data-id=${item.docId}>Delete</button>
            </div>
        </div>`
    });

};

todoContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const docId = e.target.dataset.id;
        deleteTodo(docId);
    };

    if (e.target.classList.contains("edit-btn")) {
        const docId = e.target.dataset.id;
        editTodo(docId);
    };
});
async function deleteTodo(docId) {
    try {

        const todoRef = doc(db, "todos", docId);

        await deleteDoc(todoRef);
        console.log("Document deleted:", docId);

        allTodo = allTodo.filter((todo) => {
            return todo.docId !== docId;
        });

        renderTodo(allTodo);

    } catch (error) {
        console.error("Error deleting document:", error);
    };
};

async function editTodo(docId) {
    
    const todo = allTodo.find((t) => t.docId === docId);


    const newTitle = prompt("Enter new title:", todo.title);
    const newDesc = prompt("Enter new description:", todo.description);


    if (newTitle === null || newDesc === null) return;

    try {

        const todoRef = doc(db, "todos", docId);


        await updateDoc(todoRef, {
            title: newTitle,
            description: newDesc,
        });

        console.log("Document updated:", docId);
        // Update allTodo array
        todo.title = newTitle;
        todo.description = newDesc;

        renderTodo(allTodo);

        alert("Todo updated successfully!");
    } catch (error) {
        console.error("Error updating document:", error);
    };
};