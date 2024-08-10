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
    "Zero risk", "Additional income", "Affordable", "Apply online", "Billions",
    "Bonus", "Buy direct", "Cashback", "Certified", "Cents on the dollar", "Claim now",
    "Clearance", "Cost", "Credit card offers", "Deal ending soon", "Double your",
    "Earn", "Extra", "Fantastic", "For instant access", "Free access", "Free bonus",
    "Free download", "Free DVD", "Free instant", "Free membership", "Free preview",
    "Free quote", "Free trial", "Free video", "Free website", "Full refund",
    "Get it now", "Giveaway", "Great deal", "Hidden", "Hurry", "Incredible deal",
    "Investment", "Join millions", "Lowest price", "Luxurious", "Money back",
    "Name brand", "Offer expires", "Once in a lifetime", "One time", "Order now",
    "Orders shipped by", "Please read", "Price", "Promise you", "Pure profit",
    "Recession", "Refund", "Register", "Risk-free", "Sale ends soon", "Save big money",
    "Save up to", "Savings", "Score", "Special promotion", "Special offer", "Sponsor",
    "Start now", "Submit", "Subscribe", "Take action", "The best rates", "This won’t last",
    "Trial", "Unlimited", "Unsecured debt", "Unsecured loan", "Valuable", "Winner",
    "Winning", "Won", "Work at home", "You are a winner"
];

// Function to dynamically add blacklist words to the form
function populateBlacklist() {
    const blacklistField = document.querySelector('input[name="_blacklist"]');
    if (blacklistField) {
        blacklistField.value = defaultBlacklist.join(", ");
    }
}
