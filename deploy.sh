#!/bin/bash

# Скрипт для деплоя на VPS

echo "🚀 Начинаем деплой YouTube Trends App..."

# Остановка старых контейнеров
echo "⏹️ Останавливаем старые контейнеры..."
docker-compose down

# Обновление кода из GitHub
echo "📥 Обновляем код из GitHub..."
git pull origin main

# Сборка новых образов
echo "🔨 Собираем новые образы..."
docker-compose build --no-cache

# Запуск контейнеров
echo "▶️ Запускаем контейнеры..."
docker-compose up -d

# Проверка статуса
echo "✅ Проверяем статус..."
docker-compose ps

echo "🎉 Деплой завершен!"
echo "🌐 Приложение доступно по адресу: http://ваш-ip:3000"
