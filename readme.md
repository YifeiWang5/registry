# Venmo Static Gift Registry

A lightweight, backend-free web application that allows users to select expenses and routes them directly to Venmo with pre-filled transaction details.

## 🚀 How It Works
Because no credit cards are processed directly on this site, it operates entirely as a static frontend. When a user clicks "Gift via Venmo," the app constructs a URL parameter string and redirects the user to Venmo (or opens the native Venmo app on iOS/Android) to securely complete the transaction.

## 🛠 Customization

All data is managed in the `script.js` file.

1. **Set your Venmo handle:**
   Open `script.js` and update the `VENMO_USERNAME` variable on line 2. Do not include the `@` symbol.
   ```javascript
   const VENMO_USERNAME = "Jane-Doe-1";
