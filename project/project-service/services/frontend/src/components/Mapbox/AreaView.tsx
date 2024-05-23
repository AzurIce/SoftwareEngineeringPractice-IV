import { Component, Show, createEffect, createSignal } from "solid-js";
import { Area, LngLat } from "../../lib/store";
import { createAsync } from "@solidjs/router";
import { getAreaById } from "../../lib/axios/bike";
import { Box, Button, ButtonGroup } from "@suid/material";
import { calcZoom } from "../../lib/utils";
import { CenterFocusStrong, CropFree } from "@suid/icons-material";

import Mapbox from ".";

const AreaView: Component<{ area: Area }> = (props) => {
  const { area } = props;

  const _area = createAsync(() => getAreaById(area.id));
  const _zoom = () => calcZoom(_area()!.points, 400);
  const _center = () => _area() as LngLat;

  const [center, setCenter] = createSignal({ lng: 0, lat: 0 });
  const [zoom, setZoom] = createSignal(0);
  createEffect(() => {
    if (_area() == undefined) return;
    setZoom(_zoom())
  })
  createEffect(() => {
    if (_area() == undefined) return;
    setCenter(_center())
  })

  return <>
    <div class="w-full flex flex-col gap-2">
      <Box sx={{ width: "100%", height: 400 }}>
        <Show when={_area() != undefined}>
          <Mapbox pointsSignal={[() => _area()!.points, () => { }]}
            center={center} zoom={zoom} />
        </Show>
      </Box>
      <ButtonGroup>
        <Button onClick={() => {
          setCenter({ lng: 0, lat: 0 })
          setCenter(_center())
        }} disabled={_area() == undefined}>回到中心<CenterFocusStrong /></Button>
        <Button onClick={() => {
          setZoom(0)
          setZoom(_zoom())
        }} disabled={_area() == undefined}>重设缩放<CropFree /></Button>
      </ButtonGroup>
    </div>
  </>
}

export default AreaView;