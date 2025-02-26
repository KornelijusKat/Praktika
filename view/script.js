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
        const categoryDropdown = document.getElementById('advertisementCategory');
        const categoryList = document.getElementById('categoryList');
        
        if (categoryDropdown) categoryDropdown.innerHTML = '<option selected>Select Category</option>';
        if (categoryList) categoryList.innerHTML = '';
        
        categories.forEach(category => {
            if (categoryList) {
                categoryList.innerHTML += 
                    `<li class="list-group-item d-flex justify-content-between">
                        ${category.name} 
                        <div>
                            <button class='btn btn-warning btn-sm' onclick='editCategory("${category._id}")'>Edit</button>
                            <button class='btn btn-danger btn-sm' onclick='deleteCategory("${category._id}")'>Delete</button>
                        </div>
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

async function editCategory(id) {
    try {
        const response = await fetch(`${API_URL}/categories/${id}`,{
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const category = await response.json();
        document.getElementById('categoryId').value = id;  
        document.getElementById('categoryName').value = category.data.name;
        document.getElementById('categorySubmitButton').textContent = "Update Category"; 
    } catch (error) {
        console.error("Error fetching category for update:", error);
    }
}

document.getElementById('categoryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoryId = document.getElementById('categoryId')?.value.trim(); 
    const categoryName = document.getElementById('categoryName').value.trim(); 
    if (!categoryName) {
        console.error("Category name cannot be empty.");
        return;
    }
    const category = { name: categoryName };
    let url = `${API_URL}/categories`;
    let method = 'POST'; 
    if (categoryId) {  
        url = `${API_URL}/categories/${categoryId}/update`;
        method = 'PATCH'; 
    }
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} category: ${errorData.message || response.statusText}`);
        }
        document.getElementById('categoryId').value = ''; 
        document.getElementById('categoryName').value = ''; 
        document.getElementById('categorySubmitButton').textContent = "Add Category"; 
        fetchCategories(); 
    } catch (error) {
        console.error(`Error ${method === 'POST' ? 'creating' : 'updating'} category:`, error);
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

async function fetchAdvertisements() {
    try {
        const response = await fetch(`${API_URL}/advertisements`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        const advertisementList = document.getElementById('advertisementList');
        if (!advertisementList) return;

        advertisementList.innerHTML = '';

        data.ads.forEach(advertisement => {
            advertisementList.innerHTML += 
            `<li class="list-group-item">
                <strong>${advertisement.name}</strong> - ${advertisement.description} - $${advertisement.price} - ${advertisement.city}
                <div>
                <button class='btn btn-warning btn-sm' onclick='updateAdvertisement("${advertisement._id}")'>Edit</button>
                <button class='btn btn-danger btn-sm' onclick='deleteAdvertisement("${advertisement._id}")'>Delete</button>
                </div>
            </li>`;
        });
    } catch (error) {
        console.error("Error fetching advertisements:", error);
    }
}

document.getElementById('advertisementForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const advertisementId = document.getElementById('advertisementId').value; 
    const advertisement = {
        name: document.getElementById('advertisementTitle').value,
        description: document.getElementById('advertisementDesc').value,
        price: document.getElementById('advertisementPrice').value,
        city: document.getElementById('advertisementCity').value,
        category: document.getElementById('advertisementCategory').value,
        picture: "default.jpg"
    };

    try {
        let url = `${API_URL}/advertisements`;
        let method = 'POST'; 

        if (advertisementId) { 
            url = `${API_URL}/advertisements/${advertisementId}`;
            method = 'PATCH';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(advertisement)
        });

        if (!response.ok) {
            throw new Error('Failed to update advertisement');
        }

        document.getElementById('advertisementForm').reset();
        document.getElementById('advertisementId').value = ''; 
        document.getElementById('advertisementSubmitButton').textContent = "Add Advertisement";  

        fetchAdvertisements();
    } catch (error) {
        console.error("Error adding/updating advertisement:", error);
    }
});

async function deleteAdvertisement(id) {
    try {
        console.log('Attempting to delete advertisement:', id);
        const response = await fetch(`${API_URL}/advertisements/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete advertisement`);
        }

        fetchAdvertisements();
    } catch (error) {
        console.error("Error deleting advertisement:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchAdvertisements();
});