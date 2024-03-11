document.addEventListener("DOMContentLoaded", function () {
    const parent=document.getElementById("parentDiv")
    const initButton = document.getElementById("init");
    const closeChatButton = document.getElementById("close-chat");
    const chatBox = document.getElementById("chat-box");
    const test = document.getElementById("test");

    initButton.addEventListener("click", function () {
        
        test.style.display = "block"; // Display the chatbot
        parent.style.display="none";
        initChat();
    });

    closeChatButton.addEventListener("click", function () {
        test.style.display = "none"; // Hide the chatbot
    });

    function initChat() {
        // Clear previous chat
        chatBox.innerHTML = "";

        // Welcome message
        showMessage("Hi! I am your Medbot.I am Here to Assist You with your heart health related issues.");

        // Provide options to the user
        showOptions([
            {
                text: "I am not facing any issue, just looking for information regarding heart health",
                callback: function () {
                    // Redirect to URL X
                    window.location.replace("http://127.0.0.1:5500/frontend/info.html");
                },
            },
            {
                text: "I am facing an issue",
                callback: function () {
                    // Ask if the user had a required checkup
                    showMessage("Have you had a required checkup?");
                    showOptions([
                        {
                            text: "Yes",
                            callback: function () {
                                // Redirect to URL for filling the form
                                showLinkButton("Fill the form", "http://127.0.0.1:5500/main.html");
                                // Disable options after user makes a choice
                                disableOptions();
                            },
                        },
                        {
                            text: "No",
                            callback: function () {
                                // Recommend getting a checkup
                                showMessage("We recommend you to get a checkup, and then come back.");
                                showBadge("Conversation has ended");
                                // Disable options after user makes a choice
                                disableOptions();
                            },
                        },
                    ]);
                },
            },
        ]);
    }

    function showMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    }

    function showOptions(options) {
        options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.className = "option";
            optionButton.textContent = option.text;

            optionButton.addEventListener("click", function () {
                // Execute the callback function when the button is clicked
                option.callback();
            });
            chatBox.appendChild(optionButton);
        });
    }

    function showLinkButton(text, url) {
        const linkButton = document.createElement("a");
        linkButton.className = "link-button";
        linkButton.textContent = text;
        linkButton.href = url;
        chatBox.appendChild(linkButton);
    }

    function showBadge(message) {
        const badgeElement = document.createElement("div");
        badgeElement.className = "badge";
        badgeElement.textContent = message;
        chatBox.appendChild(badgeElement);
    }

    function disableOptions() {
        const optionButtons = document.querySelectorAll(".option");
        optionButtons.forEach((button) => {
            button.disabled = true;
        });
    }
});
