// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  
  // Get references to DOM elements
  const form = document.getElementById("contactForm");  // The contact form element
  const purpose = document.getElementById("purpose");  // Dropdown/select input for purpose
  const volunteerFields = document.getElementById("volunteerFields");  // Volunteer-specific input fields
  const donationFields = document.getElementById("donationFields");  // Donation-specific input fields
  const modal = document.getElementById("responseModal");  // Modal that will show after form submission
  const modalTitle = document.getElementById("modalTitle");  // Title inside the modal
  const modalMessage = document.getElementById("modalMessage");  // Message inside the modal

  // Event listener for change in purpose dropdown
  purpose.addEventListener("change", function () {
    // Hide both volunteer and donation fields initially
    const selected = purpose.value;
    volunteerFields.style.display = "none";
    donationFields.style.display = "none";

    // Show the relevant fields based on the selected purpose
    if (selected === "volunteer") {
      volunteerFields.style.display = "block";  // Show volunteer fields
    } else if (selected === "donation") {
      donationFields.style.display = "block";  // Show donation fields
    }
  });

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Get form input values and trim extra spaces
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const availability = document.getElementById("availability")?.value.trim();  // Check if availability field exists
    const donationMethod = document.getElementById("donationMethod")?.value;  // Check if donation method field exists
    const selectedPurpose = purpose.value;  // Get the selected purpose (volunteer or donation)

    // Initialize an empty array to store error messages
    const errors = [];

    // Form validation logic: check if required fields are filled out correctly
    if (name === "") {
      errors.push("Name is required.");
    }

    // Email validation using a regular expression pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.push("Enter a valid email address.");
    }

    // Check if message length is at least 10 characters
    if (message.length < 10) {
      errors.push("Message should be at least 10 characters.");
    }

    // If the purpose is volunteer, check if availability is provided and valid
    if (selectedPurpose === "volunteer" && (!availability || availability.length < 3)) {
      errors.push("Please provide your availability for volunteering.");
    }

    // If the purpose is donation, check if donation method is selected
    if (selectedPurpose === "donation" && !donationMethod) {
      errors.push("Please select a donation method.");
    }

    // If there are any validation errors, alert the user
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      // If no errors, display a custom thank you message in the modal based on purpose
      if (selectedPurpose === "volunteer") {
        modalTitle.textContent = "Thank You for Volunteering!";  // Set modal title
        modalMessage.textContent = "We appreciate your willingness to help. We'll contact you soon regarding your availability.";  // Set modal message
      } else if (selectedPurpose === "donation") {
        modalTitle.textContent = "Thank You for Your Donation!";  // Set modal title
        modalMessage.textContent = "We appreciate your generosity. We'll reach out to guide you through the next steps.";  // Set modal message
      } else {
        modalTitle.textContent = "Thank You!";  // Default modal title
        modalMessage.textContent = "Your enquiry has been received. We'll respond as soon as possible.";  // Default modal message
      }

      // Display the modal
      modal.style.display = "flex";
      
      // Reset the form and hide additional fields
      form.reset();
      volunteerFields.style.display = "none";
      donationFields.style.display = "none";
    }
  });
});

// Function to close the modal when the close button is clicked
function closeModal() {
  // Hide the modal by setting display to "none"
  document.getElementById("responseModal").style.display = "none";
}
