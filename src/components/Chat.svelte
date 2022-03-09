<script lang="ts">
  import { SPOKESPERSON } from '../const';
  import Message from './Message.svelte';

  let keyboarding = '';

  const messages: { id: number; msg: string; personal?: boolean }[] = [
    { id: 202202930293, msg: 'Hello 1' },
  ];

  // const choices = [
  //   { id: 202202930293, label: 'Hello 1' },
  //   { id: 202202930295, label: 'Hello 2' },
  //   { id: 202202930296, label: 'Hello 3' },
  //   { id: 202202930297, label: 'Hello 4' },
  // ];

  const insertMessage = () => {
    messages.push({
      id: messages.length,
      msg: keyboarding,
      personal: true,
    });
    keyboarding = '';
  };
</script>

<div class="chat">
  <div class="chat-title">
    <h1>{SPOKESPERSON.name}</h1>
    <h2>{SPOKESPERSON.subame}</h2>
    <figure class="avatar">
      <img src={SPOKESPERSON.avatarSrc} alt="" />
    </figure>
  </div>
  <div class="messages">
    <div class="messages-content">
      <div
        id="mCSB_1"
        class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
        style="max-height: none;"
        tabindex="0"
      >
        <Message msg="I am trap shit" />
        <Message personal msg="Ok everything will be all right" />
        {#each messages as message}
          <Message msg={message.msg} personal={message.personal} />
        {/each}
      </div>
    </div>
  </div>
  <div class="message-box">
    <!-- {#each choices as choice}
            <button type="button" class="message">
                {choice.label}
            </button>
        {/each} -->
    <textarea
      type="text"
      class="message-input"
      placeholder="Type message..."
      value={keyboarding}
    />
    <button type="submit" class="message-submit" on:click={insertMessage}>
      Envoyer
    </button>
  </div>
</div>
<div class="bg" />

<style lang="scss">
  /*--------------------
    Body
    --------------------*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    background: linear-gradient(135deg, #044f48, #2a7561);
    background-size: cover;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 1.3;
    overflow: hidden;
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
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
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
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    text-transform: uppercase;
    text-align: left;
    padding: 10px 10px 10px 50px;

    h1,
    h2 {
      font-weight: normal;
      font-size: 10px;
      margin: 0;
      padding: 0;
    }

    h2 {
      color: rgba(255, 255, 255, 0.5);
      font-size: 8px;
      letter-spacing: 1px;
    }

    .avatar {
      position: absolute;
      z-index: 1;
      top: 8px;
      left: 9px;
      border-radius: 30px;
      width: 30px;
      height: 30px;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.24);

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
      font-size: 11px;
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
</style>
