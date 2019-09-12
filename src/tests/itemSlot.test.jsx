import React from 'react';
import {shallow} from 'enzyme';
import {ItemSlot} from '../components/itemSlot';

describe('<ItemSlot />', () => {
  const dispatch = jest.fn();

  const charStats = [
    {
      name: 'strength',
      flag: true,
      bonuses: [
        {
          name: 'race',
          source: 'race',
          stat: 'strength',
          type: 'racial',
          duration: -1,
          amount: 2
        },
        {
          name: 'character base',
          source: 'character base',
          stat: 'strength',
          type: 'base',
          duration: -1,
          amount: 10
        }
      ],
      sum: {
        total: 12,
        bonuses: [
          {
            name: 'race',
            source: 'race',
            stat: 'strength',
            type: 'racial',
            duration: -1,
            amount: 2
          },
          {
            name: 'character base',
            source: 'character base',
            stat: 'strength',
            type: 'base',
            duration: -1,
            amount: 10
          }
        ]
      }
    },
    {
      name: 'constitution',
      flag: true,
      bonuses: [
        {
          name: 'race',
          source: 'race',
          stat: 'constitution',
          type: 'racial',
          duration: -1,
          amount: 2
        },
        {
          name: 'character base',
          source: 'character base',
          stat: 'constitution',
          type: 'base',
          duration: -1,
          amount: 8
        }
      ],
      sum: {
        total: 10,
        bonuses: [
          {
            name: 'race',
            source: 'race',
            stat: 'constitution',
            type: 'racial',
            duration: -1,
            amount: 2
          },
          {
            name: 'character base',
            source: 'character base',
            stat: 'constitution',
            type: 'base',
            duration: -1,
            amount: 8
          }
        ]
      }
    },
    {
      name: 'climb',
      flag: true,
      bonuses: [
        {
          name: 'race',
          source: 'race',
          stat: 'climb',
          type: 'racial',
          duration: -1,
          amount: 8
        },
        {
          name: 'skills',
          source: 'skills',
          stat: 'climb',
          type: 'ranks',
          duration: -1,
          amount: 1
        },
        {
          name: 'skills',
          source: 'skills',
          stat: 'climb',
          type: 'ranks',
          duration: -1,
          amount: 1
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'climb',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'climb',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 9,
        bonuses: [
          {
            name: 'race',
            source: 'race',
            stat: 'climb',
            type: 'racial',
            duration: -1,
            amount: 8
          },
          {
            name: 'skills',
            source: 'skills',
            stat: 'climb',
            type: 'ranks',
            duration: -1,
            amount: 1
          },
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'climb',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'bab',
      flag: true,
      bonuses: [
        {
          name: 'classBab',
          source: 'class',
          stat: 'bab',
          type: 'untyped',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'classBab',
            source: 'class',
            stat: 'bab',
            type: 'untyped',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'fort',
      flag: true,
      bonuses: [
        {
          name: 'classFort',
          source: 'class',
          stat: 'fort',
          type: 'untyped',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'classFort',
            source: 'class',
            stat: 'fort',
            type: 'untyped',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'ref',
      flag: true,
      bonuses: [
        {
          name: 'classRef',
          source: 'class',
          stat: 'ref',
          type: 'untyped',
          duration: -1,
          amount: 2
        }
      ],
      sum: {
        total: 2,
        bonuses: [
          {
            name: 'classRef',
            source: 'class',
            stat: 'ref',
            type: 'untyped',
            duration: -1,
            amount: 2
          }
        ]
      }
    },
    {
      name: 'will',
      flag: true,
      bonuses: [
        {
          name: 'classWill',
          source: 'class',
          stat: 'will',
          type: 'untyped',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'classWill',
            source: 'class',
            stat: 'will',
            type: 'untyped',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'dexterity',
      flag: true,
      bonuses: [
        {
          name: 'character base',
          source: 'character base',
          stat: 'dexterity',
          type: 'base',
          duration: -1,
          amount: 14
        }
      ],
      sum: {
        total: 14,
        bonuses: [
          {
            name: 'character base',
            source: 'character base',
            stat: 'dexterity',
            type: 'base',
            duration: -1,
            amount: 14
          }
        ]
      }
    },
    {
      name: 'wisdom',
      flag: true,
      bonuses: [
        {
          name: 'character base',
          source: 'character base',
          stat: 'wisdom',
          type: 'base',
          duration: -1,
          amount: 13
        }
      ],
      sum: {
        total: 13,
        bonuses: [
          {
            name: 'character base',
            source: 'character base',
            stat: 'wisdom',
            type: 'base',
            duration: -1,
            amount: 13
          }
        ]
      }
    },
    {
      name: 'charisma',
      flag: true,
      bonuses: [
        {
          name: 'character base',
          source: 'character base',
          stat: 'charisma',
          type: 'base',
          duration: -1,
          amount: 12
        }
      ],
      sum: {
        total: 12,
        bonuses: [
          {
            name: 'character base',
            source: 'character base',
            stat: 'charisma',
            type: 'base',
            duration: -1,
            amount: 12
          }
        ]
      }
    },
    {
      name: 'intelligence',
      flag: true,
      bonuses: [
        {
          name: 'character base',
          source: 'character base',
          stat: 'intelligence',
          type: 'base',
          duration: -1,
          amount: 8
        }
      ],
      sum: {
        total: 8,
        bonuses: [
          {
            name: 'character base',
            source: 'character base',
            stat: 'intelligence',
            type: 'base',
            duration: -1,
            amount: 8
          }
        ]
      }
    },
    {
      name: 'acrobatics',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'acrobatics',
          type: 'ranks',
          duration: -1,
          amount: 1
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'acrobatics',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'acrobatics',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'acrobatics',
            type: 'ranks',
            duration: -1,
            amount: 1
          },
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'acrobatics',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'appraise',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'appraise',
          type: 'ranks',
          duration: -1,
          amount: 1
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'appraise',
            type: 'ranks',
            duration: -1,
            amount: 1
          }
        ]
      }
    },
    {
      name: 'bluff',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'bluff',
          type: 'ranks',
          duration: -1,
          amount: 1
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'bluff',
            type: 'ranks',
            duration: -1,
            amount: 1
          }
        ]
      }
    },
    {
      name: 'craft',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'craft',
          type: 'ranks',
          duration: -1,
          amount: 1
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'craft',
            type: 'ranks',
            duration: -1,
            amount: 1
          }
        ]
      }
    },
    {
      name: 'diplomacy',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'diplomacy',
          type: 'ranks',
          duration: -1,
          amount: 1
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'diplomacy',
            type: 'ranks',
            duration: -1,
            amount: 1
          }
        ]
      }
    },
    {
      name: 'disableDevice',
      flag: true,
      bonuses: [
        {
          name: 'skills',
          source: 'skills',
          stat: 'disableDevice',
          type: 'ranks',
          duration: -1,
          amount: 1
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'disableDevice',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'disableDevice',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 1,
        bonuses: [
          {
            name: 'skills',
            source: 'skills',
            stat: 'disableDevice',
            type: 'ranks',
            duration: -1,
            amount: 1
          },
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'disableDevice',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'escapeArtist',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'escapeArtist',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'escapeArtist',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'escapeArtist',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'fly',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'fly',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'fly',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'fly',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'ride',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'ride',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'ride',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'ride',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'sleightOfHand',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'sleightOfHand',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'sleightOfHand',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'sleightOfHand',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'stealth',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'stealth',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'stealth',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'stealth',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'swim',
      flag: true,
      bonuses: [
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'swim',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        },
        {
          name: 'armorCheckPenalty',
          source: 'Leather',
          stat: 'swim',
          type: 'armorCheckPenalty',
          duration: -1,
          amount: 0
        }
      ],
      sum: {
        total: 0,
        bonuses: [
          {
            name: 'armorCheckPenalty',
            source: 'Leather',
            stat: 'swim',
            type: 'armorCheckPenalty',
            duration: -1,
            amount: 0
          }
        ]
      }
    },
    {
      name: 'armorClass',
      flag: true,
      bonuses: [
        {
          name: 'armor',
          source: 'Leather',
          stat: 'armorClass',
          type: 'armor',
          duration: -1,
          amount: 2
        },
        {
          name: 'armor',
          source: 'Leather',
          stat: 'armorClass',
          type: 'armor',
          duration: -1,
          amount: 2
        }
      ],
      sum: {
        total: 2,
        bonuses: [
          {
            name: 'armor',
            source: 'Leather',
            stat: 'armorClass',
            type: 'armor',
            duration: -1,
            amount: 2
          }
        ]
      }
    }
  ]
  const newCharacter = {
    race:{
      standardRacialTraits:{
        base:{
          size:"medium"
  }}}}
  const itemList = [{
    id: '5cda6d0a9930571ac0331bfe',
    name: 'Backpack (Empty)',
    expand: false,
    description: '',
    type: 'Adventuring Gear',
    isCollection: {
      included: []
    },
    cost: 2,
    weight: 2
  }]
  const tempEquipment = {
    itemCategory: 'Goods and Services',
    item: {
      id: '5cda6d0a9930571ac0331bfe',
      name: 'Backpack (Empty)',
      expand: false,
      description: '',
      type: 'Adventuring Gear',
      isCollection: {
        included: []
      },
      cost: 2,
      weight: 2
    },
    itemSlots: [
      {
        id: 0,
        currentState: 'saved',
        item: {
          isCollection: {
            included: []
          },
          _id: '5cda6d0a9930571ac0331bfe',
          name: 'Backpack (Empty)',
          expand: false,
          description: '',
          type: 'Adventuring Gear',
          collection: {
            kit: false,
            included: []
          },
          cost: 2,
          weight: 2
        }
      }
    ]
  }
  const items = [
    [{
      id: '5cda6d0a9930571ac0331bfe',
      name: 'Backpack (Empty)',
      expand: false,
      description: '',
      type: 'Adventuring Gear',
      isCollection: {
        included: []
      },
      cost: 2,
      weight: 2
    }]]
    
  it('Renders without crashing', () => {
    shallow(<ItemSlot tempEquipment={tempEquipment} items={items} 
      dispatch={dispatch} id={0}/>);
  });
})