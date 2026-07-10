# Tek dosya indirme

## Yöntem A — Repodan (önerilen)

```bash
git clone https://github.com/egemenbaha/airflow-academy.git
cd airflow-academy
git pull
chmod +x download_bundle.sh
./download_bundle.sh
open OPEN-AIRFLOW-ACADEMY.html
```

`bundle.py` birleştirilmiş **~27 KB** `OPEN-AIRFLOW-ACADEMY.html` üretir.

## Yöntem B — Sadece `git pull` (zaten klonladıysan)

```bash
cd airflow-academy
git pull
python3 bundle.py
open OPEN-AIRFLOW-ACADEMY.html
```

## Düzeltilen dosyalar (main)

- `js/simulations.js` (tam, ~7 KB)
- `js/lessons.js` (tam, ~8 KB)
- `js/quiz-flow.js` (tam, Flow Lab + quiz)
- `bundle.py` (eksik dosya kontrolü + OPEN-AIRFLOW-ACADEMY.html çıktısı)

## Canlı önizleme (Vercel)

https://airflow-academy-egemen-x-projects4.vercel.app — tam dosya için yine `bundle.py` çıktısını kullanın.
