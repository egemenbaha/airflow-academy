#!/bin/sh
set -e
cd "$(dirname "$0")"
python3 bundle.py
ls -la OPEN-AIRFLOW-ACADEMY.html index.html
echo "Aç: open OPEN-AIRFLOW-ACADEMY.html"
