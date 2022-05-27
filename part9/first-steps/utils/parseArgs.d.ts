interface NumberArgs {
    [key: string]: number;
}
declare const parseNumberArgs: (args: string[], argsAccepted?: number, argsMin?: number) => NumberArgs;
export default parseNumberArgs;
