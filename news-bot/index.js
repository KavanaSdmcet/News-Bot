import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import axios from "axios";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const categories = {
  crypto: "business", // Treat crypto as business for better results
  health: "health",
  all: "",
};

// Function to escape MarkdownV2 special characters
const escapeMarkdown = (text) => {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
};

// Fetch news from APIs based on category
async function fetchNews(category) {
  const sources = [
    { name: "NewsAPI", url: `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.NEWS_API_KEY}` },
    { name: "GNews", url: `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&apikey=${process.env.GNEWS_API_KEY}` },
    { name: "MediaStack", url: `http://api.mediastack.com/v1/news?categories=${category}&countries=in&access_key=${process.env.MEDIASTACK_API_KEY}` },
  ];

  for (const source of sources) {
    try {
      const response = await axios.get(source.url);
      const articles = response.data.articles || response.data.data || [];
      if (articles.length > 0) {
        return articles.slice(0, 5);
      }
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error.message);
    }
  }
  return [];
}

// Format news with escaped MarkdownV2
function formatNews(articles) {
  return articles.map(article => {
    const title = article.title ? `*Title:* ${escapeMarkdown(article.title)}` : "*Title:* No title available";
    const description = article.description ? `*Description:* ${escapeMarkdown(article.description)}` : "*Description:* No description available.";
    const url = article.url ? `*Read more:* ${escapeMarkdown(article.url)}` : "*Read more:* #";
    return `${title}\n${description}\n${url}\n`;
  });
}

// Send news
async function sendNews(ctx, messages) {
  for (const msg of messages) {
    try {
      await ctx.replyWithMarkdownV2(msg);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }
}

// /start command
bot.start((ctx) => {
  ctx.reply("Hello! Choose a news category:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💰 Crypto", callback_data: "crypto" }, { text: "⚕ Health", callback_data: "health" }],
        [{ text: "🌍 All", callback_data: "all" }],
      ],
    },
  });
});

// Handle category selection
bot.on("callback_query", async (ctx) => {
  const category = ctx.callbackQuery.data;
  await ctx.answerCbQuery();
  await ctx.reply(`Fetching ${category.toUpperCase()} news... 🔎`);

  const newsArticles = await fetchNews(categories[category]);
  if (newsArticles.length === 0) {
    return ctx.reply("⚠ No news found. Try again later.");
  }

  const newsMessages = formatNews(newsArticles);
  await sendNews(ctx, newsMessages);
});

// /news command
bot.command("news", async (ctx) => {
  await ctx.reply("🔍 Fetching latest news, please wait...");

  const newsArticles = await fetchNews(categories.all);
  if (newsArticles.length === 0) {
    return ctx.reply("⚠ No news articles found.");
  }

  const newsMessages = formatNews(newsArticles);
  await sendNews(ctx, newsMessages);
});

// Launch bot
bot.launch()
  .then(() => console.log("✅ NewsBot is running..."))
  .catch((err) => {
    console.error("❌ Bot failed to launch:", err.message);
    process.exit(1);
  });

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));