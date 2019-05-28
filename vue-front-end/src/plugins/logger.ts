import { rootStoreNamespace } from "@/store/root.store";
import { ActionPayload, MutationPayload, Store } from "vuex";

const typeColor: { [key: string]: string } = {
  [rootStoreNamespace]: "#333333"
};

const getLevel = (str: string) => {
  if (str.match(/(error|err)/i)) {
    return "e";
  }
  if (str.match(/(warning|warn)/i)) {
    return "w";
  }
  if (str.match(/(debug)/i)) {
    return "d";
  }
  return "i";
};

export function logger(name: string) {
  return (type: string, payload?: any) => {
    if (process.env.NODE_ENV === "development") {
      const pl = JSON.stringify(payload);
      const payloadObj = payload ? JSON.parse(pl) : payload;
      const prefix = getLevel(type + (pl || ""));
      const prefixColor: { [key: string]: string } = {
        d: "grey",
        i: "green",
        w: "orange",
        e: "red"
      };
      // eslint-disable-next-line
      console.log(
        `%c${prefix} ${name} ${type}`,
        `color: ${prefixColor[prefix] || "grey"}; font-weight: bolder`,
        payloadObj
      );
    }
  };
}

const splitNamespace = (typeObj: { type: string }) => {
  const match = typeObj.type.match(/^(.*)\/(.*)/);
  const namespace = match ? match[1] : rootStoreNamespace;
  const type = match ? match[2] : typeObj.type;
  return { namespace, type };
};

export const loggerPlugin = (store: Store<any>) => {
  store.subscribeAction((action: ActionPayload, state: any) => {
    const { namespace, type } = splitNamespace(action);
    logger(namespace)(type, action.payload);
  });
  store.subscribe((mutation: MutationPayload, state: any) => {
    const { namespace, type } = splitNamespace(mutation);
    logger(namespace)(type, mutation.payload);
  });
};
