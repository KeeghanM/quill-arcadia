import type { ArcType, CollectionType } from "./types"

export const Arcs: ArcType[] = [
  {
    id: "1",
    name: "Silverhollow",
    collections: [],
    information: {
      hook: "You've recently arrived in Silverhollow, a small town known for its peaceful living and close-knit community. However, beneath the surface, various troubles and mysteries are brewing.",
      goal: "Uncover the underlying issues in Silverhollow, resolve the conflicts, and ensure the town's safety and prosperity.",
      challenge:
        "While each issue seems individual, they are all interlinked, creating a complex web of problems that cannot be solved in isolation.",
      antagonist:
        "A corrupt councilor of the town is secretly manipulating events to increase his own wealth and power, even if it harms the townsfolk.",
    },
    subArcs: [
      {
        id: "2",
        name: "The Lost Sword",
        collections: [],
        information: {
          hook: "A local blacksmith has lost his legendary sword and suspects it was stolen.",
          goal: "Find and return the blacksmith's sword.",
          challenge:
            "A rogue band of thieves known for their cunning and speed has taken the sword.",
          antagonist:
            "The leader of the thieves is a crafty rogue known for his clever traps and quick escapes.",
        },
      },
      {
        id: "3",
        name: "The Dragon's Egg",
        collections: [],
        information: {
          hook: "A mysterious dragon egg appears in the town square, causing panic among the villagers.",
          goal: "Discover the origin of the dragon egg and ensure its safe return.",
          challenge:
            "An ambitious wizard seeks to steal the egg and harness its power for evil.",
          antagonist:
            "The ambitious wizard has powerful magic and minions at his command.",
        },
      },
      {
        id: "4",
        name: "The Haunted Forest",
        collections: [],
        information: {
          hook: "Children from the village have been disappearing into the nearby forest, which is rumored to be haunted.",
          goal: "Investigate the forest, find the missing children, and discover the truth behind the hauntings.",
          challenge:
            "The forest is filled with dangerous beasts, treacherous terrain, and confusing illusions.",
          antagonist:
            "The spirit of an ancient, vengeful druid haunts the forest and commands its creatures.",
        },
      },
      {
        id: "5",
        name: "The Cursed Amulet",
        collections: [],
        information: {
          hook: "You come into possession of a beautiful amulet, but it carries a dreadful curse.",
          goal: "Break the curse and free yourself from the amulet's grasp.",
          challenge:
            "The curse causes those around you to behave strangely and pose threats to your mission.",
          antagonist:
            "The creator of the curse is a scorned enchantress who jealously guards the secret to breaking it.",
        },
      },
      {
        id: "6",
        name: "The Unseen Threat",
        collections: [],
        information: {
          hook: "People in town have been falling inexplicably ill, with no known cause.",
          goal: "Discover the source of the illness and find a cure.",
          challenge:
            "The illness spreads quickly, and symptoms are varied and unpredictable.",
          antagonist:
            "An invisible elemental creature from another plane is unknowingly causing the disease.",
        },
      },
    ],
  },
  {
    id: "7",
    name: "Brimshale",
    collections: [],
    information: {
      hook: "Brimshale, a thriving city of commerce, is suddenly plagued by a string of mysterious thefts and unexplained incidents.",
      goal: "Investigate the strange happenings, discover the cause, and restore peace in Brimshale.",
      challenge:
        "The city's prosperity has made it a target for various factions, all of which are potentially responsible for the troubles.",
      antagonist:
        "A powerful crime syndicate that has been operating in the shadows of the city is behind the incidents.",
    },
    subArcs: [
      {
        id: "8",
        name: "The Invisible Thief",
        collections: [],
        information: {
          hook: "High-value goods are disappearing from the market, but there are no signs of a break-in.",
          goal: "Uncover the identity of the thief and stop the thefts.",
          challenge:
            "The thief appears to be using some form of magic to evade detection.",
          antagonist:
            "A highly skilled and elusive rogue magician is responsible for the thefts.",
        },
      },
      {
        id: "9",
        name: "The Rats' Rebellion",
        collections: [],
        information: {
          hook: "The city's normally harmless rat population has become unnaturally aggressive, attacking citizens and damaging property.",
          goal: "Find out what's causing the rats' strange behavior and put an end to it.",
          challenge:
            "The rats are being controlled by an unseen force and attacking in organized swarms.",
          antagonist:
            "A disgruntled druid with a grudge against the city is using the rats to cause chaos.",
        },
      },
      {
        id: "10",
        name: "The Shadowy Specter",
        collections: [],
        information: {
          hook: "A ghostly apparition has been haunting the city streets at night, causing fear among the citizens.",
          goal: "Uncover the true nature of the specter and lay it to rest.",
          challenge:
            "The specter only appears at night and seems to be invulnerable to physical attacks.",
          antagonist:
            "The specter is the vengeful spirit of a merchant who was wronged by the city's leaders.",
        },
      },
    ],
  },
  {
    id: "11",
    name: "Willows Peak",
    collections: [],
    information: {
      hook: "In order to reach the ancient ruins, the party must cross the treacherous terrain of Willows Peak.",
      goal: "Navigate the dangers of the mountain and reach the other side safely.",
      challenge:
        "The mountain is notorious for its harsh conditions, dangerous wildlife, and perilous paths.",
      antagonist:
        "The spirit of the mountain, an ancient elemental, does not take kindly to trespassers.",
    },
    subArcs: [
      {
        id: "12",
        name: "The Mountain's Fury",
        collections: [],
        information: {
          hook: "As you ascend, the mountain seems to come alive, with rockslides, icy winds, and roars that sound suspiciously like a giant beast.",
          goal: "Survive the mountain's onslaught and reach the peak.",
          challenge:
            "The mountain's spirit is using all the elements at its disposal to drive you back.",
          antagonist:
            "The spirit of the mountain itself, a powerful earth elemental.",
        },
      },
    ],
  },
  {
    id: "13",
    name: "Ancient Ruins",
    collections: [],
    information: {
      hook: "The party finally arrives at the ancient ruins, a place filled with old magic, hidden treasures, and untold dangers.",
      goal: "Explore the ruins, discover its secrets, and retrieve the valuable artifacts rumored to be stored within.",
      challenge:
        "The ruins are filled with ancient traps, magical creatures, and riddles left behind by its old inhabitants.",
      antagonist:
        "A powerful lich, who was once a ruler of this ancient city, haunts the ruins.",
    },
    subArcs: [
      {
        id: "14",
        name: "The Guardians' Test",
        collections: [],
        information: {
          hook: "Statues of ancient warriors line the corridors of the ruins, and they spring to life as the party approaches.",
          goal: "Overcome the guardians to proceed deeper into the ruins.",
          challenge:
            "The statues are enchanted to protect the ruins and are almost indestructible.",
          antagonist:
            "The magic animating the guardians is still active and intent on protecting the ruins.",
        },
      },
      {
        id: "15",
        name: "The Labyrinth of Shadows",
        collections: [],
        information: {
          hook: "The party finds themselves in a maze of corridors, where the walls seem to shift and shadows lurk at every corner.",
          goal: "Navigate the labyrinth and find the path leading to the heart of the ruins.",
          challenge:
            "The labyrinth is filled with illusions and misdirection, making it difficult to find the right path.",
          antagonist:
            "A malicious shadow spirit manipulates the labyrinth to confuse and mislead intruders.",
        },
      },
      {
        id: "16",
        name: "The Hall of Riddles",
        collections: [],
        information: {
          hook: "A large chamber presents a series of riddles that the party must solve to proceed.",
          goal: "Solve the riddles to unlock the way forward.",
          challenge:
            "The riddles are complex and have consequences if answered incorrectly.",
          antagonist:
            "The ancient magic in the chamber, designed to test the wisdom and knowledge of those who dare to enter.",
        },
      },
      {
        id: "17",
        name: "The Lich's Curse",
        collections: [],
        information: {
          hook: "As the party approaches the heart of the ruins, they feel a powerful curse sapping their strength.",
          goal: "Lift the curse and confront the final guardian of the ruins.",
          challenge:
            "The curse weakens the party and the lich is a formidable foe.",
          antagonist:
            "The lich that was once the ruler of the city and now its eternal guardian.",
        },
      },
    ],
  },
]

export const Collections: CollectionType[] = [
  {
    id: "1",
    name: "People",
    things: [
      {
        name: "Bob",
        information: {
          race: "Human",
          age: "32",
          job: "Blacksmith",
        },
      },
    ],
    subCollections: [
      {
        id: "2",
        name: "Villagers",
        things: [
          {
            name: "Jonny",
            information: {},
          },
        ],
      },
    ],
  },
]
