import { Add, Delete, Edit } from "@suid/icons-material";
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, createSignal } from "solid-js";
import { Area, getAreas, getBikes } from "../../../lib/store";
import { createAsync, useNavigate } from "@solidjs/router";
import AreaCard from "../../../components/Area/AreaCard";
import CreateAreaModal from "../../../components/Area/CreateAreaModal";

const Bike: Component = () => {
  const areas = createAsync(() => getAreas());
  const bikes = createAsync(() => getBikes());

  const createAreaModalSignal = createSignal(false);
  const [createAreaModalOpen, setCreateAraeModalOpen] = createAreaModalSignal;

  return <>
    <CreateAreaModal open={createAreaModalSignal} />
      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">骑行区</Typography>
        <ButtonGroup>
          <Button onClick={() => setCreateAraeModalOpen(true)}>创建骑行区<Add /></Button>
        </ButtonGroup>
        <div class="flex flex-wrap gap-4">
          <For each={areas()}>
            {(area) => (
              <AreaCard area={area} />
            )}
          </For>
        </div>
      </Paper>

      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">单车列表</Typography>
        <ButtonGroup>
          <Button>添加单车<Add /></Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>部署日期</TableCell>
                <TableCell>经度</TableCell>
                <TableCell>纬度</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={bikes()}>
                {(bike) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {bike.uid}
                    </TableCell>
                    <TableCell>{bike.lat}</TableCell>
                    <TableCell>{bike.lng}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button>
                          <Edit />
                        </Button>
                        <Button>
                          <Delete />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  </>
};

export default Bike;