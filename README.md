## Run on Windows

1. Install Node.js 18 or newer from https://nodejs.org
2. Open a terminal in this folder and run:
   ```
   npm install
   copy .env.example .env
   ```
3. (Optional) Edit `.env` and set `ANTHROPIC_API_KEY`. Without a key, the chatbot uses built-in gentle replies.
4. Start the app:
   ```
   npm start
   ```
5. Open http://localhost:3000 in your browser.
