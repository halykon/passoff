import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { ListItem } from './ListItem'

const meta: ComponentMeta<typeof ListItem> = {
  title: 'ListItem',
  component: ListItem,
}

export default meta

export const Default: ComponentStory<typeof ListItem> = (args, context) => <ListItem {...args}/>
