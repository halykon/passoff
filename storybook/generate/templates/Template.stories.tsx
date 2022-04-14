import React from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Template } from './Template'

const meta: ComponentMeta<typeof Template> = {
  title: 'Template',
  component: Template,
}

export default meta

export const Default: ComponentStory<typeof Template> = (args, context) => <Template {...args}/>
