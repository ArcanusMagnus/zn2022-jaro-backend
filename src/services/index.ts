import BandsService from "./bandsService/bandsService";
import bandsServiceProvider from "./bandsService";

export interface ServiceContainer {
  bandsService: BandsService;
}

export default (): ServiceContainer => {
  const bandsService = bandsServiceProvider();

  return {
    bandsService,
  };
};
