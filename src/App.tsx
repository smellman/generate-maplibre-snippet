import { Flex, Heading } from '@chakra-ui/react'
import './App.css'
import { Map, Marker } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useCallback, useState } from 'react'
import { Editor } from './Editor'
import { CodeSnippet } from './CodeSnippet'

function App() {
  const [viewState, setViewState] = useState({
    longitude: 140.084556,
    latitude: 36.104611,
    zoom: 12,
    pitch: 30,
  })
  const [mapStyle, setMapStyle] = useState('https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json')
  const code = `
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
  <script src="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.js"></script>
  <link href="https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.css" rel="stylesheet" />
  <div id="map"></div>
    <script>
      const latlng = [${viewState.longitude}, ${viewState.latitude}];
      const map = new maplibregl.Map({
        container: 'map',
        style: '${mapStyle}',
        center: latlng,
        zoom: ${viewState.zoom},
        pitch: ${viewState.pitch},
      });
      map.addControl(new maplibregl.NavigationControl());
      map.addControl(new maplibregl.GlobeControl());
      const marker = new maplibregl.Marker()
        .setLngLat(latlng)
        .addTo(map);
      const popup = new maplibregl.Popup()
        .setHTML('<a href="https://www.openstreetmap.org/?mlat=${viewState.latitude}&mlon=${viewState.longitude}&zoom=${Math.floor(viewState.zoom)}" target="_blank">Open OpenStreetMap</a>')
      marker.setPopup(popup)
  </script>
  `
  const [iframeWidth, setIframeWidth] = useState('100%')
  const [iframeHeight, setIframeHeight] = useState('100%')
  const [geoUri, setGeoUri] = useState(`geo:${viewState.latitude},${viewState.longitude}?z=${viewState.zoom}`)
  const setGeoUriAndViewState = useCallback((geoUri: string) => {
    setGeoUri(geoUri)
    const [latitude, longitude] = geoUri.match(/geo:(.*),(.*)/)!.slice(1).map(parseFloat) as [number, number]
    const zoom = parseInt(geoUri.match(/z=(.*)/)![1])
    setViewState({ latitude, longitude, zoom, pitch: viewState.pitch })
  }, [viewState.pitch])
  const iframeCode = `
  <iframe
    src="https://smellman.github.io/embed-maplibre/?style=${encodeURIComponent(mapStyle)}&geoUri=${encodeURIComponent(geoUri)}&pitch=${viewState.pitch}"
    style="width: ${iframeWidth}; height: ${iframeHeight}; border: none;"
  ></iframe>
  `
  const openGoogleMaps = `
  <a href="https://www.google.com/maps?q=${viewState.latitude},${viewState.longitude}&z=${Math.floor(viewState.zoom)}" target="_blank">Open Google Maps</a>
  `
  return (
    <>
      <Heading size="3xl" letterSpacing={"tight"}>
        Generate MapLibre Snippet
      </Heading>
      <Flex flex="1">
        <div id="map" style={{ width: "100%", height: "100vh" }}>
          <Heading size="lg" letterSpacing={"tight"}>
            Map
          </Heading>
          <Map
            {...viewState}
            controller={true}
            onMove={evt => {
              setViewState(evt.viewState)
              setGeoUri(`geo:${evt.viewState.latitude},${evt.viewState.longitude}?z=${evt.viewState.zoom}`)
            }}
            style={{ width: "100%", height: "100vh" }}
            hash={true}
            mapStyle={mapStyle}
          >
            <Marker longitude={viewState.longitude} latitude={viewState.latitude} />
          </Map>
        </div>
        <Editor
          mapStyle={mapStyle}
          onStyleChange={setMapStyle}
          iframeWidth={iframeWidth}
          setIframeWidth={setIframeWidth}
          iframeHeight={iframeHeight}
          setIframeHeight={setIframeHeight}
          setGeoUri={setGeoUriAndViewState}
        />
        <CodeSnippet
          code={code}
          iframeCode={iframeCode}
          openGoogleMaps={openGoogleMaps}
        />
      </Flex>
    </>
  )
}

export default App
