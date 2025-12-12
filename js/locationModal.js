// Location Modal Functions
let modalMap = null;
let modalTimeInterval = null;
let modalAutoCloseTimeout = null;

function openLocationModal(lat, lng, name) {
  const modal = document.getElementById("location-modal");
  if (!modal) return;

  // Update modal header
  document.getElementById("modal-location-name").textContent = name;
  document.getElementById("modal-location-coords").textContent = `${lat.toFixed(
    6
  )}°, ${lng.toFixed(6)}°`;
  document.getElementById("modal-coords").textContent = `${lat.toFixed(
    6
  )}°, ${lng.toFixed(6)}°`;

  // Update external links
  document.getElementById(
    "modal-google-maps"
  ).href = `https://www.google.com/maps?q=${lat},${lng}`;
  document.getElementById(
    "modal-openstreetmap"
  ).href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=15`;

  // Show modal
  modal.classList.add("active");

  // Lock body scroll completely
  document.body.classList.add("modal-open");
  document.documentElement.style.overflow = "hidden";

  // Initialize map
  setTimeout(() => {
    initModalMap(lat, lng, name);
    getModalAddress(lat, lng);
    getModalWeather(lat, lng);
    startModalTime();
    initAnimatedClock(); // Start animated clock icon
  }, 100);

  // Auto close after 5 minutes (300000 ms)
  modalAutoCloseTimeout = setTimeout(() => {
    closeLocationModal();
    console.log("Modal auto-closed after 5 minutes");
  }, 300000);
}

function closeLocationModal() {
  const modal = document.getElementById("location-modal");
  if (!modal) return;

  modal.classList.remove("active");

  // Unlock body scroll
  document.body.classList.remove("modal-open");
  document.documentElement.style.overflow = "";

  // Clean up map
  if (modalMap) {
    modalMap.remove();
    modalMap = null;
  }

  // Clear time interval
  if (modalTimeInterval) {
    clearInterval(modalTimeInterval);
    modalTimeInterval = null;
  }

  // Destroy animated clock
  destroyAnimatedClock();

  // Clear auto-close timeout
  if (modalAutoCloseTimeout) {
    clearTimeout(modalAutoCloseTimeout);
    modalAutoCloseTimeout = null;
  }
}

function initModalMap(lat, lng, name) {
  const mapContainer = document.getElementById("modal-map");
  if (!mapContainer) return;

  // Clear existing map
  if (modalMap) {
    modalMap.remove();
  }

  // Tile layers
  const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "&copy; Esri",
      maxZoom: 19,
    }
  );

  // Initialize map
  modalMap = L.map("modal-map", {
    center: [lat, lng],
    zoom: 15,
    zoomControl: true,
    layers: [satelliteLayer],
  });

  // Custom marker
  const markerIcon = L.divIcon({
    className: "modal-marker",
    html: '<div class="modal-marker-pin"><i class="fas fa-map-marker-alt"></i></div>',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });

  // Add marker
  L.marker([lat, lng], { icon: markerIcon })
    .addTo(modalMap)
    .bindPopup(
      `<b>${name}</b><br>Lat: ${lat.toFixed(6)}°<br>Lng: ${lng.toFixed(6)}°`
    )
    .openPopup();
}

async function getModalAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`
    );
    const data = await response.json();
    if (data.display_name) {
      document.getElementById("modal-address").textContent = data.display_name;
    }
  } catch (error) {
    document.getElementById("modal-address").textContent =
      "Không thể tải địa chỉ";
  }
}

async function getModalWeather(lat, lng) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`
    );
    const data = await response.json();

    if (data.current_weather) {
      const weather = data.current_weather;
      document.getElementById(
        "modal-weather"
      ).textContent = `${weather.temperature}°C (Gió: ${weather.windspeed} km/h)`;
    }
  } catch (error) {
    document.getElementById("modal-weather").textContent = "Không thể tải";
  }
}

function startModalTime() {
  function updateTime() {
    const now = new Date();

    // Format time HH:MM:SS
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Format date
    const weekdays = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
    const weekday = weekdays[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;

    const timeStr = `${hours}:${minutes}:${seconds}`;
    const dateStr = `${weekday}, ${day} thg ${month}`;

    document.getElementById(
      "modal-time"
    ).textContent = `${timeStr} - ${dateStr}`;
  }

  updateTime();
  if (modalTimeInterval) {
    clearInterval(modalTimeInterval);
  }
  modalTimeInterval = setInterval(updateTime, 1000);
}

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLocationModal();
  }
});

// Prevent closing on background click - modal only closes with X button or ESC
// Removed background click close functionality
