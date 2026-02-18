import 'dotenv/config';
import { Bot, InputFile } from 'grammy';
import express from 'express';
import cors from 'cors';
import {
  getToday, getCurrentMealType, getDailyLog, getAllLogs,
  addMealEntries, removeMealEntry, addWater, setWeight, getTodaySummary,
  getWeightHistory,
  type MealType, type MealEntry,
} from './db.js';
import { parseFoodText, parseFoodImage, parseFoodVoice } from './gemini.js';

// ─── Config ───

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GEMINI_KEY = process.env.GEMINI_API_KEY!;
const PORT = parseInt(process.env.PORT || '3333');

if (!BOT_TOKEN) { console.error('❌ TELEGRAM_BOT_TOKEN not set'); process.exit(1); }
if (!GEMINI_KEY) { console.error('❌ GEMINI_API_KEY not set'); process.exit(1); }

// ─── Telegram Bot ───

const bot = new Bot(BOT_TOKEN);

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 Завтрак',
  lunch: '☀️ Обед',
  dinner: '🌙 Ужин',
  snack: '🍎 Перекус',
};

function formatEntries(entries: MealEntry[], meal: MealType): string {
  const lines = entries.map(e =>
    `  • ${e.foodName} — ${e.grams}г\n    ${e.calories} ккал (Б${e.protein} Ж${e.fat} У${e.carbs})`
  );

  const totals = {
    cal: entries.reduce((s, e) => s + e.calories, 0),
    p: entries.reduce((s, e) => s + e.protein, 0).toFixed(1),
    f: entries.reduce((s, e) => s + e.fat, 0).toFixed(1),
    c: entries.reduce((s, e) => s + e.carbs, 0).toFixed(1),
  };

  return `${MEAL_LABELS[meal]}\n\n${lines.join('\n\n')}\n\n📊 Итого: ${totals.cal} ккал (Б${totals.p} Ж${totals.f} У${totals.c})`;
}

function formatDaySummary(date: string): string {
  const s = getTodaySummary(date);
  const log = getDailyLog(date);

  const mealLines: string[] = [];
  for (const meal of ['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]) {
    const entries = log.meals[meal];
    if (entries.length > 0) {
      const cal = entries.reduce((s, e) => s + e.calories, 0);
      mealLines.push(`${MEAL_LABELS[meal]}: ${cal} ккал (${entries.length} блюд)`);
    }
  }

  return `📋 Дневник за ${date === getToday() ? 'сегодня' : date}\n\n` +
    (mealLines.length > 0 ? mealLines.join('\n') + '\n\n' : '') +
    `🔥 Калории: ${s.calories} ккал\n` +
    `🥩 Белки: ${s.protein}г\n` +
    `🧈 Жиры: ${s.fat}г\n` +
    `🍞 Углеводы: ${s.carbs}г\n` +
    `💧 Вода: ${s.water} мл`;
}

// /start command
bot.command('start', async (ctx) => {
  await ctx.reply(
    `👋 Привет! Я — бот-нутрициолог Анны Сенницкой.\n\n` +
    `Я помогу отслеживать твоё питание. Вот что я умею:\n\n` +
    `🍽 *Записать еду* — просто напиши или скажи голосом что ты съел(а)\n` +
    `📸 *Фото еды* — отправь фото, я распознаю продукты\n` +
    `💧 /water — записать воду (250 мл)\n` +
    `⚖️ /weight 63.5 — записать вес\n` +
    `📊 /today — итоги за сегодня\n` +
    `❓ /help — все команды\n\n` +
    `Попробуй написать, например:\n_"Омлет из 2 яиц и тост с авокадо"_`,
    { parse_mode: 'Markdown' }
  );
});

// /help command
bot.command('help', async (ctx) => {
  await ctx.reply(
    `📖 *Команды:*\n\n` +
    `💬 Просто напиши что съел(а) — я распознаю и запишу\n` +
    `🎤 Отправь голосовое — я пойму и запишу\n` +
    `📸 Отправь фото еды — я распознаю продукты\n\n` +
    `💧 /water — +250 мл воды\n` +
    `💧 /water 500 — +500 мл воды\n` +
    `⚖️ /weight 63.5 — записать вес\n` +
    `📊 /today — итоги за сегодня\n` +
    `🍽 /meal завтрак|обед|ужин|перекус — выбрать приём пищи\n\n` +
    `По умолчанию приём пищи определяется по времени суток.`,
    { parse_mode: 'Markdown' }
  );
});

// /today — day summary
bot.command('today', async (ctx) => {
  await ctx.reply(formatDaySummary(getToday()));
});

// /water — add water
bot.command('water', async (ctx) => {
  const amount = parseInt(ctx.match || '250') || 250;
  const total = addWater(getToday(), amount);
  await ctx.reply(`💧 +${amount} мл воды\nИтого за день: ${total} мл`);
});

// /weight — record weight
bot.command('weight', async (ctx) => {
  const weight = parseFloat(ctx.match || '');
  if (!weight || weight < 30 || weight > 300) {
    await ctx.reply('⚖️ Укажи вес, например: /weight 63.5');
    return;
  }
  setWeight(getToday(), weight);
  await ctx.reply(`⚖️ Записала вес: ${weight} кг`);
});

// /meal — set meal type override
const userMealOverride = new Map<number, MealType>();

bot.command('meal', async (ctx) => {
  const text = (ctx.match || '').toLowerCase().trim();
  const map: Record<string, MealType> = {
    'завтрак': 'breakfast', 'breakfast': 'breakfast',
    'обед': 'lunch', 'lunch': 'lunch',
    'ужин': 'dinner', 'dinner': 'dinner',
    'перекус': 'snack', 'snack': 'snack',
  };
  const meal = map[text];
  if (!meal) {
    await ctx.reply('🍽 Укажи: /meal завтрак, обед, ужин или перекус');
    return;
  }
  userMealOverride.set(ctx.from!.id, meal);
  await ctx.reply(`✅ Следующая запись пойдёт в: ${MEAL_LABELS[meal]}\n(Или я определю по времени суток)`);
});

// Detect meal type from user's text message
function detectMealFromText(text: string): MealType | null {
  const lower = text.toLowerCase();

  // Breakfast patterns
  if (/завтрак|позавтракал|на завтрак|утром\s+(съел|ел|поел)/i.test(lower)) return 'breakfast';

  // Lunch patterns
  if (/обед|пообедал|на обед|в обед|днём\s+(съел|ел|поел)/i.test(lower)) return 'lunch';

  // Dinner patterns
  if (/ужин|поужинал|на ужин|вечером\s+(съел|ел|поел)/i.test(lower)) return 'dinner';

  // Snack patterns
  if (/перекус|перекусил|на перекус/i.test(lower)) return 'snack';

  return null;
}

function getMealForUser(userId: number, text?: string): MealType {
  // 1. Check manual /meal override
  const override = userMealOverride.get(userId);
  if (override) {
    userMealOverride.delete(userId);
    return override;
  }

  // 2. Try to detect from message text
  if (text) {
    const detected = detectMealFromText(text);
    if (detected) return detected;
  }

  // 3. Fallback to time-based
  return getCurrentMealType();
}

// Handle photo messages
bot.on('message:photo', async (ctx) => {
  const statusMsg = await ctx.reply('📸 Анализирую фото...');

  try {
    const photos = ctx.message.photo;
    const largest = photos[photos.length - 1];
    const file = await ctx.api.getFile(largest.file_id);
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64 = buffer.toString('base64');
    const mimeType = 'image/jpeg';

    const entries = await parseFoodImage(GEMINI_KEY, base64, mimeType);

    if (entries.length === 0) {
      await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, '🤔 Не удалось распознать еду на фото. Попробуй сфотографировать ближе.');
      return;
    }

    const caption = ctx.message.caption || '';
    const meal = getMealForUser(ctx.from!.id, caption);
    addMealEntries(getToday(), meal, entries);

    const text = `✅ Записано!\n\n${formatEntries(entries, meal)}`;
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, text);
  } catch (err: any) {
    console.error('Photo error:', err);
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, `❌ Ошибка: ${err.message}`);
  }
});

// Handle voice messages
bot.on('message:voice', async (ctx) => {
  const statusMsg = await ctx.reply('🎤 Слушаю...');

  try {
    const file = await ctx.api.getFile(ctx.message.voice.file_id);
    const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64 = buffer.toString('base64');
    const mimeType = ctx.message.voice.mime_type || 'audio/ogg';

    const entries = await parseFoodVoice(GEMINI_KEY, base64, mimeType);

    if (entries.length === 0) {
      await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, '🤔 Не удалось распознать. Попробуй сказать чётче, например: "Я съела омлет из двух яиц и тост"');
      return;
    }

    const meal = getMealForUser(ctx.from!.id);
    addMealEntries(getToday(), meal, entries);

    const text = `✅ Записано!\n\n${formatEntries(entries, meal)}`;
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, text);
  } catch (err: any) {
    console.error('Voice error:', err);
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, `❌ Ошибка: ${err.message}`);
  }
});

// Handle text messages (food descriptions)
bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();

  // Skip if it looks like a command
  if (text.startsWith('/')) return;

  const statusMsg = await ctx.reply('🍽 Анализирую...');

  try {
    const entries = await parseFoodText(GEMINI_KEY, text);

    if (entries.length === 0) {
      await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, '🤔 Не удалось распознать продукты. Попробуй описать подробнее.');
      return;
    }

    const meal = getMealForUser(ctx.from!.id, text);
    addMealEntries(getToday(), meal, entries);

    const reply = `✅ Записано!\n\n${formatEntries(entries, meal)}`;
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, reply);
  } catch (err: any) {
    console.error('Text parse error:', err);
    await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, `❌ Ошибка: ${err.message}`);
  }
});

// ─── Express API (for dashboard sync) ───

const app = express();
app.use(cors());
app.use(express.json());

// Get all daily logs
app.get('/api/logs', (_req, res) => {
  res.json(getAllLogs());
});

// Get specific day
app.get('/api/logs/:date', (req, res) => {
  res.json(getDailyLog(req.params.date));
});

// Get today summary
app.get('/api/today', (_req, res) => {
  res.json(getTodaySummary(getToday()));
});

// Get weight history
app.get('/api/weight', (_req, res) => {
  res.json(getWeightHistory());
});

// Delete a meal entry (called from dashboard when user removes food)
app.delete('/api/logs/:date/meals/:meal/:entryId', (req, res) => {
  const { date, meal, entryId } = req.params;
  const deleted = removeMealEntry(date, meal as MealType, entryId);
  res.json({ ok: deleted });
});

// ─── Start ───

async function main() {
  // Start Express API
  app.listen(PORT, () => {
    console.log(`🌐 API server running on http://localhost:${PORT}`);
  });

  // Start Telegram bot (long polling)
  console.log('🤖 Starting Telegram bot...');
  await bot.start({
    onStart: (botInfo) => {
      console.log(`✅ Bot @${botInfo.username} is running!`);
      console.log(`📱 Open: https://t.me/${botInfo.username}`);
    },
  });
}

main().catch(console.error);
