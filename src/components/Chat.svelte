<script lang="ts">
  import { onMount } from 'svelte';

  import { SPOKESPERSON } from '../const';
import { user } from '../stores';
  import Message from './Message.svelte';
import Radar from './messages/Radar.svelte';
import Tomatoes from './messages/Tomatoes.svelte';
  import ReplyButton from './ReplyButton.svelte';

  type Choice = { id: number; label: string, onChoosed: (selectedId: number) => void };

  let messages: any[] = [];

  let choices: Choice[] = [];

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
    updateScrollPosition();
  };

  const choixTomates = () => {
    insertMessage(Tomatoes, undefined, true)
    choices = [
      {id: 1, label: "Elles sont clairement mûres ! Tu peux les manger", onChoosed: choixRadar },
      {id: 2, label: 'Elles sont tout à fait vertes. Je pense que c’est pas une bonne idée de les manger', onChoosed: choixRadar }
    ]
  }

  const choixRadar = (id: number) => {
    choices = []
    if (id === 1) {
      insertMessage('Merci beaucoup, en effet, avec le peu de lumière qu’il y a, je ne l’avais pas vu')
    } else {
      insertMessage('Ah attend, c’est bon, je le vois maintenant. Merci quand même')
    }

    setTimeout(() => {
      insertMessage('Écoutes, je vais me diriger vers ce point, prions que je ne sois pas perdu sur le chemin. On se tient au courant')
      setTimeout(() => {
        insertMessage('OK. Je crois que je suis perdu.')
        setTimeout(() => {
          insertMessage('Je viens de passer deux heures à marcher en direction de la ville mais je n’ai toujours aucune trace de la civilisation.')
          setTimeout(() => {
            insertMessage('Je t’avoue que j’ai un peu faim maintenant, je viens de trouver des tomates, mais elles sont bizarrement vertes, je te les envois')
            insertMessage('Tu penses que je peux les manger ?')
            choixTomates()
          }, 2000);
        }, 2000);
      }, 4000)
    }, 2000)
  }

  const choixJinterviens = () => {
    insertMessage("Ça fait maintenant 2 heures que je suis coincé dans cette immense forêt. J’ai rencontré tout à l’heure un autochtone dans la forêt, il m’avait l’air assez pressé mais je lui ai demandé dans quelle direction se trouvait la ville la plus proche. Ne comprenant pas exactement ce qu’il me disait, il me l’a marqué d’une tâche blanche sur mon radar. Mais je ne vois pas où se trouve la tâche, tu peux m’aider ?")
    choices = []
    setTimeout(() => {
      insertMessage(Radar, undefined, true)
      choices = [
        {id: 1, label: "On voit le point", onChoosed: choixRadar },
        {id: 2, label: 'Je ne vois pas non plus', onChoosed: choixRadar }
      ]
    }, 3000)
  }

  const choixAider = () => {
    insertMessage('J\'ai une petite question, tu as du temps devant toi ?')
    const goNext = (id: number) => {
      insertMessage("Je suis actuellement au Canada, j’étais avec un groupe d'explorateurs dans le cadre de mes recherches. Alors qu’on était en train de remonter le fleuve Mackenzie, on s'est arrêté sur le bord pour faire une pause. J’étais tranquillement en train de regarder un magnifique Érable lorsqu'un bruit étrange à attiré mon attention. Après quelques minutes d'interrogation sur son origine, j’ai décidé de retourner auprès de l’équipe. Arrivé sur le lieu de débarquation plus aucunes traces du bateau et de ses occupants. Je me retrouve donc maintenant perdu et il me faudrait de l’aide pour retrouver la civilisation.")
      choices = [
        {id: 1, label: "C’est donc à cet instant que j’interviens ?", onChoosed: choixJinterviens },
        {id: 2, label: 'Oula, ça fait peur !', onChoosed: choixJinterviens }
      ]
    }

    choices = [
      {id: 1, label: 'Oui pas de souci', onChoosed: goNext },
      {id: 2, label: 'Non mais je vais me libérer', onChoosed: goNext }
    ]
  }

  onMount(() => {
    updateScrollPosition;
    insertMessage(`Salut ${$user.name} ! Comment tu vas ?`)
    choices = [
      ...choices,
      { 
        id: 123, 
        label: 'Salut ça va bien et toi ?', 
        onChoosed: choixAider
      }
    ]
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
          <Message msg={message.msg} personal={message.personal} component={message.component} />
        {/each}
      </div>
    </div>
  </div>
  <div class="message-box d-flex justify-content-evenly">
    {#each choices as choice}
        <ReplyButton
          className="me-1"
          label={choices.length <= 1 ? undefined : choice.label}
          on:click={() => {
            reply(choice)
            choice.onChoosed(choice.id)
          }}
        />
    {/each}
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
