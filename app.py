import os
from dotenv import load_dotenv
import streamlit as st
import pandas as pd
import requests
import matplotlib.pyplot as plt

# env
load_dotenv()
API_BASE  = os.getenv("API_BASE", "https://jobpilot-gqgi.onrender.com/api")
ENV_TOKEN = os.getenv("AUTH_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWU5NjMzZWFiM2I4YWE0MDE4ZDk1YyIsImlhdCI6MTc1MTAzMDA1MSwiZXhwIjoxNzUyMzI2MDUxfQ.0AjqA0RdV8IdQi-yGEz0sPgATFMl3rCQQgDdMqsIRxE")    # ✅ token, not secret!

st.set_page_config(page_title="Job-Portal Dashboard", layout="wide")
st.title("📊 Job-Portal Analytics (matplotlib)")

# sidebar
st.sidebar.header("🔐 Authentication")
token = st.sidebar.text_input("JWT Token", value=ENV_TOKEN, type="password")

HEADERS = {"Authorization": f"Bearer {token}"} if token else {}
COOKIES = {"token": token} if token else {}

def get_json(url: str):
    try:
        res = requests.get(url, headers=HEADERS, cookies=COOKIES, timeout=10)
        if res.status_code == 200:
            return res.json()          # ← () added
        st.warning(f"{url} → {res.status_code}")
    except Exception as e:
        st.warning(f"{url} error: {e}")
    return []

@st.cache_data(ttl=300, show_spinner="🔄 Loading…")
def fetch_all(tok):
    return (
        get_json(f"{API_BASE}/user/getall"),
        get_json(f"{API_BASE}/job/getall"),
        get_json(f"{API_BASE}/apply/getall"),
    )

users, jobs, apps = fetch_all(token)

# Stat cards
c1, c2, c3 = st.columns(3)
c1.metric("Users", len(users))
c2.metric("Jobs",  len(jobs))
c3.metric("Applications", len(apps))
st.divider()

# 1. Users by Role
role_counts = pd.Series([u.get("role", "unknown") for u in users]).value_counts()
if not role_counts.empty:
    fig, ax = plt.subplots()
    ax.pie(role_counts, labels=role_counts.index, autopct="%1.0f%%", startangle=140)
    ax.set_title("Users by Role"); ax.axis("equal")
    st.pyplot(fig)
else:
    st.info("No user data.")

# 2. Jobs by Type
type_counts = pd.Series([j.get("type", "unknown") for j in jobs]).value_counts()
if not type_counts.empty:
    fig, ax = plt.subplots()
    ax.bar(type_counts.index, type_counts.values, color="skyblue")
    ax.set_title("Jobs by Type")
    ax.set_xlabel("Type"); ax.set_ylabel("Count")
    st.pyplot(fig)
else:
    st.info("No job data.")

# 3. Applications per Company
comp_counts = pd.Series([a.get("job", {}).get("company", "Unknown") for a in apps]).value_counts()
if not comp_counts.empty:
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.barh(comp_counts.index, comp_counts.values, color="coral")
    ax.set_title("Applications per Company")
    ax.set_xlabel("Applications")
    st.pyplot(fig)
else:
    st.info("No application data.")

# 4. Applications over Time
date_counts = (
    pd.Series([a.get("createdAt", "")[:10] for a in apps if a.get("createdAt")])
    .value_counts()
    .sort_index()
)
if not date_counts.empty:
    date_counts.index = pd.to_datetime(date_counts.index)
    fig, ax = plt.subplots()
    ax.plot(date_counts.index, date_counts.values, marker="o")
    ax.set_title("Applications Over Time")
    ax.set_xlabel("Date"); ax.set_ylabel("Applications")
    fig.autofmt_xdate()
    st.pyplot(fig)
else:
    st.info("No timeline data.")
