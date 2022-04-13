import { Avatar, Box, Button, Heading, Stack, Text, keyframes } from '@chakra-ui/react'
import React from 'react'

const pulsate = keyframes`
  from { 
    color: var(--chakra-colors-primary-500);
   }
  to {
    color: var(--chakra-colors-primary-900);
  }
`

interface IListItemProps {

}

export const ListItem: React.FC<IListItemProps> = () => {
  return (
    <Box p="3px">
      <Button
        variant="box"
        display="flex"
        p="15px"
        _hover={{
          bg: 'blackAlpha.300',
        }}
        color="primary.500"
        _focus={{
          animation: `${pulsate} 1s 1s infinite alternate`,
          bg: 'var(--chakra-colors-blackAlpha-500) !important', // little hack to hover style
          shadow: '0 0 0 3px',
        }}
      >
        <Stack direction="row" spacing="15px" color="white">
          <Avatar name="Google"/>
          <Box>
            <Heading size="md">Google.com</Heading>
            <Text size="md">johann@objekt.stream</Text>
          </Box>
        </Stack>
      </Button>
    </Box>
  )
}

ListItem.defaultProps = {

}
