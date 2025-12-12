// Interactive 3D Globe using Three.js
export function initGlobe() {
  const container = document.getElementById("globe-container");
  if (!container) return;

  // Check if Three.js is loaded
  if (typeof THREE === "undefined") {
    console.error("Three.js not loaded");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create globe
  const geometry = new THREE.SphereGeometry(5, 50, 50);

  // Create texture from image
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(
    "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
    () => {
      // Texture loaded successfully
    },
    undefined,
    () => {
      // Fallback to basic material if texture fails
      globe.material = new THREE.MeshPhongMaterial({
        color: 0x2194ce,
        wireframe: false,
        shininess: 30,
      });
    }
  );

  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpScale: 0.05,
    shininess: 30,
  });

  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Markers group
  const markersGroup = new THREE.Group();
  scene.add(markersGroup);

  // Function to convert lat/lng to 3D coordinates
  function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  }

  // Function to add marker at location
  function addMarker(lat, lng, color = 0x00ff00, label = "") {
    const markerRadius = 0.15;
    const markerGeometry = new THREE.SphereGeometry(markerRadius, 32, 32);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      emissive: color,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.4,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    const position = latLngToVector3(lat, lng, 5.1);
    marker.position.copy(position);

    // Add pulsing animation and store coordinates
    marker.userData = {
      originalScale: 1,
      pulseSpeed: 0.03,
      label: label,
      lat: lat,
      lng: lng,
    };

    // Add enhanced glow effect
    const glowGeometry = new THREE.SphereGeometry(markerRadius * 2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    marker.add(glow);
    glow.userData.isGlow = true;

    // Add outer glow ring
    const ringGeometry = new THREE.SphereGeometry(markerRadius * 2.5, 32, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    marker.add(ring);
    ring.userData.isGlow = true;

    markersGroup.add(marker);
    return marker;
  }

  // Get user's location and add marker
  function getUserLocation() {
    const notification = document.getElementById("location-notification");
    const allowBtn = document.getElementById("allow-location");
    const denyBtn = document.getElementById("deny-location");

    // Show notification after 2 seconds
    setTimeout(() => {
      if (notification) {
        notification.style.display = "block";
      }
    }, 2000);

    // Handle allow button
    if (allowBtn) {
      allowBtn.addEventListener("click", () => {
        if (notification) notification.style.display = "none";

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;

              // Add user marker (green)
              addMarker(
                lat,
                lng,
                0x00ff00,
                `Vị trí của bạn: ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`
              );

              // Rotate globe to show user's location
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);

              rotation.x = phi - Math.PI / 2;
              rotation.y = -theta + Math.PI;

              console.log(
                `Vị trí của bạn: ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`
              );
            },
            (error) => {
              console.log("Không thể lấy vị trí:", error.message);
              // Add default marker for Vietnam (Ho Chi Minh City)
              addMarker(
                10.8231,
                106.6297,
                0x00ff00,
                "TP. Hồ Chí Minh, Việt Nam"
              );
            }
          );
        } else {
          console.log("Trình duyệt không hỗ trợ Geolocation");
          addMarker(10.8231, 106.6297, 0x00ff00, "TP. Hồ Chí Minh, Việt Nam");
        }
      });
    }

    // Handle deny button
    if (denyBtn) {
      denyBtn.addEventListener("click", () => {
        if (notification) notification.style.display = "none";
        // Add default marker for Vietnam
        addMarker(10.8231, 106.6297, 0x00ff00, "TP. Hồ Chí Minh, Việt Nam");
      });
    }
  }

  // Call getUserLocation after globe is loaded
  getUserLocation();

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  camera.position.z = 11;

  // Create tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "globe-tooltip";
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    pointer-events: none;
    display: none;
    z-index: 1000;
    white-space: nowrap;
  `;
  container.appendChild(tooltip);

  // Raycaster for mouse picking
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Mouse move for tooltip
  container.addEventListener("mousemove", (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markersGroup.children, false);

    if (intersects.length > 0 && intersects[0].object.userData.label) {
      const marker = intersects[0].object;
      tooltip.textContent = marker.userData.label;
      tooltip.style.display = "block";
      tooltip.style.left = event.clientX - rect.left + 15 + "px";
      tooltip.style.top = event.clientY - rect.top + 15 + "px";
      container.style.cursor = "pointer";
    } else {
      tooltip.style.display = "none";
      container.style.cursor = isDragging ? "grabbing" : "grab";
    }
  });

  // Mouse interaction
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotation = { x: 0, y: 0 };

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  container.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotation.y += deltaX * 0.01;
      rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  // Touch support for mobile
  let touchStartPosition = { x: 0, y: 0 };

  container.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    touchStartPosition = { x: touch.clientX, y: touch.clientY };
    isDragging = true;
  });

  container.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartPosition.x;
      const deltaY = touch.clientY - touchStartPosition.y;

      rotation.y += deltaX * 0.01;
      rotation.x += deltaY * 0.01;

      touchStartPosition = { x: touch.clientX, y: touch.clientY };
    }
  });

  container.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Click on marker to view details
  let clickStartTime = 0;
  let clickStartPos = { x: 0, y: 0 };
  let isNavigating = false; // Flag to stop animation when navigating

  container.addEventListener("mousedown", (e) => {
    clickStartTime = Date.now();
    clickStartPos = { x: e.clientX, y: e.clientY };
  });

  container.addEventListener("click", (e) => {
    // Only trigger if it was a quick click (not a drag)
    const clickDuration = Date.now() - clickStartTime;
    const clickDistance = Math.sqrt(
      Math.pow(e.clientX - clickStartPos.x, 2) +
        Math.pow(e.clientY - clickStartPos.y, 2)
    );

    if (clickDuration < 300 && clickDistance < 5) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        markersGroup.children,
        true
      );

      if (intersects.length > 0) {
        // Find the marker (not the glow)
        let marker = intersects[0].object;

        // If clicked on glow, get parent marker
        while (marker && !marker.userData.lat && marker.parent) {
          marker = marker.parent;
        }

        console.log("Clicked marker:", marker.userData);

        if (marker.userData && marker.userData.lat && marker.userData.lng) {
          const lat = marker.userData.lat;
          const lng = marker.userData.lng;
          const name = marker.userData.label || "Vị trí của bạn";

          console.log(`Opening modal for: ${name} (${lat}, ${lng})`);

          // Open modal instead of navigating
          openLocationModal(lat, lng, name);

          // Reset globe state after a moment
          setTimeout(() => {
            isNavigating = false;
            isDragging = false;
          }, 500);
        } else {
          console.log("No location data found on marker");
        }
      }
    }
  });

  // Zoom with mouse wheel
  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(8, Math.min(20, camera.position.z));
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Stop all animation if navigating
    if (isNavigating) {
      return;
    }

    // Auto-rotate when not dragging
    if (!isDragging) {
      globe.rotation.y += 0.002;
    } else {
      globe.rotation.x = rotation.x;
      globe.rotation.y = rotation.y;
    }

    // Animate markers (pulse effect)
    markersGroup.children.forEach((marker) => {
      if (marker.userData.pulseSpeed) {
        const scale =
          1 + Math.sin(Date.now() * marker.userData.pulseSpeed) * 0.2;
        marker.scale.set(scale, scale, scale);

        // Rotate glow
        const glow = marker.children.find((child) => child.userData.isGlow);
        if (glow) {
          glow.rotation.x += 0.01;
          glow.rotation.y += 0.01;
        }
      }
    });

    // Rotate markers with globe
    markersGroup.rotation.copy(globe.rotation);

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });

  // Cleanup function
  return () => {
    container.removeChild(renderer.domElement);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
