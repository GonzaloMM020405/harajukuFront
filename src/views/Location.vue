<template>
  <div id="map" style="height: 500px; width: 100%"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Home',
  mounted() {
    // Corregir iconos en Vite/Webpack
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url),
      iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url),
      shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    })

    // Coordenadas de Saltillo, Coahuila
    const lat = 25.427668260885596
    const lng = -101.0029158251367

    const map = L.map('map').setView([lat, lng], 15) // Zoom más cercano

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup('📍 Harajuku Beauty Shop - Saltillo, Coahuila')
      .openPopup()
  }
}
</script>
