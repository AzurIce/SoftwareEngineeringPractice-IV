import { useNavigate } from '@solidjs/router'
import Mapbox from '../../components/Mapbox';

export default function Main() {
  const navigate = useNavigate();

  return (
    <div class='flex-1 flex w-full'>
      <div class='flex-1 flex flex-col p-6 gap-4'>
        <Mapbox />
      </div>
    </div >
  )
}