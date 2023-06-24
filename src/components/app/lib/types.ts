export type ThingType = {
  name: string
  information: Record<string, string>
}

export type CollectionType = {
  id: string
  name: string
  things: ThingType[]
  subCollections?: CollectionType[]
}

export type ArcType = {
  id: string
  name: string
  information: Record<string, string>
  subArcs?: ArcType[]
  collections: string[]
}

export type StoryType = {
  id: string
  name: string
  lastEdited: string
}
