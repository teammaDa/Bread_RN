win:
	chmod +x ./get-ip-win.sh
	./get-ip-win.sh
	docker-compose build
	docker-compose up -d
	docker-compose exec expo_app bash --login

mac:
	chmod +x ./get-ip-mac.sh
	./get-ip-mac.sh
	docker-compose build
	docker-compose up -d
	docker-compose exec expo_app bash --login

wsl:
	chmod +x ./get-ip-wsl.sh
	./get-ip-wsl.sh
	docker-compose build
	docker-compose up -d
	docker-compose exec expo_app bash --login

container:
	docker-compose build
	docker-compose up -d
	docker-compose exec expo_app bash --login

up:
	docker-compose up -d

down:
	docker-compose down

login:
	docker-compose exec expo_app bash --login

ip:
	chmod +x ./get-ip-wsl.sh
	./get-ip-wsl.sh
