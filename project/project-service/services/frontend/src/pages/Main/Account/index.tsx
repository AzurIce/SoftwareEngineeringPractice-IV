import { Add, Delete, Edit } from "@suid/icons-material";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For } from "solid-js";

function createData(
  id: number,
  username: string,
) {
  return { id, username };
}

const rows = [
  createData(1, "admin1"),
  createData(2, "admin2"),
  createData(3, "admin3"),
  createData(4, "admin4"),
  createData(5, "admin5"),
];

const Account: Component = () => {
  return <>
    <div class="m-4 w-full flex flex-col gap-4">
      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">管理员列表</Typography>
        <ButtonGroup>
          <Button>添加账号<Add /></Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>用户名</TableCell>
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
                    <TableCell>{row.username}</TableCell>
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

export default Account;