import { genOptimizeTree, genCode, genTestCase } from './index';

const MockSelectMap = {
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and not purchased": "Normal campaign"
}

const MockSelectMap2 = {
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and not purchased": "Error page"
}

const MockSelectMap3 = {
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - before start:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - before start:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - paused:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - paused:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Not Login": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - ended:SystemStatus - Loading:UserStatus - Login and not purchased": "Normal campaign",
  "CampaignStatus - ended:SystemStatus - Error:UserStatus - Login and not purchased": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Not Login": "Please Login",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Not Login": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and purchased": "Normal campaign",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and purchased": "Error page",
  "CampaignStatus - unknown:SystemStatus - Loading:UserStatus - Login and not purchased": "Please use it before purchase",
  "CampaignStatus - unknown:SystemStatus - Error:UserStatus - Login and not purchased": "Error page"
}

const MockPermList = [
  [
    "CampaignStatus - before start",
    "UserStatus - Not Login",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - before start",
    "UserStatus - Not Login",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - before start",
    "UserStatus - Login and purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - before start",
    "UserStatus - Login and purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - before start",
    "UserStatus - Login and not purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - before start",
    "UserStatus - Login and not purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Not Login",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Not Login",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Login and purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Login and purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Login and not purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - paused",
    "UserStatus - Login and not purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Not Login",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Not Login",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Login and purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Login and purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Login and not purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - ended",
    "UserStatus - Login and not purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Not Login",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Not Login",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Login and purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Login and purchased",
    "SystemStatus - Error"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Login and not purchased",
    "SystemStatus - Loading"
  ],
  [
    "CampaignStatus - unknown",
    "UserStatus - Login and not purchased",
    "SystemStatus - Error"
  ]
]

const MockStateParents = [
  {
    "order": 0,
    "title": "CampaignStatus",
    "stateParentId": "1628493837",
    "states": [
      "before start",
      "paused",
      "ended",
      "unknown"
    ]
  },
  {
    "order": 0,
    "title": "UserStatus",
    "stateParentId": "1628493838",
    "states": [
      "Not Login",
      "Login and purchased",
      "Login and not purchased"
    ]
  },
  {
    "order": 0,
    "title": "SystemStatus",
    "stateParentId": "1628502922",
    "states": [
      "Loading",
      "Error"
    ]
  }
]

describe('genOptimizeTree', () => {
  test('should gen code', () => {
    // const node = genOptimizeTree(MockStateParents, MockSelectMap2)
    const node = genOptimizeTree(MockStateParents, MockSelectMap3)
    // console.log("🚀 ~ file: index.test.ts ~ line 216 ~ test ~ node", node)
    const code = genCode(node, 0, MockStateParents)
    console.log(code);
    // genOptimizeTree(MockStateParents, MockSelectMap)
  })
  test('should gen test case', () => {
    // const node = genOptimizeTree(MockStateParents, MockSelectMap2)
    // const node = genOptimizeTree(MockStateParents, MockSelectMap3)
    // console.log("🚀 ~ file: index.test.ts ~ line 216 ~ test ~ node", node)
    const code = genTestCase(MockSelectMap3)
    console.log(code);
    // genOptimizeTree(MockStateParents, MockSelectMap)
  })
})


export default {};