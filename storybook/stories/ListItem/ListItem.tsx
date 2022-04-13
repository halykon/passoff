import { Avatar, Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface IListItemProps {

}

export const ListItem: React.FC<IListItemProps> = () => {
  return (
    <Button
      variant="box"
      display="flex"
      p="15px"
      _hover={{
        bg: 'blackAlpha.300',
      }}
      _focus={{
        bg: 'var(--chakra-colors-blackAlpha-500) !important', // little hack to hover style
        shadow: 'outline',
      }}
    >
      <Stack direction="row" spacing="15px">
        <Avatar name="Google"/>
        <Box>
          <Heading size="md">Google.com</Heading>
          <Text size="md">johann@objekt.stream</Text>
        </Box>
      </Stack>
    </Button>
  )
}

ListItem.defaultProps = {

}
