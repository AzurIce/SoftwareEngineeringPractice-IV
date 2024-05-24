

import { Accessor, Component, Signal, createSignal } from "solid-js"
import { revalidate } from "@solidjs/router"
import { Manager, getManagers } from "../../lib/store"
import { Button } from "@suid/material"
import { deleteManager } from "../../lib/axios/auth"
import { DeleteButton } from "../common"

// export const DeleteManagerModal = DeleteModal<Manager>("管理员账号", deleteManager, (id) => {
//   revalidate(getManagers.key)
// });

export const DeleteManagerModalButton = DeleteButton<Manager>("管理员账号", deleteManager, (id) => {
  revalidate(getManagers.key)
});

// export const DeleteManagerButton: Component<{ target: Accessor<Manager>, then?: () => void }> = (props) => {
//   const { target, then } = props;

//   const targetSignal = createSignal<Manager | undefined>()
//   const [_, setTarget] = targetSignal;

//   return <>
//     <DeleteManagerModal target={targetSignal} then={then} />
//     <Button color="error" onClick={() => setTarget(target)}>删除</Button>
//   </>
// }