import { keyframes } from "@emotion/react";

export const APP_ANIMATION = {
  rotate: keyframes(`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
        `),
  shake1: keyframes(`
        0% {
          transform: rotate(0deg);
        }
        10% {
          transform: rotate(15deg);
        }
        30% {
          transform: rotate(-15deg);
        }
        40% {
          transform: scale(1);
        }
        60% {
          transform: scale(1.4);
        }
        80% {
          transform: scale(1);
        }
        `),
  bubble: keyframes(`
        0% {
          transform: scale(0.9);
        }
        50% {
          transform: scale(1);
        }
        100% {
          transform: scale(0.9);
        }
        `),
  expand: keyframes(`
        0% {
          flex: 0;
          // width: 0px;
          transform: scale(0);
          
        }
        100% {
          flex: 1;
          width: auto;
          transform: scale(1);
        }
        `),
  shrink: keyframes(`
        0% {
          flex: 1;
          
          transform: scale(1);
          // padding: 10px;
        }
        100% {
          flex: 0;
          width: 0;
          transform: scale(0);
        }
        `),
};
