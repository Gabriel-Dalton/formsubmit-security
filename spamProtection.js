// Blacklist of spam words and phrases
const defaultBlacklist = [
    "Free", "Guaranteed", "Urgent", "Act now", "Limited time", "Exclusive deal",
    "Click here", "Buy now", "Order now", "Risk-free", "Amazing", "Bargain",
    "Best price", "Big sale", "Cash bonus", "Cheap", "Congratulations", "Credit",
    "Deal", "Discount", "Earn money", "Fast cash", "Free access", "Free consultation",
    "Free gift", "Free info", "Free membership", "Free preview", "Free quote",
    "Free trial", "Free website", "Full refund", "Gift certificate", "Great offer",
    "Guaranteed winner", "Huge discount", "Instant", "Lose weight", "Lowest price",
    "Million dollars", "Money back", "No cost", "No fees", "One-time", "Promise",
    "Pure profit", "Sale", "Special promotion", "Super offer", "Unsecured credit",
    "Win big", "Winner", "Winning", "Work from home", "Apply now", "Be your own boss",
    "Big bucks", "Big money", "Billion dollars", "Cheap meds", "Click to remove",
    "Click to unsubscribe", "Double your income", "Earn extra cash", "Eliminate debt",
    "Financial freedom", "Free grant money", "Gift certificate", "Increase sales",
    "Increase traffic", "Instant approval", "Instant profit", "No catch", "No hidden costs",
    "No hidden fees", "No obligation", "No purchase necessary", "No questions asked",
    "No strings attached", "Not junk", "Offshore account", "Potential earnings",
    "Zero risk", "Additional income", "Affordable", "Apply online", "Billions"
];

// Function to dynamically add blacklist words to the form
function populateBlacklist() {
    const blacklistField = document.querySelector('input[name="_blacklist"]');
    if (blacklistField) {
        blacklistField.value = defaultBlacklist.join(", ");
    }
}

// Base64 decoding function
function decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Function to check if URLs in the input match the allowed URL
function checkAllowedUrls(input, allowedUrls) {
    const urls = input.match(/https?:\/\/[^\s]+|[^\s]+\.[^\s]+/g) || [];
    for (const url of urls) {
        const normalizedUrl = url.replace(/https?:\/\//, '');
        const decodedAllowedUrls = allowedUrls.map(u => decodeBase64(u).replace(/https?:\/\//, ''));
        if (!decodedAllowedUrls.includes(normalizedUrl)) {
            return false;
        }
    }
    return true;
}

// Function to check if URLs in the input match the banned URL list
function checkBannedUrls(input, bannedUrls) {
    const urls = input.match(/https?:\/\/[^\s]+|[^\s]+\.[^\s]+/g) || [];
    for (const url of urls) {
        const normalizedUrl = url.replace(/https?:\/\//, '');
        const decodedBannedUrls = bannedUrls.map(u => decodeBase64(u).replace(/https?:\/\//, ''));
        if (decodedBannedUrls.includes(normalizedUrl)) {
            return false;
        }
    }
    return true;
}

// Function to ban all URLs
function banAllUrls(input) {
    const urls = input.match(/https?:\/\/[^\s]+|[^\s]+\.[^\s]+/g) || [];
    return urls.length === 0;
}

// Function to show a popup message
function showPopupMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    setTimeout(() => {
        errorMessage.classList.remove('active');
    }, 3000);
}

// Function to validate form inputs based on the specified rules
function validateForm(event) {
    const form = event.target;
    const inputs = form.querySelectorAll('textarea, input[type="text"]');
    const urlAllowField = form.querySelector('input[name="_url_allow"]');
    const urlBanAllField = form.querySelector('input[name="_url_ban_all"]');
    const urlBanListField = form.querySelector('input[name="_url_banlist"]');

    let allowedUrls = [];
    let bannedUrls = [];
    let banAll = false;

    if (urlAllowField) {
        allowedUrls = urlAllowField.value.split(',').map(url => url.trim());
    }

    if (urlBanListField) {
        bannedUrls = urlBanListField.value.split(',').map(url => url.trim());
    }

    if (urlBanAllField && urlBanAllField.value === 'true') {
        banAll = true;
    }

    for (const input of inputs) {
        const inputValue = input.value;

        if (banAll && !banAllUrls(inputValue)) {
            showPopupMessage("All URLs are banned in this form.");
            event.preventDefault();
            return false;
        }

        if (allowedUrls.length > 0 && !checkAllowedUrls(inputValue, allowedUrls)) {
            showPopupMessage("Only specific URLs are allowed in this form.");
            event.preventDefault();
            return false;
        }

        if (bannedUrls.length > 0 && !checkBannedUrls(inputValue, bannedUrls)) {
            showPopupMessage("Some URLs are banned in this form.");
            event.preventDefault();
            return false;
        }
    }

    return true;
}

// Attach the validation function to the form submit event
document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
        form.addEventListener('submit', validateForm);
    }
    populateBlacklist();
});

// Check if the message contains spam words
function containsSpam(content) {
    const spamWords = defaultBlacklist;
    for (const word of spamWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(content)) {
            return true;
        }
    }
    return false;
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    const formStartTime = document.getElementById('form_start_time').value;
    const currentTime = Math.floor(Date.now() / 1000);
    const messageContent = document.querySelector('textarea[name="message"]').value;

    if (currentTime - formStartTime < 2) {
        showPopupMessage('Spam detected! Form submitted too quickly.');
        event.preventDefault();
        return;
    }

    if (containsSpam(messageContent)) {
        showPopupMessage('Spam detected! Content contains spammy phrases.');
        event.preventDefault();
        return;
    }
});
