<script lang="ts">
  import { screen } from './stores'
  import Chat from './components/Chat.svelte'
  import Phone from './components/Phone.svelte'
import DummyChat from './components/DummyChat.svelte'

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

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

{#if $screen.device === 'mobile'}
  <DummyChat />
{:else}
  <Phone>
    <DummyChat />
  </Phone>
{/if}

