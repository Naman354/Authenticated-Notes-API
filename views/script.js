const baseURL = "http://localhost:3000/api";

const createForm = document.getElementById("form1");
const itemsBody = document.querySelector("#items tbody");

async function loadItems() {
    try {
        const res = await fetch(`${baseURL}/getRoute`);
        const data = await res.json();

        console.log("Fetched data:", data);

        itemsBody.innerHTML = "";
        if (data && data.data) {
            data.data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>
                        <button class="update-btn" data-id="${item._id}">Update</button>
                        <button class="delete-btn" data-id="${item._id}">Delete</button>
                    </td>
                `;
                itemsBody.appendChild(row);
            });
        }
    } catch (err) {
        console.error("Error loading items:", err);
    }
}

createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    try {
        await fetch(`${baseURL}/postRoute`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        });

        createForm.reset();
        loadItems();
    } catch (err) {
        console.error("Error creating item:", err);
    }
});

loadItems();

itemsBody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        try {
            await fetch(`${baseURL}/deleteRoute/${id}`, {
                method: "DELETE"
            });
            loadItems();
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    }

    if (e.target.classList.contains("update-btn")) {
        const id = e.target.dataset.id;
        const newName = prompt("Enter new name:");
        const newDesc = prompt("Enter new description:");
        if (!newName && !newDesc) return;

        const updates = {};
        if (newName) updates.name = newName;
        if (newDesc) updates.description = newDesc;

        try {
            await fetch(`${baseURL}/patchRoute/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates)
            });
            loadItems();
        } catch (err) {
            console.error("Error updating item:", err);
        }
    }
});
