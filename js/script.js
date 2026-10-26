
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("main input");
    const main = document.querySelector("main");

    // Create a results container
    const results = document.createElement("div");
    results.id = "search-results";
    results.setAttribute("aria-live", "polite");
    main.appendChild(results);

    // Improve accessibility
    searchInput.setAttribute("aria-label", "Search for food");

    // Update the placeholder
    searchInput.placeholder = "Search for your favourite food...";

    // Show a message when the user searches
    function searchFood() {
        const query = searchInput.value.trim();

        if (query === "") {
            results.innerHTML = `
                <div class="search-message">
                    Please enter a food or restaurant name!
                </div>
            `;
            searchInput.focus();
            return;
        }

        results.innerHTML = `
            <div class="search-message">
                🍽️ Searching for <strong>${escapeHTML(query)}</strong>...
                <br>
                Connect a food-search API to display real restaurants.
            </div>
        `;
    }

    // Prevent user input from being interpreted as HTML
    function escapeHTML(text) {
        const element = document.createElement("span");
        element.textContent = text;
        return element.innerHTML;
    }

    // Search when Enter is pressed
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchFood();
        }

        if (event.key === "Escape") {
            searchInput.value = "";
            results.innerHTML = "";
        }
    });

    // Clear the previous message while typing
    searchInput.addEventListener("input", () => {
        results.innerHTML = "";
    });

    // Make the navigation links respond to clicks
    document.querySelectorAll("header ul li a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const label = link.textContent.trim();

            if (!link.getAttribute("href")) {
                event.preventDefault();
            }

            // Empty href attributes are not useful destinations.
            if (link.getAttribute("href") === "") {
                event.preventDefault();
                results.innerHTML = `
                    <div class="search-message">
                        ${escapeHTML(label)}: add a page or destination
                        to enable this link.
                    </div>
                `;
                main.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    console.log("Red food ordering website loaded successfully!");
});
