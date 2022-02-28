import BandsService from "./bandsService/bandsService";
import MerchService from "./merchService/merchService";
import bandsServiceProvider from "./bandsService";
import merchServiceProvider from "./merchService"

export interface ServiceContainer {
  bandsService: BandsService;
  merchService: MerchService;
}

export default (): ServiceContainer => {
  const bandsService = bandsServiceProvider();
  const merchService = merchServiceProvider();

  return {
    bandsService,
    merchService
  };
};
