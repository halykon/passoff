import React from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { ListDataBox } from './ListDataBox'

const meta: ComponentMeta<typeof ListDataBox> = {
  title: 'ListDataBox',
  component: ListDataBox,
}

export default meta

export const Default: ComponentStory<typeof ListDataBox> = (args, context) => <ListDataBox {...args}/>
