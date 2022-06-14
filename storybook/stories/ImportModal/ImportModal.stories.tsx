import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { ImportModal } from './ImportModal'

const meta: ComponentMeta<typeof ImportModal> = {
  title: 'ImportModal',
  component: ImportModal,
}

export default meta

export const Default: ComponentStory<typeof ImportModal> = (args, context) => <ImportModal {...args}/>
