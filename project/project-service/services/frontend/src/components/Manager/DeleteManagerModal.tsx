import { Box, Button, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Accessor, Signal, createSignal } from "solid-js"
import { createManager, deleteManager, updateManager } from "../../lib/user"
import { createAsync, revalidate } from "@solidjs/router"
import { Manager, getManagers } from "../../lib/store"

export default function DeleteManagerModal(props: { target: Signal<Manager | undefined> }) {
  const [target, setTarget] = props.target
  const theme = useTheme()

  const onSubmit = () => {
    deleteManager(target()!.id).then((res) => {
      revalidate(getManagers.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setTarget()
  }

  return <>
    <Modal
      open={target() != undefined}
      onClose={() => { onCancel() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: "60%",
          maxWidth: "1000px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "24px",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          删除管理员账号
        </Typography>

        <div class='flex flex-col gap-2'>
          确定要删除该账号嘛？
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>确定</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}