function* idDispatcher() {
  let i = Math.floor(Date.now() / 1000);
  while (true) {
    yield i++;
  }
}

const genStateParentIdIter = idDispatcher()

export const genStateParentId = () => {
  const id = genStateParentIdIter.next().value as number;
  return id.toString();
}

const genStateOutputIdIter = idDispatcher()

export const genStateOutputId = () => {
  const id = genStateOutputIdIter.next().value as number;
  return id.toString();
}

const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const isContainSpecialChar = (text: string) => format.test(text)
