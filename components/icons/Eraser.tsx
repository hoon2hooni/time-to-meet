export default function Eraser({ isEraseMode }: { isEraseMode: boolean }) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="19.5"
        cy="19.5"
        r="19.5"
        fill={isEraseMode ? "#FFC222" : "#7B7B7B"}
      />
      <path
        d="M22.7668 25.543L14.457 17.2331L21.5688 10.1213C22.7404 8.94972 24.6399 8.94972 25.8115 10.1213L29.8787 14.1885C31.0502 15.3601 31.0502 17.2596 29.8787 18.4311L22.7668 25.543Z"
        fill="black"
      />
      <path
        d="M19.7848 28.7102C19.5975 28.8958 19.3445 29 19.0808 29H14.4209C14.1572 29 13.9042 28.8958 13.7169 28.7102L9.59301 24.6222C8.80233 23.8386 8.80233 22.5678 9.59301 21.7842L13.4106 18L22 26.5144L19.7848 28.7102Z"
        fill="black"
      />
    </svg>
  );
}
