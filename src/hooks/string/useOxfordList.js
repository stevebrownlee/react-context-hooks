export const useOxfordList = array =>
    array.map((a, i, arr) => (i === arr.length - 1) ? "and " + a.name : a.name).join(", ")
