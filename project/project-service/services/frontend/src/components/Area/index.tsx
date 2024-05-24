import { revalidate } from "@solidjs/router"
import { Area, getArea, getAreas } from "../../lib/store"
import { deleteAreaById } from "../../lib/axios/bike"
import { DeleteButton } from "../common"

export const DeleteAreaButton = DeleteButton<Area>("骑行区", deleteAreaById, (id) => {
  revalidate(getAreas.key)
  revalidate(getArea.keyFor(id))
});