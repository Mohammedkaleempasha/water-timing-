# 💧 WaterWatch – Smart Community Water Supply Notification System

> **Tagline:** *"Stay Informed. Stay Prepared."*  
> **Default Location:** Hyderabad, Telangana, India  
> **Type:** Student Ideathon Prototype (Design Thinking Framework)

---

## 📌 Project Overview

**WaterWatch** is a modern, responsive web application designed as a citizen-centric platform to solve the persistent urban challenge of unpredictable municipal water distribution across Hyderabad, Telangana. 

In Hyderabad, water is distributed periodically on alternate days or variable schedules. Without reliable advance notice, families wake up repeatedly at night, miss office schedules, or suffer empty tanks. **WaterWatch** provides transparent schedule tracking, advance countdown alerts, timing adjustment notifications, crowdsourced community arrival verification, historical reliability analytics, and an **Executive Administrator Command Center** for full municipal control.

---

## 🔐 Authentication & Roles

### 1. Resident / Citizen Authentication
- **Technology:** Google Firebase Authentication (`firebase.auth()`) with Email & Password.
- **Features:** Self-registration, login, profile management, and automatic locality synchronization.
- **Preloaded Demo Resident Account:**
  - **Email:** `aarav.hyd@example.com`
  - **Password:** `waterwatch123`

### 2. Administrator Central Command (`#admin-login` & `#admin-panel`)
- **Dedicated Restricted Portal:** Accessible via the top navbar shield icon, footer link, or URL hash `#admin-login`.
- **Protected Access:** Non-admin visitors attempting to access `#admin-panel` are intercepted and redirected to `#admin-login`.
- **Preconfigured Official Administrator Credentials:**
  - **Email:** `admin@waterwatch.org` (or `admin@waterwatch.gov.in`)
  - **Password:** `AdminWaterWatch2026!`
  - *(Includes a 1-click **"Quick-Fill Demo Admin Credentials"** button on the login screen for instant testing!)*
- **Full Central Control Capabilities:**
  1. **Overview & Live Telemetry:** Real-time KPI counters, quick 1-click status changers (switch Kukatpally, Miyapur, etc. between Scheduled, Delayed, and Completed with instant public site updates).
  2. **Water Supply Schedule Manager:** Create, edit, reschedule, or delete supply slots for any Hyderabad locality.
  3. **Emergency Alerts Dispatcher:** Broadcast targeted or citywide emergency alerts to all Hyderabad zones simultaneously.
  4. **Community Reports Moderation:** Audit citizen submissions, flag or delete spam reports, automatically recalibrating consensus percentages.
  5. **Localities & Reservoirs Directory:** Add new colonies (e.g., Kondapur, Nallagandla), set municipal zones, and configure feeder GLSR pumping stations.
  6. **System & Security Telemetry:** View connected infrastructure diagnostics (`watersupply-a0703`), toggle public Maintenance Mode, or reset sample data.

---

## 🛡️ Cloud Firestore Security Rules (`firestore.rules`)

The system includes a production-grade [`firestore.rules`](file:///C:/Users/ismail%20basravi/.gemini/antigravity/scratch/waterwatch/firestore.rules) file implementing role-based access control:

* **Public Read:**
  - `/localities/{localityId}` – Citizens can view all Hyderabad zones and pumping stations.
  - `/schedules/{scheduleId}` – Real-time water timetable access.
  - `/alerts/{alertId}` – Mobile push and public notification retrieval.
  - `/reports/{reportId}` – Aggregated community consensus metrics and neighbour feedback.
* **Authenticated Resident Write:**
  - `/reports/{reportId}` – Verified residents can confirm water arrival for their locality.
  - `/users/{userId}` – Users can read and update their personal profile (role tampering forbidden).
  - `/feedback/{feedbackId}` – Citizens can submit inquiries and prototype reviews.
* **Administrator Only:**
  - Full write/update/delete permissions on `/schedules`, `/alerts`, `/localities`, and `/settings`.
  - Administrative moderation permissions on `/reports` and `/feedback`.

### Deploying Firestore Rules:
To deploy to your live Firebase project, run:
```bash
firebase deploy --only firestore:rules
```
Or copy and paste the contents of `firestore.rules` directly into the **Rules** tab in the [Firebase Console](https://console.firebase.google.com/).

---

## 🚀 Key Features

1. **Hyderabad Locality Switcher & Directory**
   - Pre-configured with major Hyderabad areas: **Kukatpally, Miyapur, Ameerpet, Dilsukhnagar, LB Nagar, Gachibowli, Madhapur, Mehdipatnam, Uppal, Secunderabad, Begumpet, Banjara Hills**.
   - Custom Locality modal allowing users to enter and track any Hyderabad colony (e.g. Kondapur, Nallagandla, Tarnaka, etc.).
   - Instant synchronization across all views (Dashboard, Timetable, Alerts, Reports, and Charts).

2. **Personalized User Dashboard**
   - Active locality badge & pumping station metadata.
   - Next expected water supply timing card (start & end time, duration, expected pressure).
   - Real-time live countdown timer (Hours : Minutes : Seconds).
   - Supply status pill (`SCHEDULED`, `DELAYED`, `UPDATED`, `COMPLETED`).
   - Quick one-click water arrival confirmation widget.
   - Recent locality notifications preview and community consensus snapshot.

3. **Water Supply Timetable & Filterable Schedule**
   - Multi-day calendar view for the selected locality.
   - Dynamic filters by date (*All Dates, Today, Tomorrow, Upcoming*) and by status (*Scheduled, Delayed, Updated, Completed*).
   - Last updated timestamps and valve adjustment notes.
   - Transparent disclaimer clearly distinguishing simulated sample data from official HMWSSB telemetry.

4. **In-Website Notification Center & Live Alert Dispatcher**
   - Unread badge counter on the top navigation bell.
   - Categories: **Advance Alerts, Schedule Updates, Delay Announcements, and Water Arrivals**.
   - Interactive simulation tool enabling judges and reviewers to trigger instant alerts and observe reactive toast notifications and badge updates.

5. **Crowdsourced Community Confirmation Network**
   - Citizens confirm whether water has arrived at their tap (*Yes, Arrived* vs. *No, Not Yet*).
   - Water pressure assessment (*Low, Normal, High*) and notes.
   - Duplicate submission lock to ensure valid community consensus.
   - Real-time circular SVG consensus gauge (% of positive confirmations today).
   - Verified resident feed showing neighbour feedback with timestamps.

6. **Supply Records & Visual Analytics (Chart.js)**
   - Summary KPIs: Average supply duration (hrs), on-time punctuality rate (%), and total monitored cycles.
   - **Chart 1:** Bar & benchmark line chart illustrating actual vs scheduled duration.
   - **Chart 2:** Doughnut chart illustrating on-time vs delayed vs rescheduled cycles.
   - Historical audit log table with variance indicators.

7. **Contact & Prototype Feedback Hub**
   - Inquiry contact form with automatic ticket reference generator (`WW-HYD-xxxx`).
   - Reviewer feedback form with interactive 5-star rating for Ideathon evaluators.

8. **Multilingual Localization (English, Telugu & Hindi)**
   - Instant in-browser language switching between **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
   - Comprehensive translations across navigation, hero, dashboard metrics, timetable filters, community confirmation, and alerts.
   - Localized locality name display (e.g. *Kukatpally (కూకట్‌పల్లి)*, *Miyapur (మియాపూర్)*) while preserving system data integrity.
   - Persistent language selection stored in `localStorage`.

9. **Official Hyderabad Municipal Resources & Portals Directory**
   - Dedicated cards linking directly to official government bodies and social handles:
     - **HMWSSB Website:** Official portal for Hyderabad Metropolitan Water Supply & Sewerage Board (`https://hyderabadwater.gov.in/`).
     - **HMWSSB on X:** Verified public advisories and interruption alerts (`https://x.com/HMWSSBOnline`).
     - **GHMC Website:** Official Greater Hyderabad Municipal Corporation portal (`https://www.ghmc.gov.in/`).
     - **GHMC on X:** Official civic coordination and municipal updates (`https://x.com/GHMCOnline`).
   - Integrated quick helpline bar with direct citizen support lines (HMWSSB Customer Care: `155313`, GHMC Citizen Helpline: `040-21111111`).
   - Accessible via dedicated navigation tab (`#portals`), homepage showcase, and dashboard quick-access widget.

---

## 🛠️ Technology Stack

- **Frontend:** Semantic HTML5, Modern CSS3 (Custom design system, CSS variables, Glassmorphism, Responsive Grid & Flexbox, SVG animations), Pure Vanilla JavaScript (Modular ES6).
- **Visualization:** [Chart.js](https://www.chartjs.org/) for interactive reliability and duration charts.
- **Iconography:** [Font Awesome 6.5.1](https://fontawesome.com/) + SVG icons.
- **Typography:** [Google Fonts: Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans).
- **Backend & Auth:** Google Firebase SDK (compat mode: App, Auth, Firestore) with unified zero-failure local adapter fallback.
- **Security:** Granular `firestore.rules` protecting user data, schedules, alerts, and reports.

---

## 📂 Project Structure

```text
waterwatch/
├── index.html            # Main Single-Page Application (SPA) with all 10 views and modals
├── firestore.rules       # Cloud Firestore Production Security Rules
├── css/
│   └── styles.css        # Complete modern design system and responsive styles
├── js/
│   ├── data.js           # Hyderabad localities mock dataset, schedules, and alerts
│   ├── storage.js        # LocalStorage state manager, duplicate locks & admin actions
│   ├── firebase-config.js# Firebase Authentication & Cloud Firestore adapter
│   ├── admin.js          # Professional Administrator Controller & Central Command
│   ├── charts.js         # Chart.js analytics for supply duration & punctuality
│   └── app.js            # Main application controller, SPA router & live countdowns
└── README.md             # Project documentation and evaluation guide
```

---

## 🏃 How to Run the Website

### Option 1: Direct Browser Launch
Simply open [index.html](file:///C:/Users/ismail%20basravi/.gemini/antigravity/scratch/waterwatch/index.html) in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Local Web Server (Python)
Run the following in PowerShell:
```powershell
cd "C:\Users\ismail basravi\.gemini\antigravity\scratch\waterwatch"
python -m http.server 8000
```
Then navigate to: **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## 🔌 Google Firebase Integration (`watersupply-a0703`)

WaterWatch is directly configured with your live Google Firebase project:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD5YVYCXNKfju-8GKowtgJEUbzm0u7eUDI",
  authDomain: "watersupply-a0703.firebaseapp.com",
  projectId: "watersupply-a0703",
  storageBucket: "watersupply-a0703.firebasestorage.app",
  messagingSenderId: "488728417770",
  appId: "1:488728417770:web:301859632b587b75568e93",
  measurementId: "G-VC7G9D2DBC"
};
```
- **Keys Embedded:** Embedded securely into `js/firebase-config.js` with zero user-facing key-entry pages or input fields on the website.
- **Firebase Authentication:** Handles Email/Password registration and login natively.
- **Cloud Firestore:** Real-time data storage protected by `firestore.rules`.
- **Zero-Failure Fallback:** Automatically handles offline or initial connection states gracefully without freezing.
