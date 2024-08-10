Spam Protection and URL Filtering

Overview

This repository provides a JavaScript-based solution for enhancing web form security through spam protection and URL filtering. These features help prevent spam submissions and control the types of URLs that users can include in form inputs.

Features

1. Spam Word Blacklist
Prevents form submissions containing specific spammy words or phrases. The blacklist is customizable and can be dynamically integrated into the form.

2. URL Filtering Options
- **Allow Specific URLs**: Restrict form submissions to only include URLs that match a predefined list of allowed URLs.
- **Ban Specific URLs**: Block form submissions that contain URLs from a predefined list of banned URLs.
- **Ban All URLs**: Disallow any URLs from being included in the form submission.

3. Popup Error Messages
Displays error messages in a popup if form validation fails, providing immediate feedback to the user.

Usage

1. Allow Specific URLs
To permit only certain URLs in form submissions, add a hidden input field with the name `_url_allow`, and encode the allowed URL(s) as a Base64 string.

```html
<input type="hidden" name="_url_allow" value="aHR0cHM6Ly9hbGxvd2VkdXJsLmNvbQ==">
```

2. Ban Specific URLs
To block specific URLs from being included in form submissions, add a hidden input field with the name `_url_banlist`, and encode the banned URL(s) as a Base64 string.

```html
<input type="hidden" name="_url_banlist" value="aHR0cHM6Ly9iYW5uZWR1cmwuY29t">
```

3. Ban All URLs
To prevent any URLs from being included in form submissions, add a hidden input field with the name `_url_ban_all` and set its value to `"true"`.

```html
<input type="hidden" name="_url_ban_all" value="true">
```

Example Implementation

Include the following script in your HTML file to enable spam protection and URL filtering:

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

The spam word blacklist and URL filtering logic can be customized by modifying the corresponding functions in the `spamProtection.js` script.

Conclusion

This solution provides flexible and customizable spam protection and URL filtering features that can be seamlessly integrated into any web form. Tailor the configurations to meet your specific needs and enhance the security of your forms.
