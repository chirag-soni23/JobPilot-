# app.py ────────────────────────────────────────────────
import os
from dotenv import load_dotenv
import streamlit as st
import pandas as pd
import requests
import matplotlib.pyplot as plt

# ── Load .env ───────────────────────────────────────────
load_dotenv()

API_BASE = "http://localhost:5000/api"
ENV_TOKEN = os.getenv("JWT_SECRET", f"{"""EWOIFJ34OI[TJ46U0DD96VUN6WEF34T342T2]"""}")   # env से token
st.set_page_config(page_title="Job-Portal Dashboard", layout="wide")
st.title("📊 Job-Portal Analytics (matplotlib)")

# ── Sidebar token input (env value pre-filled) ─────────
st.sidebar.header("🔐 Authentication")
token = st.sidebar.text_input("JWT Bearer Token", value=ENV_TOKEN, type="password")
HEADERS = {"Authorization": f"Bearer {token}"} if token else {}

# ── Safe fetch helper ──────────────────────────────────
def get_json(url: str):
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        if res.status_code == 200:
            return res.json()
        st.warning(f"{url} → {res.status_code}")
    except Exception as e:
        st.warning(f"{url} error: {e}")
    return []

# ── Fetch data (cache 5 min) ───────────────────────────
@st.cache_data(ttl=300, show_spinner="🔄 Loading data…")
def fetch_all():
    users = get_json(f"{API_BASE}/user/getall")
    jobs  = get_json(f"{API_BASE}/job/getall")
    apps  = get_json(f"{API_BASE}/apply/getall")
    return users, jobs, apps

users, jobs, apps = fetch_all()

# ── Stat cards ─────────────────────────────────────────
c1, c2, c3 = st.columns(3)
c1.metric("Users", len(users))
c2.metric("Jobs",  len(jobs))
c3.metric("Applications", len(apps))
st.divider()

# ========== 1. Users by Role (Pie) =====================
role_counts = pd.Series([u.get("role","unknown") for u in users]).value_counts()
if not role_counts.empty:
    fig1, ax1 = plt.subplots()
    ax1.pie(role_counts, labels=role_counts.index, autopct="%1.0f%%", startangle=140)
    ax1.set_title("Users by Role"); ax1.axis("equal")
    st.pyplot(fig1)
else:
    st.info("No user data.")

# ========== 2. Jobs by Type (Bar) ======================
type_counts = pd.Series([j.get("type","unknown") for j in jobs]).value_counts()
if not type_counts.empty:
    fig2, ax2 = plt.subplots()
    ax2.bar(type_counts.index, type_counts.values, color="skyblue")
    ax2.set_title("Jobs by Type")
    ax2.set_xlabel("Type"); ax2.set_ylabel("Count")
    st.pyplot(fig2)
else:
    st.info("No job data.")

# ========== 3. Applications per Company (Barh) =========
comp_counts = pd.Series(
    [a.get("job",{}).get("company","Unknown") for a in apps]
).value_counts()
if not comp_counts.empty:
    fig3, ax3 = plt.subplots(figsize=(6,4))
    ax3.barh(comp_counts.index, comp_counts.values, color="coral")
    ax3.set_title("Applications per Company")
    ax3.set_xlabel("Applications")
    st.pyplot(fig3)
else:
    st.info("No application data.")

# ========== 4. Applications over Time (Line) ===========
date_counts = (
    pd.Series([a.get("createdAt","")[:10] for a in apps if a.get("createdAt")])
    .value_counts()
    .sort_index()
)
if not date_counts.empty:
    date_counts.index = pd.to_datetime(date_counts.index)
    fig4, ax4 = plt.subplots()
    ax4.plot(date_counts.index, date_counts.values, marker="o")
    ax4.set_title("Applications Over Time")
    ax4.set_xlabel("Date"); ax4.set_ylabel("Applications")
    fig4.autofmt_xdate()
    st.pyplot(fig4)
else:
    st.info("No timeline data.")
