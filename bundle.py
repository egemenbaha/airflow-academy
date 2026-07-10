import pathlib
p=pathlib.Path(__file__).resolve().parent
css=(p/"css/styles.css").read_text()
lessons=(p/"js/lessons.js").read_text().replace("export const sections = ","const sections = ")
sims=(p/"js/simulations.js").read_text().replace("export function initLabs","function initLabs")
qf="".join(l for l in (p/"js/quiz-flow.js").read_text().splitlines(True) if not l.startswith("import "))
extra="@media(max-width:800px){.app{grid-template-columns:1fr}.sidebar{position:fixed;left:-280px;transition:.2s;z-index:10;width:260px;height:100vh}.sidebar.open{left:0}}"
html="<!DOCTYPE html><html lang=en><head><meta charset=UTF-8><meta name=viewport content=width=device-width,initial-scale=1><title>Airflow Academy</title><style>"+css+extra+"</style></head><body><button type=button class=menu-toggle id=menuToggle>Menu</button><div class=app><aside class=sidebar id=sidebar><div class=brand><strong>Airflow Academy</strong><br><span class=sub>Deep aerodynamics</span></div><nav class=nav id=nav></nav></aside><main class=main id=main></main></div><script>"+lessons+sims+qf+"</script></body></html>"
for n in ["index.html","standalone.html","OPEN-AIRFLOW-ACADEMY.html"]:
    (p/n).write_text(html)
print("Built", len(html), "bytes -> index.html, standalone.html, OPEN-AIRFLOW-ACADEMY.html")
