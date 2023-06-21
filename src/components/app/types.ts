export type Arc = {
  name: string
  information: { [key: string]: string }
  SubArcs?: Arc[]
}
