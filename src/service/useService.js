import serverService from './service';

export default function webService(jwtOverrideConfig) {
  return new serverService(jwtOverrideConfig);
}
