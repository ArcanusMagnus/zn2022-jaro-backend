import BandsService from "./bandsService/getAllBandsService";
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
