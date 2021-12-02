// Getting the inquiry form from the main.js file.
const form = inquiryForm.querySelector("form#inquiry");

// Assume to start the form has been validly completed.
let valid = true;
// Mailing link variable.
let mailto = "mailto:info@peterlogan.com?subject=Peter%20Logan's%20Steakhouse%20Inquiry%20|%20";

// For each of the input fields...
form.querySelectorAll("div.form-input").forEach((input) => {
    // Setting an error listener on the input (if it has one).
    // Getting all the potential spans within this input area.
    input.querySelectorAll("span").forEach((span) => {
        // If out of all the spans received, this one is an error...
        if (span.id.toString().toLowerCase().includes("error")) {
            // It means this input field needs to be error checked (not empty).
            valid = false; // This is now set to false, assuming the field does not have any auto filled information.
            // Setting to be red, because it's an error span.
            span.style.color = "red";
            // Making it hidden by default.
            span.style.visibility = "hidden";

            // Getting the input field.
            var inputField = input.querySelector("input");

            // If the input field is empty...
            inputField.addEventListener("input", () => {
                if (inputField.value == "") {
                    // The validation fails, and the form will not submit.
                    valid = false;
                    // Show the error message.
                    span.style.visibility = "visible";
                } else {
                    // The validation will pass, and the form will submit.
                    valid = true;
                    // Hide the error message.
                    span.style.visibility = "hidden";
                }
            });
        }
    });
});

form.addEventListener("submit", () =>{
    if (valid) {
        var name = form.querySelector("input#name").value;
        var email = form.querySelector("input#email").value;
        var phone = form.querySelector("input#phone").value;
        var content = form.querySelector("textarea#content").value;

        mailto += name + "%20|%20" + (email != "" ? email : "<EMAIL_HERE>") + "%20|%20" + (phone != "" ? phone : "<PHONE_HERE>") + "%20&body=" + (content != "" ? content : "Greetings,") + "%0D%0A%0D%0A";

        window.open(mailto);
    } else {
        event.preventDefault();
        form.querySelectorAll("div.form-input").forEach((input) => {
            // Getting all the potential spans within this input area.
            input.querySelectorAll("span").forEach((span) => {
                // If out of all the spans received, this one is an error...
                if (span.id.toString().toLowerCase().includes("error")) {
                    // Making it visible.
                    span.style.visibility = "visible";
                }
            });
        });
    }
});