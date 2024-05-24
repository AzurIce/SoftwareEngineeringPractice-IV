import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Component, For, Show, createSignal } from "solid-js";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Add, Edit } from "@suid/icons-material";
import AreaAddBikeModal from "../../../components/Bike/AreaAddBikeModal";
import AreaView from "../../../components/Mapbox/AreaView";
import { DeleteAreaButton } from "../../../components/Area";
import { getArea } from "../../../lib/store";

const Area: Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const area = createAsync(() => getArea(parseInt(params.id)));
  const targetAreaIdSignal = createSignal<number | undefined>()
  const [targetAreaId, setTargetAreaId] = targetAreaIdSignal;

  const onEdit = () => { }

  return <>
    <AreaAddBikeModal targetAreaId={targetAreaIdSignal} />
    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Show when={area() != undefined}>
        <div class="flex justify-between">
          <Typography variant="h6">骑行区 - {area()?.name}</Typography>

          <ButtonGroup>
            <Button onClick={onEdit}>编辑骑行区<Edit /></Button>
            <DeleteAreaButton target={() => area()!} then={() => navigate(`/bike`)}/>
          </ButtonGroup>
        </div>
        <span>中心经纬度: {area()?.lng}, {area()?.lat}</span>

        <AreaView area={area()!} />

      </Show>
    </Paper>

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Show when={area() != undefined}>
        <div class="flex justify-between">
          <Typography variant="h6">单车列表</Typography>

          <ButtonGroup>
            <Button onClick={() => { setTargetAreaId(area()!.id) }}>添加单车<Add /></Button>
          </ButtonGroup>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>经度</TableCell>
                <TableCell>纬度</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={area()?.bikes}>
                {(item) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.uid}
                    </TableCell>
                    <TableCell>
                      {item.lng}
                      {/* <Show when={item.id == 1}>
                      <Chip label="Super Admin" color="error" size="small" sx={{ marginLeft: 1 }} />
                    </Show>
                    <Show when={item.id == user()?.id}>
                      <Chip label="You" color="primary" size="small" sx={{ marginLeft: 1 }} />
                    </Show> */}
                    </TableCell>
                    <TableCell>
                      {item.lat}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        {/* <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 1 || user()?.id != 1}>
                        <Edit />
                      </Button>
                      <Button onClick={() => setDeleteTarget(item)} disabled={item.id == 1 || user()?.id != 1}>
                        <Delete />
                      </Button> */}
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </Show>
    </Paper>

  </>
}

export default Area;