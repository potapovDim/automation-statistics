docker run -p 127.0.0.1:27017:27017 -v $PWD/temp:/data/db -d mongo --setParameter failIndexKeyTooLong=false \\
docker run --name automation-statistics -e MYSQL_ROOT_PASSWORD=password -e MYSQL_USER=automation -e MYSQL_PASSWORD=automation -p 127.0.0.1:3306:3306 mysql:5.7
docker run --restart=always -d -p 8086:8086 -v $PWD/temp:/var/lib/influxdb influxdb
