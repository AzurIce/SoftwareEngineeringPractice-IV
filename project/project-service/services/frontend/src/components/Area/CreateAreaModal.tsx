import { Box, Button, ButtonGroup, Modal, TextField, Typography, useTheme } from "@suid/material";
import { Component, Signal, createSignal } from "solid-js";
import { createArea } from "../../lib/axios/bike";
import { LngLat, getAreas } from "../../lib/store";
import { revalidate } from "@solidjs/router";
import Mapbox from "../Mapbox";
import { Clear } from "@suid/icons-material";

const CreateAreaModal: Component<{ open: Signal<boolean> }> = (props) => {
  const [name, setName] = createSignal("")
  const pointsSignal = createSignal<LngLat[]>([]);
  const [points, setPoints] = pointsSignal;

  const [open, setOpen] = props.open
  const theme = useTheme()

  const onSubmit = () => {
    createArea(name(), points()).then((res) => {
      revalidate(getAreas.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setName("")
    setOpen(false)
  }

  return <>
    <Modal
      open={open()}
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
          minWidth: "400px",
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
          添加骑行区
        </Typography>

        <div class='flex flex-col gap-2'>
          <TextField
            size='small'
            label="名称"
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
        </div>

        <div class="flex flex-col gap-2">
          <Box sx={{ width: "100%", height: 200 }}>
            <Mapbox pointsSignal={pointsSignal} addMode={() => true}/>
          </Box>
          <ButtonGroup>
            <Button onClick={() => setPoints([])}><Clear /></Button>
          </ButtonGroup>
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}

export default CreateAreaModal;