import {Config} from "./../../config/config";
import {CreepActionInterface, CreepAction} from "./creep-action"

export interface BuilderInterface {

    targetConstructionSite: ConstructionSite;
    energyStation: Spawn|Storage;

    hasEmptyBag(): boolean;
    askForEnergy(): number;
    moveToAskEnergy(): void;
    tryBuild(): number;
    moveToBuild(): void;

    action(): boolean;
}

export class Builder extends CreepAction implements BuilderInterface, CreepActionInterface {

    public targetConstructionSite: ConstructionSite = null;
    public energyStation: Spawn|Storage = null;

    public setCreep(creep: Creep) {
        super.setCreep(creep);

        //this.targetSource = <Source>Game.getObjectById(this.creep.memory.target_source_id);
        //this.targetEnergyDropOff = <Spawn|Structure>Game.getObjectById(this.creep.memory.target_energy_dropoff_id);
    }

    public hasEmptyBag(): boolean {
        return (this.creep.carry.energy == 0);
    }

    public tryBuild(): number {
        return this.creep.build(this.targetConstructionSite);
    }

    public moveToBuild(): void {
        if (this.tryBuild() == ERR_NOT_IN_RANGE) {
            this.moveTo(this.targetConstructionSite);
        }
    }

    public askForEnergy(): number {
        //return this.energyStation.transferEnergy(this.creep);
    }

    public moveToAskEnergy(): void {
        if (this.askForEnergy() == ERR_NOT_IN_RANGE) {
            this.moveTo(this.energyStation);
        }
    }

    public action(): boolean {
        if (this.needsRenew()) {
            this.moveToRenew();
        } else if (this.hasEmptyBag()) {
            this.moveToAskEnergy();
        } else {
            this.moveToBuild();
        }

        return true
    }


}
