import { Add, Delete, Edit, Key, Password } from "@suid/icons-material";
import { Chip, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, Show, createSignal, onMount } from "solid-js";
import CreateAdminModal from "../../../components/CreateAdminModal";
import { createAsync, revalidate } from "@solidjs/router";
import { getManagers } from "../../../lib/store";
import { deleteManager } from "../../../lib/user";

function createData(
  id: number,
  username: string,
) {
  return { id, username };
}

const admins = [
  createData(1, "admin1"),
  createData(2, "admin2"),
  createData(3, "admin3"),
  createData(4, "admin4"),
  createData(5, "admin5"),
];

const Account: Component = () => {
  const showSignal = createSignal(false);
  const [show, setShow] = showSignal;

  const managers = createAsync(() => getManagers());

  const onDelete = (id: number) => {
    deleteManager(id).then((res) => {
      revalidate(getManagers.key);
    })
  }

  return <>
    <CreateAdminModal open={showSignal}/>

    <div class="m-4 w-full flex flex-col gap-4">
      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">管理员列表</Typography>
        <ButtonGroup>
          <Button onClick={() => { setShow(true) }}>添加管理员账号<Add /></Button>
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
              <For each={managers()}>
                {(item) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell>
                      {item.username}
                      <Show when={item.id == 1}>
                        <Chip label="Super Admin" color="error" size="small" sx={{marginLeft: 2}}/>
                      </Show>
                      </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button disabled={item.id == 1}>
                          <Key />
                        </Button>
                        <Button onClick={() => onDelete(item.id)} disabled={item.id == 1}>
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