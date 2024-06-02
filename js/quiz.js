document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('dropdown');
    const finalSubmitBtn = document.getElementById('finalSubmit');

    // Final submit button functionality
    finalSubmitBtn.addEventListener('click', function () {
        const selectedOption = dropdown.value;
        if (selectedOption === "Select your choice of subject") {
            alert("Please select a valid option from the dropdown.");
        } else {
            // Redirect to the appropriate page based on the selected option
            redirectToPage(selectedOption);
        }
    });

    // Function to redirect to the appropriate page based on the selected option
    function redirectToPage(selectedOption) {
        let nextPageURL;
        switch (selectedOption) {
            case "mathematics":
                nextPageURL = "menu.html#MATHEMATICS";
                break;
            case "physics":
                nextPageURL = "menu.html#PHYSICS";
                break;
            case "chemistry":
                nextPageURL = "menu.html#CHEMISTRY";
                break;
            case "computer programming":
                nextPageURL = "menu.html#COMPUTER";
                break;
            default:
                nextPageURL = "menu.html"; // You can set a default page for other options
        }
        window.location.href = nextPageURL;
    }
});
