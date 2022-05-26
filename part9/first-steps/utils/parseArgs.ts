interface NumberArgs {
  [key: string]: number
}

const parseNumberArgs = (
  args: string[],
  argsAccepted: number = 2,
  argsMin: number = 2
): NumberArgs => {
  const argsMax = argsAccepted + 2
  if (args.length < argsMax || args.length <= argsMin)
    throw new Error('Not enough arguments !')
  if (args.length > argsMax) throw new Error('Too many arguments !')

  const actualArgs = args.slice(2)
  const areArgsNumber = actualArgs.map((arg) => !isNaN(Number(arg)))
  const argsAreNumbers = areArgsNumber.reduce((acc, curr) => acc && curr, true)

  if (!argsAreNumbers) throw new Error('Value provided are not numbers !')
  const resultArgs: NumberArgs = {}
  actualArgs.forEach(
    (arg, index) => (resultArgs[`value${index + 1}`] = Number(arg))
  )
  return resultArgs
}

export default parseNumberArgs
