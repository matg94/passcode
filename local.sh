export DATABASE_URL="mongodb://passcode:passcode@192.168.50.155"
rm -rf ./build
cd frontend && npm run build
cd ..
go run .