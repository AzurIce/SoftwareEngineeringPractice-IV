import { Component, createSignal } from "solid-js";
import { Area } from "../../lib/store";
import { useNavigate } from "@solidjs/router";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@suid/material";
import AreaPreview from "../Mapbox/AreaPreview";
import { DeleteAreaButton } from ".";

const AreaCard: Component<{ area: Area }> = (props: { area: Area }) => {
  const { area } = props;
  const navigate = useNavigate();

  const onEnter = (area: Area) => {
    navigate(`/bike/area/${area.id}`)
  }

  return <>
    <Card sx={{ width: 400, display: "flex", flexDirection: "column" }}>
      <div class="flex">
        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div class="flex flex-col">
            <span class="text-lg font-bold">{area.name}</span>
            <div class="flex flex-col mt-2">
              <span class="text-sm text-[#777777]">latitude: {area.lat}</span>
              <span class="text-sm text-[#777777]">longitude: {area.lng}</span>
            </div>
          </div>
          <div class="flex flex-col m-t-2">
            <div class="flex gap-2 text-sm">
              <span>单车数量</span>
              <span>{area.bikes.length}(<span class="text-green-6">16</span>/<span class="text-red-5">3</span>/<span class="text-gray">1</span>)</span>
            </div>
          </div>
        </CardContent>
        <CardMedia sx={{ width: 150, height: 150 }}>
          <AreaPreview area={area} />
        </CardMedia>
      </div>
      <CardActions sx={{ display: "flex", justifyItems: "center" }}>
        <div class="flex flex items-center">
          <Button onClick={() => onEnter(area)}>进入</Button>
          <DeleteAreaButton target={() => area} then={() => navigate(`/bike`)} />
        </div>
      </CardActions>
    </Card>
  </>
}

export default AreaCard;