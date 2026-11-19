/**
 * WaterWatch - Supply Analytics & Chart.js Integration
 * Visualizes supply duration trends, on-time reliability, and variance patterns.
 */

let durationChartInstance = null;
let statusPieChartInstance = null;

function renderSupplyCharts(localityName) {
  const locData = window.storage.getLocalityData(localityName);
  if (!locData || !locData.history) return;

  const history = [...locData.history].reverse(); // chronological order
  const labels = history.map(h => formatDisplayDate(h.date));
  const durations = history.map(h => h.duration);
  const variances = history.map(h => {
    // extract minutes from variance string e.g. "+30m" -> 30, "0m" -> 0
    const m = parseInt(h.variance.replace(/[^0-9]/g, '')) || 0;
    return h.variance.includes('-') ? -m : m;
  });

  const onTimeCount = history.filter(h => h.status === "On Time").length;
  const delayedCount = history.filter(h => h.status === "Delayed").length;
  const updatedCount = history.filter(h => h.status !== "On Time" && h.status !== "Delayed").length || 0;

  // Render Chart 1: Supply Duration Trend
  renderDurationChart(labels, durations, history.map(h => h.status));

  // Render Chart 2: Punctuality Distribution (Doughnut)
  renderPunctualityChart(onTimeCount, delayedCount, updatedCount);
}

function renderDurationChart(labels, durations, statuses) {
  const canvas = document.getElementById("durationChartCanvas");
  if (!canvas) return;

  if (typeof Chart === "undefined") {
    renderCanvasFallback(canvas, "Supply Duration Trend", "Chart.js loading...");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (durationChartInstance) {
    durationChartInstance.destroy();
  }

  // Bar colors according to status
  const barColors = statuses.map(s => s === "On Time" ? "rgba(14, 165, 233, 0.85)" : "rgba(245, 158, 11, 0.85)");
  const borderColors = statuses.map(s => s === "On Time" ? "#0284c7" : "#d97706");

  durationChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Actual Supply Duration (Hours)",
          data: durations,
          backgroundColor: barColors,
          borderColor: borderColors,
          borderWidth: 2,
          borderRadius: 6,
          barThickness: 28,
          order: 2
        },
        {
          label: "Scheduled Benchmark (2.5 hrs)",
          data: labels.map(() => 2.5),
          type: "line",
          borderColor: "#059669",
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#059669",
          fill: false,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 14,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 500 },
            color: "#334155"
          }
        },
        tooltip: {
          backgroundColor: "#0f172a",
          titleFont: { size: 13, weight: 600 },
          bodyFont: { size: 12 },
          padding: 10,
          callbacks: {
            afterBody: (context) => {
              const idx = context[0].dataIndex;
              return `Status: ${statuses[idx]}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 3.5,
          title: {
            display: true,
            text: "Hours of Water Supplied",
            color: "#64748b",
            font: { size: 12, weight: 500 }
          },
          grid: { color: "rgba(226, 232, 240, 0.6)" },
          ticks: { color: "#64748b" }
        },
        x: {
          grid: { display: false },
          ticks: { color: "#64748b", maxRotation: 45, minRotation: 0 }
        }
      }
    }
  });
}

function renderPunctualityChart(onTime, delayed, updated) {
  const canvas = document.getElementById("punctualityChartCanvas");
  if (!canvas) return;

  if (typeof Chart === "undefined") {
    renderCanvasFallback(canvas, "Reliability Breakdown", "Chart.js loading...");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (statusPieChartInstance) {
    statusPieChartInstance.destroy();
  }

  const total = onTime + delayed + updated;
  const onTimePct = total ? Math.round((onTime / total) * 100) : 0;

  statusPieChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["On Time", "Delayed Start", "Rescheduled / Adjusted"],
      datasets: [
        {
          data: [onTime, delayed, updated],
          backgroundColor: [
            "rgba(16, 185, 129, 0.85)", // green
            "rgba(245, 158, 11, 0.85)", // amber
            "rgba(59, 130, 246, 0.85)"  // blue
          ],
          borderColor: ["#10b981", "#f59e0b", "#3b82f6"],
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
            color: "#334155"
          }
        },
        tooltip: {
          backgroundColor: "#0f172a",
          padding: 10
        }
      }
    }
  });

  // Update center gauge text if element exists
  const centerMetric = document.getElementById("chartReliabilityMetric");
  if (centerMetric) {
    centerMetric.textContent = `${onTimePct}%`;
  }
}

// Graceful canvas fallback if CDN is offline or blocked
function renderCanvasFallback(canvas, title, message) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0284c7";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 10);
  ctx.fillStyle = "#64748b";
  ctx.font = "12px sans-serif";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2 + 15);
}
