import Fuse from 'fuse.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCrypto } from './crypto'
import { createMetaStore } from './meta'
import { useStorage } from './storage'

export interface IData {
  id: string
  name: string
  username: string
  password: string
  url?: string
  color?: string
  image?: string
  deleted?: boolean
}

const [DataProvider, useData] = createMetaStore(() => {
  const { readPresistentData, writePersistentData, deletePersistentData } = useStorage()
  const { key, encrypt, decrypt } = useCrypto()
  const [data, setData] = useState<IData[]>([])
  const fuse = useMemo(() => new Fuse(data, { keys: ['name', 'username'] }), [data])

  useEffect(() => {
    if (!key) return
    const encryptedData = readPresistentData?.('data')
    if (!encryptedData) return
    decrypt?.(key, encryptedData).then(dataStr => {
      setData(JSON.parse(dataStr))
    })
  }, [key, decrypt, readPresistentData])

  useEffect(() => {
    if (!key) return
    if (!data.length) return
    const dataStr = JSON.stringify(data)
    console.time('encrypt')
    encrypt?.(key, dataStr).then(encryptedData => {
      writePersistentData?.('data', encryptedData)
      console.timeEnd('encrypt')
    })
  }, [key, encrypt, writePersistentData, data])

  const genId = useCallback((): string => {
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
  }, [])

  const addData = useCallback((data: IData) => {
    const id = genId()
    setData(prev => [...prev, { ...data, id }])
    return id
  }, [genId])

  const addBatch = useCallback((data: Array<Omit<IData, 'id'>>) => {
    const dataWithId = data.map(e => ({ ...e, id: genId() }))
    setData(prev => [...prev, ...dataWithId])
  }, [genId])

  const setDataById = useCallback((id: string, data: Partial<IData>) => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
  }, [])

  const getDataById = useCallback((id: string) => data.find(item => item.id === id), [data])

  const delDataById = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
  }, [])

  const searchData = useCallback((query: string) => {
    return fuse.search(query).map(i => i.item)
  }, [fuse])

  return {
    data,
    setData,
    setDataById,
    getDataById,
    delDataById,
    addData,
    addBatch,
    searchData,
  }
})

export {
  DataProvider,
  useData,
}
