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

  const deleteAreaSignal = createSignal<Area | undefined>()
  const [deleteArea, setDeleteArea] = deleteAreaSignal;
  const onDelete = (area: Area) => {
    setDeleteArea(area);
  }

  return <>
    <Card sx={{ minWidth: 275, display: "flex" }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          id
        </Typography> */}
        <Typography variant="h5" component="div">
          {area.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          latitude: {area.lat}, <br />
          longitude: {area.lng}
        </Typography>
        <div class="flex flex-col">
          <div class="flex gap-2 text-sm">
            <span>单车数量</span>
            <span>20(<span class="text-green-6">16</span>/<span class="text-red-5">3</span>/<span class="text-gray">1</span>)</span>
          </div>
        </div>
      </CardContent>
      <CardMedia sx={{ width: 150, height: 150 }}>
        <AreaPreview area={area} />
      </CardMedia>
      <CardActions sx={{ display: "flex", justifyItems: "center" }}>
        <div class="flex flex-col items-center">
          <Button onClick={() => onEnter(area)}>进入</Button>
          <DeleteAreaButton target={() => area} then={() => navigate(`/bike`)} />
          <Button color="error" onClick={() => onDelete(area)}>删除</Button>
        </div>
      </CardActions>
    </Card>
  </>
}

export default AreaCard;