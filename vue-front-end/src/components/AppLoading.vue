<template functional>
  <div id="initial-loading">
    <img src="/img/bloody-smile.jpg" alt="initializing image" />
    <p id="text">{{ parent.$t("App.loadingMessage") }}</p>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#initial-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 6rem;
    height: auto;
    border-radius: 50%;
  }
  p {
    margin: 1rem;
    font: 500 1rem/1.7rem "Roboto", Arial, Helvetica, sans-serif;
  }
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: rgb(204, 81, 81);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
