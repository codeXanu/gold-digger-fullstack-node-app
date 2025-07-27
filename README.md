# GoldDigger 💰

**GoldDigger** is a full-stack Node.js application that simulates real-time gold price tracking and allows users to virtually invest in digital gold. It dynamically generates a downloadable PDF receipt for each investment using `pdfkit`, and uses Server-Sent Events (SSE) for live updates.

---

## 🚀 Features

- 📈 **Live Gold Price Tracking** (via SSE) (fake price)
- 🪙 **Invest in Digital Gold**
- 📄 **PDF Receipt Generation**
- 🧾 **Downloadable Investment Summary**
- 🧠 Clean, Modular Architecture with Utility Functions
- ❌ Custom 404 Error Page

---

## 📁 Project Structure

```
GoldDigger/
│
├── public/
│   ├── 404.html
│   ├── index.css
│   ├── index.html
│   └── index.js
│
├── utils/
│   ├── generatePdf.js
│   ├── getContentType.js
│   ├── getGoldPrice.js
│   ├── sendResponse.js
│   └── serveStatic.js
│
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/golddigger.git
cd golddigger
npm install
npm start
```

Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🔧 Tech Stack

- **Backend**: Node.js (HTTP core module)
- **Frontend**: HTML, CSS, JavaScript
- **PDF Generation**: `pdfkit`
- **Live Updates**: Server-Sent Events (SSE)

---

## 📜 API Endpoints

### `GET /api/price`
- Returns real-time gold price using Server-Sent Events.
- Auto-updates every 2 seconds.

### `POST /api/invest`
- Accepts investment data.
- Generates and returns a PDF receipt of the transaction.

#### Example JSON Payload:
```json
{
  "goldPrice": 10000.00,
  "amount": 5000,
  "grams": 0.5
}
```

---



## 👨‍💻 Author

Anuj Kumar Maurya [GitHub](https://github.com/codeXanu)

Fullstack Developer

---

## 📄 License

This project is licensed under the ISC License.

---

## 📌 Notes

- This is a demo app and does not handle real transactions.
- Prices are randomly generated and not sourced from real markets.
