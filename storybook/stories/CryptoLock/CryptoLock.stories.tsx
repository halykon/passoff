import React from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { CryptoLock } from './CryptoLock'

const meta: ComponentMeta<typeof CryptoLock> = {
  title: 'CryptoLock',
  component: CryptoLock,
}

export default meta

export const Default: ComponentStory<typeof CryptoLock> = (args, context) => <CryptoLock {...args}/>
