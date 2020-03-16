import data from "./data";

export default {
  Query: {
    variety: (parent: any, args: { id: string }): object => {
      const { id } = args;
      const result = data.find((element: any) => element.id == id);
      return result;
    },
    allVarieties: (): any[] => data
  }
};
