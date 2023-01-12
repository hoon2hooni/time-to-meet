type ComponentProps = {
  width?: number;
  height?: number;
};
export default function ThumbnailError({
  width = 61,
  height = 61,
}: ComponentProps = {}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_360_1337" fill="white">
        <rect y="8.77417" width={68} height="59.2258" rx="6.58065" />
      </mask>
      <rect
        y="8.77417"
        width={68}
        height="59.2258"
        rx="6.58065"
        stroke="#FFC222"
        strokeWidth="17.5484"
        strokeLinejoin="bevel"
        mask="url(#path-1-inside-1_360_1337)"
      />
      <rect
        x="8.77441"
        width="8.77419"
        height="15.3548"
        rx="4.3871"
        fill="#FFC222"
      />
      <rect
        x="30.71"
        width="8.77419"
        height="15.3548"
        rx="4.3871"
        fill="#FFC222"
      />
      <rect
        x="52.6455"
        width="8.77419"
        height="15.3548"
        rx="4.3871"
        fill="#FFC222"
      />
      <path
        d="M21.6201 31.5455C21.6201 29.1226 23.5843 27.1584 26.0072 27.1584H41.3621C43.785 27.1584 45.7491 29.1226 45.7491 31.5455V31.5455C45.7491 33.9685 43.785 35.9326 41.3621 35.9326H26.0072C23.5843 35.9326 21.6201 33.9685 21.6201 31.5455V31.5455Z"
        fill="#2AA000"
      />
      <path
        d="M30 46C30 46 32.3995 44 36 44C39.6005 44 42 46 42 46"
        stroke="#FFC222"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
