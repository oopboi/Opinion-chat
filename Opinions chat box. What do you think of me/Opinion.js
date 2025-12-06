document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById("submit");
    const messageBox = document.getElementById("message");
    const responseDiv = document.getElementById("response");

    const nameSection = document.getElementById("name-section");
    const nameInput = document.getElementById("name");
    const sendBtn = document.getElementById("send-btn");

    const webhookURL = "https://discord.com/api/webhooks/1446647103127552070/pZxHvn2ifNxuGZsx4s5lavpWorrRDV60GhxHv8NChS8qTChVqxExxTyHCkrEWT0tr12y"; // replace with your webhook

    submitBtn.addEventListener("click", () => {
        const message = messageBox.value.trim();

        if (message === "") {
            responseDiv.style.display = "block";
            responseDiv.style.color = "red";
            responseDiv.innerText = "Please write something first!";
            return;
        }

        // Show optional name input only after clicking submit
        nameSection.classList.remove("hidden");
        responseDiv.style.display = "block";
        responseDiv.style.color = "#333";

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.style.opacity = 0.6;
        submitBtn.style.cursor = "not-allowed";
    });

    function sendOpinion() {
        const opinion = messageBox.value.trim();
        let name = nameInput.value.trim();

        if (!name) name = "Anonymous";

        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `**${name} said:**\n${opinion}`
            })
        })
        .then(() => {
            responseDiv.style.display = "block";
            responseDiv.style.color = "#333";
            responseDiv.innerText = "Thank you for your opinion!";

            // Disable input and send button
            nameInput.disabled = true;
            sendBtn.disabled = true;
            sendBtn.style.opacity = 0.6;
            sendBtn.style.cursor = "not-allowed";

            // Clear textarea
            messageBox.value = "";
        })
        .catch(err => {
            console.log("Error sending to Discord:", err);
            responseDiv.style.color = "red";
            responseDiv.innerText = "Oops! Something went wrong.";
        });
    }

    // DESKTOP: press Enter in name input to send
    nameInput.addEventListener("keypress", (e) => {
        if (window.innerWidth >= 769 && e.key === "Enter") {
            e.preventDefault();
            sendOpinion();
        }
    });

    // MOBILE: click send button
    sendBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            sendOpinion();
        }
    });
});
