
const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const generateBtn = document.getElementById("generate-btn");

// Function to fetch and display random advice
async function generateAdvice() {
  // Disable the button while advice is loading
  generateBtn.disabled = true;
  generateBtn.setAttribute("aria-busy", "true");

  adviceText.textContent = "Loading advice...";

  try {
    // Fetch fresh advice from the Advice Slip API
    const response = await fetch(
      "https://api.adviceslip.com/advice",
      { cache: "no-store" }
    );

    // Check whether the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }

    // Convert the response into JavaScript data
    const data = await response.json();

    // Check that the API returned valid advice
    if (!data.slip || !data.slip.advice) {
      throw new Error("Invalid advice response");
    }

    // Display the advice ID and advice text
    adviceId.textContent = data.slip.id;
    adviceText.textContent = `"${data.slip.advice}"`;

  } catch (error) {
    // Display an error message if something goes wrong
    adviceText.textContent =
      "Oops! Could not load advice. Please try again.";

    console.error("Advice error:", error);

  } finally {
    // Re-enable the button after success or failure
    generateBtn.disabled = false;
    generateBtn.removeAttribute("aria-busy");
  }
}

// Generate new advice when the dice button is clicked
generateBtn.addEventListener("click", generateAdvice);
generateAdvice();