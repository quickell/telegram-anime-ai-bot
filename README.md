﻿# Telegram Anime AI Bot

A smart Telegram bot that guesses anime titles based on text descriptions using AI (Gemini via OpenRouter) and searches across AniList, Jikan (MyAnimeList), and Kitsu.

## Features

- **AI-powered guessing** – describe a scene, and the bot will try to name the anime.
- Uses **Google Gemini (via OpenRouter)** for natural language understanding.
- Searches anime in **AniList**, **Jikan (MAL)**, and **Kitsu**.
- Sends anime cover/poster when found.
- Commands:
  - `/start` — welcome message with keyboard
  - `/help` — usage instructions
  - `/about` — project info
  - `/random` — random anime
  - `/anime` — anime of the day
- MongoDB integration — automatically saves users who interact with the bot.

---

## Tech Stack

- `Node.js` 
- `node-telegram-bot-api`
- `mongoose` 
- `dotenv`
- `OpenRouter API` 

---

## Installation

```bash
git clone https://github.com/quickell/telegram-anime-ai-bot.git
cd telegram-anime-ai-bot
npm install
+add an .env folder to your heart to add your keys:
BOT_TOKEN="..."
OPENROUTER_API_KEY="..."
MODEL_NAME=...
MONGODB_URI=...

