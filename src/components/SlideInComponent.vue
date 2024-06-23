<template>
  <div class="custom-slide-in relative h-3">
    <div
      class="bg-gray-700 h-2 w-2 left-2/4 top-2/4 -mt-1 opacity-0 absolute"
    ></div>
    <div
      class="bg-gray-700 h-2 w-2 left-2/4 top-2/4 -mt-1 opacity-0 absolute"
    ></div>
    <div
      class="bg-gray-700 h-2 w-2 left-2/4 top-2/4 -mt-1 opacity-0 absolute"
    ></div>
  </div>
</template>
<style>
/**
  * Slide in
  *
  * @author jh3y
*/
@-webkit-keyframes custom-slide-in {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  30%,
  70% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300%);
    transform: translateX(300%);
  }
}
@keyframes custom-slide-in {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  30%,
  70% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300%);
    transform: translateX(300%);
  }
}

.custom-slide-in div {
  -webkit-animation: custom-slide-in 1.5s infinite;
  animation: custom-slide-in 1.5s infinite;
}
.custom-slide-in div:nth-of-type(1) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  margin-left: -30px;
}
.custom-slide-in div:nth-of-type(2) {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  margin-left: -5px;
}
.custom-slide-in div:nth-of-type(3) {
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
  margin-left: 10px;
}
</style>
