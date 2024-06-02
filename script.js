
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('dropdown');
    const searchInput = document.getElementById('searchInput');
    const voiceSearchBtn = document.getElementById('voiceSearch');
    const finalSubmitBtn = document.getElementById('finalSubmit');

    // Autosearch functionality
    searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        let optionFound = false;
        for (let option of dropdown.options) {
            if (option.value.toLowerCase().includes(searchText)) {
                dropdown.value = option.value;
                optionFound = true;
                break;
            }
        }
        if (!optionFound) {
            alert("Invalid search! Please select a valid option from the dropdown.");
        }
    });

    // Voice search functionality
    voiceSearchBtn.addEventListener('click', function () {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = function (event) {
            const voiceResult = event.results[0][0].transcript.toLowerCase();
            searchInput.value = voiceResult;
            let optionFound = false;
            for (let option of dropdown.options) {
                if (option.value.toLowerCase().includes(voiceResult)) {
                    dropdown.value = option.value;
                    optionFound = true;
                    break;
                }
            }
            if (!optionFound) {
                alert("Invalid search! Please select a valid option from the dropdown.");
            }
        };
    });

    


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
