import { Add, Delete, Edit } from "@suid/icons-material";
import { Chip, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, Show, createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { LoginInfoStore, Manager, getManagers } from "../../../lib/store";

import CreateManagerModal from "../../../components/Manager/CreateManagerModal";
import UpdateManagerModal from "../../../components/Manager/UpdateManagerModal";
import DeleteManagerModal from "../../../components/Manager/DeleteManagerModal";

const Account: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Manager | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;
  const deleteTarget = createSignal<Manager | undefined>();
  const [getDeleteTarget, setDeleteTarget] = deleteTarget;

  const managers = createAsync(() => getManagers());
  const { user } = LoginInfoStore();

  return <>
    <CreateManagerModal open={createShow} />
    <UpdateManagerModal target={updateTarget} />
    <DeleteManagerModal target={deleteTarget} />

    <div class="m-4 w-full flex flex-col gap-4">
      <Paper sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="h6">管理员列表</Typography>
        <ButtonGroup>
          <Button onClick={() => { setCreateShow(true) }}>添加管理员账号<Add /></Button>
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
                      <span class="text-md">{item.username}</span>
                      <Show when={item.id == 1}>
                        <Chip label="Super Admin" color="error" size="small" sx={{ marginLeft: 1 }} />
                      </Show>
                      <Show when={item.id == user()?.id}>
                        <Chip label="You" color="primary" size="small" sx={{ marginLeft: 1 }} />
                      </Show>

                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 1 || user()?.id != 1}>
                          <Edit />
                        </Button>
                        <Button onClick={() => setDeleteTarget(item)} disabled={item.id == 1 || user()?.id != 1}>
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