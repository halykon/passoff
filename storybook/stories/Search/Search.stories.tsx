import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Search } from './Search'

const meta: ComponentMeta<typeof Search> = {
  title: 'Search',
  component: Search,
}

export default meta

export const Default: ComponentStory<typeof Search> = (args, context) => <Search {...args}/>
