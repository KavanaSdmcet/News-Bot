### README.md


# Telegram News Bot

## Description
A Telegram bot that fetches and displays the latest news articles based on user-selected categories (Crypto, Health, All). It integrates with multiple news APIs (NewsAPI, GNews, MediaStack) to provide up-to-date information directly in Telegram. This project was developed for a hackathon with the intent to integrate OpenServ SDK, but due to unavailable API keys and time constraints, it operates as a standalone bot.

## Features
- Fetch news from multiple sources with fallback support.
- Categories: Crypto, Health, and All news.
- MarkdownV2 formatting for clean message display.
- Interactive inline keyboard for category selection.

## Installation
1. **Clone the Repository**:
   bash
   git clone https://github.com/yourusername/telegram-news-bot.git
   cd telegram-news-bot
   
2. **Install Dependencies**:
   bash
   npm install
   
3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     NEWS_API_KEY=your_newsapi_key
     GNEWS_API_KEY=your_gnews_api_key
     MEDIASTACK_API_KEY=your_mediastack_api_key
     
   - **How to Get Keys**:
     - `TELEGRAM_BOT_TOKEN`: Create a bot via [BotFather](https://t.me/BotFather) on Telegram.
     - `NEWS_API_KEY`: Sign up at [newsapi.org](https://newsapi.org) (free tier available).
     - `GNEWS_API_KEY`: Register at [gnews.io](https://gnews.io) (free tier available).
     - `MEDIASTACK_API_KEY`: Sign up at [mediastack.com](https://mediastack.com) (free tier available).

4. **Run the Bot**:
   bash
   npm start
   

## Usage
- **Start the Bot**: Send `/start` to see category options.
- **Select a Category**: Use the inline keyboard to choose Crypto, Health, or All.
- **Get Latest News**: Send `/news` for a general news update.
- **Example Output**:
  
  Title: Bitcoin Hits New High
  Description: Bitcoin surged past $70,000 today...
  Read more: https://example.com/news
  

## Dependencies
- `telegraf`: Telegram bot framework.
- `axios`: HTTP client for API requests.
- `dotenv`: Environment variable management.

## Live link
- https://t.me/PersonalizedNewsAggregatorBot.

## Future Improvements
- Integrate OpenServ SDK for advanced agent capabilities and file storage.
- Add group chat summarization using Telegram API.
- Implement on-chain logging with GOAT framework once credentials are provided.

## License
MIT License - see [LICENSE](LICENSE) for details.


---
