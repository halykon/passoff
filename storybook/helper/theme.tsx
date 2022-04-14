import type { ChakraTheme } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import Color from 'color'
import React from 'react'

function getShades (color: string) {
  return {
    50: Color(color).lighten(0.5).hex(),
    100: Color(color).lighten(0.4).hex(),
    200: Color(color).lighten(0.3).hex(),
    300: Color(color).lighten(0.2).hex(),
    400: Color(color).lighten(0.1).hex(),
    500: color,
    600: Color(color).darken(0.1).hex(),
    700: Color(color).darken(0.2).hex(),
    800: Color(color).darken(0.3).hex(),
    900: Color(color).darken(0.4).hex(),
    1000: Color(color).darken(0.5).hex(),
    1100: Color(color).darken(0.6).hex(),
    1200: Color(color).darken(0.7).hex(),
  }
}

const colors = {
  primary: getShades('#049987'),
}

export const defaultTheme: Partial<ChakraTheme> = {
  colors,
  fonts: {
    heading: 'Poppins',
    body: 'poppins',
  },
  // button active border color
  shadows: {
    outline: `0 0 0 3px ${Color(colors.primary[500]).fade(0.7).toString()}`,
    active: `0 0 0 3px ${colors.primary[500]}`,
  },
  components: {
    Button: {
      variants: {
        box: {
          borderRadius: 'none',
          h: '100%',
          w: '100%',
          fontWeight: 'unset',
          justifyContent: 'left',
          textAlign: 'left',
          _focus: {
            shadow: 'outline',
          },
        },
      },
    },

    Input: {
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
}

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700&display=swap');

      ::selection {
        color: white;
        background-color: ${colors.primary[500]};
      }
    `}
  />
)
