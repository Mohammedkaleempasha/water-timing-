/**
 * WaterWatch - Main Application Controller
 * Handles SPA navigation, live countdowns, locality sync, community confirmation,
 * notifications, charts re-rendering, and Ideathon prototype simulations.
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  countdownInterval: null,
  activeFilterScheduleDate: "all",
  activeFilterScheduleStatus: "all",
  activeNotificationCategory: "all",

  init() {
    this.bindNavigation();
    this.bindLocalitySelectors();
    this.bindAuthEvents();
    this.bindCommunityForm();
    this.bindScheduleFilters();
    this.bindNotificationCenter();
    this.bindContactAndFeedback();
    this.bindSimulateAlertModal();
    this.bindCustomLocalityModal();

    // Global event listeners
    window.addEventListener("localityChanged", (e) => {
      this.onLocalityChanged(e.detail.locality);
    });

    window.addEventListener("authChanged", (e) => {
      this.updateAuthUI(e.detail.user);
    });

    window.addEventListener("languageChanged", (e) => {
      this.onLanguageChanged(e.detail.lang);
    });

    window.addEventListener("newNotification", (e) => {
      this.showToast("New Notification", e.detail.alert.title, "info");
      this.updateNotificationBadge();
      if (this.getCurrentView() === "notifications") {
        this.renderNotifications();
      }
    });

    // Initial render based on URL hash or default to home
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());

    // Sync UI with current storage state
    this.syncAllLocalityDropdowns();
    this.updateAuthUI(window.storage.getUser());
    this.refreshCurrentLocalityView();
    this.updateNotificationBadge();
  },

  // ==========================================
  // NAVIGATION & ROUTING
  // ==========================================
  bindNavigation() {
    // Nav links
    document.querySelectorAll("[data-nav]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-nav");
        window.location.hash = targetView;
        this.closeMobileMenu();
      });
    });

    // Mobile menu toggle
    const hamburgerBtn = document.getElementById("mobileMenuBtn");
    const mobileNavDrawer = document.getElementById("mobileNavDrawer");
    const closeMobileBtn = document.getElementById("closeMobileMenuBtn");

    if (hamburgerBtn && mobileNavDrawer) {
      hamburgerBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.toggle("open");
      });
    }
    if (closeMobileBtn && mobileNavDrawer) {
      closeMobileBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
      });
    }
  },

  closeMobileMenu() {
    const mobileNavDrawer = document.getElementById("mobileNavDrawer");
    if (mobileNavDrawer) mobileNavDrawer.classList.remove("open");
  },

  getCurrentView() {
    const hash = window.location.hash.replace("#", "") || "home";
    return hash;
  },

  handleRoute() {
    const viewName = this.getCurrentView();
    const views = document.querySelectorAll(".app-view");
    let activeFound = false;

    // Route guard check for admin views
    if (viewName === "admin-panel" || viewName === "admin-login") {
      if (typeof AdminController !== "undefined" && !AdminController.checkGuard(viewName)) {
        return;
      }
    }

    views.forEach(v => {
      if (v.id === `view-${viewName}`) {
        v.classList.remove("hidden");
        activeFound = true;
      } else {
        v.classList.add("hidden");
      }
    });

    // Fallback to home if not matched
    if (!activeFound) {
      const homeView = document.getElementById("view-home");
      if (homeView) homeView.classList.remove("hidden");
    }

    // Update active nav styling
    document.querySelectorAll("[data-nav]").forEach(link => {
      if (link.getAttribute("data-nav") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Check system maintenance mode
    const settings = window.storage.getSystemSettings();
    const maintBanner = document.getElementById("systemMaintenanceBanner");
    if (maintBanner) {
      if (settings.maintenanceMode && !viewName.startsWith("admin")) {
        maintBanner.classList.remove("hidden");
        const msgEl = document.getElementById("systemMaintenanceMsg");
        if (msgEl) msgEl.textContent = settings.maintenanceMessage || "System undergoing scheduled telemetry maintenance.";
      } else {
        maintBanner.classList.add("hidden");
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Page-specific renders
    if (viewName === "dashboard") {
      this.renderDashboard();
    } else if (viewName === "schedule") {
      this.renderSchedule();
    } else if (viewName === "notifications") {
      this.renderNotifications();
    } else if (viewName === "community") {
      this.renderCommunity();
    } else if (viewName === "records") {
      this.renderRecords();
    } else if (viewName === "admin-panel") {
      if (typeof AdminController !== "undefined") {
        AdminController.renderAllAdminData();
      }
    }
  },

  // ==========================================
  // LOCALITY MANAGEMENT
  // ==========================================
  bindLocalitySelectors() {
    // Header dropdown
    const headerLocalitySelect = document.getElementById("headerLocalitySelect");
    if (headerLocalitySelect) {
      headerLocalitySelect.addEventListener("change", (e) => {
        if (e.target.value === "__add_new__") {
          this.openModal("customLocalityModal");
          headerLocalitySelect.value = window.storage.getActiveLocality();
        } else {
          window.storage.setActiveLocality(e.target.value);
        }
      });
    }

    // Hero quick selector
    const heroLocalitySelect = document.getElementById("heroLocalitySelect");
    if (heroLocalitySelect) {
      heroLocalitySelect.addEventListener("change", (e) => {
        if (e.target.value === "__add_new__") {
          this.openModal("customLocalityModal");
          heroLocalitySelect.value = window.storage.getActiveLocality();
        } else {
          window.storage.setActiveLocality(e.target.value);
        }
      });
    }

    // Schedule filter locality select
    const scheduleLocalitySelect = document.getElementById("scheduleLocalitySelect");
    if (scheduleLocalitySelect) {
      scheduleLocalitySelect.addEventListener("change", (e) => {
        window.storage.setActiveLocality(e.target.value);
      });
    }

    // Community filter locality select
    const communityLocalitySelect = document.getElementById("communityLocalitySelect");
    if (communityLocalitySelect) {
      communityLocalitySelect.addEventListener("change", (e) => {
        window.storage.setActiveLocality(e.target.value);
      });
    }

    // Records filter locality select
    const recordsLocalitySelect = document.getElementById("recordsLocalitySelect");
    if (recordsLocalitySelect) {
      recordsLocalitySelect.addEventListener("change", (e) => {
        window.storage.setActiveLocality(e.target.value);
      });
    }
  },

  syncAllLocalityDropdowns() {
    const localities = window.storage.getAllLocalities();
    const active = window.storage.getActiveLocality();

    const dropdownIds = [
      "headerLocalitySelect",
      "heroLocalitySelect",
      "scheduleLocalitySelect",
      "communityLocalitySelect",
      "recordsLocalitySelect",
      "authLocalitySelect",
      "contactLocalitySelect",
      "simLocalitySelect",
      "adminSchLocality",
      "adminAlertTargetLocality"
    ];

    dropdownIds.forEach(id => {
      const select = document.getElementById(id);
      if (!select) return;

      const hasAddNew = id.includes("header") || id.includes("hero");
      const isTargetAlert = id === "adminAlertTargetLocality";
      let html = "";

      if (isTargetAlert) {
        html += `<option value="__ALL__">🚨 ALL HYDERABAD LOCALITIES (Citywide Broadcast)</option>`;
      }

      localities.forEach(loc => {
        const isSelected = (!isTargetAlert && loc === active) ? "selected" : "";
        const label = (typeof window !== "undefined" && window.i18n && typeof window.i18n.getLocalityName === "function") 
          ? window.i18n.getLocalityName(loc) 
          : loc;
        html += `<option value="${loc}" ${isSelected}>${label}</option>`;
      });

      if (hasAddNew) {
        const addMoreText = (typeof window !== "undefined" && window.i18n && window.i18n.getLanguage() === "te")
          ? "+ మరొక హైదరాబాద్ ప్రాంతాన్ని జోడించండి..."
          : ((typeof window !== "undefined" && window.i18n && window.i18n.getLanguage() === "hi")
            ? "+ एक और हैदराबाद इलाका जोड़ें..."
            : "+ Add Another Hyderabad Locality...");
        html += `<option value="__add_new__">${addMoreText}</option>`;
      }

      select.innerHTML = html;
      if (!isTargetAlert) {
        select.value = active;
      }
    });

    // Update text pills that display current locality
    document.querySelectorAll(".active-locality-text").forEach(el => {
      const label = (typeof window !== "undefined" && window.i18n && typeof window.i18n.getLocalityName === "function") 
        ? window.i18n.getLocalityName(active) 
        : active;
      el.textContent = label;
    });
  },

  onLocalityChanged(newLocality) {
    this.syncAllLocalityDropdowns();
    this.refreshCurrentLocalityView();
    this.showToast("Locality Updated", `Switched view to ${newLocality}, Hyderabad`, "info");
  },

  onLanguageChanged(lang) {
    this.syncAllLocalityDropdowns();
    this.refreshCurrentLocalityView();
    if (typeof window !== "undefined" && window.i18n) {
      window.i18n.applyLanguage(lang);
    }
  },

  refreshCurrentLocalityView() {
    const view = this.getCurrentView();
    if (view === "dashboard") this.renderDashboard();
    if (view === "schedule") this.renderSchedule();
    if (view === "notifications") this.renderNotifications();
    if (view === "community") this.renderCommunity();
    if (view === "records") this.renderRecords();
  },

  // ==========================================
  // DASHBOARD VIEW & COUNTDOWN
  // ==========================================
  renderDashboard() {
    const locality = window.storage.getActiveLocality();
    const data = window.storage.getLocalityData(locality);
    const user = window.storage.getUser();

    // User greeting
    const greetingEl = document.getElementById("dashboardUserGreeting");
    if (greetingEl) {
      const name = user ? user.name : "Resident";
      if (typeof window !== "undefined" && window.i18n && window.i18n.getLanguage() !== "en") {
        greetingEl.textContent = `${window.i18n.t("dash_greeting_default")} (${locality})`;
      } else {
        greetingEl.textContent = `Hello, ${name}! Here is today's water status for ${locality}.`;
      }
    }

    // Locality and pumping station badge
    const locZoneEl = document.getElementById("dashboardZoneInfo");
    if (locZoneEl) {
      locZoneEl.textContent = `${data.zone} • ${data.pumpingStation}`;
    }

    // Next Supply details
    const next = data.nextSupply;
    document.querySelectorAll(".next-supply-date").forEach(el => el.textContent = formatDisplayDate(next.date));
    document.querySelectorAll(".next-supply-time").forEach(el => el.textContent = `${next.startTime} - ${next.endTime}`);
    document.querySelectorAll(".next-supply-duration").forEach(el => el.textContent = next.duration);
    document.querySelectorAll(".next-supply-pressure").forEach(el => {
      const p = next.expectedPressure;
      el.textContent = (typeof window !== "undefined" && window.i18n) ? window.i18n.translatePressure(p) : p;
    });

    // Status badge
    const statusBadge = document.getElementById("dashboardStatusBadge");
    const statusNote = document.getElementById("dashboardStatusNote");
    if (statusBadge) {
      const rawStatus = data.currentStatus;
      const transStatus = (typeof window !== "undefined" && window.i18n) ? window.i18n.translateStatus(rawStatus) : rawStatus.toUpperCase();
      statusBadge.textContent = transStatus;
      statusBadge.className = `status-pill status-${rawStatus.toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (statusNote) {
      statusNote.textContent = data.statusNote;
    }

    // Live countdown timer setup
    this.startCountdownTimer(next);

    // Update countdown unit labels
    const cdUnitEls = document.querySelectorAll(".cd-unit");
    if (cdUnitEls.length === 3 && typeof window !== "undefined" && window.i18n) {
      cdUnitEls[0].textContent = window.i18n.t("dash_cd_hours", "Hours");
      cdUnitEls[1].textContent = window.i18n.t("dash_cd_minutes", "Mins");
      cdUnitEls[2].textContent = window.i18n.t("dash_cd_seconds", "Secs");
    }

    // Community consensus summary widget
    const yesCount = data.communityConfirmation.yesCount;
    const noCount = data.communityConfirmation.noCount;
    const total = yesCount + noCount;
    const pct = total > 0 ? Math.round((yesCount / total) * 100) : 0;

    const consensusPctEl = document.getElementById("dashboardConsensusPct");
    const consensusBarEl = document.getElementById("dashboardConsensusBar");
    const consensusCountEl = document.getElementById("dashboardConsensusCount");

    if (consensusPctEl) consensusPctEl.textContent = `${pct}%`;
    if (consensusBarEl) consensusBarEl.style.width = `${pct}%`;
    if (consensusCountEl) {
      if (typeof window !== "undefined" && window.i18n && window.i18n.getLanguage() === "te") {
        consensusCountEl.textContent = `${total} మంది పొరుగువారిలో ${yesCount} మంది నీరు వచ్చిందని ధృవీకరించారు`;
      } else if (typeof window !== "undefined" && window.i18n && window.i18n.getLanguage() === "hi") {
        consensusCountEl.textContent = `${total} पड़ोसियों में से ${yesCount} ने पानी आने की पुष्टि की`;
      } else {
        consensusCountEl.textContent = `${yesCount} of ${total} neighbours confirmed arrival`;
      }
    }

    // Quick confirmation check
    this.updateDashboardQuickConfirmState(locality);

    // Recent alerts preview
    this.renderDashboardRecentAlerts(data.alerts);
  },

  startCountdownTimer(nextSupply) {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    // Calculate simulated target time:
    // Uses targetHoursFromNow to ensure the demo always has an active, realistic countdown
    const targetMs = Date.now() + (nextSupply.targetHoursFromNow * 3600 * 1000);

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetMs - now;

      const hrsEl = document.getElementById("cdHours");
      const minsEl = document.getElementById("cdMinutes");
      const secsEl = document.getElementById("cdSeconds");

      if (diff <= 0) {
        if (hrsEl) hrsEl.textContent = "00";
        if (minsEl) minsEl.textContent = "00";
        if (secsEl) secsEl.textContent = "00";
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hrsEl) hrsEl.textContent = String(hours).padStart(2, "0");
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
    };

    updateTimer();
    this.countdownInterval = setInterval(updateTimer, 1000);
  },

  updateDashboardQuickConfirmState(locality) {
    const confirmed = window.storage.getUserConfirmation(locality);
    const container = document.getElementById("dashboardQuickConfirmBox");
    if (!container) return;

    const tYes = (typeof window !== "undefined" && window.i18n) ? window.i18n.t("dash_confirm_yes", "Yes, Arrived") : "Yes, Arrived";
    const tNo = (typeof window !== "undefined" && window.i18n) ? window.i18n.t("dash_confirm_no", "No, Not Yet") : "No, Not Yet";
    const tQ = (typeof window !== "undefined" && window.i18n) ? window.i18n.t("dash_confirm_question", "Has water arrived at your tap?") : "Has water arrived at your tap?";
    const tConfirmedMsg = (typeof window !== "undefined" && window.i18n) ? window.i18n.t("dash_confirm_reported_yes", "You have confirmed for today's cycle") : "You have confirmed for today's cycle";
    const tViewRep = (typeof window !== "undefined" && window.i18n) ? window.i18n.t("dash_btn_open_community", "View Reports") : "View Reports";

    if (confirmed) {
      container.innerHTML = `
        <div class="confirm-done-card">
          <div class="confirm-done-icon"><i class="fas fa-check-circle"></i></div>
          <div class="confirm-done-text">
            <strong>${tConfirmedMsg}</strong>
            <p>${locality} • ${confirmed.pressure || "Normal"}</p>
          </div>
          <button class="btn btn-sm btn-outline" onclick="App.navigateTo('community')">${tViewRep}</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="confirm-prompt-card">
          <div>
            <strong>${tQ}</strong>
            <p>Help your neighbours in ${locality} stay informed.</p>
          </div>
          <div class="confirm-prompt-actions">
            <button class="btn btn-sm btn-success" onclick="App.quickConfirmWater(true)"><i class="fas fa-tint"></i> ${tYes}</button>
            <button class="btn btn-sm btn-light" onclick="App.quickConfirmWater(false)"><i class="fas fa-times-circle"></i> ${tNo}</button>
          </div>
        </div>
      `;
    }
  },

  quickConfirmWater(arrived) {
    const locality = window.storage.getActiveLocality();
    const user = window.storage.getUser();
    window.storage.saveUserConfirmation(locality, {
      arrived: arrived,
      pressure: arrived ? "Normal" : "None",
      notes: arrived ? "Confirmed via Dashboard quick action." : "No water yet.",
      userName: user ? user.name : "Hyderabad Resident"
    });

    this.showToast("Report Submitted", "Thank you! Your community report has been logged.", "success");
    this.renderDashboard();
  },

  renderDashboardRecentAlerts(alerts = []) {
    const container = document.getElementById("dashboardRecentAlertsList");
    if (!container) return;

    if (!alerts || alerts.length === 0) {
      container.innerHTML = `<div class="empty-state-sm">No active alerts for this locality right now.</div>`;
      return;
    }

    const items = alerts.slice(0, 3).map(a => `
      <div class="alert-preview-item alert-type-${a.type}">
        <div class="alert-preview-icon">
          <i class="${this.getAlertIcon(a.type)}"></i>
        </div>
        <div class="alert-preview-content">
          <div class="alert-preview-title">${a.title}</div>
          <div class="alert-preview-msg">${a.message}</div>
          <div class="alert-preview-time">${a.timestamp}</div>
        </div>
      </div>
    `).join("");

    container.innerHTML = items;
  },

  // ==========================================
  // SCHEDULE VIEW
  // ==========================================
  bindScheduleFilters() {
    // Filter by date pills
    document.querySelectorAll(".sch-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sch-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilterScheduleDate = btn.getAttribute("data-filter-date");
        this.renderSchedule();
      });
    });

    // Filter by status dropdown
    const statusSelect = document.getElementById("scheduleStatusFilter");
    if (statusSelect) {
      statusSelect.addEventListener("change", (e) => {
        this.activeFilterScheduleStatus = e.target.value;
        this.renderSchedule();
      });
    }
  },

  renderSchedule() {
    const locality = window.storage.getActiveLocality();
    const locData = window.storage.getLocalityData(locality);
    const container = document.getElementById("scheduleCardsContainer");
    const tableBody = document.getElementById("scheduleTableBody");
    if (!locData || !locData.schedules) return;

    // Filter logic
    let filtered = [...locData.schedules];
    const todayStr = getRelativeDateStr(0);
    const tomorrowStr = getRelativeDateStr(1);

    if (this.activeFilterScheduleDate === "today") {
      filtered = filtered.filter(s => s.date === todayStr);
    } else if (this.activeFilterScheduleDate === "tomorrow") {
      filtered = filtered.filter(s => s.date === tomorrowStr);
    } else if (this.activeFilterScheduleDate === "upcoming") {
      filtered = filtered.filter(s => s.date > todayStr);
    }

    if (this.activeFilterScheduleStatus !== "all") {
      filtered = filtered.filter(s => s.status.toLowerCase() === this.activeFilterScheduleStatus.toLowerCase());
    }

    // Render Table
    if (tableBody) {
      if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No schedule records match the selected filters.</td></tr>`;
      } else {
        tableBody.innerHTML = filtered.map(s => `
          <tr>
            <td><strong>${formatDisplayDate(s.date)}</strong></td>
            <td><span class="time-chip"><i class="far fa-clock"></i> ${s.startTime} - ${s.endTime}</span></td>
            <td><span class="status-pill status-${s.status.toLowerCase()}">${(typeof window !== "undefined" && window.i18n) ? window.i18n.translateStatus(s.status) : s.status}</span></td>
            <td><span class="text-sm text-muted">${s.updatedTime}</span></td>
            <td><span class="text-sm">${s.note}</span></td>
            <td>
              <button class="btn btn-xs btn-outline" onclick="App.viewScheduleDetails('${s.id}')">
                <i class="fas fa-info-circle"></i> Info
              </button>
            </td>
          </tr>
        `).join("");
      }
    }

    // Render Mobile Cards
    if (container) {
      if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state">No schedules found for selected filters.</div>`;
      } else {
        container.innerHTML = filtered.map(s => `
          <div class="schedule-card">
            <div class="schedule-card-header">
              <span class="schedule-date"><i class="far fa-calendar-alt"></i> ${formatDisplayDate(s.date)}</span>
              <span class="status-pill status-${s.status.toLowerCase()}">${(typeof window !== "undefined" && window.i18n) ? window.i18n.translateStatus(s.status) : s.status}</span>
            </div>
            <div class="schedule-card-body">
              <div class="schedule-time-range">
                <i class="far fa-clock text-primary"></i> ${s.startTime} – ${s.endTime}
              </div>
              <p class="schedule-card-note">${s.note}</p>
              <div class="schedule-card-footer">
                <span class="text-xs text-muted">Last updated: ${s.updatedTime}</span>
              </div>
            </div>
          </div>
        `).join("");
      }
    }

    // Update locality headline in schedule
    const titleEl = document.getElementById("scheduleLocalityTitle");
    if (titleEl) titleEl.textContent = `Water Supply Timetable – ${locality}`;
  },

  viewScheduleDetails(scheduleId) {
    const locality = window.storage.getActiveLocality();
    const locData = window.storage.getLocalityData(locality);
    const item = locData.schedules.find(s => s.id === scheduleId);
    if (!item) return;

    this.showToast(
      `Schedule Info (${formatDisplayDate(item.date)})`,
      `Status: ${item.status}. Timings: ${item.startTime} - ${item.endTime}. Note: ${item.note}`,
      "info"
    );
  },

  // ==========================================
  // NOTIFICATIONS CENTER
  // ==========================================
  bindNotificationCenter() {
    // Filter tabs
    document.querySelectorAll(".notif-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".notif-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeNotificationCategory = tab.getAttribute("data-notif-category");
        this.renderNotifications();
      });
    });

    // Mark all as read
    const markReadBtn = document.getElementById("markAllReadBtn");
    if (markReadBtn) {
      markReadBtn.addEventListener("click", () => {
        window.storage.markAllNotificationsRead();
        this.renderNotifications();
        this.updateNotificationBadge();
        this.showToast("All Read", "Marked all current notifications as read.", "info");
      });
    }

    // Header bell click opens notifications view
    const bellBtn = document.getElementById("headerNotificationBell");
    if (bellBtn) {
      bellBtn.addEventListener("click", () => {
        window.location.hash = "notifications";
      });
    }
  },

  updateNotificationBadge() {
    const alerts = window.storage.getNotifications();
    const unreadCount = alerts.filter(a => !a.read).length;
    const badge = document.getElementById("notifBadgeCount");

    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? "9+" : unreadCount;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  },

  renderNotifications() {
    const locality = window.storage.getActiveLocality();
    const alerts = window.storage.getNotifications(locality);
    const container = document.getElementById("notificationsListContainer");
    if (!container) return;

    let filtered = alerts;
    if (this.activeNotificationCategory !== "all") {
      filtered = alerts.filter(a => a.type.toLowerCase() === this.activeNotificationCategory.toLowerCase());
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="far fa-bell-slash text-muted fa-3x mb-3"></i>
          <h4>No notifications in this category</h4>
          <p class="text-muted">You are all caught up for ${locality}.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(a => `
      <div class="notification-card notif-type-${a.type} ${a.read ? 'read' : 'unread'}" onclick="App.markSingleNotificationRead('${a.id}')">
        <div class="notif-card-icon">
          <i class="${this.getAlertIcon(a.type)}"></i>
        </div>
        <div class="notif-card-main">
          <div class="notif-card-header">
            <span class="notif-category-tag tag-${a.type}">${this.formatAlertCategory(a.type)}</span>
            <span class="notif-time text-xs text-muted">${a.timestamp}</span>
          </div>
          <h4 class="notif-title">${a.title}</h4>
          <p class="notif-body">${a.message}</p>
        </div>
        ${!a.read ? `<div class="unread-dot" title="Unread"></div>` : ''}
      </div>
    `).join("");
  },

  markSingleNotificationRead(id) {
    const locality = window.storage.getActiveLocality();
    const locData = window.storage.getLocalityData(locality);
    const target = locData.alerts.find(a => a.id === id);
    if (target && !target.read) {
      target.read = true;
      window.storage.updateSingleLocality(locality, locData);
      this.renderNotifications();
      this.updateNotificationBadge();
    }
  },

  getAlertIcon(type) {
    switch (type) {
      case "advance": return "fas fa-clock";
      case "update": return "fas fa-sync-alt";
      case "delay": return "fas fa-exclamation-triangle";
      case "arrival": return "fas fa-faucet";
      default: return "fas fa-bell";
    }
  },

  formatAlertCategory(type) {
    switch (type) {
      case "advance": return "Advance Alert";
      case "update": return "Schedule Update";
      case "delay": return "Delay Notice";
      case "arrival": return "Water Arrival";
      default: return "Announcement";
    }
  },

  // ==========================================
  // COMMUNITY CONFIRMATION VIEW
  // ==========================================
  bindCommunityForm() {
    let selectedArrived = true; // default Yes
    let selectedPressure = "Normal";

    // Yes / No button toggles
    const yesBtn = document.getElementById("confirmYesBtn");
    const noBtn = document.getElementById("confirmNoBtn");

    if (yesBtn && noBtn) {
      yesBtn.addEventListener("click", () => {
        selectedArrived = true;
        yesBtn.classList.add("active");
        noBtn.classList.remove("active");
        const pressureGroup = document.getElementById("pressureSelectorGroup");
        if (pressureGroup) pressureGroup.style.display = "block";
      });

      noBtn.addEventListener("click", () => {
        selectedArrived = false;
        noBtn.classList.add("active");
        yesBtn.classList.remove("active");
        const pressureGroup = document.getElementById("pressureSelectorGroup");
        if (pressureGroup) pressureGroup.style.display = "none";
      });
    }

    // Pressure pills
    document.querySelectorAll(".pressure-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".pressure-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        selectedPressure = pill.getAttribute("data-pressure");
      });
    });

    // Form submit
    const submitBtn = document.getElementById("submitCommunityReportBtn");
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const locality = window.storage.getActiveLocality();

        // Check if already submitted today
        if (window.storage.getUserConfirmation(locality)) {
          this.showToast("Already Submitted", "You have already confirmed for today's supply cycle in this locality.", "warning");
          return;
        }

        const notesInput = document.getElementById("communityReportNotes");
        const notes = notesInput ? notesInput.value.trim() : "";
        const user = window.storage.getUser();

        window.storage.saveUserConfirmation(locality, {
          arrived: selectedArrived,
          pressure: selectedArrived ? selectedPressure : "None",
          notes: notes || (selectedArrived ? "Water arrived at tap." : "Taps dry, waiting for supply."),
          userName: user ? user.name : "Hyderabad Resident"
        });

        // Trigger celebration / toast
        this.showToast("Report Published", "Your confirmation helps your neighbours in " + locality + "!", "success");
        if (notesInput) notesInput.value = "";

        this.renderCommunity();
        this.renderDashboard();
      });
    }
  },

  renderCommunity() {
    const locality = window.storage.getActiveLocality();
    const locData = window.storage.getLocalityData(locality);
    if (!locData) return;

    const yesCount = locData.communityConfirmation.yesCount;
    const noCount = locData.communityConfirmation.noCount;
    const total = yesCount + noCount;
    const pct = total > 0 ? Math.round((yesCount / total) * 100) : 0;

    // Update gauge and stats
    const gaugePct = document.getElementById("communityGaugePct");
    const gaugeCircle = document.getElementById("communityGaugeCircle");
    const yesCountEl = document.getElementById("communityYesCount");
    const noCountEl = document.getElementById("communityNoCount");
    const totalCountEl = document.getElementById("communityTotalReports");
    const lastActiveEl = document.getElementById("communityLastActive");

    if (gaugePct) gaugePct.textContent = `${pct}%`;
    if (yesCountEl) yesCountEl.textContent = yesCount;
    if (noCountEl) noCountEl.textContent = noCount;
    if (totalCountEl) totalCountEl.textContent = total;
    if (lastActiveEl) lastActiveEl.textContent = locData.communityConfirmation.lastConfirmedAgo;

    // SVG gauge circle stroke animation (circumference = 2 * PI * 40 ≈ 251.2)
    if (gaugeCircle) {
      const circumference = 251.2;
      const offset = circumference - (pct / 100) * circumference;
      gaugeCircle.style.strokeDasharray = circumference;
      gaugeCircle.style.strokeDashoffset = offset;
    }

    // Lockout state check
    const confirmed = window.storage.getUserConfirmation(locality);
    const submitBtn = document.getElementById("submitCommunityReportBtn");
    const lockBanner = document.getElementById("communityAlreadySubmittedNotice");

    if (confirmed) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Already Reported for Today`;
        submitBtn.classList.add("btn-disabled");
      }
      if (lockBanner) lockBanner.classList.remove("hidden");
    } else {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Submit Water Confirmation`;
        submitBtn.classList.remove("btn-disabled");
      }
      if (lockBanner) lockBanner.classList.add("hidden");
    }

    // Render Recent Reports Feed
    const feedContainer = document.getElementById("communityReportsFeed");
    if (feedContainer) {
      const reports = locData.recentReports || [];
      if (reports.length === 0) {
        feedContainer.innerHTML = `<div class="empty-state">No reports submitted yet today. Be the first!</div>`;
      } else {
        feedContainer.innerHTML = reports.map(r => `
          <div class="community-feed-item">
            <div class="feed-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="feed-content">
              <div class="feed-header">
                <strong>${r.user}</strong>
                <span class="verified-tag"><i class="fas fa-shield-alt"></i> Verified Resident</span>
                <span class="feed-time">${r.time}</span>
              </div>
              <div class="feed-locality-tag"><i class="fas fa-map-marker-alt"></i> ${r.locality}</div>
              <div class="feed-status-line">
                ${r.arrived 
                  ? `<span class="badge badge-success"><i class="fas fa-tint"></i> Water Arrived</span>`
                  : `<span class="badge badge-warning"><i class="fas fa-times-circle"></i> Water Not Arrived</span>`
                }
                ${r.pressure && r.pressure !== "None" ? `<span class="badge badge-light">Pressure: ${r.pressure}</span>` : ''}
              </div>
              ${r.notes ? `<p class="feed-notes">"${r.notes}"</p>` : ''}
            </div>
          </div>
        `).join("");
      }
    }
  },

  // ==========================================
  // SUPPLY RECORDS & ANALYTICS VIEW
  // ==========================================
  renderRecords() {
    const locality = window.storage.getActiveLocality();
    const locData = window.storage.getLocalityData(locality);
    if (!locData || !locData.history) return;

    // Summary KPIs
    const history = locData.history;
    const totalCycles = history.length;
    const avgDuration = (history.reduce((acc, h) => acc + h.duration, 0) / (totalCycles || 1)).toFixed(1);
    const onTimeCount = history.filter(h => h.status === "On Time").length;
    const reliabilityRate = totalCycles ? Math.round((onTimeCount / totalCycles) * 100) : 0;

    const avgDurEl = document.getElementById("recordAvgDuration");
    const relRateEl = document.getElementById("recordReliabilityRate");
    const totalCyclesEl = document.getElementById("recordTotalCycles");

    if (avgDurEl) avgDurEl.textContent = `${avgDuration} hrs`;
    if (relRateEl) relRateEl.textContent = `${reliabilityRate}%`;
    if (totalCyclesEl) totalCyclesEl.textContent = `${totalCycles} cycles`;

    // Render Table
    const tableBody = document.getElementById("recordsTableBody");
    if (tableBody) {
      tableBody.innerHTML = history.map(h => `
        <tr>
          <td><strong>${formatDisplayDate(h.date)}</strong></td>
          <td>${h.expected}</td>
          <td><strong>${h.actual}</strong></td>
          <td><span class="badge badge-light">${h.duration} hrs</span></td>
          <td>
            <span class="status-pill status-${h.status.toLowerCase().replace(' ', '-')}">
              ${h.status} (${h.variance})
            </span>
          </td>
        </tr>
      `).join("");
    }

    // Render Charts
    renderSupplyCharts(locality);
  },

  // ==========================================
  // CONTACT & FEEDBACK FORMS
  // ==========================================
  bindContactAndFeedback() {
    // Contact Form Submit
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const locality = document.getElementById("contactLocalitySelect").value;
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
          this.showToast("Incomplete Form", "Please fill in all required fields.", "error");
          return;
        }

        window.storage.saveContactSubmission({ name, email, locality, subject, message });
        contactForm.reset();
        this.showToast("Message Received", `Thank you ${name}! We have logged ticket WW-HYD-${Math.floor(1000 + Math.random() * 9000)}.`, "success");
      });
    }

    // Feedback Form Rating Stars
    let selectedRating = 5;
    document.querySelectorAll(".star-rating i").forEach(star => {
      star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-rating"));
        document.querySelectorAll(".star-rating i").forEach(s => {
          const r = parseInt(s.getAttribute("data-rating"));
          if (r <= selectedRating) {
            s.classList.remove("far");
            s.classList.add("fas");
          } else {
            s.classList.remove("fas");
            s.classList.add("far");
          }
        });
      });
    });

    // Feedback Form Submit
    const feedbackForm = document.getElementById("feedbackForm");
    if (feedbackForm) {
      feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("fbName").value.trim();
        const email = document.getElementById("fbEmail").value.trim();
        const locality = document.getElementById("fbLocality").value;
        const category = document.getElementById("fbCategory").value;
        const feedback = document.getElementById("fbComments").value.trim();

        if (!feedback) {
          this.showToast("Feedback Needed", "Please provide your comments or suggestions.", "warning");
          return;
        }

        window.storage.saveFeedbackSubmission({ name, email, locality, category, rating: selectedRating, feedback });
        feedbackForm.reset();
        this.showToast("Feedback Recorded", "Thank you for helping refine the WaterWatch prototype!", "success");
      });
    }
  },

  // ==========================================
  // AUTHENTICATION MODAL & PROFILE
  // ==========================================
  bindAuthEvents() {
    // Open auth modal button
    const openAuthBtns = document.querySelectorAll(".btn-open-auth");
    openAuthBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal("authModal");
      });
    });

    // Modal switch between Sign In and Sign Up tabs
    const tabSignIn = document.getElementById("authTabSignIn");
    const tabSignUp = document.getElementById("authTabSignUp");
    const formSignIn = document.getElementById("authFormSignIn");
    const formSignUp = document.getElementById("authFormSignUp");

    if (tabSignIn && tabSignUp) {
      tabSignIn.addEventListener("click", () => {
        tabSignIn.classList.add("active");
        tabSignUp.classList.remove("active");
        if (formSignIn) formSignIn.classList.remove("hidden");
        if (formSignUp) formSignUp.classList.add("hidden");
      });

      tabSignUp.addEventListener("click", () => {
        tabSignUp.classList.add("active");
        tabSignIn.classList.remove("active");
        if (formSignUp) formSignUp.classList.remove("hidden");
        if (formSignIn) formSignIn.classList.add("hidden");
      });
    }

    // Sign In Form submit
    if (formSignIn) {
      formSignIn.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const submitBtn = formSignIn.querySelector("button[type='submit']");

        try {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Signing in...`;
          await window.firebaseService.signInWithEmailAndPassword(email, password);
          this.closeModal("authModal");
          this.showToast("Welcome Back", "Signed in successfully.", "success");
        } catch (err) {
          this.showToast("Login Failed", err.message, "error");
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Sign In`;
        }
      });
    }

    // Sign Up Form submit
    if (formSignUp) {
      formSignUp.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const locality = document.getElementById("authLocalitySelect").value;
        const submitBtn = formSignUp.querySelector("button[type='submit']");

        try {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Registering...`;
          await window.firebaseService.createUserWithEmailAndPassword(name, email, password, locality);
          this.closeModal("authModal");
          this.showToast("Account Created", `Welcome to WaterWatch, ${name}!`, "success");
        } catch (err) {
          this.showToast("Registration Error", err.message, "error");
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Create Account`;
        }
      });
    }

    // User profile menu logout button
    const logoutBtn = document.getElementById("btnLogout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.firebaseService.signOut();
        this.showToast("Signed Out", "You have been logged out.", "info");
      });
    }
  },

  updateAuthUI(user) {
    const authBtnPill = document.getElementById("navAuthPill");
    const userChip = document.getElementById("navUserChip");
    const userNameEl = document.getElementById("navUserName");
    const adminNavBtn = document.getElementById("navAdminControlBtn");

    const isAdmin = Boolean(user && user.isLoggedIn && (user.role === "admin" || user.email.toLowerCase().includes("admin@")));

    if (adminNavBtn) {
      if (isAdmin) {
        adminNavBtn.classList.remove("hidden");
      } else {
        adminNavBtn.classList.add("hidden");
      }
    }

    if (user && user.isLoggedIn) {
      if (authBtnPill) authBtnPill.classList.add("hidden");
      if (userChip) userChip.classList.remove("hidden");
      if (userNameEl) {
        userNameEl.innerHTML = isAdmin 
          ? `<span class="badge badge-warning text-xs mr-1">ADMIN</span> ${user.name}`
          : user.name;
      }
    } else {
      if (authBtnPill) authBtnPill.classList.remove("hidden");
      if (userChip) userChip.classList.add("hidden");
    }

    // If user locality differs, sync it
    if (user && user.locality && user.locality !== window.storage.getActiveLocality()) {
      window.storage.setActiveLocality(user.locality);
    }
  },

  // ==========================================
  // SIMULATE ALERT MODAL (IDEATHON DEMO TOOL)
  // ==========================================
  bindSimulateAlertModal() {
    const openBtn = document.getElementById("btnOpenSimModal");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        this.openModal("simulateAlertModal");
      });
    }

    const triggerBtn = document.getElementById("btnTriggerSimAlert");
    if (triggerBtn) {
      triggerBtn.addEventListener("click", () => {
        const locality = document.getElementById("simLocalitySelect").value;
        const type = document.getElementById("simAlertType").value;
        const title = document.getElementById("simAlertTitle").value.trim() || "Water Supply Update";
        const message = document.getElementById("simAlertMessage").value.trim() || "Simulation notification dispatched to community.";

        window.storage.addNotification(locality, {
          type: type,
          title: title,
          message: message
        });

        // Try native notification if granted
        window.firebaseService.sendBrowserNotification(title, { body: message });

        this.closeModal("simulateAlertModal");
        this.showToast("Alert Broadcasted", `Simulated alert sent for ${locality}!`, "success");
      });
    }
  },

  // ==========================================
  // CUSTOM LOCALITY MODAL
  // ==========================================
  bindCustomLocalityModal() {
    const form = document.getElementById("customLocalityForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("customLocalityInput");
        const val = input.value.trim();

        if (!val) {
          this.showToast("Locality Required", "Please enter a locality name.", "error");
          return;
        }

        const success = window.storage.addCustomLocality(val);
        if (success) {
          this.closeModal("customLocalityModal");
          input.value = "";
          window.storage.setActiveLocality(val);
          this.showToast("Locality Added", `Added "${val}, Hyderabad" to WaterWatch!`, "success");
        } else {
          this.showToast("Already Exists", `Locality "${val}" is already available in the list.`, "warning");
        }
      });
    }
  },

  // ==========================================
  // MODAL & TOAST HELPERS
  // ==========================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  },

  showToast(title, message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-card toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="${type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-exclamation-circle' : type === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-info-circle'}"></i>
      </div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  },

  navigateTo(viewName) {
    window.location.hash = viewName;
  }
};
