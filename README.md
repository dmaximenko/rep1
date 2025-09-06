# YouTube Trends to Google Sheets

Простой бэкенд-сервис для получения трендовых видео с YouTube и сохранения их в Google Sheets с веб-интерфейсом.

## 🚀 Возможности

- 🔍 Поиск трендовых видео по ключевому слову через YouTube Data API
- 📊 Получение статистики видео (просмотры, лайки, комментарии)
- 📝 Автоматическое сохранение данных в Google Sheets
- 🎨 Современный веб-интерфейс для управления
- 📱 Адаптивный дизайн для мобильных устройств

## 📋 Требования

- Node.js 14+ 
- YouTube Data API ключ
- Google Sheets API учетные данные
- Google Sheets документ

## 🛠 Установка

### 1. Клонирование и установка зависимостей

```bash
# Установка зависимостей
npm install
```

### 2. Настройка YouTube Data API

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите YouTube Data API v3
4. Создайте API ключ в разделе "Учетные данные"
5. Скопируйте ключ

### 3. Настройка Google Sheets API

1. В том же проекте Google Cloud включите Google Sheets API
2. Создайте сервисный аккаунт:
   - Перейдите в "Учетные данные" → "Создать учетные данные" → "Сервисный аккаунт"
   - Заполните название и описание
   - Создайте ключ JSON и скачайте файл
3. Переименуйте скачанный файл в `credentials.json` и поместите в корень проекта

### 4. Настройка Google Sheets

1. Создайте новый Google Sheets документ
2. Скопируйте ID документа из URL (часть между `/d/` и `/edit`)
3. Поделитесь документом с email сервисного аккаунта (из файла credentials.json)
4. Дайте права на редактирование

### 5. Настройка переменных окружения

Скопируйте файл `env.example` в `.env` и заполните:

```bash
cp env.example .env
```

Отредактируйте `.env`:

```env
# YouTube Data API
YOUTUBE_API_KEY=ваш_youtube_api_ключ

# Google Sheets API
GOOGLE_SHEETS_CREDENTIALS_FILE=credentials.json
GOOGLE_SHEET_ID=ваш_google_sheet_id

# Server
PORT=3000
```

## 🚀 Запуск

### Режим разработки

```bash
npm run dev
```

### Продакшн режим

```bash
npm start
```

Сервер запустится на `http://localhost:3000`

## 📖 Использование

1. Откройте браузер и перейдите на `http://localhost:3000`
2. Введите поисковый запрос (например: "тренды 2024", "новости", "технологии")
3. Выберите количество видео (10, 25 или 50)
4. Нажмите "Найти тренды"
5. Данные автоматически сохранятся в Google Sheets
6. Используйте кнопку "Обновить данные из таблицы" для просмотра сохраненных данных

## 📁 Структура проекта

```
├── public/
│   └── index.html          # Веб-интерфейс
├── services/
│   ├── youtubeService.js   # Модуль для работы с YouTube API
│   └── sheetsService.js    # Модуль для работы с Google Sheets API
├── server.js               # Основной сервер
├── package.json            # Зависимости проекта
├── env.example             # Пример переменных окружения
└── README.md              # Документация
```

## 🔧 API Endpoints

### POST /api/trends

Получение трендовых видео и сохранение в Google Sheets.

**Запрос:**
```json
{
  "searchQuery": "тренды 2024",
  "maxResults": 50
}
```

**Ответ:**
```json
{
  "success": true,
  "searchQuery": "тренды 2024",
  "count": 50,
  "videos": [...]
}
```

### GET /api/sheet-data

Получение данных из Google Sheets.

**Ответ:**
```json
{
  "success": true,
  "data": [...]
}
```

### GET /api/health

Проверка состояния сервера.

## 🛡 Безопасность

- Никогда не коммитьте файл `.env` в репозиторий
- Храните `credentials.json` в безопасном месте
- Ограничьте доступ к API ключам
- Используйте переменные окружения в продакшене

## 🐛 Устранение неполадок

### Ошибка "Failed to load credentials"
- Убедитесь, что файл `credentials.json` существует в корне проекта
- Проверьте правильность пути в переменной `GOOGLE_SHEETS_CREDENTIALS_FILE`

### Ошибка "Failed to write to Google Sheets"
- Убедитесь, что сервисный аккаунт имеет доступ к Google Sheets
- Проверьте правильность `GOOGLE_SHEET_ID`

### Ошибка "Failed to fetch YouTube videos"
- Проверьте правильность `YOUTUBE_API_KEY`
- Убедитесь, что YouTube Data API включен в Google Cloud Console

### Ошибка "Quota exceeded"
- YouTube API имеет лимиты на количество запросов
- Дождитесь сброса квоты или используйте другой API ключ

## 📝 Лицензия

MIT License

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

При возникновении проблем создайте Issue в репозитории.