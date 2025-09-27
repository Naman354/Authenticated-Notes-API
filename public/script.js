const baseURL = "/notes"; // base URL for notes CRUD

const createForm = document.getElementById("form1");
const notesBody = document.querySelector("#notes tbody");

// Load all notes
async function loadNotes() {
    try {
        const res = await fetch(`${baseURL}`); // GET /notes
        const data = await res.json();

        notesBody.innerHTML = "";

        if (data && data.notes && data.notes.length > 0) {
            data.notes.forEach(note => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${note.title || ""}</td>
                    <td>${note.content || ""}</td>
                    <td>
                        <button class="update-btn" data-id="${note._id}">Update</button>
                        <button class="delete-btn" data-id="${note._id}">Delete</button>
                    </td>
                `;
                notesBody.appendChild(row);
            });
        }
    } catch (err) {
        console.error("Error loading notes:", err);
    }
}

// Create a new note
createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title) return alert("Title is required");

    try {
        await fetch(`${baseURL}`, { // POST /notes
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });

        createForm.reset();
        loadNotes();
    } catch (err) {
        console.error("Error creating note:", err);
    }
});

// Handle update and delete
notesBody.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    // Delete
    if (e.target.classList.contains("delete-btn")) {
        try {
            await fetch(`${baseURL}/${id}`, { method: "DELETE" }); // DELETE /notes/:id
            loadNotes();
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    }

    // Update
    if (e.target.classList.contains("update-btn")) {
        const newTitle = prompt("Enter new title:");
        const newContent = prompt("Enter new content:");

        if (!newTitle && !newContent) return;

        const updates = {};
        if (newTitle) updates.title = newTitle;
        if (newContent) updates.content = newContent;

        try {
            await fetch(`${baseURL}/${id}`, { // PATCH /notes/:id
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates)
            });
            loadNotes();
        } catch (err) {
            console.error("Error updating note:", err);
        }
    }
});

// Initial load
loadNotes();
