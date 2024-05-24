import { Add, Delete, Edit } from "@suid/icons-material";
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, createSignal } from "solid-js";
import { Area, getAreas } from "../../../lib/store";
import { createAsync, useNavigate } from "@solidjs/router";
import AreaCard from "../../../components/Area/AreaCard";
import CreateAreaModal from "../../../components/Area/CreateAreaModal";

function createData(
  id: number,
  deployDate: Date,
  latitude: number,
  longitude: number,
) {
  return { id, deployDate, latitude, longitude };
}

const rows = [
  createData(1, new Date(2024, 4, 21), 45.6, 87.3),
  createData(2, new Date(2024, 4, 21), 45.6, 87.3),
  createData(3, new Date(2024, 4, 21), 45.6, 87.3),
  createData(4, new Date(2024, 4, 21), 45.6, 87.3),
  createData(5, new Date(2024, 4, 21), 45.6, 87.3),
];

const Bike: Component = () => {
  const areas = createAsync(() => getAreas());

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
              <For each={rows}>
                {(row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.deployDate.toLocaleDateString()}</TableCell>
                    <TableCell>{row.latitude}</TableCell>
                    <TableCell>{row.longitude}</TableCell>
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