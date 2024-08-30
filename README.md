# Overview

This repository provides a JavaScript-based solution that builds on the functionality of FormSubmit by adding more advanced security features, including enhanced spam protection and URL filtering mechanisms. These additional layers of security help prevent spam submissions and control the types of URLs that users can include in form inputs, ensuring your forms are both secure and clean.

# Features

1. Spam Word Blacklist
Blocks form submissions containing specific spammy words or phrases. The blacklist is fully customizable and can be dynamically integrated into the form to meet your specific needs.

2. URL Filtering Options
- Allow Specific URLs: Restrict form submissions to only include URLs that match a predefined list of allowed URLs.
- Ban Specific URLs: Block form submissions that contain URLs from a predefined list of banned URLs.
- Ban All URLs: Disallow any URLs from being included in the form submission, providing the highest level of control.

3. Popup Error Messages
Displays error messages in a popup when validation fails, giving immediate and clear feedback to users and preventing invalid form submissions.

Usage

Base64 Encoding for URL Filtering

Base64 encoding is used in the URL filtering mechanism to add a layer of obfuscation, making it slightly more difficult for users or bots to tamper with the allowed or banned URLs directly in the HTML source. While Base64 encoding can be easily decoded, it serves as a simple deterrent against straightforward manipulation by less sophisticated attackers.

How to Encode URLs in Base64

You can encode URLs in Base64 using an online tool like [Base64 Encode](https://www.base64encode.org/). Simply enter your URL and click "Encode" to get the Base64 string.

Example:

For the URL `https://allowedurl.com`, the Base64-encoded string is:

```html
<input type="hidden" name="_url_allow" value="aHR0cHM6Ly9hbGxvd2VkdXJsLmNvbQ==">
```

1. Allow Specific URLs

To permit only certain URLs in form submissions, add a hidden input field with the name `_url_allow` and encode the allowed URL(s) as a Base64 string.

```html
<input type="hidden" name="_url_allow" value="aHR0cHM6Ly9hbGxvd2VkdXJsLmNvbQ==">
```

2. Ban Specific URLs

To block specific URLs from being included in form submissions, add a hidden input field with the name `_url_banlist` and encode the banned URL(s) as a Base64 string.

```html
<input type="hidden" name="_url_banlist" value="aHR0cHM6Ly9iYW5uZWR1cmwuY29t">
```

3. Ban All URLs

To prevent any URLs from being included in form submissions, add a hidden input field with the name `_url_ban_all` and set its value to `"true"`.

```html
<input type="hidden" name="_url_ban_all" value="true">
```

Example Implementation

Include the following script in your HTML file to enable the enhanced spam protection and URL filtering:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
        form.addEventListener('submit', validateForm);
    }
    populateBlacklist();
});
```

Customization

The spam word blacklist and URL filtering logic can be customized by modifying the corresponding functions in the `spamProtection.js` script. This allows you to tailor the protection mechanisms to fit the specific needs of your forms and website.

Conclusion

This solution offers flexible and customizable spam protection and URL filtering features that build upon the foundation provided by FormSubmit. By integrating these advanced security enhancements, you can effectively safeguard your forms against spam and unauthorized URL submissions. The use of Base64 encoding adds a simple layer of obfuscation to deter basic tampering, providing an additional line of defense against form abuse.
