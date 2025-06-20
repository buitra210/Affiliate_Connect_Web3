import { SvgIconComponent } from "@centic-scoring/icons";
import { Box, keyframes } from "@mui/material";

export default function IconFlipAndMove({
  Icon,
  onAnimationEnd,
}: // initFontSize = 2.8,
{
  Icon: SvgIconComponent;
  onAnimationEnd?: () => void;
  initFontSize?: number;
}) {
  // get position of a element that have id icon-user-badge
  // console.log(2.8 / ((Number(window.innerHeight || 0) * 0.4) / 16));
  // console.log("aaa", 2.8 * 8 - Number(window.innerHeight || 0) * 0.2);
  const icon = document.getElementById("icon-user-badge");
  const iconPosition = icon?.getBoundingClientRect();

  const moveAnimation = keyframes`
    from {
      top: 52%;
      left: 49.7%;
      fontSize: ${(Number(window.innerHeight || 0) * 0.4) / 16}rem;
      transform: scale(1) translate(-50%, -50%);
    }
    to {
      top: ${(iconPosition?.top || 0) + 2.8 * 8 - Number(window.innerHeight || 0) * 0.2}px;
      left: ${(iconPosition?.left || 0) + 2.8 * 8 - Number(window.innerHeight || 0) * 0.2}px;
      // fontSize: 2.8rem;
       transform: scale(${2.8 / ((Number(window.innerHeight || 0) * 0.4) / 16)});
    }
  `;
  // const flipAnimation = keyframes`
  //   0% {
  //     transform: rotateY(0deg) scale(1);
  //   }

  //   10% {
  //     transform: rotateY(720deg);
  //   }

  //   100% {
  //     transform: rotateY(1080deg) scale(${2.8 / ((Number(window.innerHeight || 0) * 0.4) / 16)});
  //   }
  // `;
  // const shrinkAnimation = keyframes`
  //   from {
  //     fontSize: 10rem;
  //   }

  //   to {
  //     fontSize: 2.8rem;
  //   }
  // `;
  // const a = window.innerHeight;

  //make the element center of the page
  return (
    <Box>
      <Icon
        sx={{
          position: "fixed",
          // top: "52%",
          // left: "49.7%",
          // transform: "translate(-50%, -50%)",
          fontSize: `${(Number(window.innerHeight || 0) * 0.4) / 16}rem`,
          animation: `${moveAnimation} 0.8s ease-in-out`,
          top: `${(iconPosition?.top || 0) + 2.8 * 8 - Number(window.innerHeight || 0) * 0.2}px`,
          left: `${(iconPosition?.left || 0) + 2.8 * 8 - Number(window.innerHeight || 0) * 0.2}px`,
          // fontSize: 2.8rem,
          transform: `scale(${2.8 / ((Number(window.innerHeight || 0) * 0.4) / 16)})`,
          // fontSize: `${(Number(window.innerHeight || 0) * 0.4) / 16}rem`,
          // fontSize: "inherit",
          // animation: `${shrinkAnimation} 1s ease-in-out infinite`,
          // animationDelay: `0.2s`,
        }}
        onAnimationEnd={() => {
          onAnimationEnd && onAnimationEnd();
        }}
      />
    </Box>
  );
}
