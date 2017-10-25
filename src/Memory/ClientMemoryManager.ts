import { BlisMemory } from '../BlisMemory';
import { BlisDebug } from '../BlisDebug';
import { EntityBase } from 'blis-models'

export class ClientMemoryManager {

    public blisMemory : BlisMemory = null;
    private entities : EntityBase[] = null;

    public constructor(memory : BlisMemory, entities : EntityBase[])
    {
        this.entities = entities;
        this.blisMemory = memory;
    }

    public FindEntity(entityName : string) : EntityBase {
        let match = this.entities.find(e => e.entityName == entityName);
        return match;
    }

    public async RememberEntityAsync(entityName : string, value : string) : Promise<void> {

        let entity = this.FindEntity(entityName);

        if (!entity) {
            BlisDebug.Error(`Can't find Entity named: ${entityName}`);
            return null;
        }
        
        let isBucket = entity.metadata ? entity.metadata.isBucket : false;
        await this.blisMemory.BotMemory.Remember(entity.entityName, entity.entityId, value, isBucket);
    }

    public async ForgetEntityAsync(entityName : string, value : string = null) : Promise<void> {
        
        let entity = this.FindEntity(entityName);

        if (!entity) {
            BlisDebug.Error(`Can't find Entity named: ${entityName}`);
            return null;
        }
        
        // If no value given, wipe all entites from buckets
        let isBucket = (entity.metadata && value) ? entity.metadata.isBucket : false;
        await this.blisMemory.BotMemory.Forget(entity.entityName, value, isBucket);
    }

    public async CopyEntityAsync(entityNameFrom : string, entityNameTo: string) : Promise<void> {
        
        let entityFrom = this.FindEntity(entityNameFrom);
        let entityTo = this.FindEntity(entityNameTo);
        
        if (!entityFrom) {
            BlisDebug.Error(`Can't find Entity named: ${entityNameFrom}`);
            return null;
        }
        if (!entityTo) {
            BlisDebug.Error(`Can't find Entity named: ${entityNameTo}`);
            return null;
        }

        let isBucketFrom = (entityFrom.metadata) ? entityFrom.metadata.isBucket : false;
        let isBucketTo = (entityTo.metadata) ? entityTo.metadata.isBucket : false;
        if (isBucketFrom != isBucketTo) {
            BlisDebug.Error(`Can't copy between Bucket and Non-Bucket Entities`);
            return null;
        }

        // Clear "To" entity
        await this.blisMemory.BotMemory.Forget(entityNameTo);

        // Get value of "From" entity
        let values = await this.blisMemory.BotMemory.ValueAsList(entityNameFrom);

        // Copy values from "From"
        for (let value of values) {
            await this.RememberEntityAsync(entityNameTo, value);
        }
    }

    public async EntityValueAsync(entityName : string) : Promise<string> 
    {
        return await this.blisMemory.BotMemory.Value(entityName);
    }

    public async EntityValueAsListAsync(entityName : string) : Promise<string[]> 
    {
        return await this.blisMemory.BotMemory.ValueAsList(entityName);
    }

    public async GetFilledEntitiesAsync() : Promise<string[]> {
        return await this.blisMemory.BotMemory.RememberedIds();
    }

    public async AppNameAsync() : Promise<string> {
        let app = await this.blisMemory.BotState.App();
        return app.appName;
    }
}    