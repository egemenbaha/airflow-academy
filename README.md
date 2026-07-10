# Airflow Academy

Learn **airflow mechanics**, CFD, wind tunnels, and supercar aerodynamics (offline, no server).

## On your Mac (no `/home/workdir` — that path is only on the remote build machine)

```bash
git clone https://github.com/egemenbaha/airflow-academy.git
cd airflow-academy
python3 bundle.py
open index.html
```

Or double-click **`OPEN-AIRFLOW-ACADEMY.html`** after running `python3 bundle.py`.

**No localhost, no Claude Science sign-in required** — the app is a single HTML file with everything inlined.

## What’s inside

- Lessons: continuity, Bernoulli, boundary layers, Navier–Stokes, CFD, supercar case studies
- **Flow Lab** + **Mechanics labs** (canvas simulations)
- 15-question quiz

## Optional dev server

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/index.html
```

Serve from the **`airflow-academy`** folder (where `index.html` exists after `bundle.py`).
