import { useNavigate, A } from '@solidjs/router'
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'

export default function Main() {
  const navigate = useNavigate();

  onMount(async () => {
    // await updateUserCourses()
    // const res = await getNotifications()
    // setNotifications(res)
  });

  return (
    <div class='flex-1 flex w-full'>
      <div class='flex-1 flex flex-col p-6 gap-4'>
      </div>
    </div >
  )
}