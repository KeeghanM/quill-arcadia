export type Thing = {
  id: string
  name: string
  information: Record<string, string>
}

export type Collection = {
  id: string
  name: string
  things: ThingType[]
  subCollections?: CollectionType[]
  parentId?: string
}

export type Arc = {
  id: string
  parentId?: string
  name: string
  information: Record<string, string>
  subArcs?: ArcType[]
  collections: string[]
}

export type Story = {
  id: string
  name: string
  lastEdited: string
}
