import { MongoClient, Collection } from 'mongodb'

interface MongoHelper {
  url: string
  dbName: string|undefined
  client:MongoClient|null
  connect (url: string|undefined, dbName: string|undefined): Promise<void>
  disconnect (): Promise<void>
  getCollection (name: string): Promise<Collection>
  map (collection: any): any
}

export const MongoHelper:MongoHelper = {
  url: '',
  dbName: undefined,
  client: null,
  async connect (url = '', dbName): Promise<void> {
    this.dbName = dbName
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async getCollection (name): Promise<Collection> {
    if(!this.client) {
      await this.connect(this.url, this.dbName)
    }
    
    const db = this.client?.db(this.dbName)
    if(!db) {
      throw new Error('DataBase Not Found')
    }

    const collection = db?.collection(name)
    if(!collection) {
      throw new Error('Collection Not Found')
    }
    return collection
  },

  map (collection) {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }
}