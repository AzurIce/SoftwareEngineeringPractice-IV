import { Component } from "solid-js";

import logo from './logo.svg';
import styles from './Hello.module.css';

import { Button } from "@suid/material";

const Hello: Component = () => {
    return <>
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <Button>SUID Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
    </>
}

export default Hello;