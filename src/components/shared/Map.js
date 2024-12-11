import { useEffect, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const Map = ({ center, zoom, markers }) => {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }

    // Add markers
    if (markers && mapRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = markers.map(
        ({ position, title }) =>
          new window.google.maps.Marker({
            position,
            map: mapRef.current,
            title,
          })
      );
    }
  }, [center, zoom, markers]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

const WrappedMap = (props) => (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
    <Map {...props} />
  </Wrapper>
);

export default WrappedMap; 