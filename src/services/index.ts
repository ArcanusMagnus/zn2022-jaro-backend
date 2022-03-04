import BandsService from "./bandsService/bandsService";
import MerchService from "./merchService/merchService";
import AuthService from "./authService/authService";
import bandsServiceProvider from "./bandsService";
import merchServiceProvider from "./merchService";
import authServiceProvider from "./authService";

export interface ServiceContainer {
  bandsService: BandsService;
  merchService: MerchService;
  authService: AuthService;
}

export default (): ServiceContainer => {
  const bandsService = bandsServiceProvider();
  const merchService = merchServiceProvider();
  const authService = authServiceProvider();

  return {
    bandsService,
    merchService,
    authService
  };
};
