import React from 'react'
import { Editable, Heading } from '@chakra-ui/react'
import { SelectContent, SelectLabel, SelectRoot, SelectValueText } from './components/ui/select'
import { createListCollection, SelectItem, SelectTrigger } from '@ark-ui/react'

interface EditorProps {
  mapStyle: string
  onStyleChange: (newStyle: string) => void
  iframeWidth: string
  setIframeWidth: (width: string) => void
  iframeHeight: string
  setIframeHeight: (height: string) => void
}

export const Editor: React.FC<EditorProps> = React.memo(({ 
  mapStyle,
  onStyleChange,
  iframeWidth,
  setIframeWidth,
  iframeHeight,
  setIframeHeight,
}) => {
  return (
    <div id="editor" style={{ width: "100%", height: "100vh" }}>
      <Heading size="lg" letterSpacing="tight">
        Editor
      </Heading>
      <Heading size="md" letterSpacing="tight">
        Edit your map style
      </Heading>
      <Editable.Root
        defaultValue={mapStyle}
        onValueCommit={(details) => onStyleChange(details.value)}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
      <SelectRoot
        collection={mapStyles}
        size="md"
        onValueChange={(details) => onStyleChange(details.value[0])}
        multiple={false}
      >
        <SelectLabel>
          Or choose a style from the list below
        </SelectLabel>
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
      <Heading size="md" letterSpacing="tight">
        Set the width of the iframe
      </Heading>
      <Editable.Root
        defaultValue={iframeWidth}
        onValueCommit={(details) => setIframeWidth(details.value)}
        p={4}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
      <Heading size="md" letterSpacing="tight">
        Set the width of the iframe
      </Heading>
      <Editable.Root
        defaultValue={iframeHeight}
        onValueCommit={(details) => setIframeHeight(details.value)}
        p={4}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
    </div>
  )
})

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