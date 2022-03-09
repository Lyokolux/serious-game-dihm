<script lang="ts">
  import DummyChat from "./DummyChat.svelte";
  import UserForm from "./UserForm.svelte";

  let currentScreen: 'form' | 'messages' = 'form'
</script>

{#if currentScreen === 'form'}
  <UserForm onSubmit={() => { currentScreen = 'messages' }} />
{:else if currentScreen === 'messages'}
  <DummyChat />
{/if}
