<script lang="ts">
  import Chat from "./Chat.svelte";
  import UserForm from "./UserForm.svelte";

  let currentScreen: 'form' | 'messages' = 'messages'
</script>

{#if currentScreen === 'form'}
  <UserForm onSubmit={() => { currentScreen = 'messages' }} />
{:else if currentScreen === 'messages'}
  <Chat />
{/if}
