import { Path, PathProps, Svg, SvgProps } from "react-native-svg";

const ratio = 54 / 60;

export function Logotype({
  fill,
  ...rest
}: { fill?: PathProps["fill"] } & SvgProps) {
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32);

  return (
    <Svg
      fill="none"
      viewBox="0 0 54 60"
      {...rest}
      width={size}
      height={Number(size) * ratio}
    >
      <Path
        fill={fill || "white"}
        d="M53.8848 32.9201C53.4348 26.9001 50.8048 21.5451 46.7948 17.5201V12.7301C46.7948 5.81008 41.1848 0.205078 34.2698 0.205078C29.2098 0.205078 24.8548 3.20508 22.8798 7.52008C19.9548 4.71508 15.8048 3.25508 11.4848 3.92008C4.11976 5.05508 -0.925244 11.9451 0.209756 19.3051L2.32476 33.0301L0.574758 58.0301L12.4548 54.7401C17.2898 58.2951 23.4448 60.2151 29.9998 59.7201C44.2198 58.6551 54.9148 46.6551 53.8848 32.9201Z"
      />
    </Svg>
  );
}
