import { Avatar, Box, Button, Heading, Stack, Text, keyframes } from '@chakra-ui/react'
import React from 'react'

const pulsate = keyframes`
  from { 
    color: var(--chakra-colors-primary-500);
   }
  to {
    color: var(--chakra-colors-primary-1100);
  }
`

interface IListItemProps {
  name: string
  username: string
  onSelect?: () => void
}

export const ListItem: React.FC<IListItemProps> = ({ onSelect, name, username }) => {
  return (
    <Box p="2px" _hover={{ bg: 'blackAlpha.300' }}>
      <Button
        onFocus={onSelect}
        variant="box"
        display="flex"
        p="15px"
        color="primary.500"
        _focus={{
          animation: `${pulsate} 1s 1s infinite alternate`,
          bg: 'var(--chakra-colors-blackAlpha-500) !important', // little hack to hover style
          shadow: '0 0 0 2px',
        }}
      >
        <Stack direction="row" spacing="15px" color="white">
          <Avatar name={name}/>
          <Box>
            <Heading size="md">{name}</Heading>
            <Text size="md">{username}</Text>
          </Box>
        </Stack>
      </Button>
    </Box>
  )
}

ListItem.defaultProps = {
  name: 'Google',
  username: 'johann@objekt.stream',
}
