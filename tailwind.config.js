module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.transform-style-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
