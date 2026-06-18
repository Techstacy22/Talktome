import sys
print("START", flush=True)

routers = [
    ("auth", "app.api.auth"),
    ("journals", "app.api.journals"),
    ("chat", "app.api.chat"),
    ("profile", "app.api.profile"),
    ("dashboard", "app.api.dashboard"),
    ("mindmap", "app.api.mindmap"),
    ("tasks", "app.api.tasks"),
    ("memories", "app.api.memories"),
    ("analytics", "app.api.analytics"),
]

for name, module in routers:
    try:
        print(f"importing {name}...", flush=True)
        __import__(module)
        print(f"{name} OK", flush=True)
    except Exception as e:
        print(f"{name} FAIL: {e}", flush=True)

print("END", flush=True)
