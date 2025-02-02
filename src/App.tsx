import { Box, Code, createListCollection, Editable, Flex, Heading } from '@chakra-ui/react'
import './App.css'
import { Map, Marker } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useState } from 'react'
import { ClipboardButton, ClipboardRoot } from './components/ui/clipboard'
import { SelectContent, SelectLabel, SelectRoot, SelectValueText } from './components/ui/select'
import { SelectItem, SelectTrigger } from '@ark-ui/react'

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
  </script>
  `
  const iframeCode = `
  <iframe
    src="https://smellman.github.io/embed-maplibre/?style=${encodeURIComponent(mapStyle)}&lat=${viewState.latitude}&lng=${viewState.longitude}&zoom=${viewState.zoom}&pitch=${viewState.pitch}"
    style="width: 100%; height: 100%; border: none;"
  ></iframe>
  `
  return (
    <Flex direction="column" minH="100vh">
      <Box p={4}>
        <Heading size="3xl" letterSpacing={"tight"}>
          Generate MapLibre Snippet
        </Heading>
      </Box>
      <Flex flex="1" direction="row">
        <Box flex="1" minH="100%" position="relative">
          <Heading size="lg" letterSpacing={"tight"} position={"relative"} zIndex={1}>
            Map
          </Heading>
          <Box position="absolute" top="50px" left="0" width="100%" height="calc(100% - 50px)">
            <Map
              {...viewState}
              controller={true}
              onMove={evt => setViewState(evt.viewState)}
              style={{ width: "100%", height: "100%" }}
              hash={true}
              mapStyle={mapStyle}
            >
              <Marker longitude={viewState.longitude} latitude={viewState.latitude} />
            </Map>
          </Box>
        </Box>
        <Box flex="1" height="100%">
          <Heading size="lg" letterSpacing={"tight"}>
            Editor
          </Heading>
          <Heading size="md" letterSpacing={"tight"}>
            Edit your map style
          </Heading>
          <Editable.Root
            defaultValue={mapStyle}
            onValueCommit={details => setMapStyle(details.value)}
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
          <SelectRoot
            collection={mapStyles}
            size="md"
            onValueChange={details => setMapStyle(details.value[0])}
            multiple={false}
          >
            <SelectLabel>Or choose a style from the list below</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              {mapStyles.items.map(item => (
                <SelectItem key={item.value} item={item}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box flex="1" height="100%">
          <Heading size="lg" letterSpacing={"tight"}>
            Snippet
          </Heading>
          <ClipboardRoot value={code}>
            <ClipboardButton>Copy</ClipboardButton>
          </ClipboardRoot>
          <Box
            as="pre"
            whiteSpace="pre-wrap"
            overflow="auto"
            p="4"
            bg="gray.800"
            color="white"
            borderRadius="md"
            maxH="100vh"
            width="100%"
            textAlign="left"
          >
            <Code>{code}</Code>
          </Box>
          <Heading size="md" letterSpacing={"tight"}>
            Embed iframe
          </Heading>
          <ClipboardRoot value={iframeCode}>
            <ClipboardButton>Copy</ClipboardButton>
          </ClipboardRoot>
          <Box
            as="pre"
            whiteSpace="pre-wrap"
            overflow="auto"
            p="4"
            bg="gray.800"
            color="white"
            borderRadius="md"
            maxH="100vh"
            width="100%"
            textAlign="left"
          >
            <Code>{iframeCode}</Code>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

const mapStyles = createListCollection({
  items: [
    { label: 'OSM Bright', value: 'https://tile.openstreetmap.jp/styles/osm-bright/style.json' },
    { label: 'OSM Bright Ja', value: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json' },
    { label: 'OSM Bright En', value: 'https://tile.openstreetmap.jp/styles/osm-bright-en/style.json' },
    { label: 'Maptiler Basic Ja', value: 'https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json' },
    { label: 'Maptiler Basic En', value: 'https://tile.openstreetmap.jp/styles/maptiler-basic-en/style.json' },
    { label: 'Toner Ja', value: 'https://tile.openstreetmap.jp/styles/maptiler-toner-ja/style.json' },
    { label: 'Toner En', value: 'https://tile.openstreetmap.jp/styles/maptiler-toner-en/style.json' },
    { label: 'OSM OpenMapTiles', value: 'https://tile.openstreetmap.jp/styles/openmaptiles/style.json' },
    { label: 'community mapmaker', value: 'https://armd-02.github.io/openhc-map/tiles/osmfj_nopoi.json' },
    { label: 'Demo Tile', value: 'https://demotiles.maplibre.org/style.json' },
  ]
})

export default App
