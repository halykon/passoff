import { Avatar, Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

interface IListItemProps {

}

export const ListItem: React.FC<IListItemProps> = () => {
  return (
    <Button
      variant="unstyled"
      borderRadius="none"
      h="100%"
      w="100%"
      display="flex"
      p="15px"
      fontWeight="unset"
      justifyContent="left"
      textAlign="left"
      _hover={{
        bg: 'blackAlpha.300',
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
