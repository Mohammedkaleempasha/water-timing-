/**
 * WaterWatch - LocalStorage & State Persistence Manager
 * Manages active locality, demo user sessions, reports, notifications, submission locks,
 * and comprehensive Administrator Control Center operations.
 */

const STORAGE_KEYS = {
  ACTIVE_LOCALITY: "waterwatch_active_locality",
  CUSTOM_LOCALITIES: "waterwatch_custom_localities",
  AUTH_USER: "waterwatch_auth_user",
  LOCALITY_DATA: "waterwatch_locality_data",
  NOTIFICATIONS: "waterwatch_notifications",
  USER_CONFIRMATIONS: "waterwatch_user_confirmations",
  CONTACT_SUBMISSIONS: "waterwatch_contact_submissions",
  FEEDBACK_SUBMISSIONS: "waterwatch_feedback_submissions",
  SYSTEM_SETTINGS: "waterwatch_system_settings"
};

class StorageManager {
  constructor() {
    this.initDefaultData();
  }

  initDefaultData() {
    // 1. Active Locality
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_LOCALITY)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCALITY, "Kukatpally");
    }

    // 2. Custom Localities
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_LOCALITIES)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LOCALITIES, JSON.stringify([]));
    }

    // 3. Locality Data
    if (!localStorage.getItem(STORAGE_KEYS.LOCALITY_DATA)) {
      localStorage.setItem(STORAGE_KEYS.LOCALITY_DATA, JSON.stringify(INITIAL_LOCALITY_DATA));
    }

    // 4. Default User state: Unauthenticated by default
    // Requires citizen or officer login/registration to view application pages
    if (localStorage.getItem(STORAGE_KEYS.AUTH_USER)) {
      try {
        const u = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH_USER));
        // If legacy auto-login session exists without explicit login, clear it
        if (u && u.uid === "usr_resident_demo" && !sessionStorage.getItem("waterwatch_explicit_login")) {
          localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        }
      } catch (e) {}
    }

    // 5. User confirmations (empty lock dictionary)
    if (!localStorage.getItem(STORAGE_KEYS.USER_CONFIRMATIONS)) {
      localStorage.setItem(STORAGE_KEYS.USER_CONFIRMATIONS, JSON.stringify({}));
    }

    // 6. System Settings
    if (!localStorage.getItem(STORAGE_KEYS.SYSTEM_SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SYSTEM_SETTINGS, JSON.stringify({
        maintenanceMode: false,
        maintenanceMessage: "Scheduled municipal water telemetry upgrade in progress. Normal service resumes shortly.",
        allowPublicRegistrations: true,
        version: "2.1.0-ideathon"
      }));
    }
  }

  // Locality Getters & Setters
  getActiveLocality() {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_LOCALITY) || "Kukatpally";
  }

  setActiveLocality(locality) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCALITY, locality);
    const user = this.getUser();
    if (user && user.role !== "admin") {
      user.locality = locality;
      this.setUser(user);
    }
    window.dispatchEvent(new CustomEvent("localityChanged", { detail: { locality } }));
  }

  getAllLocalities() {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_LOCALITIES) || "[]");
    const merged = [...HYDERABAD_LOCALITIES, ...custom];
    return Array.from(new Set(merged));
  }

  addCustomLocality(localityName, zone = "Greater Hyderabad", pumpingStation = "") {
    if (!localityName) return false;
    const trimmed = localityName.trim();
    const list = this.getAllLocalities();
    if (list.map(l => l.toLowerCase()).includes(trimmed.toLowerCase())) {
      return false; // already exists
    }

    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_LOCALITIES) || "[]");
    custom.push(trimmed);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_LOCALITIES, JSON.stringify(custom));

    // Populate initial data
    const allData = this.getLocalityData();
    const newLocData = generateCustomLocalityData(trimmed);
    if (zone) newLocData.zone = zone;
    if (pumpingStation) newLocData.pumpingStation = pumpingStation;
    allData[trimmed] = newLocData;
    this.saveAllLocalityData(allData);

    window.dispatchEvent(new CustomEvent("localitiesListChanged", { detail: { locality: trimmed } }));
    return true;
  }

  deleteLocality(localityName) {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_LOCALITIES) || "[]");
    const updatedCustom = custom.filter(l => l.toLowerCase() !== localityName.toLowerCase());
    localStorage.setItem(STORAGE_KEYS.CUSTOM_LOCALITIES, JSON.stringify(updatedCustom));

    const allData = this.getLocalityData();
    delete allData[localityName];
    this.saveAllLocalityData(allData);

    if (this.getActiveLocality().toLowerCase() === localityName.toLowerCase()) {
      this.setActiveLocality("Kukatpally");
    }
    window.dispatchEvent(new CustomEvent("localitiesListChanged", { detail: { locality: localityName } }));
    return true;
  }

  // Locality Data Store
  getLocalityData(locality = null) {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCALITY_DATA);
    const data = raw ? JSON.parse(raw) : INITIAL_LOCALITY_DATA;
    if (locality) {
      if (!data[locality]) {
        data[locality] = generateCustomLocalityData(locality);
        this.saveAllLocalityData(data);
      }
      return data[locality];
    }
    return data;
  }

  saveAllLocalityData(allData) {
    localStorage.setItem(STORAGE_KEYS.LOCALITY_DATA, JSON.stringify(allData));
  }

  updateSingleLocality(locality, updatedFields) {
    const allData = this.getLocalityData();
    if (!allData[locality]) {
      allData[locality] = generateCustomLocalityData(locality);
    }
    allData[locality] = { ...allData[locality], ...updatedFields };
    this.saveAllLocalityData(allData);
    window.dispatchEvent(new CustomEvent("dataUpdated", { detail: { locality } }));
  }

  // User Auth & Admin Role Check
  getUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return raw ? JSON.parse(raw) : null;
  }

  setUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
    window.dispatchEvent(new CustomEvent("authChanged", { detail: { user } }));
  }

  isAdminLoggedIn() {
    const user = this.getUser();
    return Boolean(user && user.isLoggedIn && (user.role === "admin" || user.email.toLowerCase().includes("admin@")));
  }

  isUserLoggedIn() {
    const user = this.getUser();
    return Boolean(user && user.isLoggedIn);
  }

  logout() {
    try {
      sessionStorage.removeItem("waterwatch_explicit_login");
    } catch (e) {}
    this.setUser(null);
  }

  // Community Confirmations & Lockout check
  getUserConfirmation(locality) {
    const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_CONFIRMATIONS) || "{}");
    const today = new Date().toISOString().split("T")[0];
    const key = `${locality}_${today}`;
    return map[key] || null;
  }

  saveUserConfirmation(locality, confirmation) {
    const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_CONFIRMATIONS) || "{}");
    const today = new Date().toISOString().split("T")[0];
    const key = `${locality}_${today}`;
    map[key] = {
      ...confirmation,
      timestamp: new Date().toISOString(),
      date: today
    };
    localStorage.setItem(STORAGE_KEYS.USER_CONFIRMATIONS, JSON.stringify(map));

    // Update locality counts
    const locData = this.getLocalityData(locality);
    if (confirmation.arrived) {
      locData.communityConfirmation.yesCount += 1;
    } else {
      locData.communityConfirmation.noCount += 1;
    }
    locData.communityConfirmation.lastConfirmedAgo = "Just now";

    // Add to recent reports
    locData.recentReports.unshift({
      id: `rep-${Date.now()}`,
      user: confirmation.userName || "Verified Resident",
      locality: locality,
      time: "Just now",
      arrived: confirmation.arrived,
      pressure: confirmation.pressure || "Normal",
      notes: confirmation.notes || (confirmation.arrived ? "Water arrived at expected timing." : "No water yet.")
    });

    this.updateSingleLocality(locality, locData);
    return map[key];
  }

  // Notifications
  getNotifications(locality = null) {
    const targetLocality = locality || this.getActiveLocality();
    const locData = this.getLocalityData(targetLocality);
    return locData.alerts || [];
  }

  addNotification(locality, notification) {
    const locData = this.getLocalityData(locality);
    if (!locData.alerts) locData.alerts = [];
    const newAlert = {
      id: `alt-${Date.now()}`,
      timestamp: "Just now",
      read: false,
      ...notification
    };
    locData.alerts.unshift(newAlert);
    this.updateSingleLocality(locality, locData);
    window.dispatchEvent(new CustomEvent("newNotification", { detail: { alert: newAlert, locality } }));
    return newAlert;
  }

  deleteAlert(locality, alertId) {
    const locData = this.getLocalityData(locality);
    if (locData.alerts) {
      locData.alerts = locData.alerts.filter(a => a.id !== alertId);
      this.updateSingleLocality(locality, locData);
    }
  }

  markAllNotificationsRead(locality = null) {
    const target = locality || this.getActiveLocality();
    const locData = this.getLocalityData(target);
    if (locData.alerts) {
      locData.alerts.forEach(a => a.read = true);
      this.updateSingleLocality(target, locData);
    }
  }

  // ==========================================
  // ADMINISTRATOR CONTROL OPERATIONS
  // ==========================================

  // 1. Get flat list of all schedules across all localities
  getAllSchedules() {
    const allData = this.getLocalityData();
    const list = [];
    Object.keys(allData).forEach(loc => {
      const locObj = allData[loc];
      if (locObj.schedules) {
        locObj.schedules.forEach(s => {
          list.push({ ...s, locality: loc });
        });
      }
    });
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }

  // 2. Admin adds a new schedule for any locality
  adminAddSchedule(locality, scheduleData) {
    const locData = this.getLocalityData(locality);
    if (!locData.schedules) locData.schedules = [];

    const newId = `sch-${locality.substring(0, 3).toLowerCase()}-${Date.now().toString().slice(-4)}`;
    const newEntry = {
      id: newId,
      date: scheduleData.date,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      status: scheduleData.status || "Scheduled",
      updatedTime: "Today " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      note: scheduleData.note || "Scheduled via Admin Central Console."
    };

    locData.schedules.unshift(newEntry);

    // If new schedule is today or tomorrow, update nextSupply & status
    const today = getRelativeDateStr(0);
    const tomorrow = getRelativeDateStr(1);
    if (scheduleData.date === today || scheduleData.date === tomorrow) {
      locData.currentStatus = newEntry.status;
      locData.statusNote = newEntry.note;
      locData.nextSupply = {
        date: newEntry.date,
        startTime: newEntry.startTime,
        endTime: newEntry.endTime,
        duration: scheduleData.duration || "2h 30m",
        expectedPressure: scheduleData.pressure || "Normal",
        targetHoursFromNow: 4.5
      };
    }

    this.updateSingleLocality(locality, locData);

    // Also auto-dispatch an advance alert
    this.addNotification(locality, {
      type: newEntry.status === "Delayed" ? "delay" : "update",
      title: `Schedule Updated for ${locality}`,
      message: `Admin updated supply window to ${newEntry.startTime} - ${newEntry.endTime} (${newEntry.status}). ${newEntry.note}`
    });

    return newEntry;
  }

  // 3. Admin updates an existing schedule
  adminUpdateSchedule(locality, scheduleId, updatedFields) {
    const locData = this.getLocalityData(locality);
    if (!locData.schedules) return false;

    const item = locData.schedules.find(s => s.id === scheduleId);
    if (!item) return false;

    Object.assign(item, updatedFields);
    item.updatedTime = "Today " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Sync active locality status
    if (locData.nextSupply && locData.nextSupply.date === item.date) {
      if (updatedFields.status) locData.currentStatus = updatedFields.status;
      if (updatedFields.note) locData.statusNote = updatedFields.note;
      if (updatedFields.startTime) locData.nextSupply.startTime = updatedFields.startTime;
      if (updatedFields.endTime) locData.nextSupply.endTime = updatedFields.endTime;
    }

    this.updateSingleLocality(locality, locData);

    // Dispatch update notification
    this.addNotification(locality, {
      type: item.status === "Delayed" ? "delay" : "update",
      title: `Schedule Changed: ${locality}`,
      message: `Timing updated to ${item.startTime} - ${item.endTime}. Status: ${item.status}. ${item.note}`
    });

    return true;
  }

  // 4. Admin deletes a schedule
  adminDeleteSchedule(locality, scheduleId) {
    const locData = this.getLocalityData(locality);
    if (!locData.schedules) return false;
    locData.schedules = locData.schedules.filter(s => s.id !== scheduleId);
    this.updateSingleLocality(locality, locData);
    return true;
  }

  // 5. Admin updates status of any locality directly
  adminSetLocalityStatus(locality, status, note) {
    const locData = this.getLocalityData(locality);
    locData.currentStatus = status;
    if (note) locData.statusNote = note;
    this.updateSingleLocality(locality, locData);

    this.addNotification(locality, {
      type: status === "Delayed" ? "delay" : status === "Completed" ? "arrival" : "update",
      title: `Status Changed to ${status}`,
      message: `Water supply status in ${locality} is now marked as ${status}. ${note || ''}`
    });
  }

  // 6. Admin broadcasts emergency or citywide alert to ALL localities
  adminBroadcastAll(alertData) {
    const localities = this.getAllLocalities();
    localities.forEach(loc => {
      this.addNotification(loc, {
        type: alertData.type || "advance",
        title: alertData.title,
        message: alertData.message
      });
    });
    return localities.length;
  }

  // 7. Get flat list of all community reports for moderation
  getAllCommunityReports() {
    const allData = this.getLocalityData();
    const reports = [];
    Object.keys(allData).forEach(loc => {
      const locObj = allData[loc];
      if (locObj.recentReports) {
        locObj.recentReports.forEach(r => {
          reports.push({ ...r, locality: loc });
        });
      }
    });
    return reports;
  }

  // 8. Admin moderates / deletes a report
  adminDeleteReport(locality, reportId) {
    const locData = this.getLocalityData(locality);
    if (!locData.recentReports) return false;
    const initialLen = locData.recentReports.length;
    locData.recentReports = locData.recentReports.filter(r => r.id !== reportId);
    if (locData.recentReports.length < initialLen) {
      if (locData.communityConfirmation.yesCount > 0) locData.communityConfirmation.yesCount -= 1;
      this.updateSingleLocality(locality, locData);
      return true;
    }
    return false;
  }

  // 9. System settings & Maintenance mode
  getSystemSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SYSTEM_SETTINGS);
    return raw ? JSON.parse(raw) : { maintenanceMode: false };
  }

  setSystemSettings(settings) {
    const current = this.getSystemSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SYSTEM_SETTINGS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("systemSettingsChanged", { detail: { settings: updated } }));
    return updated;
  }

  // Submissions
  saveContactSubmission(payload) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS) || "[]");
    list.unshift({ ...payload, id: `cnt-${Date.now()}`, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, JSON.stringify(list));
  }

  saveFeedbackSubmission(payload) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK_SUBMISSIONS) || "[]");
    list.unshift({ ...payload, id: `fbk-${Date.now()}`, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, JSON.stringify(list));
  }

  getFeedbackSubmissions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK_SUBMISSIONS) || "[]");
  }

  // Reset demo
  resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_LOCALITY);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_LOCALITIES);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    localStorage.removeItem(STORAGE_KEYS.LOCALITY_DATA);
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIRMATIONS);
    localStorage.removeItem(STORAGE_KEYS.SYSTEM_SETTINGS);
    localStorage.removeItem("waterwatch_runtime_firebase_config");
    this.initDefaultData();
    window.location.reload();
  }
}

// Global instance
window.storage = new StorageManager();
