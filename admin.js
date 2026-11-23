/**
 * WaterWatch - Professional Administrator Controller & Central Command
 * Manages restricted admin login, schedule manipulation, emergency broadcasts,
 * community moderation, locality directory, and system telemetry.
 */

const AdminController = {
  activeAdminTab: "overview",

  init() {
    this.bindAdminAuth();
    this.bindAdminTabs();
    this.bindScheduleManagement();
    this.bindAlertDispatcher();
    this.bindReportModeration();
    this.bindLocalityManagement();
    this.bindSystemSettings();

    // Listen to storage events to re-render admin views
    window.addEventListener("dataUpdated", () => {
      if (window.storage.isAdminLoggedIn()) {
        this.renderAllAdminData();
      }
    });

    window.addEventListener("localitiesListChanged", () => {
      if (window.storage.isAdminLoggedIn()) {
        this.renderAllAdminData();
      }
    });
  },

  // Check route guard
  checkGuard(route) {
    const isAdmin = window.storage.isAdminLoggedIn();
    if (route === "admin-panel" && !isAdmin) {
      window.location.hash = "admin-login";
      App.showToast("Restricted Access", "Administrator credentials required to access Central Command.", "warning");
      return false;
    }
    if (route === "admin-login" && isAdmin) {
      window.location.hash = "admin-panel";
      return false;
    }
    return true;
  },

  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================
  bindAdminAuth() {
    // Admin login form submit
    const adminLoginForm = document.getElementById("adminLoginForm");
    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("adminEmailInput").value.trim();
        const password = document.getElementById("adminPasswordInput").value;
        const submitBtn = document.getElementById("btnAdminLoginSubmit");

        try {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Authenticating with Firebase...`;

          const res = await window.firebaseService.signInWithEmailAndPassword(email, password);
          const user = window.storage.getUser();

          if (!user || user.role !== "admin") {
            throw new Error("This account does not have Administrator privileges. Please use an official admin account.");
          }

          App.showToast("Admin Access Granted", "Welcome to WaterWatch Central Command.", "success");
          window.location.hash = "admin-panel";
        } catch (err) {
          App.showToast("Admin Login Failed", err.message, "error");
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fas fa-shield-alt"></i> Access Central Command`;
        }
      });
    }

    // Quick Fill Demo Admin Button
    const quickFillBtn = document.getElementById("btnQuickFillAdmin");
    if (quickFillBtn) {
      quickFillBtn.addEventListener("click", () => {
        const emailInput = document.getElementById("adminEmailInput");
        const passwordInput = document.getElementById("adminPasswordInput");
        if (emailInput) emailInput.value = "admin@waterwatch.org";
        if (passwordInput) passwordInput.value = "AdminWaterWatch2026!";
        App.showToast("Admin Credentials Filled", "Credentials ready. Click 'Access Central Command' to log in.", "info");
      });
    }

    // Admin Logout
    const adminLogoutBtn = document.getElementById("btnAdminLogout");
    if (adminLogoutBtn) {
      adminLogoutBtn.addEventListener("click", async () => {
        await window.firebaseService.signOut();
        App.showToast("Signed Out", "Administrator logged out successfully.", "info");
        window.location.hash = "home";
      });
    }
  },

  // ==========================================
  // ADMIN TABS NAVIGATION
  // ==========================================
  bindAdminTabs() {
    document.querySelectorAll(".admin-nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetTab = item.getAttribute("data-admin-tab");
        this.switchTab(targetTab);
      });
    });
  },

  switchTab(tabId) {
    this.activeAdminTab = tabId;

    document.querySelectorAll(".admin-nav-item").forEach(i => {
      if (i.getAttribute("data-admin-tab") === tabId) {
        i.classList.add("active");
      } else {
        i.classList.remove("active");
      }
    });

    document.querySelectorAll(".admin-tab-pane").forEach(pane => {
      if (pane.id === `adminTabPane-${tabId}`) {
        pane.classList.remove("hidden");
      } else {
        pane.classList.add("hidden");
      }
    });

    this.renderTabContent(tabId);
  },

  renderAllAdminData() {
    this.renderOverviewTab();
    this.renderSchedulesTab();
    this.renderAlertsTab();
    this.renderReportsTab();
    this.renderLocalitiesTab();
    this.renderSystemTab();
  },

  renderTabContent(tabId) {
    switch (tabId) {
      case "overview": this.renderOverviewTab(); break;
      case "schedules": this.renderSchedulesTab(); break;
      case "alerts": this.renderAlertsTab(); break;
      case "reports": this.renderReportsTab(); break;
      case "localities": this.renderLocalitiesTab(); break;
      case "system":
      case "firebase": this.renderSystemTab(); break;
    }
  },

  // ==========================================
  // TAB 1: OVERVIEW & COMMAND METRICS
  // ==========================================
  renderOverviewTab() {
    const localities = window.storage.getAllLocalities();
    const schedules = window.storage.getAllSchedules();
    const reports = window.storage.getAllCommunityReports();
    const settings = window.storage.getSystemSettings();

    // KPIs
    const elLocCount = document.getElementById("adminKpiLocalities");
    const elSchCount = document.getElementById("adminKpiSchedules");
    const elRepCount = document.getElementById("adminKpiReports");
    const elSysStatus = document.getElementById("adminKpiSystemStatus");

    if (elLocCount) elLocCount.textContent = localities.length;
    if (elSchCount) elSchCount.textContent = schedules.length;
    if (elRepCount) elRepCount.textContent = reports.length;
    if (elSysStatus) {
      elSysStatus.textContent = settings.maintenanceMode ? "Maintenance" : "100% Operational";
      elSysStatus.className = settings.maintenanceMode ? "text-warning font-bold" : "text-success font-bold";
    }

    // Quick Locality Status Control Grid
    const quickGrid = document.getElementById("adminQuickStatusGrid");
    if (quickGrid) {
      const allData = window.storage.getLocalityData();
      quickGrid.innerHTML = localities.slice(0, 6).map(loc => {
        const d = allData[loc] || {};
        const status = d.currentStatus || "Scheduled";
        return `
          <div class="admin-quick-loc-card">
            <div class="flex items-center justify-between mb-2">
              <strong>${loc}</strong>
              <span class="status-pill status-${status.toLowerCase()}">${status}</span>
            </div>
            <div class="text-xs text-muted mb-2">${d.zone || "Hyderabad"}</div>
            <div class="flex gap-1">
              <button class="btn btn-xs btn-outline flex-1" onclick="AdminController.quickSetStatus('${loc}', 'Scheduled')">Scheduled</button>
              <button class="btn btn-xs btn-warning flex-1" onclick="AdminController.quickSetStatus('${loc}', 'Delayed')">Delayed</button>
              <button class="btn btn-xs btn-success flex-1" onclick="AdminController.quickSetStatus('${loc}', 'Completed')">Completed</button>
            </div>
          </div>
        `;
      }).join("");
    }
  },

  quickSetStatus(locality, status) {
    const note = prompt(`Enter status note for ${locality}:`, `Municipal valve status marked as ${status} by Water Officer.`);
    if (note !== null) {
      window.storage.adminSetLocalityStatus(locality, status, note);
      App.showToast("Status Updated", `${locality} status set to ${status}.`, "success");
      this.renderAllAdminData();
    }
  },

  // ==========================================
  // TAB 2: SCHEDULE MANAGER
  // ==========================================
  bindScheduleManagement() {
    // Schedule form submit
    const form = document.getElementById("adminAddScheduleForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const locality = document.getElementById("adminSchLocality").value;
        const date = document.getElementById("adminSchDate").value;
        const startTime = document.getElementById("adminSchStartTime").value;
        const endTime = document.getElementById("adminSchEndTime").value;
        const status = document.getElementById("adminSchStatus").value;
        const duration = document.getElementById("adminSchDuration").value || "2h 30m";
        const note = document.getElementById("adminSchNote").value.trim();

        window.storage.adminAddSchedule(locality, {
          date, startTime, endTime, status, duration, note
        });

        App.showToast("Schedule Created", `Published new supply schedule for ${locality}!`, "success");
        form.reset();
        this.renderSchedulesTab();
        this.renderOverviewTab();
      });
    }

    // Schedule filter input
    const filterInput = document.getElementById("adminSchSearchInput");
    if (filterInput) {
      filterInput.addEventListener("input", () => this.renderSchedulesTab());
    }
  },

  renderSchedulesTab() {
    const dateInput = document.getElementById("adminSchDate");
    if (dateInput && !dateInput.value) {
      dateInput.value = getRelativeDateStr(1);
    }

    const tableBody = document.getElementById("adminSchedulesTableBody");
    if (!tableBody) return;

    const schedules = window.storage.getAllSchedules();
    const searchFilter = (document.getElementById("adminSchSearchInput")?.value || "").toLowerCase();

    let filtered = schedules;
    if (searchFilter) {
      filtered = schedules.filter(s => 
        s.locality.toLowerCase().includes(searchFilter) || 
        s.status.toLowerCase().includes(searchFilter) ||
        s.date.includes(searchFilter)
      );
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No schedules found matching criteria.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(s => `
      <tr>
        <td><strong>${s.locality}</strong></td>
        <td>${formatDisplayDate(s.date)}</td>
        <td><span class="time-chip"><i class="far fa-clock"></i> ${s.startTime} - ${s.endTime}</span></td>
        <td><span class="status-pill status-${s.status.toLowerCase()}">${s.status}</span></td>
        <td><span class="text-xs text-muted">${s.updatedTime || 'Recently'}</span></td>
        <td class="text-xs">${s.note || '-'}</td>
        <td>
          <div class="flex gap-1">
            <button class="btn btn-xs btn-outline" onclick="AdminController.promptEditSchedule('${s.locality}', '${s.id}', '${s.status}', '${s.startTime}', '${s.endTime}')" title="Quick Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-xs btn-danger" onclick="AdminController.deleteScheduleConfirm('${s.locality}', '${s.id}')" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  },

  promptEditSchedule(locality, scheduleId, currentStatus, start, end) {
    const newStatus = prompt(`Update Status for ${locality} (Scheduled, Delayed, Updated, Completed):`, currentStatus);
    if (!newStatus) return;

    const newStart = prompt("Start Time (e.g. 06:30 AM):", start) || start;
    const newEnd = prompt("End Time (e.g. 09:00 AM):", end) || end;
    const newNote = prompt("Operator Note / Change reason:", "Timetable adjusted by central municipal water division.");

    window.storage.adminUpdateSchedule(locality, scheduleId, {
      status: newStatus.trim(),
      startTime: newStart.trim(),
      endTime: newEnd.trim(),
      note: newNote || ""
    });

    App.showToast("Schedule Updated", `Timings and status updated for ${locality}.`, "success");
    this.renderSchedulesTab();
    this.renderOverviewTab();
  },

  deleteScheduleConfirm(locality, scheduleId) {
    if (confirm(`Are you sure you want to delete this schedule record for ${locality}?`)) {
      window.storage.adminDeleteSchedule(locality, scheduleId);
      App.showToast("Deleted", "Schedule removed.", "info");
      this.renderSchedulesTab();
      this.renderOverviewTab();
    }
  },

  // ==========================================
  // TAB 3: EMERGENCY & ALERTS DISPATCHER
  // ==========================================
  bindAlertDispatcher() {
    const form = document.getElementById("adminDispatchAlertForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = document.getElementById("adminAlertTargetLocality").value;
        const type = document.getElementById("adminAlertType").value;
        const title = document.getElementById("adminAlertTitle").value.trim();
        const message = document.getElementById("adminAlertMessage").value.trim();

        if (target === "__ALL__") {
          const count = window.storage.adminBroadcastAll({ type, title, message });
          App.showToast("Broadcast Dispatched", `Emergency alert broadcasted to all ${count} Hyderabad localities!`, "success");
        } else {
          window.storage.addNotification(target, { type, title, message });
          App.showToast("Alert Dispatched", `Notification sent to ${target}!`, "success");
        }

        form.reset();
        this.renderAlertsTab();
      });
    }
  },

  renderAlertsTab() {
    const listContainer = document.getElementById("adminActiveAlertsList");
    if (!listContainer) return;

    const localities = window.storage.getAllLocalities();
    const allAlerts = [];
    localities.forEach(loc => {
      const alerts = window.storage.getNotifications(loc);
      alerts.forEach(a => allAlerts.push({ ...a, locality: loc }));
    });

    if (allAlerts.length === 0) {
      listContainer.innerHTML = `<div class="empty-state">No active notifications or alerts deployed.</div>`;
      return;
    }

    listContainer.innerHTML = allAlerts.map(a => `
      <div class="admin-alert-row flex items-center justify-between p-3 border-b border-slate-100">
        <div class="flex items-start gap-3">
          <div class="alert-preview-icon"><i class="${App.getAlertIcon(a.type)}"></i></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="badge badge-light"><strong>${a.locality}</strong></span>
              <span class="notif-category-tag tag-${a.type}">${a.type.toUpperCase()}</span>
              <span class="text-xs text-muted">${a.timestamp}</span>
            </div>
            <strong class="text-sm block mt-1">${a.title}</strong>
            <p class="text-xs text-slate-600">${a.message}</p>
          </div>
        </div>
        <button class="btn btn-xs btn-danger" onclick="AdminController.deleteAlertConfirm('${a.locality}', '${a.id}')" title="Revoke Alert">
          <i class="fas fa-trash-alt"></i> Revoke
        </button>
      </div>
    `).join("");
  },

  deleteAlertConfirm(locality, alertId) {
    if (confirm("Revoke this alert from the public feed?")) {
      window.storage.deleteAlert(locality, alertId);
      App.showToast("Revoked", "Alert retracted.", "info");
      this.renderAlertsTab();
    }
  },

  // ==========================================
  // TAB 4: COMMUNITY REPORTS MODERATION
  // ==========================================
  bindReportModeration() {
    //
  },

  renderReportsTab() {
    const tableBody = document.getElementById("adminReportsTableBody");
    if (!tableBody) return;

    const reports = window.storage.getAllCommunityReports();

    if (reports.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No citizen reports recorded yet.</td></tr>`;
      return;
    }

    tableBody.innerHTML = reports.map(r => `
      <tr>
        <td><strong>${r.locality}</strong></td>
        <td>${r.user}</td>
        <td>
          ${r.arrived 
            ? `<span class="badge badge-success"><i class="fas fa-check"></i> Arrived</span>`
            : `<span class="badge badge-warning"><i class="fas fa-times"></i> Dry</span>`
          }
        </td>
        <td><span class="badge badge-light">${r.pressure || "Normal"}</span></td>
        <td><span class="text-xs text-slate-600">${r.notes || "-"}</span></td>
        <td>
          <button class="btn btn-xs btn-danger" onclick="AdminController.deleteReportConfirm('${r.locality}', '${r.id}')" title="Delete Spam / False Report">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `).join("");
  },

  deleteReportConfirm(locality, reportId) {
    if (confirm("Delete this citizen report? Community consensus percentage will automatically re-calibrate.")) {
      window.storage.adminDeleteReport(locality, reportId);
      App.showToast("Deleted", "Report removed from community feed.", "info");
      this.renderReportsTab();
      this.renderOverviewTab();
    }
  },

  // ==========================================
  // TAB 5: LOCALITIES MANAGEMENT
  // ==========================================
  bindLocalityManagement() {
    const form = document.getElementById("adminAddLocalityForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("adminNewLocName").value.trim();
        const zone = document.getElementById("adminNewLocZone").value.trim();
        const pumping = document.getElementById("adminNewLocPumping").value.trim();

        if (!name) return;

        const ok = window.storage.addCustomLocality(name, zone, pumping);
        if (ok) {
          App.showToast("Locality Added", `Added ${name} to Hyderabad Water Network.`, "success");
          form.reset();
          this.renderLocalitiesTab();
          this.renderOverviewTab();
        } else {
          App.showToast("Already Exists", `Locality "${name}" is already registered.`, "warning");
        }
      });
    }
  },

  renderLocalitiesTab() {
    const listContainer = document.getElementById("adminLocalitiesGrid");
    if (!listContainer) return;

    const localities = window.storage.getAllLocalities();
    const allData = window.storage.getLocalityData();

    listContainer.innerHTML = localities.map(loc => {
      const d = allData[loc] || {};
      return `
        <div class="dash-card p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-slate-900">${loc}</h4>
            <span class="status-pill status-${(d.currentStatus || 'Scheduled').toLowerCase()}">${d.currentStatus || 'Scheduled'}</span>
          </div>
          <div class="text-xs text-slate-500 mb-1"><i class="fas fa-map-pin text-primary"></i> ${d.zone || "Municipal Zone"}</div>
          <div class="text-xs text-slate-600 mb-3"><i class="fas fa-industry text-slate-400"></i> ${d.pumpingStation || "Sub-divisional GLSR"}</div>
          <div class="flex gap-2">
            <button class="btn btn-xs btn-outline flex-1" onclick="App.navigateTo('dashboard'); window.storage.setActiveLocality('${loc}');">View Public Page</button>
            <button class="btn btn-xs btn-danger" onclick="AdminController.deleteLocalityConfirm('${loc}')"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join("");
  },

  deleteLocalityConfirm(loc) {
    if (confirm(`Remove locality "${loc}" from the system?`)) {
      window.storage.deleteLocality(loc);
      App.showToast("Removed", `Removed ${loc} from registry.`, "info");
      this.renderLocalitiesTab();
      this.renderOverviewTab();
    }
  },

  // ==========================================
  // TAB 6: SYSTEM & SECURITY TELEMETRY
  // ==========================================
  bindSystemSettings() {
    // Toggle Maintenance Mode
    const maintenanceToggle = document.getElementById("adminToggleMaintenance");
    if (maintenanceToggle) {
      maintenanceToggle.addEventListener("change", (e) => {
        const isMaintenance = e.target.checked;
        const msgInput = document.getElementById("adminMaintenanceMsg");
        const msg = msgInput ? msgInput.value.trim() : "";
        window.storage.setSystemSettings({ maintenanceMode: isMaintenance, maintenanceMessage: msg });
        App.showToast("Settings Updated", `Public Maintenance Notice is now ${isMaintenance ? 'ENABLED' : 'DISABLED'}.`, isMaintenance ? "warning" : "success");
        this.renderOverviewTab();
      });
    }
  },

  renderSystemTab() {
    const statusPill = document.getElementById("adminFirebaseStatusBadge");
    const modeText = document.getElementById("adminFirebaseModeText");

    if (statusPill && modeText) {
      const mode = window.firebaseService.getMode();
      modeText.textContent = mode;
      statusPill.textContent = "CONNECTED (LIVE FIREBASE)";
      statusPill.className = "status-pill status-completed";
    }

    // Maintenance toggle sync
    const settings = window.storage.getSystemSettings();
    const toggle = document.getElementById("adminToggleMaintenance");
    const msgInput = document.getElementById("adminMaintenanceMsg");
    if (toggle) toggle.checked = Boolean(settings.maintenanceMode);
    if (msgInput && settings.maintenanceMessage) msgInput.value = settings.maintenanceMessage;
  }
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  AdminController.init();
});
