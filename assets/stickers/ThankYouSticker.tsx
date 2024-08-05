/* eslint-disable max-len */
import React from "react";
import { Group, LinearGradient, Path, vec } from "@shopify/react-native-skia";

import type { StickerProps } from "./Sticker";

const size = { width: 131, height: 125 };

const Sticker = ({ matrix }: StickerProps) => {
  return (
    <Group matrix={matrix}>
      <Path
        path="M125.501 59.034C126.514 53.419 124.783 47.525 120.523 43.265C120.161 42.902 119.787 42.558 119.4 42.231C119.353 37.525 117.499 33.108 114.166 29.777C110.79 26.401 106.302 24.542 101.528 24.542C101.49 24.542 101.452 24.545 101.414 24.545C101.877 23.327 102.129 22.026 102.129 20.684C102.129 17.166 100.467 13.902 97.514 11.794C96.263 10.899 94.817 10.291 93.305 10.014C90.184 9.44304 87.145 10.209 84.748 12.021C84.683 8.53804 83.039 5.07803 79.785 2.84103C78.445 1.91903 76.906 1.30103 75.299 1.04503C72.56 0.608033 69.879 1.13904 67.626 2.48504C65.504 1.21804 63.003 0.674032 60.431 0.978032C58.465 1.21203 56.581 1.97104 55.006 3.17204C52.17 5.33204 50.559 8.54604 50.494 12.013C47.976 10.114 44.753 9.36804 41.471 10.111C40.298 10.377 39.175 10.85 38.166 11.505C32.14 15.406 31.519 23.578 36.302 28.361L38.335 30.394C38.976 31.035 38.976 32.073 38.335 32.714C37.895 33.154 37.256 33.334 36.65 33.19C35.444 32.905 34.238 32.755 33.05 32.755C24.303 32.755 19.634 39.855 17.126 43.671C16.323 44.892 15.413 46.276 14.757 46.932L11.595 50.094C4.467 57.222 0.268002 66.846 0.252002 76.925C0.236002 86.973 4.142 96.422 11.246 103.525L19.678 111.958C27.402 119.682 37.672 123.936 48.596 123.936C51.816 123.936 54.976 123.557 58.034 122.838C61.311 123.687 64.668 124.12 68.053 124.12C78.845 124.12 89.089 119.819 96.898 112.01L124.807 84.101C128.28 80.629 130.343 75.93 130.292 71.018C130.244 66.53 128.551 62.305 125.501 59.034Z"
        color="white"
      />
      <Group>
        <Path path="M70.5533 9.29257L67.626 12.2198L64.6988 9.29257C63.1306 7.7244 60.517 7.7244 58.9488 9.29257C57.2761 10.9653 57.2761 13.5789 58.9488 15.1471L64.6988 20.8971C65.5351 21.7334 66.5806 22.1516 67.626 22.1516C68.6715 22.1516 69.7169 21.7334 70.5533 20.8971L76.3033 15.1471C77.976 13.5789 77.976 10.9653 76.3033 9.29257C75.5714 8.56076 74.526 8.14259 73.376 8.14259C72.3305 8.14259 71.2851 8.56076 70.5533 9.29257Z">
          <LinearGradient
            start={vec(-867.657, 62.5072)}
            end={vec(100.991, 62.5072)}
            colors={["#FFBF38", "#FE52C4"]}
          />
        </Path>
        <Path path="M57.1804 32.5017L41.9168 47.7652C41.8122 47.4516 41.8122 47.138 41.7077 46.8243C40.9759 43.688 38.885 41.4925 35.9577 40.4471C29.3714 38.2516 25.6078 43.8971 23.2032 47.6607C22.1578 49.2289 21.0078 50.9016 19.8578 52.0516L16.4078 55.6061C10.6578 61.2515 7.52147 68.8833 7.52147 76.9333C7.52147 85.0878 10.6578 92.7196 16.4078 98.365L24.7714 106.833C31.1486 113.21 39.6168 116.66 48.6077 116.66C57.5985 116.66 66.0667 113.21 72.4439 106.833L97.5347 81.7424C99.5211 79.756 100.567 77.0378 100.567 74.2151C100.567 71.3924 99.5211 68.6742 97.5347 66.6879C96.5938 65.8515 95.5484 65.1197 94.3984 64.597C95.5484 62.9243 96.0711 60.9379 96.0711 58.9516C96.0711 56.1288 94.9211 53.4107 92.9347 51.4243C91.8893 50.2743 90.5302 49.438 89.1711 48.9152C89.4848 47.8698 89.6938 46.6152 89.6938 45.4653C89.6938 42.6425 88.6484 39.9244 86.5575 37.938C83.3166 34.6971 78.403 33.9653 74.5348 35.8471C74.0121 34.5926 73.1757 33.4426 72.2348 32.5017C70.1439 30.4108 67.4258 29.3653 64.7076 29.3653C61.9894 29.3653 59.2713 30.4108 57.1804 32.5017ZM31.5668 68.3606L62.3031 37.5198C63.6621 36.2653 65.753 36.2653 67.1121 37.5198C67.7394 38.2516 68.053 39.088 68.053 39.9244C68.053 40.8653 67.7394 41.7016 67.1121 42.3289L49.1304 60.4152C47.6668 61.7743 47.6668 64.0743 49.1304 65.5379C50.4895 66.897 52.7895 66.897 54.2531 65.5379L76.6257 43.0607C77.3575 42.4334 78.1939 42.0153 79.0303 42.0153C79.9712 42.0153 80.8075 42.4334 81.4348 43.0607C82.1666 43.688 82.4802 44.5243 82.4802 45.4653C82.4802 46.3016 82.1666 47.2425 81.4348 47.8698L59.0622 70.2424C57.5985 71.7061 57.5985 74.006 59.0622 75.3651C60.4212 76.8288 62.7212 76.8288 64.1849 75.3651L83.003 56.547C83.6302 55.9198 84.5711 55.5016 85.4075 55.5016C86.3484 55.5016 87.1848 55.9198 87.812 56.547C88.4393 57.1743 88.8575 58.0106 88.8575 58.9516C88.8575 59.7879 88.4393 60.7288 87.812 61.3561L68.8894 80.1742C67.5303 81.6378 67.5303 83.9378 68.8894 85.2969C70.353 86.7605 72.653 86.7605 74.0121 85.2969L87.603 71.8106C88.8575 70.5561 91.0529 70.5561 92.412 71.8106C93.0393 72.4379 93.3529 73.2742 93.3529 74.2151C93.3529 75.156 93.0393 75.9924 92.412 76.6197L67.3212 101.71C62.3031 106.729 55.6122 109.447 48.6077 109.447C41.4986 109.447 34.9123 106.729 29.8941 101.71L21.5305 93.2423C17.1396 88.956 14.7351 83.1015 14.7351 76.9333C14.7351 70.8697 17.1396 65.0152 21.5305 60.7288L24.9805 57.1743C26.6532 55.5016 28.0123 53.4107 29.2668 51.6334C31.4623 48.1834 32.4032 47.2425 33.135 47.2425C33.3441 47.2425 33.4486 47.3471 33.6577 47.3471C34.1805 47.5562 34.4941 47.8698 34.5986 48.4971C35.1214 50.3789 33.8668 55.7107 26.4441 63.2379C24.9805 64.597 24.9805 66.897 26.4441 68.3606C27.1759 68.9879 28.0123 69.4061 28.9532 69.4061C29.8941 69.4061 30.835 68.9879 31.5668 68.3606Z">
          <LinearGradient
            start={vec(1.49785, 62.5067)}
            end={vec(157.236, 62.5067)}
            colors={["#FFBF38", "#FE52C4"]}
          />
        </Path>
        <Path path="M93.9903 34.9061L92.4221 36.4743C90.9585 37.9379 90.9585 40.2379 92.4221 41.597C93.7812 43.0606 96.0812 43.0606 97.5449 41.597L99.113 40.0288C100.472 38.6697 102.563 38.6697 103.922 40.0288C104.549 40.6561 104.968 41.4924 104.968 42.4333C104.968 43.2697 104.549 44.2106 103.922 44.8379L98.7994 49.856C97.4403 51.3197 97.4403 53.6197 98.7994 54.9787C100.263 56.4424 102.563 56.4424 103.922 54.9787L105.49 53.5151C106.118 52.8878 106.954 52.4697 107.895 52.4697C108.836 52.4697 109.672 52.8878 110.299 53.5151C111.658 54.8742 111.658 56.9651 110.299 58.3242L103.086 65.5378C102.354 66.1651 102.04 67.106 102.04 68.0469C102.04 68.9878 102.354 69.9287 103.086 70.6605C104.549 72.0196 106.849 72.0196 108.208 70.6605L109.986 68.7787C111.345 67.5241 113.54 67.5241 114.795 68.7787C115.422 69.406 115.84 70.3469 115.84 71.1832C115.84 72.1241 115.422 72.9605 114.795 73.5878L86.6722 101.815C79.4586 109.029 69.1086 111.433 59.6996 108.297C57.8178 107.565 55.8314 108.61 55.0996 110.492C54.4723 112.374 55.5178 114.465 57.3996 115.092C60.8496 116.347 64.5086 116.869 68.0632 116.869C76.7404 116.869 85.3131 113.419 91.7949 106.938L119.917 78.7105C121.904 76.7241 123.054 74.0059 123.054 71.1832C123.054 68.3605 121.904 65.7469 119.917 63.656C119.081 62.8196 118.036 62.0878 116.886 61.5651C119.499 57.4878 118.977 51.9469 115.422 48.3924C114.272 47.2424 113.018 46.4061 111.554 45.8833C111.972 44.8379 112.181 43.5833 112.181 42.4333C112.181 39.6106 111.031 36.8925 109.045 34.9061C107.058 32.9198 104.34 31.7698 101.518 31.7698C98.6948 31.7698 95.9767 32.9198 93.9903 34.9061Z">
          <LinearGradient
            start={vec(1.84951, 62.4728)}
            end={vec(161.605, 62.4728)}
            colors={["#FFBF38", "#FE52C4"]}
          />
        </Path>
        <Path path="M88.6818 18.0745L84.3954 22.4654C82.9318 23.929 82.9318 26.229 84.3954 27.5881C85.0227 28.3199 85.9636 28.6335 86.9045 28.6335C87.8454 28.6335 88.7863 28.3199 89.5182 27.5881L93.8045 23.1972C95.2681 21.8381 95.2681 19.5381 93.8045 18.0745C93.1772 17.4472 92.2363 17.0291 91.2954 17.0291C90.3545 17.0291 89.4136 17.4472 88.6818 18.0745Z">
          <LinearGradient
            start={vec(-976.813, 62.5095)}
            end={vec(194.728, 62.5095)}
            colors={["#FFBF38", "#FE52C4"]}
          />
        </Path>
        <Path path="M41.4475 18.0745C39.9838 19.5381 39.9838 21.8381 41.4475 23.1972L45.7338 27.5881C46.4656 28.3199 47.4065 28.6335 48.3474 28.6335C49.2883 28.6335 50.2292 28.3199 50.8565 27.5881C52.3201 26.1245 52.3201 23.929 50.8565 22.4654L46.5702 18.0745C45.8383 17.4472 44.8974 17.0291 43.9565 17.0291C43.0156 17.0291 42.1793 17.4472 41.4475 18.0745Z">
          <LinearGradient
            start={vec(46.1527, 115.824)}
            end={vec(46.1527, 11.2791)}
            colors={["#FFBF38", "#FE52C4"]}
          />
        </Path>
      </Group>
    </Group>
  );
};

export const ThankYouSticker = { Sticker, size };
