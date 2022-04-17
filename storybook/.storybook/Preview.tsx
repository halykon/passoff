import { extendTheme } from '@chakra-ui/react'
import { addDecorator } from '@storybook/react'
import { GlobalStyle, defaultTheme } from '../helper/theme'
import { PwaProviders } from '../helper/providers'

addDecorator(story => (
  <>
    <GlobalStyle/>
    <PwaProviders>
      {story()}
    </PwaProviders>
  </>
))

const theme = extendTheme(defaultTheme);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme: theme,
  },
}