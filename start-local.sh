#!/bin/bash

echo "🚀 Uruchamianie lsapka w trybie lokalnym..."

# Sprawdź czy pliki .env istnieją
if [ ! -f ".env.local" ]; then
    echo "❌ Brak pliku .env.local"
    echo "Utwórz plik .env.local z wymaganymi zmiennymi środowiskowymi"
    exit 1
fi

if [ ! -f "backend/.env" ]; then
    echo "❌ Brak pliku backend/.env"
    echo "Utwórz plik backend/.env z wymaganymi zmiennymi środowiskowymi"
    exit 1
fi

# Zatrzymaj istniejące kontenery
echo "🛑 Zatrzymywanie istniejących kontenerów..."
docker compose -f docker-compose.local.yml down

# Usuń stare obrazy
echo "🧹 Usuwanie starych obrazów..."
docker compose -f docker-compose.local.yml down --rmi all

# Zbuduj nowe obrazy
echo "🔨 Budowanie nowych obrazów..."
docker compose -f docker-compose.local.yml build --no-cache

# Uruchom nowe kontenery
echo "🔧 Uruchamianie kontenerów..."
docker compose -f docker-compose.local.yml up -d

# Czekaj na uruchomienie
echo "⏳ Oczekiwanie na uruchomienie serwisów..."
sleep 10

# Sprawdź status
echo "📊 Status kontenerów:"
docker compose -f docker-compose.local.yml ps

echo ""
echo "✅ lsapka uruchomiony!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8001"
echo "🗄️  Baza danych: localhost:5432"
echo ""
echo "📝 Logi:"
echo "  docker compose -f docker-compose.local.yml logs -f"
echo ""
echo "🛑 Zatrzymanie:"
echo "  docker compose -f docker-compose.local.yml down" 