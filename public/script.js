document.addEventListener('DOMContentLoaded', () => {
    const getAllPetsButton = document.getElementById('getAllPetsButton');
    const searchForm = document.getElementById('searchForm');
    const petList = document.getElementById('petList');

    // Function to fetch and display pets data
    async function getAllPets() {
        try {
            const response = await fetch('/api/v1/pets');
            const petsData = await response.json();
            
            // Clear the petList before adding new pets
            petList.innerHTML = '';

            // Loop through petsData and create HTML elements
            petsData.forEach(pet => {
                const petItem = createPetElement(pet);
                petList.appendChild(petItem);
            });

        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    }

    // Function to create HTML elements for a pet
    function createPetElement(pet) {
        const petItem = document.createElement('div');
        petItem.classList.add('pet-item');
        petItem.innerHTML = `
            <div class="pet-name">${pet.name}</div>
            <div class="pet-details">Owner: ${pet.owner}</div>
            <div class="pet-details">Breed: ${pet.breed}</div>
            <div class="pet-details">Age: ${pet.age} years</div>
        `;
        return petItem;
    }

    // Function to fetch and display pets data by name
    async function searchPetsByName(name) {
        try {
            const response = await fetch(`/api/v1/pets/name/${name}`);
            console.log('Response:', response); // Log the response received from the server
            const pet = await response.json();

            if (pet) {
                // Clear the petList before adding the found pet
                petList.innerHTML = '';
                const petItem = createPetElement(pet);
                petList.appendChild(petItem);
            } else {
                petList.innerHTML = 'Pet not found';
            }
        } catch (error) {
            console.error('Error searching pets:', error);
        }
    }

    // Add an event listener for the "Get All Pets" button
    getAllPetsButton.addEventListener('click', getAllPets);

    // Add an event listener for the form submission (Search By Name)
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchValue = document.getElementById('searchValue').value;
        searchPetsByName(searchValue);
    });

    // Initial call to getAllPets when the page loads
    getAllPets();
});