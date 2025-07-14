const HavenKeysLogo = ({ width = 150, height = 50 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="HavenKeys Logo"
  >
    {/* House + Key icon */}
    <g>
      <path
        d="M20 40 L40 20 L60 40 V55 H20 V40 Z"
        stroke="#FF6F3C"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="55"
        cy="50"
        r="5"
        stroke="#FF6F3C"
        strokeWidth="3"
        fill="none"
      />
      <line x1="60" y1="50" x2="70" y2="50" stroke="#FF6F3C" strokeWidth="3" />
      <line x1="70" y1="47" x2="75" y2="47" stroke="#FF6F3C" strokeWidth="3" />
      <line x1="70" y1="53" x2="75" y2="53" stroke="#FF6F3C" strokeWidth="3" />
    </g>

    {/* Text */}
    <text
      x="90"
      y="45"
      fontFamily="Poppins, sans-serif"
      fontWeight="700"
      fontSize="28"
      fill="#333333"
    >
      HavenKeys
    </text>
  </svg>
);

export default HavenKeysLogo;
