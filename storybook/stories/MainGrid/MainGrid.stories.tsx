import React from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { MainGrid } from './MainGrid'

const meta: ComponentMeta<typeof MainGrid> = {
  title: 'MainGrid',
  component: MainGrid,
}

export default meta

export const Default: ComponentStory<typeof MainGrid> = (args, context) => <MainGrid {...args}/>
