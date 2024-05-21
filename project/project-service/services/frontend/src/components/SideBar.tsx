import { useMatch, useNavigate } from "@solidjs/router";
import { Dashboard, DirectionsBike, ManageAccounts, Person } from "@suid/icons-material";
import { Button, IconButton } from "@suid/material";
import { Component } from "solid-js";

const SideBar: Component = () => {
  const navigate = useNavigate();

  const matchMain = useMatch(() => '/');
  const matchBike = useMatch(() => '/bike');
  const matchAccount = useMatch(() => '/account');

  return <>
    <aside class="border-0 border-r border-solid border-slate-200 p-2 flex flex-col items-center">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 0, mr: 0, color: matchMain() ? '#1976d2' : '#777777' }}
        onClick={() => navigate('/')}
      >
        <Dashboard />
      </IconButton>

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 0, mr: 0, color: matchBike() ? '#1976d2' : '#777777' }}
        onClick={() => navigate('/bike')}
      >
        <DirectionsBike />
      </IconButton>

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 0, mr: 0, color: matchAccount() ? '#1976d2' : '#777777' }}
        onClick={() => navigate('/account')}
      >
        <ManageAccounts />
      </IconButton>
      {/* <Button>
        <div class="i-mdi-menu text-3xl p-y-2"/>
      </Button> */}
    </aside>
  </>
};

export default SideBar;