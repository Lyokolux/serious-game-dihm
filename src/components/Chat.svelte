<script lang="ts">
  import { onMount } from 'svelte';

  import { SPOKESPERSON } from '../const';
import { user } from '../stores';
  import Message from './Message.svelte';
  import ReplyButton from './ReplyButton.svelte';

  type Choice = { id: number; label: string };

  let messages: any[] = [];

  const choices: Choice[] = [
    { id: 202202930293, label: 'Hello 1' },
    { id: 202202930295, label: 'Hello 2' },
    { id: 202202930296, label: 'Hello 3' },
    { id: 202202930297, label: 'Hello 4' },
  ];

  const updateScrollPosition = () => {
    document
      .getElementsByClassName('message')
      [document.getElementsByClassName('message').length - 1].scrollIntoView({
        block: 'start',
      });
    // document.getElementsByClassName('messages-content')[0].scrollTo({
    //   top: document.getElementsByClassName('message')[
    //     document.getElementsByClassName('message').length - 1
    //   ].scrollHeight,
    //   behavior: 'smooth',
    // });
  };

  const insertMessage = (message, personal = false, isComponent = false) => {
    const msg = isComponent ? { component: message } : { msg: message }
    messages = [...messages, {...msg, personal}]
  }

  const reply = (choice: Choice) => {
    insertMessage(choice.label, true)
    updateScrollPosition();
  };

  const autoReply = () => {
    // TOOD
    updateScrollPosition();
  };

  onMount(() => {
    updateScrollPosition;
    insertMessage(`Salut ${$user.name} ! Comment tu vas ?`)
  });
</script>

<div class="chat">
  <div class="chat-title">
    <h1>{SPOKESPERSON.name}</h1>
    <h2>{SPOKESPERSON.subname}</h2>
    <figure class="avatar">
      <img src={SPOKESPERSON.avatarSrc} alt="" />
    </figure>
  </div>
  <div class="messages">
    <div class="messages-content p-2">
      <div
        id="mCSB_1"
        class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
        style="max-height: none;"
        tabindex="0"
      >
        {#each messages as message}
          <Message msg={message.msg} personal={message.personal} />
        {/each}
      </div>
    </div>
  </div>
  <div class="message-box d-flex justify-content-evenly">
    {#each choices as choice}
      <ReplyButton
        className="me-1"
        label={choice.label}
        on:click={() => reply(choice)}
      />
    {/each}
    {#if !choices || choices.length == 0}
      <ReplyButton className="ms-auto" on:click={autoReply} />
    {/if}
  </div>
</div>
<div class="bg" />

<style lang="scss">
  @mixin center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /*--------------------
    Body
    --------------------*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .bg {
    top: 0;
    left: 0;
    z-index: 1;
    background: url('https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925')
      no-repeat 0 0;
    filter: blur(80px);
    transform: scale(1.2);
  }

  /*--------------------
    Chat
    --------------------*/
  .chat {
    @include center;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    width: 100%;
    z-index: 2;
    overflow: hidden;
    box-shadow: 0 5px 30px #88AAB0;
    background: #88AAB0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  /*--------------------
    Chat Title
    --------------------*/
  .chat-title {
    flex: 0 1 45px;
    position: relative;
    z-index: 2;
    background:  #153c4b;
    color: #fff;
    text-transform: uppercase;
    text-align: left;
    padding: 10px 10px 10px 4rem;

    h1,
    h2 {
      font-weight: normal;
      font-size: 1.1rem;
      margin: 0;
      padding: 0;
    }

    h2 {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
      letter-spacing: 1px;
    }

    .avatar {
      position: absolute;
      z-index: 1;
      top: 0.25rem;
      left: 9px;
      border-radius: 30px;
      width: 3rem;
      height: 3rem;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.24);
      background: white;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  /*--------------------
    Messages
    --------------------*/
  .messages {
    flex: 1 1 auto;
    color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    position: relative;
    width: 100%;

    & .messages-content {
      position: absolute;
      top: 0;
      left: 0;
      height: 101%;
      width: 100%;
      overflow-y: scroll;

      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  /*--------------------
    Message Box
    --------------------*/
  .message-box {
    flex: 0 1 40px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    position: relative;

    & .message-input {
      background: none;
      border: none;
      outline: none !important;
      resize: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 1rem;
      height: 17px;
      margin: 0;
      padding-right: 20px;
      width: 265px;
    }

    textarea:focus:-webkit-placeholder {
      color: transparent;
    }

    & .message-submit {
      position: absolute;
      z-index: 1;
      top: 9px;
      right: 10px;
      color: #fff;
      border: none;
      background: #248a52;
      font-size: 10px;
      text-transform: uppercase;
      line-height: 1;
      padding: 6px 10px;
      border-radius: 10px;
      outline: none !important;
      transition: background 0.2s ease;

      &:hover {
        background: #1d7745;
      }
    }
  }

  /*--------------------
Custom Srollbar
--------------------*/
  .mCSB_scrollTools {
    margin: 1px -3px 1px 0;
    opacity: 0;
  }

  .mCSB_inside > .mCSB_container {
    margin-right: 0px;
    padding: 0 10px;
  }

  .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  .reply {
    &::before {
      position: absolute;
      content: '';
      left: auto;
      right: 0;
      border-right: none;
      border-left: 5px solid transparent;
      border-top: 4px solid #257287;
      bottom: -4px;
    }
  }
</style>
