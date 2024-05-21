import { Add, Delete, Edit } from "@suid/icons-material";
import { Button, ButtonGroup, Card, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For } from "solid-js";

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

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          id
        </Typography> */}
        <Typography variant="h5" component="div">
          骑行区名称
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          N 24°45'16.1" E 098°02'43.8"
        </Typography>
        <div class="flex flex-col">
          <div class="flex gap-2 text-sm">
            <span>单车数量</span>
            <span>20(<span class="text-green-6">16</span>/<span class="text-red-5">3</span>/<span class="text-gray">1</span>)</span>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">进入</Button>
      </CardActions>
    </Card>
  );
}

const Bike: Component = () => {
  return <>
    <div class="m-4 w-full flex flex-col gap-4">
      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">骑行区</Typography>
        <ButtonGroup>
          <Button>创建骑行区<Add /></Button>
        </ButtonGroup>
        <div class="flex flex-wrap gap-4">
          <BasicCard />
          <BasicCard />
          <BasicCard />
          <BasicCard />
          <BasicCard />
          <BasicCard />
          <BasicCard />
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
    </div>
  </>
};

export default Bike;