<script lang="ts">
  import { screen } from './stores'
  import Phone from './components/Phone.svelte'
  import DummyChat from './components/DummyChat.svelte'
  import Screen from './components/Screen.svelte';

  let windowHeight: number
  let windowWidth: number

  $: {
    screen.update(() => ({
      height: windowHeight,
      width: windowWidth,
      device: windowWidth >= 768 ? 'computer' : 'mobile',
    }))
  }
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</svelte:head>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

{#if $screen.device === 'mobile'}
  <Screen />
{:else}
  <Phone>
    <Screen />
  </Phone>
{/if}

