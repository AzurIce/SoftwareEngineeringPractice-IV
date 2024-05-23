import { Component, Show } from "solid-js";
import { Area, LngLat } from "../../lib/store";
import { createAsync } from "@solidjs/router";
import { getAreaById } from "../../lib/axios/bike";
import { Box } from "@suid/material";
import Mapbox from ".";
import { calcZoom } from "../../lib/utils";

const AreaPreview: Component<{ area: Area }> = (props) => {
  const { area } = props;

  const _area = createAsync(() => getAreaById(area.id));
  const zoom = () => calcZoom(_area()!.points, 150);
  const center = () => _area() as LngLat;

  return <>
    <Box sx={{ width: 150, height: 150, position: "relative" }}>
      {/* an overlay to disable interact */}
      <div class="w-full h-full absolute top-0 left-0 inset-0 z-10"></div>
      <Show when={_area() != undefined}>
        <Mapbox pointsSignal={[() => _area()!.points, () => { }]}
          center={center} zoom={zoom} disableInteract={() => true}/>
      </Show>
    </Box>
  </>
}

export default AreaPreview;