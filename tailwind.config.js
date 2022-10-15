module.exports = {
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      container: {
        padding: {
          DEFAULT: '16px',
          sm: '16px',
          md: '32px',
          lg: '32px',
          xl: '60px',
          '2xl': '120px',
        },
      },
      colors: {
        black: 'hsla(0, 0%, 0%, 0.87)',
        primary: {
          100: '#F4E041',
          200: '#FFE302',
        },
        secondary: '#00BDD3',
        background: '#F8F8F8',
        danger: '#CB3D40',
        white: '#FFFFFF',
        grey: {
          100: '#D0CFCF',
          200: '#B4B4B4',
          300: '#7E7E7E',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        sm: ['12px', '14px'],
        base: ['16px', '26px'],
        title: ['40px', '40px'],
      },
    },
  },
}
