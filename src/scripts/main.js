const locations = [
    { id: "dhall", name: "D-Hall", cuisine: "assortment", campus: "Main Campus", placeId: "ChIJb7HfUeyTtIkRDmjtNXb5XUw" },
    { id: "ehall", name: "E-Hall", cuisine: "assortment", campus: "East Campus", placeId: "ChIJUbvCtJSStIkREfunIrV2pS4" },
    { id: "dukes", name: "Dukes Dining", cuisine: "assortment", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "festival", name: "Festival Food Court", cuisine: "assortment", campus: "East Campus", placeId: "ChIJFTpZZPeTtIkRsDFhwXFVSg0" },
    { id: "freshens_urec", name: "Freshens UREC Cafe", cuisine: "bowls", campus: "East Campus", placeId: "NO_REVIEWS" },
    { id: "heirloom", name: "Heirloom Pizza", cuisine: "italian", campus: "Dukes Dining", placeId: "NO_REVIEWS" },
    { id: "java_city", name: "Java City", cuisine: "cafe", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "market64", name: "Market 64", cuisine: "convenience", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "panda_express", name: "Panda Express", cuisine: "asian", campus: "Dukes Dining", placeId: "ChIJiw6FVTCTtIkR02Jx383iL2Q" },
    { id: "panera", name: "Panera", cuisine: "american", campus: "Dukes Dining", placeId: "ChIJX8U_XRyTtIkRMzah1pKAd3g" },
    { id: "steak_n_shake", name: "Steak n Shake", cuisine: "american", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "tacodillo", name: "Tacodillo", cuisine: "mexican", campus: "Dukes Dining", placeId: "NO_REVIEWS" },
    { id: "tlc", name: "Tenders Love Chicken", cuisine: "american", campus: "East Campus", placeId: "NO_REVIEWS" },
    { id: "dunkin", name: "Dunkin", cuisine: "cafe", campus: "Main Campus", placeId: "ChIJ_6JuSMOStIkRD7_N_m-07y0" },
    { id: "bistro1908", name: "Bistro 1908", cuisine: "american", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "starbucks_rose", name: "Starbucks Rose Library", cuisine: "cafe", campus: "East Campus", placeId: "ChIJhf6TwpSStIkRpLC9-Qx-CYw" },
    { id: "starbucks_truck", name: "Starbucks Truck", cuisine: "cafe", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "mr_chips", name: "Mr Chips POD", cuisine: "convenience", campus: "Main Campus", placeId: "ChIJCxE8i8KStIkRcvZgxlPn1yk" },
    { id: "pod_jennings", name: "POD Jennings Hall", cuisine: "convenience", campus: "East Campus", placeId: "NO_REVIEWS" },
    { id: "den_dennys", name: "The Den by Denny's", cuisine: "american", campus: "Dukes Dining", placeId: "NO_REVIEWS" },
    { id: "blue_ridge", name: "Blue Ridge Innovations", cuisine: "bowls", campus: "Dukes Dining", placeId: "NO_REVIEWS" },
    { id: "freshens_dhall", name: "Freshens D-Hall", cuisine: "bowls", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "corner_bistro", name: "Corner Bistro", cuisine: "american", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "chickfila_dhall", name: "Chick-fil-A D-Hall", cuisine: "american", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "pod_forbes", name: "POD Forbes Center", cuisine: "convenience", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "pod_king", name: "POD King Hall", cuisine: "convenience", campus: "East Campus", placeId: "NO_REVIEWS" },
    { id: "subway_grace", name: "Subway Grace Street", cuisine: "american", campus: "Main Campus", placeId: "ChIJXYqag9uStIkRA552BE4bDZk" },
    { id: "merge_coffee", name: "Merge Coffee", cuisine: "cafe", campus: "Main Campus", placeId: "ChIJ8ZQousXttIkR2F38QF8inYU" },
    { id: "lakeside", name: "Lakeside Cafe", cuisine: "cafe", campus: "Main Campus", placeId: "NO_REVIEWS" },
    { id: "jemmys", name: "Jemmy’s Corner Market", cuisine: "convenience", campus: "E-Hall", placeId: "NO_REVIEWS" },
    { id: "dukes_scoops", name: "Dukes Scoops & Cheesesteaks", cuisine: "american", campus: "D-Hall", placeId: "NO_REVIEWS" },
    { id: "chickfila_festival", name: "Chick-fil-A Festival", cuisine: "american", campus: "Festival Food Court", placeId: "NO_REVIEWS" },
    { id: "burgers_fries", name: "Burgers + Fries", cuisine: "american", campus: "Festival Food Court", placeId: "NO_REVIEWS" },
    { id: "ignite", name: "Ignite", cuisine: "italian", campus: "Festival Food Court", placeId: "NO_REVIEWS" },
    { id: "madison_press", name: "Madison Press", cuisine: "american", campus: "Festival Food Court", placeId: "NO_REVIEWS" }
];


// Get references to HTML elements
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const cuisineSelect = document.getElementById("cuisine-select");
const cardGrid = document.getElementById("card-grid");
const locationCount = document.getElementById("location-count");
const submitBtn = document.getElementById("submit-btn");
const favoritesOnlyBtn = document.getElementById("favorites-only-btn");
const modal = document.getElementById("review-modal");
const closeModal = document.getElementById("close-modal");
const reviewForm = document.getElementById("review-form");
const confirmationMsg = document.getElementById("confirmation-msg");

// Global variables
let allCards = [];
let allReviewCards = [];
let showFavoritesOnly = false;

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

    // Step 1: Filter cards based on search, cuisine, and favorites
    let visibleCards = allCards.filter(function (card) {
        const matchesSearch = getName(card).includes(searchText);
        const matchesCuisine = selectedCuisine === "all" || getCuisine(card) === selectedCuisine;
        const matchesFavorite = !showFavoritesOnly || isFavoriteHall(card.getAttribute("data-id"));
        return matchesSearch && matchesCuisine && matchesFavorite;
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
        card.style.display = "";
        cardGrid.appendChild(card);
});

    locationCount.textContent = visibleCards.length + " locations";
}

// Event Listeners for search, sort, and cuisine
function setupFilterListeners() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'reviews.html') {
        searchInput.addEventListener("input", updateReviewCards);
        sortSelect.addEventListener("change", updateReviewCards);
        cuisineSelect.addEventListener("change", updateReviewCards);
    } else {
        searchInput.addEventListener("input", updateCards);
        sortSelect.addEventListener("change", updateCards);
        cuisineSelect.addEventListener("change", updateCards);
    }
}

setupFilterListeners();

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
    const name = document.getElementById("reviewer-name").value.trim();
    const rating = parseFloat(document.getElementById("star-rating").value);
    const text = document.getElementById("review-text").value.trim();

    const review = {
        hallId: hall,
        name: name,
        rating: rating,
        text: text,
        date: new Date().toISOString(),
        local: true
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Check which page we're on and refresh accordingly
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'reviews.html') {
        displayUserReviews();
    } else {
        createCards();
        updateCards();
    }

    reviewForm.style.display = "none";
    confirmationMsg.style.display = "block";
    reviewForm.reset();
});

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

function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || [];
}

function getFavoriteHalls() {
    return JSON.parse(localStorage.getItem("favoriteHalls")) || [];
}

function saveFavoriteHalls(favorites) {
    localStorage.setItem("favoriteHalls", JSON.stringify(favorites));
}

function isFavoriteHall(hallId) {
    return getFavoriteHalls().includes(hallId);
}

function toggleFavoriteHall(hallId) {
    const favorites = getFavoriteHalls();
    const index = favorites.indexOf(hallId);

    if (index === -1) {
        favorites.push(hallId);
    } else {
        favorites.splice(index, 1);
    }

    saveFavoriteHalls(favorites);
}

function updateFavoriteButton(button, hallId) {
    const favorite = isFavoriteHall(hallId);
    button.classList.toggle("favorited", favorite);
    button.innerHTML = favorite ? "♥" : "♡";
}

function deleteReview(hallId, date, name) {
    let reviews = getReviews();
    reviews = reviews.filter(r => !(r.hallId === hallId && r.date === date && r.name === name));
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayUserReviews();
    updateReviewCards();
}

function clearVisibleReviews() {
    let reviews = getReviews();
    const searchText = searchInput.value.toLowerCase();
    const selectedCuisine = cuisineSelect.value.toLowerCase();

    // Filter reviews to only those that would be visible with current filters
    reviews = reviews.filter(review => {
        const hall = locations.find(loc => loc.id === review.hallId);
        const hallName = hall?.name || review.hallId;
        const hallCuisine = hall?.cuisine || "unknown";

        const matchesSearch = hallName.toLowerCase().includes(searchText) || review.name.toLowerCase().includes(searchText);
        const matchesCuisine = selectedCuisine === "all" || hallCuisine === selectedCuisine;

        return matchesSearch && matchesCuisine;
    });

    // Remove the filtered reviews from localStorage
    let allReviews = getReviews();
    allReviews = allReviews.filter(review => {
        return !reviews.some(visibleReview => 
            visibleReview.hallId === review.hallId && 
            visibleReview.date === review.date && 
            visibleReview.name === review.name
        );
    });

    localStorage.setItem("reviews", JSON.stringify(allReviews));

    displayUserReviews();
    updateReviewCards();
}

function getAverageRating(hallId) {
    const reviews = getReviews().filter(r => r.hallId === hallId);

    if (reviews.length === 0) return null;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
}

function getReviewCount(hallId) {
    return getReviews().filter(r => r.hallId === hallId).length;
}

function getCuisineType(hallId) {
    const loc = locations.find(l => l.id === hallId);
    return loc ? loc.cuisine : "unknown";
}

function updateReviewCards() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCuisine = cuisineSelect.value.toLowerCase();
    const selectedSort = sortSelect.value;

    // Filter cards based on search and cuisine
    let visibleCards = allReviewCards.filter(card => {
        const hallName = card.getAttribute("data-hall-name");
        const reviewer = card.getAttribute("data-reviewer");
        const cuisine = card.getAttribute("data-cuisine");

        const matchesSearch = hallName.includes(searchText) || reviewer.includes(searchText);
        const matchesCuisine = selectedCuisine === "all" || cuisine === selectedCuisine;

        return matchesSearch && matchesCuisine;
    });

    // Sort the filtered cards
    visibleCards.sort((a, b) => {
        switch (selectedSort) {
            case "newest":
                return new Date(b.getAttribute("data-date")) - new Date(a.getAttribute("data-date"));
            case "oldest":
                return new Date(a.getAttribute("data-date")) - new Date(b.getAttribute("data-date"));
            case "highest":
                return parseFloat(b.getAttribute("data-rating")) - parseFloat(a.getAttribute("data-rating"));
            case "lowest":
                return parseFloat(a.getAttribute("data-rating")) - parseFloat(b.getAttribute("data-rating"));
            case "az":
                return a.getAttribute("data-hall-name").localeCompare(b.getAttribute("data-hall-name"));
            default:
                return 0;
        }
    });

    // Get the reviews grid
    const reviewsGrid = document.getElementById("reviews-grid");

    // If there are no review cards loaded, keep the default message in place
    if (allReviewCards.length === 0) {
        return;
    }

    // Clear the grid
    reviewsGrid.innerHTML = "";

    if (visibleCards.length === 0) {
        reviewsGrid.innerHTML = `
            <article class="card">
                <h2 class="card-name">No reviews found</h2>
                <p class="empty-text">Try a different search or filter.</p>
            </article>
        `;
        return;
    }

    // Re-append cards in sorted order
    visibleCards.forEach(card => {
        reviewsGrid.appendChild(card);
    });
}

function displayUserReviews() {
    const reviewsGrid = document.getElementById("reviews-grid");
    if (!reviewsGrid) return;

    const allReviews = getReviews();
    // Filter to only show local reviews (user-submitted, not imported)
    const reviews = allReviews.filter(review => review.local === true);

    if (reviews.length === 0) {
        // Show the default "No Reviews Yet" message
        reviewsGrid.innerHTML = `
            <div class="card">
                <h2 class="card-name">No Reviews Yet</h2>
                <p class="empty-text">
                    You haven't submitted any reviews yet.
                </p>
            </div>
        `;
        allReviewCards = [];
        return;
    }

    // Clear the default message
    reviewsGrid.innerHTML = "";

    // Create cards for each review (don't sort here - updateReviewCards will handle sorting)
    allReviewCards = [];
    reviews.forEach(review => {
        const card = document.createElement("article");
        card.classList.add("card");

        // Find the dining hall name and cuisine
        const hall = locations.find(loc => loc.id === review.hallId);
        const hallName = hall?.name || review.hallId;
        const hallCuisine = hall?.cuisine || "unknown";

        const starsHTML = generateStars(review.rating);
        const date = new Date(review.date).toLocaleDateString();

        const currentPage = window.location.pathname.split('/').pop();
        const deleteButtonHTML = currentPage === 'reviews.html' 
            ? `<button type="button" class="delete-review-btn" aria-label="Delete this review">Delete</button>`
            : '';

        card.innerHTML = `
            <h2 class="card-name">${hallName}</h2>
            <div class="stars">${starsHTML}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-meta">
                <span class="reviewer">By: ${review.name}</span>
                <span class="review-date">${date}</span>
            </div>
            ${deleteButtonHTML}
        `;

        // Store review data on the card for filtering
        card.setAttribute("data-hall-name", hallName.toLowerCase());
        card.setAttribute("data-reviewer", review.name.toLowerCase());
        card.setAttribute("data-rating", review.rating);
        card.setAttribute("data-cuisine", hallCuisine);
        card.setAttribute("data-date", review.date);
        card.setAttribute("data-hall-id", review.hallId);
        card.setAttribute("data-review-name", review.name);

        // Add delete button listener
        const deleteBtn = card.querySelector(".delete-review-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (confirm(`Delete review for ${hallName}?`)) {
                    deleteReview(review.hallId, review.date, review.name);
                }
            });
        }

        reviewsGrid.appendChild(card);
        allReviewCards.push(card);
    });
}


function createCards() {
    cardGrid.innerHTML = "";

    locations.forEach(loc => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.setAttribute("tabindex", "0");

        card.setAttribute("data-name", loc.name);
        card.setAttribute("data-id", loc.id);
        card.setAttribute("data-cuisine", loc.cuisine);

        const avg = getAverageRating(loc.id);
        const count = getReviewCount(loc.id);

        let starsHTML;
        let ratingText;

        if (avg === null) {
            card.setAttribute("data-rating", -1);
            starsHTML = "No ratings yet";
            ratingText = "Unrated";
        } else {
            card.setAttribute("data-rating", avg.toFixed(1));
            starsHTML = generateStars(avg);
            ratingText = `${avg.toFixed(1)} (${count})`;
        }

        const favorite = isFavoriteHall(loc.id);

        card.innerHTML = `
            <div class="card-top">
                <h2 class="card-name">${loc.name}</h2>
                <button type="button" class="favorite-btn ${favorite ? 'favorited' : ''}" aria-label="Toggle favorite">
                    ${favorite ? '♥' : '♡'}
                </button>
            </div>
            <div class="stars">${starsHTML}</div>
            <span class="tag">${loc.cuisine}</span>
            <div class="card-footer">
                <span class="campus">${loc.campus}</span>
                <span class="rating">${ratingText}</span>
            </div>
        `;

        const favoriteBtn = card.querySelector(".favorite-btn");
        if (favoriteBtn) {
            favoriteBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleFavoriteHall(loc.id);
                updateFavoriteButton(favoriteBtn, loc.id);
                updateCards();
            });
        }

        card.style.cursor = "pointer";
        card.addEventListener("click", function () {
            window.location.href = `location.html?id=${loc.id}`;
        });

        // Add keyboard accessibility
        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.location.href = `location.html?id=${loc.id}`;
            }
        });

        cardGrid.appendChild(card);
    });

    allCards = Array.from(document.querySelectorAll(".card"));
    locationCount.textContent = allCards.length + " locations";
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'reviews.html') {
        displayUserReviews();

        const clearButton = document.getElementById("clear-reviews-btn");
        if (clearButton) {
            clearButton.addEventListener("click", function () {
                if (confirm("Delete all visible reviews?")) {
                    clearVisibleReviews();
                }
            });
        }

        updateReviewCards();
        setupViewToggle();
    } 
    else if (currentPage === 'index.html' || currentPage === '') {
        createCards();

        if (favoritesOnlyBtn) {
            favoritesOnlyBtn.addEventListener("click", function () {
                showFavoritesOnly = !showFavoritesOnly;
                favoritesOnlyBtn.classList.toggle("active", showFavoritesOnly);
                favoritesOnlyBtn.textContent = showFavoritesOnly ? "Showing Favorites" : "Show Favorites Only";
                updateCards();
            });
        }

        updateCards();
        setupViewToggle();
    }
});

function setupViewToggle() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage !== "index.html" && currentPage !== "" && currentPage !== "reviews.html") {
        return;
    }

    const menuBtn = document.getElementById("view-menu-btn");
    const menuDropdown = document.getElementById("view-menu-dropdown");
    const cardViewBtn = document.getElementById("card-view-btn");
    const listViewBtn = document.getElementById("list-view-btn");

    const grid = currentPage === "reviews.html"
        ? document.getElementById("reviews-grid")
        : document.getElementById("card-grid");

    if (!menuBtn || !menuDropdown || !cardViewBtn || !listViewBtn || !grid) {
        return;
    }

    function applyView(view) {
        if (view === "list") {
            grid.classList.add("list-view");
            listViewBtn.classList.add("active");
            cardViewBtn.classList.remove("active");
        } else {
            grid.classList.remove("list-view");
            cardViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
        }

        localStorage.setItem("viewMode", view);
        menuDropdown.classList.remove("show");
    }

    applyView(localStorage.getItem("viewMode") || "cards");

    menuBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        menuDropdown.classList.toggle("show");
    });

    cardViewBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        applyView("cards");
    });

    listViewBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        applyView("list");
    });

    document.addEventListener("click", function () {
        menuDropdown.classList.remove("show");
    });
}
