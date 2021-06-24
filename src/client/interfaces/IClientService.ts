export default interface IClientService {
  join(username: string): Promise<void>;
  send(type: string | number, message?: any): void;
  getLanguage(): string;
  getLastWalkTime(): number;
  updateLastWalkTime(): void;
}
