TKS YC PROJECT
Creating your own anti-spam techniques for FormSubmit can involve a combination of various methods to ensure that only genuine submissions are processed. Here's a guide to developing a custom anti-spam solution:
Techniques for Custom Anti-Spam Solution

1. Honeypot Fields:
    - Invisible Fields: Add fields to your form that are invisible to human users (using CSS). Bots will typically fill in these fields, which can be used to identify spam.
    <input type="text" name="honeypot" style="display:none;">
    <input type="text" name="phone" class="phone" style="display:none;">
2. Time-Based Validation:
    - Form Submission Time: Measure the time between form rendering and submission. If it's too short (e.g., less than 2 seconds), it is likely a bot.
    <input type="hidden" name="form_start_time" id="form_start_time" value="<?php echo time(); ?>">
    document.querySelector('form').addEventListener('submit', function(event) {
       var formStartTime = document.getElementById('form_start_time').value;
       var currentTime = Math.floor(Date.now() / 1000);
       if (currentTime - formStartTime < 2) {
           alert('Spam detected! Form submitted too quickly.');
           event.preventDefault();
       }
    });
3. Content-Based Filtering:
    - Keyword Filtering: Scan the submission for common spam keywords and phrases.
    function containsSpam(content) {
       const spamKeywords = ["spam", "viagra", "buy now", "click here"];
       for (let keyword of spamKeywords) {
           if (content.toLowerCase().includes(keyword)) {
               return true;
           }
       }
       return false;
    }
    
    document.querySelector('form').addEventListener('submit', function(event) {
       const messageContent = document.querySelector('textarea[name="message"]').value;
       if (containsSpam(messageContent)) {
           alert('Spam detected! Content contains spammy phrases.');
           event.preventDefault();
       }
    });
4. IP Blacklisting:
    - IP Address Check: Maintain a list of known spam IP addresses and block submissions from these addresses.
    const spamIPs = ["192.168.1.1", "203.0.113.0"];
    document.querySelector('form').addEventListener('submit', function(event) {
       const userIP = 'user IP address here'; // You need a server-side script to get the user IP
       if (spamIPs.includes(userIP)) {
           alert('Spam detected! Submission from a blacklisted IP address.');
           event.preventDefault();
       }
    });
5. **JavaScript Validation:**
    - Validation Checks: Use JavaScript to validate form fields before submission. Bots that don't run JavaScript will fail these checks.
    - `javascript document.querySelector('form').addEventListener('submit', function(event) { const emailField = document.querySelector('input[name="email"]'); if (!emailField.value.includes('@')) { alert('Invalid email address.'); event.preventDefault(); } });`

Implementing and Testing Your Anti-Spam Solution
HTML Form

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FormSubmit with Custom Anti-Spam</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h1 { text-align: center; }
            form { display: flex; flex-direction: column; }
            input, textarea, button { margin-bottom: 10px; padding: 10px; font-size: 16px; }
            button { background-color: #007BFF; color: white; border: none; cursor: pointer; }
            button:hover { background-color: #0056b3; }
            .error { color: red; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Contact Us</h1>
            <form action="https://formsubmit.co/your-email@example.com" method="POST" id="contactForm">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                <input type="text" name="honeypot" style="display:none;">
                <input type="hidden" name="form_start_time" id="form_start_time" value="<?php echo time(); ?>">
                <button type="submit">Send</button>
            </form>
            <div id="error-message" class="error"></div>
        </div>
        <script>
            function containsSpam(content) {
                const spamKeywords = ["spam", "viagra", "buy now", "click here"];
                for (let keyword of spamKeywords) {
                    if (content.toLowerCase().includes(keyword)) {
                        return true;
                    }
                }
                return false;
            }
    
            document.getElementById('contactForm').addEventListener('submit', function(event) {
                const honeypot = document.querySelector('input[name="honeypot"]').value;
                const formStartTime = document.getElementById('form_start_time').value;
                const currentTime = Math.floor(Date.now() / 1000);
                const messageContent = document.querySelector('textarea[name="message"]').value;
                const errorMessage = document.getElementById('error-message');
    
                if (honeypot !== '') {
                    errorMessage.textContent = 'Spam detected! Hidden field filled.';
                    event.preventDefault();
                    return;
                }
    
                if (currentTime - formStartTime < 2) {
                    errorMessage.textContent = 'Spam detected! Form submitted too quickly.';
                    event.preventDefault();
                    return;
                }
    
                if (containsSpam(messageContent)) {
                    errorMessage.textContent = 'Spam detected! Content contains spammy phrases.';
                    event.preventDefault();
                    return;
                }
    
                errorMessage.textContent = '';
            });
        </script>
    </body>
    </html>

Steps to Demonstrate:

1. Setup Local Environment:
    - Create the HTML file and include the JavaScript for validation.
    - Use a local server or an online HTML editor to test the form.
2. Test Each Feature:
    - Honeypot: Ensure the hidden field catches spam.
    - Time-Based Validation: Test by submitting the form quickly to see if it's blocked.
    - Content Filtering: Add spammy keywords in the message field to see if it's blocked.
    - Error Handling: Ensure error messages are displayed correctly.
3. Record the Demo:
    - Use screen recording software to create a video demonstrating how the anti-spam features work.
    - Highlight each feature and show how it prevents spam submissions.
4. Share the Demo:
    - Upload the video to a platform like YouTube or Loom.
    - Include the link in your communication with the founder or stakeholders.

By creating a robust anti-spam solution and demonstrating its effectiveness, you can show your ability to enhance the security and usability of FormSubmit.co or any similar platform.
