export type ArcType = {
  name: string
  information: { [key: string]: string }
  SubArcs?: ArcType[]
}
