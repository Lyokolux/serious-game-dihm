<div class="ctn">
  <div class="phone" />
  <div class="home-button" />
  <div class="screen">
    <slot />
  </div>
</div>

<style lang="scss">
  $offwhite: #e9dbdb;
  $offwhite: #c7cce6;

  .ctn {
    position: relative;
    height: 660px;
    width: 400px;
    margin: auto;
    margin-top: 3rem;
  }

  .phone {
    height: 100%;
    width: 100%;
    background: $offwhite;
    border-radius: 10px;
    border: 3px solid darken($offwhite, 20%);
    &:before {
      top: 4.4%;
      left: 35%;
      height: 1.5%;
      width: 3%;
      background: darken($offwhite, 20%);
      border-radius: 50%;
      border: 2px solid darken($offwhite, 25%);
    }
    &:after {
      top: 4.5%;
      left: 43%;
      height: 1%;
      width: 16%;
      background: darken($offwhite, 25%);
      border-radius: 10px;
      border: 2px solid darken($offwhite, 30%);
    }
  }

  .screen {
    top: 10%;
    left: 5%;
    height: 78%;
    width: 90%;
    border-radius: 5px;
    border: 1px solid darken($offwhite, 10%);
    overflow: hidden;
    background-color: white;
  }

  .home-button {
    top: 90%;
    left: 43%;
    height: 8%;
    width: 15%;
    background: lighten($offwhite, 15%);
    border-radius: 50%;
    border: 3px solid darken($offwhite, 15%);
  }

  .home-screen {
    top: 4%;
    height: 96%;
    width: 100%;
    background: white;
    &:before {
      position: absolute;
      content: "";
      bottom: 0;
      width: 100%;
      height: 22%;
      background: lighten($offwhite, 15%);
    }
  }

  .phone,
  .home-button,
  .screen {
    position: absolute;
    &:before,
    &:after {
      position: absolute;
      content: "";
    }
  }
</style>
