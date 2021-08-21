import { StateParent } from '@/slices/stateParents';
import sortBy from 'lodash/sortBy';
import union from 'lodash/union';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';


export class StateNode {
  constructor(
    public children: StateNode[],
    public nodeCount: number, // including self
    public nodePruneCount: number, // including self
    public outputs: string[],
    public isPruned: boolean,
    public isLeaf: boolean,
    public leafCount: number,
    public leafPrunedCount: number,
    public path: string[],
  ) {}
}

export const hashKey = (path: string[]) => {
  const sorted = sortBy(path)
  return sorted.join(':')
}

const TITLE_SEPARATOR = ' - '

const normalizeStates = (stateParents: StateParent[]) => {
  return stateParents
    .map(({ title, states }) => states.map((state) => `${title}${TITLE_SEPARATOR}${state}`))
    .filter((states) => states.length)
}

const transformTitleToExp = (title: string) => upperFirst(camelCase(title))

const stateTitleToExpression = (titleState: string = '') => {
  const [title, state = 'TESTQQQ'] = titleState.split(TITLE_SEPARATOR)

  if (!state) {
    throw new Error('stateTitle parse error with input:  ' + titleState)
  }

  return `${transformTitleToExp(title)}.${camelCase(state)}`;
}

const stateTitleToVariable = (titleState: string = '') => {
  const [title] = titleState.split(TITLE_SEPARATOR)
  return `${camelCase(title)}`;
}

const permListRecur = (
  states2D: string[][],
  idx: number,
  path: string[],
  res: string[][]
  ) => {
  if (idx === states2D.length) {
    res.push(path);
    return
  }
  const states = states2D[idx]
  for (const state of states) {
    permListRecur(states2D, idx + 1, [...path, state], res)
  }
}

/* TODO */
const permTreeRecur = (
  states2D: string[][],
  idx: number,
  path: string[],
  selectMap: Record<string, string>,
  // curstate: string
): StateNode => {
  if (idx === states2D.length) {
    const key = hashKey(path)
    const output = selectMap[key]
    return new StateNode([], 0, 0, output ? [output] : [], false, true, 0, 0, path);
  }
  const node = new StateNode([], 1, 1, [], false, false, 0, 0, path)

  const children = []
  let outputs: string[] = []

  const states = states2D[idx]
  for (const state of states) {
    const child = permTreeRecur(states2D, idx + 1, [...path, state], selectMap)

    outputs = union(outputs, child.outputs)
    children.push(child)
  }

  if (outputs.length === 1) {
    node.isPruned = true
    node.nodePruneCount = 1
    node.leafPrunedCount = 1
    // common
    node.nodeCount = children.reduce((pre, cur) => pre + cur.nodeCount, 1)
  } else if (outputs.length === 0) {
    node.nodePruneCount = children.reduce((pre, cur) => pre + cur.nodePruneCount, 0)
    node.isPruned = false
    node.leafPrunedCount = children.reduce((pre, cur) => pre + cur.leafPrunedCount, 0)
    // common
    node.nodeCount = children.reduce((pre, cur) => pre + cur.nodeCount, 0)
    
  } else {
    node.nodePruneCount = children.reduce((pre, cur) => pre + cur.nodePruneCount, 1)
    node.isPruned = false
    node.leafPrunedCount = children.reduce((pre, cur) => pre + cur.leafPrunedCount, 0)
    // common
    node.nodeCount = children.reduce((pre, cur) => pre + cur.nodeCount, 1)
  }

  // common
  node.leafCount = children.reduce((pre, cur) => pre + cur.leafCount, 0)
    node.children = children
    node.outputs = outputs

  return node
}

export const genPermListFromStateParents = (stateParents: StateParent[]) => {
  const res: string[][] = []
  permListRecur(normalizeStates(stateParents), 0, [], res)
  return res;
}

const filterState2DBySelectMap = (states2D: string[][], selectMap: Record<string, string>) => {
  states2D.forEach((states) => {
    // console.log(states);
  })
  Object.keys(selectMap)
    .forEach((key) => {
      
    })
  return states2D;
}

/* TODO */
export const genPerTreeFromStateParents = (stateParents: StateParent[], selectMap: Record<string, string>): StateNode => {
  const states2D = normalizeStates(stateParents)
  const filteredState2D = filterState2DBySelectMap(states2D, selectMap)
  return permTreeRecur(filteredState2D, 0, [], selectMap)
}

export const permOrder = <T>(list: T[]): T[][] => {
  const listClone = list.slice()
  var length = list.length,
      result = [list.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = listClone[i];
      listClone[i] = listClone[k];
      listClone[k] = p;
      ++c[i];
      i = 1;
      result.push(listClone.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

/* TODO */
export const genOptimizeTree = (
  stateParents: StateParent[],
  selectMap: Record<string, string>
): StateNode => {
  const stateParentAllOrders = permOrder(stateParents)
  let min = Infinity;
  let minNode = new StateNode([], 1, 1, [], false, false, 0, 0, [])
  for (const _stateParents of stateParentAllOrders) {
    const node = genPerTreeFromStateParents(_stateParents, selectMap)
    if (min > node.leafPrunedCount) {
      min = node.leafPrunedCount
      minNode = node
    }
  }
  return minNode;
}

const INDENT_SIZE = 2;
const OUTPUT_HANDLING = 'outputHandler'
const STATE_HANDLER = 'stateHandler';
const STATE_MAP_NAME = 'StateMap';

const createSpace = (n: number) => {
  let s = ''
  for (let i = 0; i < n; i++) {
    s += ' '
  }
  return s
}

export const genTestCase = (selectMap: Record<string, string>) => {
  const code: string[] = []
  Object.keys(selectMap)
    .forEach((key) => {
      const stateTitles = key.split(':')
      const output = selectMap[key]
      const args = stateTitles.map((stateTitle) => {
        const [title, state] = stateTitle.split(TITLE_SEPARATOR)
        return `${transformTitleToExp(title)}.${camelCase(state)}`
      })
      code.push(
        `expect(${STATE_HANDLER}(${args.join(', ')})).toEqual(${OUTPUT_HANDLING}("${output}"))`
      )
    })
  

  return code
}

export const genCode2 = (stateParents: StateParent[], selectMap: Record<string, string>) => {
  let code: string[] = []
  let obj = {}
  let accessor = ''
  let isAccessorSet = false
  Object.keys(selectMap)
    .forEach((key) => {
      const stateTitles = key.split(':')
      const output = selectMap[key]
      let curObj: any = obj
      stateTitles.forEach((stateTitle, i) => {
        const [title, state] = stateTitle.split(TITLE_SEPARATOR)
        const key = `[${transformTitleToExp(title)}.${camelCase(state)}]`
        if (!isAccessorSet) {
          accessor += `[${camelCase(title)}]`
        }
        if (!curObj[key]) {
          curObj[key] = {}
        }
        if (i === stateTitles.length - 1) {
          curObj[key] = output
        } else {
          curObj = curObj[key]
        }
      })
      isAccessorSet = true
    })

    code.push(`${createSpace(INDENT_SIZE)}return ${OUTPUT_HANDLING}(${STATE_MAP_NAME}${accessor})`)

    const variableDeclare = []
    const args: string[] = []
    stateParents.forEach(({ title, states }) => {
      const transformedTitle = transformTitleToExp(title)
      variableDeclare.push(`const ${transformedTitle} = {`)
      args.push(stateTitleToVariable(title))
      states.forEach((state, i) => {
        variableDeclare.push(`${createSpace(INDENT_SIZE)}${camelCase(state)}: "${state}"${states.length - 1 === i ? '' : ','}`)
      })
      variableDeclare.push('}')
    })
    variableDeclare.push('')

    const stateMap = JSON.stringify(obj, null, INDENT_SIZE)
      .replace(/"\[/g, '[')
      .replace(/]"/g, ']')

    code = [
      ...variableDeclare,
      `const ${STATE_MAP_NAME} = ${stateMap}`,
      '',
      `const ${OUTPUT_HANDLING} = output => output`,
      '',
      `const ${STATE_HANDLER} = (${sortBy(args).join(', ')}) => {`,
      ...code,
      '}'
    ]
  return code
}


export const genCode = (
  node: StateNode,
  level: number = 0,
  stateParents: StateParent[],
  compress: string[] = [],
  pruneOutput: string = '',
): string[] => {
  if (node.outputs.length === 0) return [];
  const {
    children,
    outputs,
    path,
  } = node
  let code: string[] = []
  if (!children.length && outputs.length === 1) {
    const targetState = path[path.length - 1];
    if (!compress.length) {
      code.push(
        createSpace(
          level * INDENT_SIZE
        ) +
          'if (' +
          stateTitleToVariable(targetState) + ' === ' + stateTitleToExpression(targetState) +
          ') {'
      )
    } else {
      const conditions: string[] = [
        createSpace(level * INDENT_SIZE) + 'if (',
      ]

      compress.forEach((targetState, i) => {
        conditions.push(
          createSpace((level + 1) * INDENT_SIZE) +
          stateTitleToVariable(targetState) + ' === ' + stateTitleToExpression(targetState)
          +
          ((compress.length - 1 === i) ? '' : ' ||')
        )
      })
      conditions.push(createSpace(level * INDENT_SIZE) + ') {')


      code.push(...conditions)
    }
    code.push(
      createSpace((level + 1) * INDENT_SIZE) +
      'return ' +
      OUTPUT_HANDLING + '("' +
      outputs[0] +
      '")'
    )
    code.push(createSpace(level * INDENT_SIZE) + '}')

    return code;
  }

  const sorted = sortBy(children, ({ leafPrunedCount }) => leafPrunedCount)
  const compressed = new Array(sorted.length).fill(false);
  const skipped = new Array(sorted.length).fill(false);
  const reverseMap: Record<string, string[]> = {}

  for (let i = 0; i < sorted.length; i++) {
    const child = sorted[i]
    const key = hashKey(child.outputs)
    if (reverseMap[key]) {
      reverseMap[key].push(child.path[child.path.length - 1])
    } else {
      reverseMap[key] = [child.path[child.path.length - 1]]
    }
  }

  for (let i = 0; i < sorted.length; i++) {
    const child = sorted[i]
    const key = hashKey(child.outputs)
    if (reverseMap[key].length > 1) {
      skipped[i] = true
    }
  }

  for (let i = 0; i < sorted.length; i++) {
    const child = sorted[i]
    const key = hashKey(child.outputs)
    if (reverseMap[key].length > 1) {
      skipped[i] = false
      compressed[i] = reverseMap[key].slice()
      reverseMap[key] = []
    }
  }


  for (let i = 0; i < sorted.length; i++) {
    if (skipped[i]) continue;

    const child = sorted[i];

    if (compressed[i]) {
      code.push(...genCode(child, level + 1, stateParents, compressed[i]));
    } else {
      code.push(...genCode(child, level + 1, stateParents));
    }
  }
  const currentTargetState = path[path.length - 1];
  if (currentTargetState) {
    code = [
      `${createSpace(level * INDENT_SIZE)}if (${stateTitleToVariable(currentTargetState)} === ${stateTitleToExpression(currentTargetState)}) {`,
      ...code,
      `${createSpace(level * INDENT_SIZE)}}`,
    ]
  }

  if (level === 0) {

    const variableDeclare = []
    const args: string[] = []
    stateParents.forEach(({ title, states }) => {
      const transformedTitle = transformTitleToExp(title)
      variableDeclare.push(`const ${transformedTitle} = {`)
      args.push(stateTitleToVariable(title))
      states.forEach((state) => {
        variableDeclare.push(`${createSpace(INDENT_SIZE)}${camelCase(state)}: "${state}"`)
      })
      variableDeclare.push('}')
    })
    variableDeclare.push('')
    code = [
      ...variableDeclare,
      `const ${OUTPUT_HANDLING} = output => output`,
      '',
      `const ${STATE_HANDLER} = (${sortBy(args).join(', ')}) => {`,
      ...code,
      ...(
        pruneOutput
        ? [
          `return ${OUTPUT_HANDLING}("${pruneOutput}")`
        ]
        : []
      ),
      '}'
    ]
  }
  return code
}
