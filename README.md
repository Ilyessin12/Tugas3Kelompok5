# Tugas 3 Kelompok 5 Big Data

## KEY NOTES UNTUK DEVELOPMENT (Bakal diganti pas udah jadi):

## Dashboard
- Disitu ada *requirements.txt* sama *package.json*, pake salah satu we bebas (requirements buat python, package buat nodeJS), nanti kalo ga butuh apus aja salah satu. kode ada di src, kalo harus dipasang sesuatu boleh di root folder si dashboardnya (misal butuh folder public atau semacamnya)

## Transformation
- Kode ada di src, cuman ada buat ringkasan llm ama transformasi laporan keuangan pake spark. untuk konek ke mongoDB jangan lupa pake env, **Jangan di Hardcode**

## Extraction
- Kode ada di src, ada scraper buat yfinance, laporan keuangan, ama berita. untuk konek ke mongoDB jangan lupa pake env,  **Jangan di Hardcode**

## Airflow
- **entrypoint.sh** ada di folder scripts, untuk pengembangan **dag** ada di folder src, config si airflow ada di folder **config** (serah make atau nggak, kalo nggak apus aja we). untuk folder **plugins** itu isinya plugin, kalo kosong boleh diapus serah.

## API
- Kode ada di src