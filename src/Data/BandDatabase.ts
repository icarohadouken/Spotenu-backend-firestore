import {BaseDatabase} from './BaseDatabase'
import {Band} from '../Model/Band'

export class BandDatabase extends BaseDatabase {
    protected tableName: string = "Band"

    private toModel(dbModel?: any): Band | undefined {
        return (
            dbModel &&
            new Band(
                dbModel.id,
                dbModel.name,
                dbModel.nickname,
                dbModel.description,
                dbModel.password,
                dbModel.authorization,
                dbModel.email
            )
        );
    }

    public async createBand(band: Band): Promise<void> {
        await this.getConnection()
            .insert(band)
            .into(this.tableName)
    }

    public async getBands(): Promise<Band[]> {
        const result = await this.getConnection()
            .select('id', 'name', 'email', 'nickname', 'authorization')
            .from(this.tableName)

        return result
    }

    public async getBandById(id: string): Promise<Band | undefined>{
        const result = await this.getConnection()
            .select('*')
            .from(this.tableName)
            .where({id})
        return this.toModel(result[0])
    }

    public async getBandByNickname(nickname: string): Promise<Band | undefined> {
        const result = await this.getConnection()
            .select('*')
            .from(this.tableName)
            .where({nickname})

        return this.toModel(result[0])
    }

    public async approveBand(id: string): Promise<void> {
        await this.getConnection()
            .raw(`
                UPDATE ${this.tableName}
                SET authorization = true
                where id = '${id}'
            `)
    }
}