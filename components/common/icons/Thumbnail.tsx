type ComponentProps = {
  width?: number;
  height?: number;
};
export default function Thumbnail({
  width = 31,
  height = 31,
}: ComponentProps = {}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_327_650" fill="white">
        <rect y={4} width={31} height={27} rx={3} />
      </mask>
      <rect
        y={4}
        width={31}
        height={27}
        rx={3}
        stroke="#FFC222"
        strokeWidth={8}
        strokeLinejoin="bevel"
        mask="url(#path-1-inside-1_327_650)"
      />
      <rect x={4} width={4} height={7} rx={2} fill="#FFC222" />
      <rect x={14} width={4} height={7} rx={2} fill="#FFC222" />
      <rect x={24} width={4} height={7} rx={2} fill="#FFC222" />
      <rect x={9} y={12} width={11} height={4} rx={2} fill="#2AA000" />
      <rect
        x={20}
        y={19}
        width={4}
        height={7}
        rx={2}
        transform="rotate(90 20 19)"
        fill="#FFC222"
      />
    </svg>
  );
}
