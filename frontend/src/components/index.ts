import Atoms from "./atoms";
import Molecules from "./molecules";

export const install = (Vue: any) => {
    Vue.use(Atoms);
    Vue.use(Molecules);
};

export * from "./atoms";
export * from "./molecules";

export default install;
