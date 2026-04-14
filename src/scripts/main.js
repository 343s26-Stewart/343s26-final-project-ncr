const locations = [
    { id: "dhall", name: "D-Hall", cuisine: "assortment", campus: "Main Campus" },
    { id: "ehall", name: "E-Hall", cuisine: "assortment", campus: "East Campus" },
    { id: "dukes", name: "Dukes Dining", cuisine: "assortment", campus: "Main Campus" },
    { id: "festival", name: "Festival Food Court", cuisine: "assortment", campus: "East Campus" },

    { id: "freshens_urec", name: "Freshens UREC Cafe", cuisine: "bowls", campus: "East Campus" },
    { id: "heirloom", name: "Heirloom Pizza", cuisine: "italian", campus: "Dukes Dining" },
    { id: "java_city", name: "Java City", cuisine: "cafe", campus: "D-Hall" },
    { id: "market64", name: "Market 64", cuisine: "convenience", campus: "D-Hall" },

    { id: "panda_express", name: "Panda Express", cuisine: "asian", campus: "Dukes Dining" },
    { id: "panera", name: "Panera", cuisine: "american", campus: "Dukes Dining" },
    { id: "steak_n_shake", name: "Steak n Shake", cuisine: "american", campus: "D-Hall" },
    { id: "tacodillo", name: "Tacodillo", cuisine: "mexican", campus: "Dukes Dining" },

    { id: "tlc", name: "Tenders Love Chicken", cuisine: "american", campus: "East Campus" },
    { id: "dunkin", name: "Dunkin", cuisine: "cafe", campus: "Main Campus" },
    { id: "bistro1908", name: "Bistro 1908", cuisine: "american", campus: "Main Campus" },

    { id: "starbucks_rose", name: "Starbucks Rose Library", cuisine: "cafe", campus: "East Campus" },
    { id: "starbucks_truck", name: "Starbucks Truck", cuisine: "cafe", campus: "Main Campus" },

    { id: "mr_chips", name: "Mr Chips POD", cuisine: "convenience", campus: "Main Campus" },
    { id: "pod_jennings", name: "POD Jennings Hall", cuisine: "convenience", campus: "East Campus" },

    { id: "den_dennys", name: "The Den by Denny's", cuisine: "american", campus: "Dukes Dining" },
    { id: "blue_ridge", name: "Blue Ridge Innovations", cuisine: "bowls", campus: "Dukes Dining" },

    { id: "freshens_dhall", name: "Freshens D-Hall", cuisine: "bowls", campus: "D-Hall" },
    { id: "corner_bistro", name: "Corner Bistro", cuisine: "american", campus: "Main Campus" },

    { id: "chickfila_dhall", name: "Chick-fil-A D-Hall", cuisine: "american", campus: "D-Hall" },
    { id: "pod_forbes", name: "POD Forbes Center", cuisine: "convenience", campus: "Main Campus" },

    { id: "pod_king", name: "POD King Hall", cuisine: "convenience", campus: "East Campus" },
    { id: "subway_grace", name: "Subway Grace Street", cuisine: "american", campus: "Main Campus" },

    { id: "merge_coffee", name: "Merge Coffee", cuisine: "cafe", campus: "Main Campus" },
    { id: "lakeside", name: "Lakeside Cafe", cuisine: "cafe", campus: "Main Campus" },

    { id: "jemmys", name: "Jemmy’s Corner Market", cuisine: "convenience", campus: "E-Hall" },
    { id: "dukes_scoops", name: "Dukes Scoops & Cheesesteaks", cuisine: "american", campus: "D-Hall" },

    { id: "chickfila_festival", name: "Chick-fil-A Festival", cuisine: "american", campus: "Festival Food Court" },
    { id: "burgers_fries", name: "Burgers + Fries", cuisine: "american", campus: "Festival Food Court" },

    { id: "ignite", name: "Ignite", cuisine: "italian", campus: "Festival Food Court" },
    { id: "madison_press", name: "Madison Press", cuisine: "american", campus: "Festival Food Court" }
];


// Get references to HTML elements
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const cuisineSelect = document.getElementById("cuisine-select");
const cardGrid = document.getElementById("card-grid");
const locationCount = document.getElementById("location-count");
const submitBtn = document.getElementById("submit-btn");
const modal = document.getElementById("review-modal");
const closeModal = document.getElementById("close-modal");
const reviewForm = document.getElementById("review-form");
const confirmationMsg = document.getElementById("confirmation-msg");

// Helper: get a card's rating number
function getRating(card) {
    const val = parseFloat(card.getAttribute("data-rating"));
    return isNaN(val) ? -1 : val;
}

// Helper: get a card's name
function getName(card) {
    return card.getAttribute("data-name").toLowerCase();
}

// Helper: get a card's cuisine
function getCuisine(card) {
    return card.getAttribute("data-cuisine").toLowerCase();
}

// Filter and Sort Function
function updateCards() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCuisine = cuisineSelect.value.toLowerCase();
    const selectedSort = sortSelect.value;

    // Step 1: Filter cards based on search and cuisine
    let visibleCards = allCards.filter(function (card) {
        const matchesSearch = getName(card).includes(searchText);
        const matchesCuisine = selectedCuisine === "all" || getCuisine(card) === selectedCuisine;
        return matchesSearch && matchesCuisine;
    });

    visibleCards.sort(function (a, b) {
        if (selectedSort === "highest") {
            return getRating(b) - getRating(a);
        } else if (selectedSort === "lowest") {
            return getRating(a) - getRating(b);
        } else {
            return getName(a).localeCompare(getName(b));
        }
    });

    allCards.forEach(function (card) {
        card.style.display = "none";
    });

    visibleCards.forEach(function (card) {
        card.style.display = "block";
        cardGrid.appendChild(card);
    });

    locationCount.textContent = visibleCards.length + " locations";
}

// Event Listeners for search, sort, and cuisine
searchInput.addEventListener("input", updateCards);
sortSelect.addEventListener("change", updateCards);
cuisineSelect.addEventListener("change", updateCards);

// Modal: Open when Submit a Review is clicked
submitBtn.addEventListener("click", function () {
    modal.style.display = "flex";
    confirmationMsg.style.display = "none";
    reviewForm.style.display = "block";
});

// Modal: Close when X is clicked
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Modal: Close when clicking outside the modal box
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Review Form: Handle submission
reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const hall = document.getElementById("dining-hall").value.trim().toLowerCase();
    const newRating = parseFloat(document.getElementById("star-rating").value);

    updateCard(hall, newRating);

    reviewForm.style.display = "none";
    confirmationMsg.style.display = "block";

    updateCards();

    reviewForm.reset();
});

function updateCard(hallId, newRating) {
    allCards.forEach(card => {

        const id = card.getAttribute("data-id");

        if (id === hallId) {

            let current = parseFloat(card.getAttribute("data-rating"));

            let updated = isNaN(current)
                ? newRating
                : (current + newRating) / 2;

            card.setAttribute("data-rating", updated.toFixed(1));

            card.querySelector(".rating").textContent = updated.toFixed(1);
            card.querySelector(".stars").innerHTML = generateStars(updated);
        }
    });
}

function generateStars(rating) {
    let stars = "";
    const rounded = Math.round(rating);

    for (let i = 0; i < 5; i++) {
        if (i < rounded) {
            stars += "&#9733;"; // filled star
        } else {
            stars += "&#9734;"; // empty star
        }
    }

    return stars;
}

function createCards() {
    cardGrid.innerHTML = "";

    locations.forEach(loc => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.setAttribute("data-name", loc.name);
        card.setAttribute("data-id", loc.id);
        card.setAttribute("data-rating", "");
        card.setAttribute("data-cuisine", loc.cuisine);

        card.innerHTML = `
            <h3 class="card-name">${loc.name}</h3>
            <div class="stars">No ratings yet</div>
            <span class="tag">${loc.cuisine}</span>
            <div class="card-footer">
                <span class="campus">${loc.campus}</span>
                <span class="rating">Unrated</span>
            </div>
        `;

        cardGrid.appendChild(card);
    });

    allCards = Array.from(document.querySelectorAll(".card"));

    locationCount.textContent = allCards.length + " locations";
}

document.addEventListener("DOMContentLoaded", function () {
    createCards();
    updateCards();
});