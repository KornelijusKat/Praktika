const API_URL = "http://localhost:8000/api/v1";
let token = localStorage.getItem('token');

if (!token) {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = "login.html";
}

document.getElementById("loginForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "admin.html";
        } else {
            document.getElementById("error-message").textContent = "Invalid email or password";
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
});

async function fetchCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const categories = await response.json();
        const categoryDropdown = document.getElementById('listingCategory');
        const categoryList = document.getElementById('categoryList');
        if (categoryDropdown) categoryDropdown.innerHTML = '<option selected>Select Category</option>';
        if (categoryList) categoryList.innerHTML = '';
        
        categories.forEach(category => {
            if (categoryList) {
                categoryList.innerHTML += 
                    `<li class="list-group-item d-flex justify-content-between">
                        ${category.name} <button class='btn btn-danger btn-sm' onclick='deleteCategory("${category._id}")'>Delete</button>
                    </li>`;
            }
            if (categoryDropdown) {
                categoryDropdown.innerHTML += 
                    `<option value="${category._id}">${category.name}</option>`;
            }
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

document.getElementById('categoryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('categoryName').value;
    try {
        await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: category })
        });
        document.getElementById('categoryName').value = '';
        fetchCategories();
    } catch (error) {
        console.error("Error adding category:", error);
    }
});

async function deleteCategory(id) {
    try {
        const response = await fetch(`${API_URL}/categories/${id}/deleteCategory`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Failed to delete category: ${response.statusText}`);
        }
        fetchCategories();
    } catch (error) {
        console.error("Error deleting category:", error);
    }
}


document.getElementById('listingForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    const advertisement = {
        name: document.getElementById('listingTitle').value,
        description: document.getElementById('listingDesc').value,
        price: document.getElementById('listingPrice').value,
        city: document.getElementById('listingCity').value,
        category: document.getElementById('listingCategory').value,
        picture: "default.jpg"
    };
    try {
        await fetch(`${API_URL}/advertisements`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(advertisement)
        });
        document.getElementById('listingTitle').value = '';
        document.getElementById('listingDesc').value = '';
        document.getElementById('listingPrice').value = '';
        document.getElementById('listingCity').value = '';
        fetchAdvertisements();
    } catch (error) {
        console.error("Error adding advertisement:", error);
    }
});

async function fetchAdvertisements() {
    try {
        const response = await fetch(`${API_URL}/advertisements`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const advertisementList = document.getElementById('listingList');
        if (!advertisementList) return;
        
        advertisementList.innerHTML = '';
        
      
        console.log(data)
        data.ads.forEach(advertisement => {
            advertisementList.innerHTML += 
                `<li class="list-group-item">
                    <strong>${advertisement.name}</strong> - ${advertisement.description} - $${advertisement.price} - ${advertisement.city}
                    <button class='btn btn-danger btn-sm' onclick='deleteAdvertisement("${advertisement._id}")'>Delete</button>
                </li>`;
        });
    } catch (error) {
        console.error("Error fetching advertisements:", error);
    }
}
    

async function deleteAdvertisement(id) {
    try {
        console.log('hix')
        await fetch(`${API_URL}/advertisements/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchAdvertisements();
    } catch (error) {
        console.error("Error deleting advertisement:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchAdvertisements();
});
