/**
 * WaterWatch - Multilingual Translation Engine & Dictionary
 * Supported Languages: English (en), Hindi (hi), Telugu (te)
 * Default Location: Hyderabad, Telangana, India
 */

const TRANSLATIONS = {
  en: {
    // Brand
    brand_title: "WaterWatch",
    brand_tagline: "Stay Informed. Stay Prepared.",

    // Top Banner
    banner_ideathon: "Student Ideathon Prototype",
    banner_loc_desc: "Default Location: <strong>Hyderabad, Telangana, India</strong> • Schedules & alerts shown are realistic sample demo data.",
    btn_simulate_alert: "Simulate Alert",

    // Navigation
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_schedule: "Supply Schedule",
    nav_notifications: "Notifications",
    nav_community: "Community",
    nav_records: "Records",
    nav_portals: "Official Portals",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_admin: "Admin",
    nav_control_panel: "Control Panel",
    nav_sign_in: "Sign In",
    nav_logout: "Log Out",
    select_language: "Language:",

    // Locality
    locality_select_title: "Change Locality in Hyderabad",
    select_area_label: "Select Area:",
    btn_check_status: "Check Status",

    // Hero Section
    hero_badge: "Smart Water Notification Network • Hyderabad",
    hero_title_prefix: "Never Miss Water Supply In Your ",
    hero_title_highlight: "Locality Again.",
    hero_subtitle: "WaterWatch helps Hyderabad residents track expected municipal water timings, receive advance mobile alerts on timing changes or delays, and crowdsource real-time arrival confirmations.",
    btn_get_started: "Get Started",
    btn_view_schedule: "View Supply Schedule",

    // Hero Preview Card
    hero_card_live: "Live Timetable Monitor",
    hero_next_supply: "Next Scheduled Supply",
    hero_expected_duration: "Expected Duration:",
    hero_normal_pressure: "Normal Pressure",
    hero_consensus_title: "88% Community Consensus",
    hero_consensus_desc: "38 neighbours in Kukatpally confirmed previous cycle.",
    hero_advance_alert_title: "Advance Alert Scheduled",
    hero_advance_alert_desc: "Reminder will fire 30 minutes before supply begins.",

    // Stats Bar
    stat_localities: "Hyderabad Localities Covered",
    stat_households: "Households Alerted",
    stat_accuracy: "Timing Notification Accuracy",
    stat_confirmations: "Community Confirmations Today",

    // 3-Step Process
    how_it_works_tag: "How It Works",
    how_it_works_title: "Stay Prepared in 3 Simple Steps",
    how_it_works_desc: "Designed with Design Thinking principles to solve unpredictable water supply schedules for households across Hyderabad.",
    step1_title: "Select Your Locality",
    step1_desc: "Choose your area in Hyderabad (Kukatpally, Miyapur, Ameerpet, Gachibowli, Madhapur, etc.) or enter your custom residential colony.",
    step2_title: "Check Supply Timings",
    step2_desc: "View verified expected water supply hours, duration, and pressure estimations with a real-time countdown to your next supply slot.",
    step3_title: "Receive Alerts & Confirm",
    step3_desc: "Get instant notices about timing adjustments or pipeline delays. Confirm with one click when water reaches your tap to help your neighbours.",

    // Features Section
    features_tag: "System Features",
    features_title: "Built For Citizen & Ideathon Excellence",
    features_desc: "A realistic, citizen-centric platform tackling urban water unpredictability with transparent schedules and crowd verification.",
    feat1_title: "Advance Alerts",
    feat1_desc: "Receive notifications prior to supply release so you can prepare storage tanks, motors, and domestic activities.",
    feat2_title: "Schedule Updates",
    feat2_desc: "Real-time alerts whenever supply times are shifted, pipelines undergo maintenance, or delays occur.",
    feat3_title: "Community Confirmation",
    feat3_desc: "Crowdsourced validation: residents report whether water has arrived, verifying municipal supply pressure.",
    feat4_title: "Supply Records",
    feat4_desc: "Transparent supply logs, duration trends, and on-time reliability metrics visualized with interactive charts.",

    // Official Portals Section (User Requested Websites)
    portals_tag: "Official Municipal Resources",
    portals_title: "Official Hyderabad Water & Civic Portals",
    portals_subtitle: "Direct access to official Government of Telangana, HMWSSB, and GHMC portals and verified social channels for public announcements, customer services, and civic updates.",
    portals_view_all_link: "Open All Portals",

    // Official Cards
    card_hmwssb_badge: "HMWSSB",
    card_hmwssb_title: "HMWSSB Website",
    card_hmwssb_desc: "Hyderabad Metropolitan Water Supply & Sewerage Board official portal",
    card_hmwssb_btn: "Open Official Website",

    card_hmwssb_x_badge: "HMWSSB",
    card_hmwssb_x_title: "HMWSSB X",
    card_hmwssb_x_desc: "Official HMWSSB public service advisories & interruption alerts",
    card_hmwssb_x_btn: "Open Official X Account",

    card_ghmc_badge: "GHMC",
    card_ghmc_title: "GHMC Website",
    card_ghmc_desc: "Greater Hyderabad Municipal Corporation official portal",
    card_ghmc_btn: "Open Official Website",

    card_ghmc_x_badge: "GHMC",
    card_ghmc_x_title: "GHMC X",
    card_ghmc_x_desc: "Official GHMC civic & municipal coordination updates",
    card_ghmc_x_btn: "Open Official X Account",

    card_new_tab: "New Tab ↗",
    helpline_hmwssb: "HMWSSB Customer Care Helpline: 155313",
    helpline_ghmc: "GHMC Citizen Helpline: 040-21111111",

    // Dashboard View
    dash_heading: "Locality Dashboard",
    dash_greeting_default: "Welcome! Here is today's water status for your locality.",
    dash_btn_new_locality: "New Locality",
    dash_duration: "Duration:",
    dash_expected_pressure: "Expected Pressure:",
    dash_status_note_default: "Standard alternate day cycle",
    dash_countdown_label: "Countdown to Expected Supply (Simulated)",
    dash_cd_hours: "Hours",
    dash_cd_minutes: "Mins",
    dash_cd_seconds: "Secs",
    dash_confirm_question: "Did water arrive at your tap today?",
    dash_confirm_yes: "Yes, Arrived",
    dash_confirm_no: "No, Not Yet",
    dash_confirm_reported_yes: "You confirmed water arrival today. Thank you for helping your community!",
    dash_confirm_reported_no: "You reported water has not arrived yet. Notification sent to community monitor.",
    dash_recent_alerts_title: "Locality Alerts & Announcements",
    dash_view_all_link: "View All →",
    dash_consensus_title: "Community Consensus",
    dash_consensus_sub_prefix: "Confirmed water received for current supply slot in ",
    dash_btn_open_community: "Open Community Reports",
    dash_metadata_title: "Supply Metadata",
    dash_meta_zone: "Zone:",
    dash_meta_station: "Pumping Station:",
    dash_meta_frequency: "Supply Frequency:",
    dash_meta_freq_val: "Alternate Days (Simulated)",
    dash_meta_status: "Current Status:",

    // Supply Schedule View
    sch_title: "Water Supply Timetable",
    sch_subtitle: "Official schedule and live operational status for Hyderabad localities.",
    sch_filter_all: "All Dates",
    sch_filter_today: "Today",
    sch_filter_tomorrow: "Tomorrow",
    sch_filter_upcoming: "Upcoming",
    sch_status_all: "All Statuses",
    sch_th_date: "Date",
    sch_th_time: "Expected Time Window",
    sch_th_status: "Status",
    sch_th_updated: "Last Telemetry Update",
    sch_th_note: "Valve & Pumping Station Note",
    sch_th_actions: "Actions",
    sch_btn_info: "Info",

    // Notifications View
    notif_title: "In-Website Notification Center",
    notif_subtitle: "Real-time dispatch log of advance warnings, pressure updates, and maintenance advisories.",
    notif_btn_mark_read: "Mark All As Read",
    notif_cat_all: "All Alerts",
    notif_cat_advance: "Advance Alerts",
    notif_cat_update: "Updates & Delays",
    notif_cat_arrival: "Arrivals",

    // Community View
    comm_title: "Crowdsourced Community Arrival Verification",
    comm_subtitle: "Hyderabad residents confirming real-time water arrival to maintain community transparency.",
    comm_card_title: "Confirm Today's Water Supply",
    comm_loc_label: "Confirming for Locality:",
    comm_q_arrived: "Has water started flowing at your home?",
    comm_opt_yes: "Yes, Arrived",
    comm_opt_no: "No, Still Awaiting",
    comm_pressure_label: "Observed Water Pressure:",
    comm_pressure_normal: "Normal / Adequate",
    comm_pressure_low: "Low / Trickle",
    comm_pressure_high: "High Pressure",
    comm_notes_label: "Observation Note (Optional):",
    comm_notes_placeholder: "e.g., Water flow started 10 mins early, clear water, good pressure...",
    comm_btn_submit: "Submit Arrival Confirmation",
    comm_feed_title: "Community Feed & Neighbour Reports",

    // Records View
    records_title: "Supply Records & Reliability Analytics",
    records_subtitle: "Historical telemetry, punctuality compliance, and supply duration analysis.",
    records_card_duration: "Supply Duration Trend (Hours)",
    records_card_variance: "Schedule Punctuality (Variance in Mins)",
    records_table_title: "Historical Supply Log",
    records_th_date: "Date",
    records_th_expected: "Expected Window",
    records_th_actual: "Actual Supply Flow",
    records_th_duration: "Duration",
    records_th_status: "Status",
    records_th_variance: "Variance",

    // Status Badges
    status_scheduled: "SCHEDULED",
    status_delayed: "DELAYED",
    status_updated: "UPDATED",
    status_completed: "COMPLETED",
    status_in_progress: "IN PROGRESS",

    // Relative Dates
    date_today: "Today",
    date_tomorrow: "Tomorrow",
    date_yesterday: "Yesterday",

    // Pressure
    pressure_normal_txt: "Normal",
    pressure_low_txt: "Low",
    pressure_high_txt: "High",

    // Footer
    footer_desc: "Smart Community Water Supply Notification System. Helping residents across Hyderabad stay informed, prepare domestic storage, and confirm municipal supply timings.",
    footer_loc: "Default Location: <strong>Hyderabad, Telangana, India</strong>",
    footer_pages_title: "Platform Pages",
    footer_official_title: "Official Government Portals",
    footer_research_title: "Project & Simulation",
    footer_notice_title: "Ideathon Prototype Notice",
    footer_notice_desc: "Developed as a student Ideathon prototype. Sourced timings and alerts are realistic simulated sample data. Designed for integration with Firebase Authentication, Firestore, and HMWSSB telemetry APIs.",
    footer_prototype_active: "Prototype Active",
    footer_copy: "© 2026 WaterWatch – Smart Community Water Supply Notification System. Student Ideathon Project.",
    footer_made_with: "Designed with ❤️ for Hyderabad Communities."
  },

  te: {
    // Brand
    brand_title: "వాటర్‌వాచ్",
    brand_tagline: "సమాచారంతో ఉండండి. సిద్ధంగా ఉండండి.",

    // Top Banner
    banner_ideathon: "విద్యార్థి ఐడియాథాన్ ప్రోటోటైప్",
    banner_loc_desc: "డిఫాల్ట్ స్థానం: <strong>హైదరాబాద్, తెలంగాణ, భారతదేశం</strong> • చూపించిన షెడ్యూల్‌లు మరియు హెచ్చరికలు వాస్తవిక నమూనా డేటా.",
    btn_simulate_alert: "అలర్ట్ సిమ్యులేట్ చేయండి",

    // Navigation
    nav_home: "హోమ్",
    nav_dashboard: "డ్యాష్‌బోర్డ్",
    nav_schedule: "సరఫరా షెడ్యూల్",
    nav_notifications: "నోటిఫికేషన్‌లు",
    nav_community: "కమ్యూనిటీ",
    nav_records: "రికార్డులు",
    nav_portals: "అధికారిక పోర్టల్‌లు",
    nav_about: "మా గురించి",
    nav_contact: "సంప్రదించండి",
    nav_admin: "అడ్మిన్",
    nav_control_panel: "నియంత్రణ ప్యానెల్",
    nav_sign_in: "లాగిన్",
    nav_logout: "లాగ్ అవుట్",
    select_language: "భాష:",

    // Locality
    locality_select_title: "హైదరాబాద్ ప్రాంతాన్ని మార్చండి",
    select_area_label: "ప్రాంతాన్ని ఎంచుకోండి:",
    btn_check_status: "స్థితిని చూడండి",

    // Hero Section
    hero_badge: "స్మార్ట్ వాటర్ నోటిఫికేషన్ నెట్‌వర్క్ • హైదరాబాద్",
    hero_title_prefix: "మీ ప్రాంతంలో నీటి సరఫరాను ఇకపై ఎప్పటికీ ",
    hero_title_highlight: "మిస్ అవ్వకండి.",
    hero_subtitle: "హైదరాబాద్ నివాసితులు మునిసిపల్ నీటి సరఫరా వేళలను తెలుసుకోవడానికి, సమయ మార్పులు లేదా ఆలస్యాలపై ముందస్తు మొబైల్ అలర్ట్‌లను అందుకోవడానికి మరియు నిజ-సమయ నీటి రాకను ధృవీకరించడానికి వాటర్‌వాచ్ సహాయపడుతుంది.",
    btn_get_started: "ప్రారంభించండి",
    btn_view_schedule: "సరఫరా షెడ్యూల్ చూడండి",

    // Hero Preview Card
    hero_card_live: "లైవ్ టైమ్‌టేబుల్ మానిటర్",
    hero_next_supply: "తదుపరి షెడ్యూల్ చేయబడిన సరఫరా",
    hero_expected_duration: "అంచనా సమయం:",
    hero_normal_pressure: "సాధారణ ప్రెజర్",
    hero_consensus_title: "88% కమ్యూనిటీ ఏకాభిప్రాయం",
    hero_consensus_desc: "కూకట్‌పల్లిలోని 38 మంది పొరుగువారు మునుపటి సరఫరాను ధృవీకరించారు.",
    hero_advance_alert_title: "ముందస్తు అలర్ట్ షెడ్యూల్ చేయబడింది",
    hero_advance_alert_desc: "నీటి సరఫరా ప్రారంభానికి 30 నిమిషాల ముందు రిమైండర్ వస్తుంది.",

    // Stats Bar
    stat_localities: "కవర్ చేయబడిన హైదరాబాద్ ప్రాంతాలు",
    stat_households: "అలర్ట్ పొందిన గృహాలు",
    stat_accuracy: "సమయ నోటిఫికేషన్ ఖచ్చితత్వం",
    stat_confirmations: "ఈరోజు కమ్యూనిటీ ధృవీకరణలు",

    // 3-Step Process
    how_it_works_tag: "ఇది ఎలా పనిచేస్తుంది",
    how_it_works_title: "3 సాధారణ దశల్లో సిద్ధంగా ఉండండి",
    how_it_works_desc: "హైదరాబాద్ అంతటా గృహాల కోసం అనూహ్యమైన నీటి సరఫరా వేళల సమస్యను పరిష్కరించడానికి రూపొందించబడింది.",
    step1_title: "మీ ప్రాంతాన్ని ఎంచుకోండి",
    step1_desc: "హైదరాబాద్‌లోని మీ ప్రాంతాన్ని ఎంచుకోండి (కూకట్‌పల్లి, మియాపూర్, అమీర్‌పేట్, గచ్చిబౌలి, మాదాపూర్ మొదలైనవి) లేదా మీ కాలనీని జోడించండి.",
    step2_title: "సరఫరా సమయాలను తనిఖీ చేయండి",
    step2_desc: "మీ తదుపరి సరఫరా సమయానికి లైవ్ కౌంట్‌డౌన్‌తో నీరు వచ్చే గంటలు, వ్యవధి మరియు ప్రెజర్ అంచనాలను చూడండి.",
    step3_title: "అలర్ట్‌లు పొందండి & ధృవీకరించండి",
    step3_desc: "సమయ మార్పులు లేదా పైప్‌లైన్ ఆలస్యాలపై తక్షణ సమాచారం పొందండి. మీ ట్యాప్‌లోకి నీరు వచ్చినప్పుడు ఒక్క క్లిక్‌తో ధృవీకరించి పొరుగువారికి సహాయపడండి.",

    // Features Section
    features_tag: "సిస్టమ్ ఫీచర్లు",
    features_title: "పౌర సౌలభ్యం & శ్రేష్ఠత కోసం నిర్మించబడింది",
    features_desc: "పారదర్శక షెడ్యూల్‌లు మరియు ప్రజల ధృవీకరణతో పట్టణ నీటి సరఫరా సమస్యను పరిష్కరించే నమ్మకమైన వేదిక.",
    feat1_title: "ముందస్తు అలర్ట్‌లు",
    feat1_desc: "నీటి విడుదల కంటే ముందే నోటిఫికేషన్‌లను అందుకోండి, తద్వారా మీరు వాటర్ ట్యాంకులు మరియు మోటార్లను సిద్ధం చేసుకోవచ్చు.",
    feat2_title: "షెడ్యూల్ అప్‌డేట్‌లు",
    feat2_desc: "సరఫరా సమయం మారినప్పుడు, పైప్‌లైన్ మరమ్మతులు లేదా ఆలస్యం జరిగినప్పుడు రియల్ టైమ్ అలర్ట్‌లు లభిస్తాయి.",
    feat3_title: "కమ్యూనిటీ ధృవీకరణ",
    feat3_desc: "ప్రజల భాగస్వామ్యం: నీరు వచ్చిందో లేదో ప్రజలే స్వయంగా నివేదిస్తారు, దీని ద్వారా సరఫరా ప్రెజర్ ఖచ్చితంగా తెలుస్తుంది.",
    feat4_title: "సరఫరా రికార్డులు",
    feat4_desc: "పారదర్శక సరఫరా రికార్డులు, సరఫరా గంటల వివరాలు మరియు సమయపాలన కొలమానాలను ఇంటరాక్టివ్ చార్ట్‌ల ద్వారా చూడండి.",

    // Official Portals Section (User Requested Websites)
    portals_tag: "అధికారిక మునిసిపల్ వనరులు",
    portals_title: "హైదరాబాద్ అధికారిక నీటి సరఫరా & మున్సిపల్ పోర్టల్‌లు",
    portals_subtitle: "పౌర సేవలు, ఫిర్యాదుల పరిష్కారం మరియు అధికారిక ప్రకటనల కోసం తెలంగాణ ప్రభుత్వం, HMWSSB మరియు GHMC అధికారిక పోర్టల్‌లు మరియు ఖాతాలకు ప్రత్యక్ష లింకులు.",
    portals_view_all_link: "అన్ని పోర్టల్‌లు తెరవండి",

    // Official Cards
    card_hmwssb_badge: "HMWSSB",
    card_hmwssb_title: "HMWSSB Website",
    card_hmwssb_desc: "హైదరాబాద్ మెట్రోపాలిటన్ వాటర్ సప్లై & సీవరేజ్ బోర్డ్ అధికారిక పోర్టల్",
    card_hmwssb_btn: "అధికారిక వెబ్‌సైట్ తెరవండి",

    card_hmwssb_x_badge: "HMWSSB",
    card_hmwssb_x_title: "HMWSSB X",
    card_hmwssb_x_desc: "అధికారిక HMWSSB ప్రజా సేవా ప్రకటనలు & సరఫరా అంతరాయ హెచ్చరికలు",
    card_hmwssb_x_btn: "అధికారిక X ఖాతా తెరవండి",

    card_ghmc_badge: "GHMC",
    card_ghmc_title: "GHMC Website",
    card_ghmc_desc: "గ్రేటర్ హైదరాబాద్ మున్సిపల్ కార్పొరేషన్ అధికారిక పోర్టల్",
    card_ghmc_btn: "అధికారిక వెబ్‌సైట్ తెరవండి",

    card_ghmc_x_badge: "GHMC",
    card_ghmc_x_title: "GHMC X",
    card_ghmc_x_desc: "అధికారిక GHMC పౌర & మునిసిపల్ సమన్వయ అప్‌డేట్‌లు",
    card_ghmc_x_btn: "అధికారిక X ఖాతా తెరవండి",

    card_new_tab: "కొత్త ట్యాబ్ ↗",
    helpline_hmwssb: "HMWSSB కస్టమర్ కేర్ హెల్ప్‌లైన్: 155313",
    helpline_ghmc: "GHMC సిటిజన్ హెల్ప్‌లైన్: 040-21111111",

    // Dashboard View
    dash_heading: "ప్రాంత డ్యాష్‌బోర్డ్",
    dash_greeting_default: "స్వాగతం! మీ ప్రాంతం యొక్క నేటి నీటి సరఫరా స్థితి ఇక్కడ చూడండి.",
    dash_btn_new_locality: "కొత్త ప్రాంతం",
    dash_duration: "వ్యవధి:",
    dash_expected_pressure: "అంచనా ప్రెజర్:",
    dash_status_note_default: "సాధారణ ఒక రోజు విడిచి ఒక రోజు సరఫరా",
    dash_countdown_label: "రాబోయే సరఫరా కోసం కౌంట్‌డౌన్ (సిమ్యులేటెడ్)",
    dash_cd_hours: "గంటలు",
    dash_cd_minutes: "నిమిషాలు",
    dash_cd_seconds: "సెకన్లు",
    dash_confirm_question: "ఈరోజు మీ ట్యాప్‌లో నీరు వచ్చిందా?",
    dash_confirm_yes: "అవును, వచ్చింది",
    dash_confirm_no: "లేదు, ఇంకా రాలేదు",
    dash_confirm_reported_yes: "ఈరోజు నీరు వచ్చిందని మీరు ధృవీకరించారు. కమ్యూనిటీకి సహాయం చేసినందుకు ధన్యవాదాలు!",
    dash_confirm_reported_no: "నీరు ఇంకా రాలేదని మీరు నివేదించారు. ఈ సమాచారం మానిటర్‌కు పంపబడింది.",
    dash_recent_alerts_title: "ప్రాంత హెచ్చరికలు & ప్రకటనలు",
    dash_view_all_link: "అన్నీ చూడండి →",
    dash_consensus_title: "కమ్యూనిటీ ఏకాభిప్రాయం",
    dash_consensus_sub_prefix: "ఈ ప్రాంతంలో ప్రస్తుత సైకిల్‌లో నీరు వచ్చిందని ధృవీకరించారు: ",
    dash_btn_open_community: "కమ్యూనిటీ రిపోర్ట్‌లు తెరవండి",
    dash_metadata_title: "సరఫరా సమాచారం",
    dash_meta_zone: "జోన్:",
    dash_meta_station: "పంపింగ్ స్టేషన్:",
    dash_meta_frequency: "సరఫరా ఫ్రీక్వెన్సీ:",
    dash_meta_freq_val: "ఒక రోజు విడిచి ఒక రోజు",
    dash_meta_status: "ప్రస్తుత స్థితి:",

    // Supply Schedule View
    sch_title: "నీటి సరఫరా టైమ్‌టేబుల్",
    sch_subtitle: "హైదరాబాద్ ప్రాంతాల అధికారిక షెడ్యూల్ మరియు లైవ్ స్థితి.",
    sch_filter_all: "అన్ని తేదీలు",
    sch_filter_today: "ఈరోజు",
    sch_filter_tomorrow: "రేపు",
    sch_filter_upcoming: "రాబోయేవి",
    sch_status_all: "అన్ని స్థితులు",
    sch_th_date: "తేదీ",
    sch_th_time: "అంచనా వేసిన సమయం",
    sch_th_status: "స్థితి",
    sch_th_updated: "చివరి టెలిమెట్రీ అప్‌డేట్",
    sch_th_note: "వాల్వ్ & పంపింగ్ స్టేషన్ నోట్",
    sch_th_actions: "చర్యలు",
    sch_btn_info: "వివరాలు",

    // Notifications View
    notif_title: "వెబ్‌సైట్ నోటిఫికేషన్ కేంద్రం",
    notif_subtitle: "ముందస్తు హెచ్చరికలు, ప్రెజర్ మార్పులు మరియు నిర్వహణ ప్రకటనల లైవ్ లాగ్.",
    notif_btn_mark_read: "అన్నీ చదివినట్లు గుర్తించండి",
    notif_cat_all: "అన్ని అలర్ట్‌లు",
    notif_cat_advance: "ముందస్తు అలర్ట్‌లు",
    notif_cat_update: "అప్‌డేట్‌లు & ఆలస్యాలు",
    notif_cat_arrival: "నీటి రాకలు",

    // Community View
    comm_title: "కమ్యూనిటీ నీటి రాక ధృవీకరణ",
    comm_subtitle: "పారదర్శకత కోసం హైదరాబాద్ నివాసితులు రియల్ టైమ్‌లో నీటి రాకను ధృవీకరిస్తున్నారు.",
    comm_card_title: "నేటి నీటి సరఫరాను ధృవీకరించండి",
    comm_loc_label: "ధృవీకరిస్తున్న ప్రాంతం:",
    comm_q_arrived: "మీ ఇంట్లో నీరు రావడం ప్రారంభమైందా?",
    comm_opt_yes: "అవును, వచ్చింది",
    comm_opt_no: "లేదు, ఇంకా వేచి చూస్తున్నాము",
    comm_pressure_label: "గమనించిన నీటి ప్రెజర్:",
    comm_pressure_normal: "సాధారణం / సరిపడా",
    comm_pressure_low: "తక్కువ / సన్నటి ధార",
    comm_pressure_high: "ఎక్కువ ప్రెజర్",
    comm_notes_label: "గమనిక వివరాలు (ఐచ్ఛికం):",
    comm_notes_placeholder: "ఉదాహరణ: నీరు 10 నిమిషాలు ముందు వచ్చింది, నీరు స్వచ్ఛంగా ఉంది...",
    comm_btn_submit: "ధృవీకరణను సమర్పించండి",
    comm_feed_title: "కమ్యూనిటీ ఫీడ్ & పొరుగువారి నివేదికలు",

    // Records View
    records_title: "సరఫరా రికార్డులు & విశ్వసనీయత విశ్లేషణ",
    records_subtitle: "చారిత్రక రికార్డులు, సమయపాలన మరియు సరఫరా వ్యవధి విశ్లేషణ.",
    records_card_duration: "సరఫరా వ్యవధి ట్రెండ్ (గంటలు)",
    records_card_variance: "షెడ్యూల్ సమయపాలన (నిమిషాల్లో తేడా)",
    records_table_title: "చారిత్రక సరఫరా లాగ్",
    records_th_date: "తేదీ",
    records_th_expected: "అంచనా సమయం",
    records_th_actual: "వాస్తవ సరఫరా సమయం",
    records_th_duration: "వ్యవధి",
    records_th_status: "స్థితి",
    records_th_variance: "తేడా",

    // Status Badges
    status_scheduled: "షెడ్యూల్ చేయబడింది",
    status_delayed: "ఆలస్యం",
    status_updated: "అప్‌డేట్ చేయబడింది",
    status_completed: "పూర్తయింది",
    status_in_progress: "సరఫరా జరుగుతోంది",

    // Relative Dates
    date_today: "ఈరోజు",
    date_tomorrow: "రేపు",
    date_yesterday: "నిన్న",

    // Pressure
    pressure_normal_txt: "సాధారణం",
    pressure_low_txt: "తక్కువ",
    pressure_high_txt: "ఎక్కువ",

    // Footer
    footer_desc: "స్మార్ట్ కమ్యూనిటీ నీటి సరఫరా నోటిఫికేషన్ సిస్టమ్. హైదరాబాద్ నివాసితులకు నీటి సరఫరా సమయాలను తెలుసుకోవడానికి మరియు నిల్వ సిద్ధం చేసుకోవడానికి సహాయపడుతుంది.",
    footer_loc: "డిఫాల్ట్ స్థానం: <strong>హైదరాబాద్, తెలంగాణ, భారతదేశం</strong>",
    footer_pages_title: "ప్లాట్‌ఫారమ్ పేజీలు",
    footer_official_title: "అధికారిక ప్రభుత్వ పోర్టల్‌లు",
    footer_research_title: "ప్రాజెక్ట్ & సిమ్యులేషన్",
    footer_notice_title: "ఐడియాథాన్ ప్రోటోటైప్ నోటీసు",
    footer_notice_desc: "విద్యార్థి ఐడియాథాన్ ప్రోటోటైప్‌గా అభివృద్ధి చేయబడింది. Firebase మరియు HMWSSB టెలిమెట్రీ APIలతో అనుసంధానం కోసం రూపొందించబడింది.",
    footer_prototype_active: "ప్రోటోటైప్ యాక్టివ్",
    footer_copy: "© 2026 వాటర్‌వాచ్ – స్మార్ట్ కమ్యూనిటీ నీటి సరఫరా నోటిఫికేషన్ సిస్టమ్.",
    footer_made_with: "హైదరాబాద్ ప్రజల కోసం ❤️ తో రూపొందించబడింది."
  },

  hi: {
    // Brand
    brand_title: "वाटरवॉच",
    brand_tagline: "सूचित रहें। तैयार रहें।",

    // Top Banner
    banner_ideathon: "छात्र आइडियाथॉन प्रोटोटाइप",
    banner_loc_desc: "डिफ़ॉल्ट स्थान: <strong>हैदराबाद, तेलंगाना, भारत</strong> • दर्शाए गए समय और अलर्ट यथार्थवादी डेमो डेटा हैं।",
    btn_simulate_alert: "अलर्ट सिमुलेट करें",

    // Navigation
    nav_home: "होम",
    nav_dashboard: "डैशबोर्ड",
    nav_schedule: "आपूर्ति समय",
    nav_notifications: "सूचनाएं",
    nav_community: "समुदाय",
    nav_records: "रिकॉर्ड",
    nav_portals: "आधिकारिक पोर्टल",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क",
    nav_admin: "एडमिन",
    nav_control_panel: "कंट्रोल पैनल",
    nav_sign_in: "साइन इन",
    nav_logout: "लॉग आउट",
    select_language: "भाषा:",

    // Locality
    locality_select_title: "हैदराबाद का इलाका बदलें",
    select_area_label: "क्षेत्र चुनें:",
    btn_check_status: "स्थिति जांचें",

    // Hero Section
    hero_badge: "स्मार्ट जल सूचना नेटवर्क • हैदराबाद",
    hero_title_prefix: "अपने इलाके में फिर कभी पानी की आपूर्ति न ",
    hero_title_highlight: "चूकें।",
    hero_subtitle: "वाटरवॉच हैदराबाद के नागरिकों को अपेक्षित नगर निगम जल आपूर्ति समय को ट्रैक करने, समय परिवर्तन या देरी पर अग्रिम मोबाइल अलर्ट प्राप्त करने और वास्तविक समय में पानी आने की पुष्टि करने में मदद करता है।",
    btn_get_started: "शुरू करें",
    btn_view_schedule: "आपूर्ति समय देखें",

    // Hero Preview Card
    hero_card_live: "लाइव टाइमटेबल मॉनिटर",
    hero_next_supply: "अगली निर्धारित जल आपूर्ति",
    hero_expected_duration: "अपेक्षित अवधि:",
    hero_normal_pressure: "सामान्य दबाव",
    hero_consensus_title: "88% सामुदायिक सहमति",
    hero_consensus_desc: "कुकटपल्ली में 38 पड़ोसियों ने पिछले चक्र की पुष्टि की।",
    hero_advance_alert_title: "अग्रिम अलर्ट निर्धारित",
    hero_advance_alert_desc: "आपूर्ति शुरू होने से 30 मिनट पहले सूचना भेजी जाएगी।",

    // Stats Bar
    stat_localities: "हैदराबाद के शामिल इलाके",
    stat_households: "अलर्ट प्राप्त परिवार",
    stat_accuracy: "समय अधिसूचना सटीकता",
    stat_confirmations: "आज सामुदायिक पुष्टियां",

    // 3-Step Process
    how_it_works_tag: "यह कैसे काम करता है",
    how_it_works_title: "3 सरल चरणों में तैयार रहें",
    how_it_works_desc: "हैदराबाद के परिवारों के लिए अप्रत्याशित जल आपूर्ति समय की समस्या को हल करने के लिए डिज़ाइन किया गया।",
    step1_title: "अपना इलाका चुनें",
    step1_desc: "हैदराबाद में अपना क्षेत्र चुनें (कुकटपल्ली, मियापुर, अमीरपेट, गाचीबाउली आदि) या अपनी आवासीय कॉलोनी दर्ज करें।",
    step2_title: "आपूर्ति समय जांचें",
    step2_desc: "अपने अगले आपूर्ति स्लॉट के लिए लाइव उलटी गिनती के साथ अपेक्षित घंटे, अवधि और दबाव अनुमान देखें।",
    step3_title: "अलर्ट पाएं और पुष्टि करें",
    step3_desc: "समय में बदलाव या पाइपलाइन में देरी की त्वरित सूचना पाएं। नल में पानी आने पर पड़ोसियों की मदद के लिए एक क्लिक में पुष्टि करें।",

    // Features Section
    features_tag: "सिस्टम की विशेषताएं",
    features_title: "नागरिक सुविधा और उत्कृष्टता के लिए निर्मित",
    features_desc: "पारदर्शी कार्यक्रम और जन सत्यापन के साथ शहरी जल अनिश्चितता से निपटने वाला एक वास्तविक नागरिक मंच।",
    feat1_title: "अग्रिम अलर्ट",
    feat1_desc: "आपूर्ति शुरू होने से पहले ही सूचना प्राप्त करें ताकि आप पानी के टैंक और मोटर तैयार रख सकें।",
    feat2_title: "समय सारिणी अपडेट",
    feat2_desc: "जब भी समय में बदलाव हो, मरम्मत कार्य हो या देरी हो, वास्तविक समय पर अलर्ट प्राप्त करें।",
    feat3_title: "सामुदायिक पुष्टि",
    feat3_desc: "नागरिक रिपोर्ट करते हैं कि क्या पानी आ गया है, जिससे नगर निगम आपूर्ति के दबाव का सत्यापन होता है।",
    feat4_title: "आपूर्ति रिकॉर्ड",
    feat4_desc: "पारदर्शी आपूर्ति लॉग, अवधि रुझान और समय की पाबंदी के मीट्रिक इंटरैक्टिव चार्ट के साथ देखें।",

    // Official Portals Section (User Requested Websites)
    portals_tag: "आधिकारिक नगर निगम संसाधन",
    portals_title: "हैदराबाद आधिकारिक जल एवं नगर निगम पोर्टल",
    portals_subtitle: "नागरिक सेवाओं, शिकायत निवारण और सार्वजनिक अपडेट के लिए तेलंगाना सरकार, HMWSSB और GHMC के आधिकारिक पोर्टल्स और सोशल हैंडल्स के सीधे लिंक।",
    portals_view_all_link: "सभी पोर्टल खोलें",

    // Official Cards
    card_hmwssb_badge: "HMWSSB",
    card_hmwssb_title: "HMWSSB Website",
    card_hmwssb_desc: "हैदराबाद मेट्रोपॉलिटन जल आपूर्ति और सीवरेज बोर्ड आधिकारिक पोर्टल",
    card_hmwssb_btn: "आधिकारिक वेबसाइट खोलें",

    card_hmwssb_x_badge: "HMWSSB",
    card_hmwssb_x_title: "HMWSSB X",
    card_hmwssb_x_desc: "आधिकारिक HMWSSB जनसेवा सलाह और व्यवधान अलर्ट",
    card_hmwssb_x_btn: "आधिकारिक X खाता खोलें",

    card_ghmc_badge: "GHMC",
    card_ghmc_title: "GHMC Website",
    card_ghmc_desc: "ग्रेटर हैदराबाद नगर निगम आधिकारिक पोर्टल",
    card_ghmc_btn: "आधिकारिक वेबसाइट खोलें",

    card_ghmc_x_badge: "GHMC",
    card_ghmc_x_title: "GHMC X",
    card_ghmc_x_desc: "आधिकारिक GHMC नागरिक और नगर निगम समन्वय अपडेट",
    card_ghmc_x_btn: "आधिकारिक X खाता खोलें",

    card_new_tab: "नया टैब ↗",
    helpline_hmwssb: "HMWSSB कस्टमर केयर हेल्पलाइन: 155313",
    helpline_ghmc: "GHMC सिटिजन हेल्पलाइन: 040-21111111",

    // Dashboard View
    dash_heading: "इलाका डैशबोर्ड",
    dash_greeting_default: "नमस्ते! यहाँ आपके इलाके के लिए आज की जल आपूर्ति स्थिति है।",
    dash_btn_new_locality: "नया इलाका",
    dash_duration: "अवधि:",
    dash_expected_pressure: "अपेक्षित दबाव:",
    dash_status_note_default: "सामान्य एक दिन छोड़कर जल चक्र",
    dash_countdown_label: "अपेक्षित आपूर्ति के लिए उलटी गिनती (सिमुलेटेड)",
    dash_cd_hours: "घंटे",
    dash_cd_minutes: "मिनट",
    dash_cd_seconds: "सेकंड",
    dash_confirm_question: "क्या आज आपके नल में पानी आया?",
    dash_confirm_yes: "हाँ, आ गया",
    dash_confirm_no: "नहीं, अभी नहीं",
    dash_confirm_reported_yes: "आपने आज पानी आने की पुष्टि की है। समुदाय की मदद करने के लिए धन्यवाद!",
    dash_confirm_reported_no: "आपने रिपोर्ट किया है कि पानी अभी नहीं आया है। यह जानकारी मॉनिटर को भेज दी गई है।",
    dash_recent_alerts_title: "क्षेत्रीय अलर्ट और घोषणाएं",
    dash_view_all_link: "सभी देखें →",
    dash_consensus_title: "सामुदायिक सहमति",
    dash_consensus_sub_prefix: "वर्तमान आपूर्ति चक्र के लिए पानी मिलने की पुष्टि: ",
    dash_btn_open_community: "सामुदायिक रिपोर्ट खोलें",
    dash_metadata_title: "आपूर्ति विवरण",
    dash_meta_zone: "ज़ोन:",
    dash_meta_station: "पंपिंग स्टेशन:",
    dash_meta_frequency: "आपूर्ति आवृत्ति:",
    dash_meta_freq_val: "एक दिन छोड़कर",
    dash_meta_status: "वर्तमान स्थिति:",

    // Supply Schedule View
    sch_title: "जल आपूर्ति समय सारिणी",
    sch_subtitle: "हैदराबाद के इलाकों के लिए आधिकारिक समय और लाइव स्थिति।",
    sch_filter_all: "सभी तारीखें",
    sch_filter_today: "आज",
    sch_filter_tomorrow: "कल",
    sch_filter_upcoming: "आगामी",
    sch_status_all: "सभी स्थितियां",
    sch_th_date: "तारीख",
    sch_th_time: "अपेक्षित समय अवधि",
    sch_th_status: "स्थिति",
    sch_th_updated: "अंतिम टेलीमेट्री अपडेट",
    sch_th_note: "वाल्व और पंपिंग स्टेशन नोट",
    sch_th_actions: "कार्रवाई",
    sch_btn_info: "जानकारी",

    // Notifications View
    notif_title: "वेबसाइट अधिसूचना केंद्र",
    notif_subtitle: "अग्रिम चेतावनियों, दबाव परिवर्तनों और रखरखाव घोषणाओं का लाइव लॉग।",
    notif_btn_mark_read: "सभी को पढ़ा हुआ चिह्नित करें",
    notif_cat_all: "सभी अलर्ट",
    notif_cat_advance: "अग्रिम अलर्ट",
    notif_cat_update: "अपडेट और देरी",
    notif_cat_arrival: "पानी आगमन",

    // Community View
    comm_title: "सामुदायिक जल आगमन सत्यापन",
    comm_subtitle: "पारदर्शिता बनाए रखने के लिए हैदराबाद के नागरिक वास्तविक समय में पानी आने की पुष्टि कर रहे हैं।",
    comm_card_title: "आज की जल आपूर्ति की पुष्टि करें",
    comm_loc_label: "इस इलाके के लिए पुष्टि कर रहे हैं:",
    comm_q_arrived: "क्या आपके घर पानी आना शुरू हो गया है?",
    comm_opt_yes: "हाँ, आ गया",
    comm_opt_no: "नहीं, अभी भी प्रतीक्षा में हैं",
    comm_pressure_label: "देखा गया पानी का दबाव:",
    comm_pressure_normal: "सामान्य / पर्याप्त",
    comm_pressure_low: "कम / धीमी धार",
    comm_pressure_high: "उच्च दबाव",
    comm_notes_label: "टिप्पणी (वैकल्पिक):",
    comm_notes_placeholder: "उदा. पानी 10 मिनट पहले आया, साफ पानी, अच्छा दबाव...",
    comm_btn_submit: "पुष्टि सबमिट करें",
    comm_feed_title: "सामुदायिक फ़ीड और पड़ोसियों की रिपोर्ट",

    // Records View
    records_title: "आपूर्ति रिकॉर्ड और विश्वसनीयता विश्लेषण",
    records_subtitle: "ऐतिहासिक रिकॉर्ड, समय की पाबंदी और आपूर्ति अवधि का विश्लेषण।",
    records_card_duration: "आपूर्ति अवधि रुझान (घंटे)",
    records_card_variance: "समयबद्धता (मिनटों में भिन्नता)",
    records_table_title: "ऐतिहासिक आपूर्ति लॉग",
    records_th_date: "तारीख",
    records_th_expected: "अपेक्षित समय",
    records_th_actual: "वास्तविक आपूर्ति समय",
    records_th_duration: "अवधि",
    records_th_status: "स्थिति",
    records_th_variance: "भिन्नता",

    // Status Badges
    status_scheduled: "निर्धारित",
    status_delayed: "विलंबित",
    status_updated: "अपडेट किया गया",
    status_completed: "पूर्ण",
    status_in_progress: "प्रगति पर है",

    // Relative Dates
    date_today: "आज",
    date_tomorrow: "कल",
    date_yesterday: "कल",

    // Pressure
    pressure_normal_txt: "सामान्य",
    pressure_low_txt: "कम",
    pressure_high_txt: "उच्च",

    // Footer
    footer_desc: "स्मार्ट सामुदायिक जल आपूर्ति सूचना प्रणाली। हैदराबाद के निवासियों को जल आपूर्ति समय से अवगत कराने और पानी का भंडारण करने में मदद करती है।",
    footer_loc: "डिफ़ॉल्ट स्थान: <strong>हैदराबाद, तेलंगाना, भारत</strong>",
    footer_pages_title: "प्लेटफ़ॉर्म पृष्ठ",
    footer_official_title: "आधिकारिक सरकारी पोर्टल",
    footer_research_title: "परियोजना और सिमुलेशन",
    footer_notice_title: "आइडियाथॉन प्रोटोटाइप सूचना",
    footer_notice_desc: "छात्र आइडियाथॉन प्रोटोटाइप के रूप में विकसित। Firebase और HMWSSB टेलीमेट्री API के साथ एकीकरण के लिए डिज़ाइन किया गया।",
    footer_prototype_active: "प्रोटोटाइप सक्रिय",
    footer_copy: "© 2026 वाटरवॉच – स्मार्ट सामुदायिक जल आपूर्ति सूचना प्रणाली।",
    footer_made_with: "हैदराबाद के नागरिकों के लिए ❤️ से निर्मित।"
  }
};

// Localized Locality Names
const LOCALITY_TRANSLATIONS = {
  "Kukatpally": { te: "కూకట్‌పల్లి", hi: "कुकटपल्ली" },
  "Miyapur": { te: "మియాపూర్", hi: "मियापुर" },
  "Ameerpet": { te: "అమీర్‌పేట్", hi: "अमीरपेट" },
  "Dilsukhnagar": { te: "దిల్‍సుఖ్‌నగర్", hi: "दिलसुखनगर" },
  "LB Nagar": { te: "ఎల్బీ నగర్", hi: "एलबी नगर" },
  "Gachibowli": { te: "గచ్చిబౌలి", hi: "गाचीबाउली" },
  "Madhapur": { te: "మాదాపూర్", hi: "माधापुर" },
  "Mehdipatnam": { te: "మెహదీపట్నం", hi: "मेहदीपटनम" },
  "Uppal": { te: "ఉప్పల్", hi: "उप्पल" },
  "Secunderabad": { te: "సికింద్రాబాద్", hi: "सिकंदराबाद" },
  "Begumpet": { te: "బేగంపేట్", hi: "बेगमपेट" },
  "Banjara Hills": { te: "బంజారా హిల్స్", hi: "बंजारा हिल्स" }
};

// i18n Controller
const i18n = {
  currentLang: localStorage.getItem("waterwatch_lang") || "en",

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  },

  getLanguage() {
    return this.currentLang;
  },

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = "en";
    this.currentLang = lang;
    localStorage.setItem("waterwatch_lang", lang);
    this.applyLanguage(lang);

    window.dispatchEvent(new CustomEvent("languageChanged", {
      detail: { lang: this.currentLang }
    }));
  },

  t(key, fallback = "") {
    const langObj = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    if (langObj && langObj[key] !== undefined) {
      return langObj[key];
    }
    const fallbackObj = TRANSLATIONS.en;
    if (fallbackObj && fallbackObj[key] !== undefined) {
      return fallbackObj[key];
    }
    return fallback || key;
  },

  getLocalityName(loc) {
    if (!loc) return "";
    const lang = this.currentLang;
    if (lang === "en") return loc;
    const trans = LOCALITY_TRANSLATIONS[loc];
    if (trans && trans[lang]) {
      return `${loc} (${trans[lang]})`;
    }
    return loc;
  },

  translateStatus(status) {
    if (!status) return "";
    const key = `status_${status.toLowerCase().replace(/\s+/g, "_")}`;
    return this.t(key, status);
  },

  translatePressure(pressure) {
    if (!pressure) return "";
    const key = `pressure_${pressure.toLowerCase().replace(/\s+/g, "_")}_txt`;
    return this.t(key, pressure);
  },

  translateDate(dateStr) {
    if (!dateStr) return "";
    const dLower = dateStr.toLowerCase();
    if (dLower === "today") return this.t("date_today", "Today");
    if (dLower === "tomorrow") return this.t("date_tomorrow", "Tomorrow");
    if (dLower === "yesterday") return this.t("date_yesterday", "Yesterday");
    return dateStr;
  },

  applyLanguage(lang) {
    document.documentElement.lang = lang;

    // Translate all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = this.t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // Titles
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      const translation = this.t(key);
      if (translation) {
        el.title = translation;
      }
    });

    // Sync header dropdown if exists
    const select = document.getElementById("headerLanguageSelect");
    if (select) {
      select.value = lang;
    }

    // Sync mobile pills if exist
    document.querySelectorAll(".lang-pill-btn").forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  bindEvents() {
    const select = document.getElementById("headerLanguageSelect");
    if (select) {
      select.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
      });
    }

    document.querySelectorAll(".lang-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        this.setLanguage(lang);
      });
    });
  }
};

window.i18n = i18n;
window.TRANSLATIONS = TRANSLATIONS;
window.LOCALITY_TRANSLATIONS = LOCALITY_TRANSLATIONS;

document.addEventListener("DOMContentLoaded", () => {
  window.i18n.init();
});
