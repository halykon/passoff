import { Avatar, Box, Button, Heading, Stack, Text, keyframes, Divider } from '@chakra-ui/react'
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
  image?: string
  isActive?: boolean
  onSelect?: () => void
}

export const ListItem: React.FC<IListItemProps> = ({ onSelect, isActive, name, username, image }) => {
  return (
    <>
      <Box p="2px" transition=".35s" bg={isActive ? 'blackAlpha.500' : ''} _hover={{ bg: 'blackAlpha.300' }} _focusWithin={{ bg: 'var(--chakra-colors-blackAlpha-500) !important' }}>
        <Button
          className="selectable"
          isActive={isActive}
          onFocus={onSelect}
          variant="box"
          display="flex"
          p="15px"
          color="primary.500"
          _focus={{
            animation: `${pulsate} 1s 1s infinite alternate`,
            shadow: '0 0 0 2px',
          }}
        >
          <Stack direction="row" spacing="15px" color="white">
            <Avatar p="2.5px" name={name} src={image} bg={image && 'white'}/>
            <Box>
              <Heading size="md">{name}</Heading>
              <Text size="md">{username}</Text>
            </Box>
          </Stack>
        </Button>
      </Box>
      <Divider/>
    </>
  )
}

ListItem.defaultProps = {
  name: 'Google',
  username: 'johann@objekt.stream',
}
