import { useNavigate, A } from '@solidjs/router'
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'
// import { Homework } from '../../lib/homework'
// import { LoginInfoStore, UserCoursesStore } from '../../lib/store';
// import { Notification, NotificationType, getNotifications } from '../../lib/user';
// import { formatDateTime } from '../../lib/utils'
// import { Transition } from 'solid-transition-group'
// import NotificationCard from '../../components/NotificationCard';

export default function Main() {
//   const { updateUserCourses, learningCourses, teachingCourses } = UserCoursesStore()
  const navigate = useNavigate();

  const [searchTeaching, setSearchTeaching] = createSignal('');
  const [searchLeaching, setSearchLeaching] = createSignal('');

  const [notifications, setNotifications] = createSignal<Notification[]>([]);


  onMount(async () => {
    // await updateUserCourses()
    // const res = await getNotifications()
    // setNotifications(res)
  });

  return (
    <div class='flex-1 flex w-full'>
      <aside class='min-w-[250px] border-0 border-r border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>教的课程</span>
            <Button variant='contained' size='small' onClick={() => navigate('/course/create')}>创建课程</Button>
          </div>
          <TextField
            label="search"
            size='small'
            value={searchTeaching()}
            onChange={(_event, value) => {
              setSearchTeaching(value)
            }}
          />
          {/* <Show when={teachingCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show> */}
          {/* <For each={teachingCourses()}>
            {(lesson) => <div>
              <Show when={lesson.name.includes(searchTeaching()) || searchTeaching() == ''}>
                <A href={`/course/${lesson.id}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For> */}
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>学的课程</span>
          </div>
          <TextField
            label="search"
            size='small'
            value={searchLeaching()}
            onChange={(_event, value) => {
              setSearchLeaching(value)
            }}
          />
          {/* <Show when={learningCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={learningCourses()}>
            {(lesson) => <div>
              <Show when={lesson.name.includes(searchLeaching()) || searchLeaching() == ''}>
                <A href={`/course/${lesson.id}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For> */}
        </div>
      </aside >

      <div class='flex-1 flex flex-col p-6 gap-4'>
        <Typography>通知</Typography>
        <For each={notifications()}>{(notification, i) =>
          <Card>
            {/* <Transition appear={true} onEnter={(el, done) => {
              const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 400 + i() * 400
              });
              a.finished.then(done);
            }}>
              <NotificationCard notification={notification} />
            </Transition> */}
          </Card>
        }</For>
      </div>
    </div >
  )
}