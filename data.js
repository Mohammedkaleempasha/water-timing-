/**
 * WaterWatch - Hyderabad Localities & Sample Mock Dataset
 * Note: Designed for Student Ideathon Prototype.
 * All schedules and reports are realistic simulated data.
 */

const HYDERABAD_LOCALITIES = [
  "Kukatpally",
  "Miyapur",
  "Ameerpet",
  "Dilsukhnagar",
  "LB Nagar",
  "Gachibowli",
  "Madhapur",
  "Mehdipatnam",
  "Uppal",
  "Secunderabad",
  "Begumpet",
  "Banjara Hills"
];

// Generates upcoming dates relative to current date
function getRelativeDateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function formatDisplayDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

// Sample initial data for Hyderabad localities
const INITIAL_LOCALITY_DATA = {
  "Kukatpally": {
    zone: "North Zone (Circle 24)",
    pumpingStation: "Hydernagar GLSR",
    currentStatus: "Scheduled", // Scheduled, Delayed, Updated, Completed, In Progress
    statusNote: "Normal scheduled supply via Reservoir B",
    nextSupply: {
      date: getRelativeDateStr(1), // Tomorrow
      startTime: "06:00 AM",
      endTime: "08:30 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 9.5
    },
    communityConfirmation: {
      yesCount: 38,
      noCount: 4,
      totalExpected: 48,
      lastConfirmedAgo: "12 mins ago",
      currentPressureReport: "Medium to High"
    },
    recentReports: [
      { id: "rep-101", user: "Srikanth R.", locality: "Kukatpally Housing Board Phase 4", time: "18 mins ago", arrived: true, pressure: "Good", notes: "Sump filled without booster motor." },
      { id: "rep-102", user: "Lakshmi Narayana", locality: "Vivekananda Nagar", time: "34 mins ago", arrived: true, pressure: "Moderate", notes: "Water clear and adequate." },
      { id: "rep-103", user: "Priya Varma", locality: "KPHB Colony", time: "1 hour ago", arrived: false, pressure: "None", notes: "Awaiting municipal line release." }
    ],
    schedules: [
      { id: "sch-kpk-1", date: getRelativeDateStr(0), startTime: "06:00 AM", endTime: "08:30 AM", status: "Completed", updatedTime: "Today 08:35 AM", note: "Supplied successfully on time." },
      { id: "sch-kpk-2", date: getRelativeDateStr(1), startTime: "06:00 AM", endTime: "08:30 AM", status: "Scheduled", updatedTime: "Today 06:00 PM", note: "Standard alternate day cycle." },
      { id: "sch-kpk-3", date: getRelativeDateStr(3), startTime: "06:00 AM", endTime: "08:30 AM", status: "Scheduled", updatedTime: "Today 02:00 PM", note: "Subject to line pressure." },
      { id: "sch-kpk-4", date: getRelativeDateStr(5), startTime: "06:00 AM", endTime: "08:30 AM", status: "Scheduled", updatedTime: "Yesterday 05:00 PM", note: "Regular cycle." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "06:00 - 08:30", actual: "06:05 - 08:35", duration: 2.5, status: "On Time", variance: "+5m" },
      { date: getRelativeDateStr(-3), expected: "06:00 - 08:30", actual: "06:30 - 08:45", duration: 2.25, status: "Delayed", variance: "+30m" },
      { date: getRelativeDateStr(-5), expected: "06:00 - 08:30", actual: "06:00 - 08:30", duration: 2.5, status: "On Time", variance: "0m" },
      { date: getRelativeDateStr(-7), expected: "06:00 - 08:30", actual: "06:15 - 08:40", duration: 2.4, status: "On Time", variance: "+15m" },
      { date: getRelativeDateStr(-9), expected: "06:00 - 08:30", actual: "06:55 - 09:10", duration: 2.25, status: "Delayed", variance: "+55m" },
      { date: getRelativeDateStr(-11), expected: "06:00 - 08:30", actual: "06:00 - 08:30", duration: 2.5, status: "On Time", variance: "0m" }
    ],
    alerts: [
      { id: "alt-1", type: "advance", title: "Upcoming Water Supply Cycle", message: "Water supply is expected in Kukatpally tomorrow between 06:00 AM and 08:30 AM.", timestamp: "2 hours ago", read: false },
      { id: "alt-2", type: "update", title: "Feeder Line Inspection Completed", message: "Hydernagar reservoir valves calibrated. Normal line pressure anticipated for tomorrow's morning cycle.", timestamp: "6 hours ago", read: false }
    ]
  },

  "Miyapur": {
    zone: "West Zone (Serilingampally)",
    pumpingStation: "Miyapur Allwyn Junction GLSR",
    currentStatus: "Delayed",
    statusNote: "Minor pump valve repair in feeder line delayed supply by 40 minutes.",
    nextSupply: {
      date: getRelativeDateStr(0), // Today evening
      startTime: "05:30 PM",
      endTime: "07:45 PM",
      duration: "2h 15m",
      expectedPressure: "Moderate",
      targetHoursFromNow: 3.2
    },
    communityConfirmation: {
      yesCount: 22,
      noCount: 9,
      totalExpected: 35,
      lastConfirmedAgo: "5 mins ago",
      currentPressureReport: "Building Up"
    },
    recentReports: [
      { id: "rep-201", user: "Harish Kumar", locality: "Allwyn Colony Phase 2", time: "8 mins ago", arrived: true, pressure: "Moderate", notes: "Water started flowing 15 mins late." },
      { id: "rep-202", user: "Ananya Reddy", locality: "Mayuri Nagar", time: "25 mins ago", arrived: false, pressure: "None", notes: "Taps still dry, waiting." },
      { id: "rep-203", user: "Mohammed Zafar", locality: "Miyapur Metro Enclave", time: "40 mins ago", arrived: false, pressure: "Low", notes: "Air hissing in pipeline." }
    ],
    schedules: [
      { id: "sch-miy-1", date: getRelativeDateStr(0), startTime: "05:30 PM", endTime: "07:45 PM", status: "Delayed", updatedTime: "Today 04:45 PM", note: "Rescheduled from 04:50 PM due to repair." },
      { id: "sch-miy-2", date: getRelativeDateStr(2), startTime: "05:00 PM", endTime: "07:30 PM", status: "Scheduled", updatedTime: "Today 10:00 AM", note: "Regular evening cycle." },
      { id: "sch-miy-3", date: getRelativeDateStr(4), startTime: "05:00 PM", endTime: "07:30 PM", status: "Scheduled", updatedTime: "Yesterday 06:00 PM", note: "Scheduled alternate day." }
    ],
    history: [
      { date: getRelativeDateStr(-2), expected: "05:00 - 07:30", actual: "05:40 - 08:00", duration: 2.3, status: "Delayed", variance: "+40m" },
      { date: getRelativeDateStr(-4), expected: "05:00 - 07:30", actual: "05:05 - 07:30", duration: 2.4, status: "On Time", variance: "+5m" },
      { date: getRelativeDateStr(-6), expected: "05:00 - 07:30", actual: "05:10 - 07:40", duration: 2.5, status: "On Time", variance: "+10m" },
      { date: getRelativeDateStr(-8), expected: "05:00 - 07:30", actual: "06:15 - 08:15", duration: 2.0, status: "Delayed", variance: "+75m" }
    ],
    alerts: [
      { id: "alt-3", type: "delay", title: "Supply Delayed by ~40 Minutes", message: "Water supply in Miyapur is delayed due to booster valve maintenance. Expected start: 05:30 PM.", timestamp: "35 mins ago", read: false },
      { id: "alt-4", type: "advance", title: "Evening Supply Notification", message: "Prepare overhead storage; supply slot scheduled for today evening.", timestamp: "4 hours ago", read: true }
    ]
  },

  "Gachibowli": {
    zone: "West Zone (IT Corridor)",
    pumpingStation: "Telecom Nagar Booster Station",
    currentStatus: "Scheduled",
    statusNote: "Scheduled for early morning distribution.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "05:00 AM",
      endTime: "07:00 AM",
      duration: "2h 00m",
      expectedPressure: "High",
      targetHoursFromNow: 8.0
    },
    communityConfirmation: {
      yesCount: 44,
      noCount: 2,
      totalExpected: 50,
      lastConfirmedAgo: "Just now",
      currentPressureReport: "High Pressure"
    },
    recentReports: [
      { id: "rep-301", user: "Vikram Sen", locality: "TNGO Colony", time: "2 mins ago", arrived: true, pressure: "High", notes: "Pressure very strong today!" },
      { id: "rep-302", user: "Kavita Rao", locality: "Gachibowli Stadium Road", time: "15 mins ago", arrived: true, pressure: "High", notes: "Both tanks filled completely." }
    ],
    schedules: [
      { id: "sch-gac-1", date: getRelativeDateStr(1), startTime: "05:00 AM", endTime: "07:00 AM", status: "Scheduled", updatedTime: "Today 05:00 PM", note: "Automatic telemetry monitored." },
      { id: "sch-gac-2", date: getRelativeDateStr(3), startTime: "05:00 AM", endTime: "07:00 AM", status: "Scheduled", updatedTime: "Today 01:00 PM", note: "Alternate day supply." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "05:00 - 07:00", actual: "05:00 - 07:00", duration: 2.0, status: "On Time", variance: "0m" },
      { date: getRelativeDateStr(-3), expected: "05:00 - 07:00", actual: "05:02 - 07:05", duration: 2.0, status: "On Time", variance: "+2m" },
      { date: getRelativeDateStr(-5), expected: "05:00 - 07:00", actual: "05:10 - 07:15", duration: 2.1, status: "On Time", variance: "+10m" }
    ],
    alerts: [
      { id: "alt-5", type: "advance", title: "Supply Confirmed for Early Morning", message: "Water supply expected at 05:00 AM tomorrow across Gachibowli & TNGO Colony.", timestamp: "1 hour ago", read: false }
    ]
  },

  "Madhapur": {
    zone: "West Zone (Hitec City)",
    pumpingStation: "Durgam Cheruvu GLSR",
    currentStatus: "Updated",
    statusNote: "Supply duration extended by 20 minutes to accommodate low pressure reports.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "07:00 AM",
      endTime: "09:30 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 10.0
    },
    communityConfirmation: {
      yesCount: 31,
      noCount: 7,
      totalExpected: 42,
      lastConfirmedAgo: "22 mins ago",
      currentPressureReport: "Medium"
    },
    recentReports: [
      { id: "rep-401", user: "Deepak Nair", locality: "Ayyappa Society Mega Hills", time: "22 mins ago", arrived: true, pressure: "Medium", notes: "Normal supply restored." },
      { id: "rep-402", user: "Sneha Patel", locality: "Kavuri Hills", time: "45 mins ago", arrived: false, pressure: "Low", notes: "Lower floor taps receiving trickle." }
    ],
    schedules: [
      { id: "sch-mad-1", date: getRelativeDateStr(1), startTime: "07:00 AM", endTime: "09:30 AM", status: "Updated", updatedTime: "Today 04:30 PM", note: "Extended timing for low lying zones." },
      { id: "sch-mad-2", date: getRelativeDateStr(3), startTime: "07:00 AM", endTime: "09:00 AM", status: "Scheduled", updatedTime: "Yesterday 08:00 PM", note: "Standard cycle." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "07:00 - 09:00", actual: "07:15 - 09:30", duration: 2.25, status: "On Time", variance: "+15m" },
      { date: getRelativeDateStr(-3), expected: "07:00 - 09:00", actual: "07:45 - 09:40", duration: 1.9, status: "Delayed", variance: "+45m" }
    ],
    alerts: [
      { id: "alt-6", type: "update", title: "Schedule Adjusted for Madhapur", message: "Timing extended by 20 minutes for tomorrow's cycle due to network pressure balancing.", timestamp: "3 hours ago", read: false }
    ]
  },

  "Ameerpet": {
    zone: "Central Zone (Khairatabad)",
    pumpingStation: "Sanjeeva Reddy Nagar ESR",
    currentStatus: "Scheduled",
    statusNote: "Standard bi-daily distribution.",
    nextSupply: {
      date: getRelativeDateStr(0),
      startTime: "09:00 PM",
      endTime: "11:15 PM",
      duration: "2h 15m",
      expectedPressure: "Normal",
      targetHoursFromNow: 6.5
    },
    communityConfirmation: {
      yesCount: 29,
      noCount: 5,
      totalExpected: 38,
      lastConfirmedAgo: "1 hour ago",
      currentPressureReport: "Normal"
    },
    recentReports: [
      { id: "rep-501", user: "Rajeshwar G.", locality: "Dharam Karan Road", time: "1 hour ago", arrived: true, pressure: "Normal", notes: "Pressure consistent throughout." }
    ],
    schedules: [
      { id: "sch-amr-1", date: getRelativeDateStr(0), startTime: "09:00 PM", endTime: "11:15 PM", status: "Scheduled", updatedTime: "Today 03:00 PM", note: "Night shift gravity line." }
    ],
    history: [
      { date: getRelativeDateStr(-2), expected: "09:00 - 11:15", actual: "09:05 - 11:20", duration: 2.25, status: "On Time", variance: "+5m" }
    ],
    alerts: [
      { id: "alt-7", type: "advance", title: "Night Water Supply Alert", message: "Water supply expected tonight at 09:00 PM in Ameerpet and SR Nagar.", timestamp: "5 hours ago", read: true }
    ]
  },

  "Dilsukhnagar": {
    zone: "East Zone (L.B. Nagar)",
    pumpingStation: "Gaddiannaram GLSR",
    currentStatus: "Completed",
    statusNote: "Today's morning cycle completed successfully.",
    nextSupply: {
      date: getRelativeDateStr(2),
      startTime: "06:30 AM",
      endTime: "09:00 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 33.5
    },
    communityConfirmation: {
      yesCount: 41,
      noCount: 3,
      totalExpected: 45,
      lastConfirmedAgo: "3 hours ago",
      currentPressureReport: "Good"
    },
    recentReports: [
      { id: "rep-601", user: "Venkat Rao", locality: "Chaitanyapuri", time: "3 hours ago", arrived: true, pressure: "High", notes: "Cycle finished as per schedule." }
    ],
    schedules: [
      { id: "sch-dil-1", date: getRelativeDateStr(0), startTime: "06:30 AM", endTime: "09:00 AM", status: "Completed", updatedTime: "Today 09:10 AM", note: "Supplied full 2.5 hours." },
      { id: "sch-dil-2", date: getRelativeDateStr(2), startTime: "06:30 AM", endTime: "09:00 AM", status: "Scheduled", updatedTime: "Today 10:00 AM", note: "Next cycle." }
    ],
    history: [
      { date: getRelativeDateStr(0), expected: "06:30 - 09:00", actual: "06:30 - 09:00", duration: 2.5, status: "On Time", variance: "0m" },
      { date: getRelativeDateStr(-2), expected: "06:30 - 09:00", actual: "06:45 - 09:15", duration: 2.5, status: "On Time", variance: "+15m" }
    ],
    alerts: [
      { id: "alt-8", type: "arrival", title: "Morning Supply Completed", message: "Dilsukhnagar distribution ended at 09:00 AM with 91% community confirmation.", timestamp: "8 hours ago", read: true }
    ]
  },

  "LB Nagar": {
    zone: "East Zone",
    pumpingStation: "Mansoorabad High Level Reservoir",
    currentStatus: "Scheduled",
    statusNote: "Normal scheduled cycle for tomorrow morning.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "05:30 AM",
      endTime: "08:00 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 8.5
    },
    communityConfirmation: {
      yesCount: 36,
      noCount: 4,
      totalExpected: 42,
      lastConfirmedAgo: "50 mins ago",
      currentPressureReport: "Medium"
    },
    recentReports: [
      { id: "rep-701", user: "Mahesh Babu K.", locality: "RTC Colony", time: "50 mins ago", arrived: true, pressure: "Normal", notes: "Adequate pressure for 2-storey house." }
    ],
    schedules: [
      { id: "sch-lbn-1", date: getRelativeDateStr(1), startTime: "05:30 AM", endTime: "08:00 AM", status: "Scheduled", updatedTime: "Today 02:00 PM", note: "Scheduled alternate morning." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "05:30 - 08:00", actual: "05:35 - 08:05", duration: 2.5, status: "On Time", variance: "+5m" }
    ],
    alerts: [
      { id: "alt-9", type: "advance", title: "Advance Notice: LB Nagar Supply", message: "Water supply expected tomorrow 05:30 AM. Keep valves ready.", timestamp: "3 hours ago", read: false }
    ]
  },

  "Mehdipatnam": {
    zone: "South-West Zone",
    pumpingStation: "Asif Nagar Filter Beds",
    currentStatus: "Scheduled",
    statusNote: "Regular supply cycle.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "07:30 AM",
      endTime: "09:45 AM",
      duration: "2h 15m",
      expectedPressure: "Normal",
      targetHoursFromNow: 10.5
    },
    communityConfirmation: {
      yesCount: 27,
      noCount: 6,
      totalExpected: 36,
      lastConfirmedAgo: "15 mins ago",
      currentPressureReport: "Moderate"
    },
    recentReports: [
      { id: "rep-801", user: "Syed Imran", locality: "Murad Nagar", time: "15 mins ago", arrived: true, pressure: "Moderate", notes: "Flow is steady." }
    ],
    schedules: [
      { id: "sch-meh-1", date: getRelativeDateStr(1), startTime: "07:30 AM", endTime: "09:45 AM", status: "Scheduled", updatedTime: "Today 01:30 PM", note: "Standard timing." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "07:30 - 09:45", actual: "07:30 - 09:45", duration: 2.25, status: "On Time", variance: "0m" }
    ],
    alerts: [
      { id: "alt-10", type: "advance", title: "Scheduled Supply Tomorrow", message: "Expected 07:30 AM - 09:45 AM in Mehdipatnam.", timestamp: "2 hours ago", read: false }
    ]
  },

  "Uppal": {
    zone: "East Zone",
    pumpingStation: "Nacharam Industrial GLSR",
    currentStatus: "Delayed",
    statusNote: "Main supply pipeline valve tuning delayed start by 30 mins.",
    nextSupply: {
      date: getRelativeDateStr(0),
      startTime: "06:30 PM",
      endTime: "09:00 PM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 4.0
    },
    communityConfirmation: {
      yesCount: 20,
      noCount: 11,
      totalExpected: 34,
      lastConfirmedAgo: "8 mins ago",
      currentPressureReport: "Low to Moderate"
    },
    recentReports: [
      { id: "rep-901", user: "Naveen Chander", locality: "Chilkanagar", time: "8 mins ago", arrived: false, pressure: "None", notes: "Waiting for valve release." }
    ],
    schedules: [
      { id: "sch-upp-1", date: getRelativeDateStr(0), startTime: "06:30 PM", endTime: "09:00 PM", status: "Delayed", updatedTime: "Today 05:45 PM", note: "Delayed by 30 mins." }
    ],
    history: [
      { date: getRelativeDateStr(-2), expected: "06:00 - 08:30", actual: "06:45 - 09:15", duration: 2.5, status: "Delayed", variance: "+45m" }
    ],
    alerts: [
      { id: "alt-11", type: "delay", title: "Supply Delayed 30 Mins in Uppal", message: "Pressure buildup delayed. Supply will start at 06:30 PM.", timestamp: "45 mins ago", read: false }
    ]
  },

  "Secunderabad": {
    zone: "North Zone (Cantonment & Twin Cities)",
    pumpingStation: "Marredpally Pumping Head",
    currentStatus: "Scheduled",
    statusNote: "Twin city supply line on normal alternate day rotation.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "06:00 AM",
      endTime: "08:30 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 9.0
    },
    communityConfirmation: {
      yesCount: 40,
      noCount: 3,
      totalExpected: 46,
      lastConfirmedAgo: "1 hour ago",
      currentPressureReport: "Good"
    },
    recentReports: [
      { id: "rep-1001", user: "Arthur D'Souza", locality: "West Marredpally", time: "1 hour ago", arrived: true, pressure: "Good", notes: "Supply regular." }
    ],
    schedules: [
      { id: "sch-sec-1", date: getRelativeDateStr(1), startTime: "06:00 AM", endTime: "08:30 AM", status: "Scheduled", updatedTime: "Today 12:00 PM", note: "Twin city main pipeline." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "06:00 - 08:30", actual: "06:00 - 08:30", duration: 2.5, status: "On Time", variance: "0m" }
    ],
    alerts: [
      { id: "alt-12", type: "advance", title: "Regular Cycle Tomorrow Morning", message: "Water supply expected at 06:00 AM across Marredpally and Secunderabad.", timestamp: "3 hours ago", read: true }
    ]
  },

  "Begumpet": {
    zone: "Central Zone",
    pumpingStation: "Prakash Nagar Booster Station",
    currentStatus: "Scheduled",
    statusNote: "Standard distribution pipeline.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "06:30 AM",
      endTime: "08:45 AM",
      duration: "2h 15m",
      expectedPressure: "Normal",
      targetHoursFromNow: 9.5
    },
    communityConfirmation: {
      yesCount: 25,
      noCount: 3,
      totalExpected: 30,
      lastConfirmedAgo: "40 mins ago",
      currentPressureReport: "Normal"
    },
    recentReports: [
      { id: "rep-1101", user: "K. Murali", locality: "Prakash Nagar", time: "40 mins ago", arrived: true, pressure: "Normal", notes: "On time." }
    ],
    schedules: [
      { id: "sch-beg-1", date: getRelativeDateStr(1), startTime: "06:30 AM", endTime: "08:45 AM", status: "Scheduled", updatedTime: "Today 11:30 AM", note: "Standard scheduled slot." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "06:30 - 08:45", actual: "06:35 - 08:50", duration: 2.25, status: "On Time", variance: "+5m" }
    ],
    alerts: [
      { id: "alt-13", type: "advance", title: "Supply Confirmed for Begumpet", message: "Tomorrow morning 06:30 AM expected arrival.", timestamp: "4 hours ago", read: true }
    ]
  },

  "Banjara Hills": {
    zone: "Central-West Zone (Khairatabad)",
    pumpingStation: "Road No. 12 Master Reservoir",
    currentStatus: "Scheduled",
    statusNote: "High elevation booster pump enabled.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "05:00 AM",
      endTime: "07:30 AM",
      duration: "2h 30m",
      expectedPressure: "High",
      targetHoursFromNow: 8.0
    },
    communityConfirmation: {
      yesCount: 37,
      noCount: 1,
      totalExpected: 40,
      lastConfirmedAgo: "10 mins ago",
      currentPressureReport: "High Pressure"
    },
    recentReports: [
      { id: "rep-1201", user: "Gautam Singhania", locality: "Road No. 10", time: "10 mins ago", arrived: true, pressure: "High", notes: "Pressure high as expected." }
    ],
    schedules: [
      { id: "sch-ban-1", date: getRelativeDateStr(1), startTime: "05:00 AM", endTime: "07:30 AM", status: "Scheduled", updatedTime: "Today 04:00 PM", note: "High pressure feed." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "05:00 - 07:30", actual: "05:00 - 07:30", duration: 2.5, status: "On Time", variance: "0m" }
    ],
    alerts: [
      { id: "alt-14", type: "advance", title: "Early Morning Supply Notice", message: "Water supply expected at 05:00 AM tomorrow across Banjara Hills roads 1-14.", timestamp: "2 hours ago", read: false }
    ]
  }
};

// Generates fallback data for newly added custom localities
function generateCustomLocalityData(localityName) {
  return {
    zone: "Greater Hyderabad Municipal Area",
    pumpingStation: `${localityName} Sub-Divisional Reservoir`,
    currentStatus: "Scheduled",
    statusNote: "Community monitored slot based on historical municipal patterns.",
    nextSupply: {
      date: getRelativeDateStr(1),
      startTime: "06:00 AM",
      endTime: "08:30 AM",
      duration: "2h 30m",
      expectedPressure: "Normal",
      targetHoursFromNow: 9.0
    },
    communityConfirmation: {
      yesCount: 18,
      noCount: 3,
      totalExpected: 25,
      lastConfirmedAgo: "30 mins ago",
      currentPressureReport: "Moderate"
    },
    recentReports: [
      { id: `rep-cust-1`, user: "Local Resident", locality: localityName, time: "30 mins ago", arrived: true, pressure: "Moderate", notes: "Water supplied as per usual cycle." }
    ],
    schedules: [
      { id: `sch-cust-1`, date: getRelativeDateStr(1), startTime: "06:00 AM", endTime: "08:30 AM", status: "Scheduled", updatedTime: "Today 12:00 PM", note: "Community verified baseline." }
    ],
    history: [
      { date: getRelativeDateStr(-1), expected: "06:00 - 08:30", actual: "06:10 - 08:35", duration: 2.4, status: "On Time", variance: "+10m" },
      { date: getRelativeDateStr(-3), expected: "06:00 - 08:30", actual: "06:00 - 08:30", duration: 2.5, status: "On Time", variance: "0m" }
    ],
    alerts: [
      { id: `alt-cust-1`, type: "advance", title: `Supply Scheduled for ${localityName}`, message: `Expected water supply tomorrow morning at 06:00 AM in ${localityName}.`, timestamp: "1 hour ago", read: false }
    ]
  };
}
