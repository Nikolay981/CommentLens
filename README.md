# CommentLens 🔍

CommentLens is a powerful, AI-driven tool designed to help content creators and marketers understand their audience better. It fetches real-time comments from any YouTube video and uses the Gemini AI to provide actionable insights.

<img width="1769" height="1141" alt="image" src="https://github.com/user-attachments/assets/30ea0c90-2dff-4cd7-8ed2-15e3d7f2cf0d" />


## ✨ Features

-   **Real-time Fetching**: Connects directly to the official YouTube Data API v3 to pull top-level comments.
-   **AI Clustering**: Automatically categorizes comments into 'Common Pain Points'.
-   **Question Identification**: Extracts frequent questions asked by the audience.
-   **Viral Hook Ideas**: Generates 3 creative 'Hooks' for your next video based on viewer sentiment.
-   **Modern UI**: Sleek, responsive, and easy-to-use interface.

## 🛠️ Technology Stack

-   **Frontend**: Vanilla HTML5, CSS3, and JavaScript.
-   **Backend**: Node.js & Express.
-   **AI**: Google Gemini AI (`gemini-flash-latest`).
-   **Data**: official YouTube Data API v3.

## 🚀 Getting Started

### Prerequisites
-   Node.js installed on your machine.
-   A YouTube Data API Key.
-   A Google Gemini AI API Key (via AI Studio or Google Cloud).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Nikolay981/CommentLens.git
    cd CommentLens
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your keys:
    ```env
    YOUTUBE_API_KEY=your_youtube_key_here
    GEMINI_API_KEY=your_gemini_key_here
    PORT=3000
    ```

4.  **Run the application**:
    ```bash
    npm start
    ```
    Visit `http://localhost:3000` in your browser.

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
