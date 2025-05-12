# Tugas 3 Kelompok 5 Big Data

## KEY NOTES UNTUK DEVELOPMENT (Bakal diganti pas udah jadi):

## Dashboard
- Disitu ada *requirements.txt* sama *package.json*, pake salah satu we bebas (requirements buat python, package buat nodeJS), nanti kalo ga butuh apus aja salah satu. kode ada di src, kalo harus dipasang sesuatu boleh di root folder si dashboardnya (misal butuh folder public atau semacamnya)
dari hafidh:
aku gatau harus nulis apa, 
tapi kata ai, buat jalanin dashboard ini ada beberapa tahap.

1. pastiin kamu punya Dockerfile, docker-compose.yml, package.json, dan sisa file/folder dari hasil pull
2. jalanin "docker-compose up -d" di folder hasil pull

## Transformation
- Kode ada di src, cuman ada buat ringkasan llm ama transformasi laporan keuangan pake spark. untuk konek ke mongoDB jangan lupa pake env, **Jangan di Hardcode**

## Extraction
- Kode ada di src, ada scraper buat yfinance, laporan keuangan, ama berita. untuk konek ke mongoDB jangan lupa pake env,  **Jangan di Hardcode**

## Airflow
- **entrypoint.sh** ada di folder scripts, untuk pengembangan **dag** ada di folder src, config si airflow ada di folder **config** (serah make atau nggak, kalo nggak apus aja we). untuk folder **plugins** itu isinya plugin, kalo kosong boleh diapus serah.

## API
### Cara Penggunaan
1. Run this for the first time:
```
docker-compose up --build
```
or
```
docker-compose up -d --build
docker-compose logs -f api
```
for detached mode

2. For the second time just run
```
docker-compose up
```
or
```
docker-compose up -d
docker-compose logs -f api
```
for detached mode

3. API should be accessable in an ngrok link, and the guide to how to use the API will be available when accessing the index page

### Additional Notes
Don't forget to fill in your own **NGROK AUTH TOKEN** in the .env, refer to .env example