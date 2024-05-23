import { Box, Button, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createSignal } from "solid-js"
import { revalidate } from "@solidjs/router"
import { getArea, getAreas } from "../../lib/store"
import { areaAddBike } from "../../lib/axios/bike"

export default function AreaAddBikeModal(props: { targetAreaId: Signal<number|undefined> }) {
  const [targetAreaId, setTargetAreaId] = props.targetAreaId
  const theme = useTheme()

  const [id, setId] = createSignal("")
  const [lng, setLng] = createSignal("")
  const [lat, setLat] = createSignal("")

  const onSubmit = () => {
    areaAddBike(targetAreaId()!, parseInt(id()!), parseFloat(lng()!), parseFloat(lat()!)).then((res) => {
      revalidate(getArea.keyFor(targetAreaId()!))
      revalidate(getAreas.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setId("")
    setLng("")
    setLat("")
    setTargetAreaId()
  }

  return <>
    <Modal
      open={targetAreaId() != undefined}
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
          添加管理员账号
        </Typography>

        <div class='flex flex-col gap-2'>
          <TextField
            size='small'
            label="车辆 id"
            value={id()}
            onChange={(_event, value) => {
              setId(value)
            }} />
          <TextField
            size='small'
            label="经度"
            value={lng()}
            onChange={(_event, value) => {
              setLng(value)
            }}
          />
          <TextField
            size='small'
            label="纬度"
            value={lat()}
            onChange={(_event, value) => {
              setLat(value)
            }}
          />
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}