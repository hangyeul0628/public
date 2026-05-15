import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapSection = () => {
  const position = [37.527215, 126.979581]; // 국립중앙박물관 정문 좌표
  const styles = {
    container: {
      width: '100%',
      height: '400px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--color-glass-border)',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '12px',
      color: 'var(--color-text-title)',
    },
    wrapper: {
      marginTop: '40px',
    },
  };

  return (
    <section style={styles.wrapper} aria-labelledby="map-title">
      <h2 id="map-title" style={styles.title}>우리 박물관 위치</h2>
      <div style={styles.container}>
        <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              국립중앙박물관 정문
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default MapSection;
