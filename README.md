# Airflow Academy

Hava akışı, CFD, rüzgar tüneli ve süpercar aerodinamiği — **tek HTML, sunucu gerekmez**.

## Seçenek 1 — Doğrudan indir (bundle gerekmez)

`main` dalına birleştirilmiş dosya yüklendikten sonra:

```bash
curl -L -o OPEN-AIRFLOW-ACADEMY.html \
  "https://raw.githubusercontent.com/egemenbaha/airflow-academy/main/OPEN-AIRFLOW-ACADEMY.html"
open OPEN-AIRFLOW-ACADEMY.html
```

Dosya boyutu **~27 KB** olmalı. Çift tıkla veya `open` ile aç.

## Seçenek 2 — Repodan derle

```bash
git clone https://github.com/egemenbaha/airflow-academy.git
cd airflow-academy
git pull
python3 bundle.py
open OPEN-AIRFLOW-ACADEMY.html
```

`bundle.py` şunları gerektirir: `css/styles.css`, `js/lessons.js`, `js/simulations.js`, `js/quiz-flow.js` (hepsi repoda).

## Sorun giderme

| Hata | Çözüm |
|------|--------|
| `FileNotFoundError: js/simulations.js` | `git pull` — dosya artık repoda |
| Boş sayfa | `file://` ile küçük `index.html` kullanma; **OPEN-AIRFLOW-ACADEMY.html** veya `bundle.py` sonrası `index.html` (~27 KB) |
| `lessons.js` boş | `git pull` — tam içerik yüklendi |

## İçerik

- Ders modülleri, Flow Lab, Mechanics labs, 15 soruluk quiz
