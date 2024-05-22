import { Component, Signal, createEffect, createSignal, createUniqueId, onMount } from "solid-js";

import mapboxgl, { LngLatLike }  from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Feature, Polygon } from "geojson";
import { LngLat } from "../../lib/store";

type MapBoxProps = {
  pointsSignal?: Signal<LngLat[]>,
  center?: LngLat,
  zoom?: number,
}

const Mapbox: Component<MapBoxProps> = (props: MapBoxProps) => {
  let id = createUniqueId();
  let map: mapboxgl.Map | undefined = undefined;
  let center: LngLatLike = props.center ? props.center : [116.33743, 39.94977];
  let zoom = props.zoom != undefined ? props.zoom : 14;


  // let [points, setPoints] = createSignal<{ lng: number, lat: number }[]>([]);
  const [points, setPoints] = props.pointsSignal ? props.pointsSignal : createSignal<LngLat[]>([]);
  createEffect(() => {
    console.log(points())
  })

  const [addMode, setAddMode] = createSignal(false);

  let geoJsonData = () => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          points().map((p) => [p.lng, p.lat])
        ]
      } as Polygon,
    } as Feature
  }

  createEffect(() => {
    points();

    if (map != undefined) {
      (map!.getSource("polygon") as mapboxgl.GeoJSONSource).setData(geoJsonData())
    }
  })

  onMount(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYXp1cmljZSIsImEiOiJjbGp3NmM5OHkwOWdxM2Vwa2Jjb2tjdzZnIn0.-Ohkio-ahwFWJT3BcckSuA";
    let _map = new mapboxgl.Map({
      container: id, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center, // starting position [lng, lat]
      zoom, // starting zoom
    });

    _map.on('click', (e) => {
      if (addMode()) {
        setPoints([...points(), e.lngLat]);
      }
    });

    _map.on('load', (e) => {
      _map.addSource("polygon", {
        type: "geojson",
        data: geoJsonData()
      } as unknown as mapboxgl.GeoJSONSource)
      _map.addLayer({
        'id': 'polygon',
        'type': 'fill',
        'source': 'polygon', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      });

      map = _map;
    })
  })
  return <>
    <div id={id} style="width: 100%; height: 100%;"></div>
  </>
}

export default Mapbox;