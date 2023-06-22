export type ThingType = {
  name: string
  information: { [key: string]: string }
}

export type CollectionType = {
  name: string
  things: [ThingType | CollectionType] | []
}

export type ArcType = {
  name: string
  information: { [key: string]: string }
  SubArcs?: ArcType[]
  collections: string[]
}
