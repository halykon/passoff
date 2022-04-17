import React from 'react'
import { CryptoProvider } from '../hooks/crypto'
import { DataProvider } from '../hooks/data'
import { StorageProvider } from '../hooks/storage'

export const PwaProviders: React.FC = ({ children }) => (
  <StorageProvider>
    <DataProvider>
      <CryptoProvider>
        {children}
      </CryptoProvider>
    </DataProvider>
  </StorageProvider>
)
