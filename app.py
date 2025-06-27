# app.py  ──────────────────────────────────────────────────────────
import streamlit as st
import pandas as pd
import requests
import altair as alt

# ─── CONFIG ───────────────────────────────────────────────────────
API_BASE = "http://localhost:5000/api"  # ←– apne backend ka base URL

# ─── Helper: safe GET that returns list/[] ────────────────────────
def safe_json_get(url: str):
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        st.warning(f"⚠️ {url} returned {resp.status_code}")
    except Exception as e:
        st.warning(f"⚠️ {url} error: {e}")
    return []

# ─── Fetch data (cached 5 min) ────────────────────────────────────
@st.cache_data(ttl=300, show_spinner="Fetching data…")
def fetch_all():
    users = safe_json_get(f"{API_BASE}/user/getall")
    jobs  = safe_json_get(f"{API_BASE}/job/getall")
    apps  = safe_json_get(f"{API_BASE}/apply/getall")
    return users, jobs, apps

# ─── MAIN UI ──────────────────────────────────────────────────────
st.set_page_config(page_title="Job-Portal Dashboard", layout="wide")
st.title("📊 Job-Portal Analytics")

users, jobs, apps = fetch_all()

# ─── Stat cards ───────────────────────────────────────────────────
col1, col2, col3 = st.columns(3)
col1.metric("Users", len(users))
col2.metric("Jobs", len(jobs))
col3.metric("Applications", len(apps))

st.divider()

# ─── Users by Role (pie) ──────────────────────────────────────────
st.subheader("Users by Role")
role_df = (
    pd.Series([u.get("role", "unknown") for u in users])
    .value_counts()
    .reset_index(name="count")
    .rename(columns={"index": "role"})
)
if not role_df.empty:
    st.altair_chart(
        alt.Chart(role_df).mark_arc().encode(
            theta="count",
            color="role",
            tooltip=["role", "count"],
        ),
        use_container_width=True,
    )
else:
    st.info("No user data.")

# ─── Jobs by Type (bar) ───────────────────────────────────────────
st.subheader("Jobs by Type")
type_df = (
    pd.Series([j.get("type", "unknown") for j in jobs])
    .value_counts()
    .reset_index(name="count")
    .rename(columns={"index": "type"})
)
if not type_df.empty:
    st.altair_chart(
        alt.Chart(type_df).mark_bar().encode(
            x="type",
            y="count",
            tooltip=["type", "count"],
            color="type",
        ).properties(height=300),
        use_container_width=True,
    )
else:
    st.info("No job data.")

# ─── Applications per Company (horizontal bar) ───────────────────
st.subheader("Applications per Company")
comp_df = (
    pd.Series([a.get("job", {}).get("company", "Unknown") for a in apps])
    .value_counts()
    .reset_index(name="count")
    .rename(columns={"index": "company"})
)
if not comp_df.empty:
    st.altair_chart(
        alt.Chart(comp_df).mark_bar().encode(
            x="count",
            y=alt.Y("company", sort="-x"),
            tooltip=["company", "count"],
            color="company",
        ).properties(height=400),
        use_container_width=True,
    )
else:
    st.info("No application data.")

# ─── Applications Over Time (line) ───────────────────────────────
st.subheader("Applications Over Time")
date_df = (
    pd.Series([a.get("createdAt", "")[:10] for a in apps if a.get("createdAt")])
    .value_counts()
    .rename_axis("date")
    .reset_index(name="count")
    .sort_values("date")
)
if not date_df.empty:
    date_df["date"] = pd.to_datetime(date_df["date"])
    st.altair_chart(
        alt.Chart(date_df).mark_line(point=True).encode(
            x="date:T",
            y="count:Q",
            tooltip=["date:T", "count"],
        ).properties(height=300),
        use_container_width=True,
    )
else:
    st.info("No application timeline data.")
