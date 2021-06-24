import CharacterClass from "../../shared/enums/CharacterClass";
import CharacterRace from "../../shared/enums/CharacterRace";
import TargetActionType from "../enums/TargetActionType";
import loadStats from "../utils/loadStats";

export default class PlayerState {
  private _charClass?: CharacterClass;
  private _charRace?: CharacterRace;
  private _health: number;
  private _currentHealth: number;
  private _mana: number;
  private _currentMana: number;
  private _stamina: number;
  private _currentStamina: number;
  private _targetActionType: TargetActionType;
  private _selectedSpellId: number;
  private _lastWalkingTime: number;

  // Getters
  public getHealth(): number {
    return this._health;
  }

  public getCurrentHealth(): number {
    return this._currentHealth;
  }

  public getMana(): number {
    return this._mana;
  }

  public getCurrentMana(): number {
    return this._currentMana;
  }

  public getStamina(): number {
    return this._stamina;
  }

  public getCurrentStamina(): number {
    return this._currentStamina;
  }

  public getTargetActionType(): TargetActionType {
    return this._targetActionType;
  }

  public getSelectedSpellId(): number {
    return this._selectedSpellId;
  }

  public getLastWalkingTime(): number {
    return this._lastWalkingTime;
  }

  // Setters
  public setLastWalkingtime(lastWalkingTime: number): void {
    this._lastWalkingTime = lastWalkingTime;
  }

  public setHealth(value: number): void {
    this._health = value;
  }

  public modCurrentHealth(value: number): void {
    this._currentHealth += value;
    if (this._currentHealth < 0) this._currentHealth = 0;
  }

  public setMana(value: number): void {
    this._mana = value;
  }

  public modCurrentMana(value: number): void {
    this._currentMana += value;
    if (this._currentMana < 0) this._currentMana = 0;
  }

  public setStamina(value: number): void {
    this._stamina = value;
  }

  public modCurrentStamina(value: number): void {
    this._currentStamina += value;
    if (this._currentStamina < 0) this._currentStamina = 0;
  }

  public setTargetActionType(value: TargetActionType): void {
    this._targetActionType = value;
  }

  public setSelectedSpellId(value: number): void {
    this._selectedSpellId = value;
  }

  constructor() {
    this._lastWalkingTime = 0;
    this._health = 0;
    this._currentHealth = 0;
    this._mana = 0;
    this._currentMana = 0;
    this._stamina = 0;
    this._currentStamina = 0;
    this._targetActionType = TargetActionType.NOTHING;
    this._selectedSpellId = 0;
  }

  public init(charClass: CharacterClass, charRace: CharacterRace): void {
    this._charClass = charClass;
    this._charRace = charRace;

    loadStats(this, this._charClass, this._charRace);
    // TODO: clase, raza
    this._health = 330;
    this._currentHealth = 330;
    this._mana = 2422;
    this._currentMana = 2422;
    this._stamina = 550;
    this._currentStamina = 550;
  }
}
