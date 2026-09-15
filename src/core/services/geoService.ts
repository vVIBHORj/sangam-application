// Non-invasive Location Service
// ONLY captures location on explicit SOS trigger or check-in action.
// Continuous background tracking is strictly prohibited.

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  addressDescription: string;
}

export const geoService = {
  // Safe default location for Indian context (New Delhi, Lajpat Nagar / Shanti Vihar)
  defaultLocation: {
    latitude: 28.5672,
    longitude: 77.2433,
    accuracyMeters: 12,
    addressDescription: 'Flat 402, Block B, Shanti Vihar, Lajpat Nagar, New Delhi',
  },

  async getCurrentLocation(): Promise<GeoCoordinate> {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracyMeters: Math.round(pos.coords.accuracy),
              addressDescription: 'Current Verified Location (GPS)',
            });
          },
          () => {
            // Permission denied or unavailable, use designated senior home coordinates
            resolve(this.defaultLocation);
          },
          { timeout: 4000, maximumAge: 60000 }
        );
      });
    }
    return this.defaultLocation;
  },
};
