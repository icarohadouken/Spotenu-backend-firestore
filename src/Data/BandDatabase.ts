import {db} from '../index'
import {Band} from '../Model/Band'

export class BandDatabase {
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
        await db.collection("Band").doc(band.getId()).set({
            id: band.getId(),
            name: band.getName(),
            nickname: band.getNickname(),
            email: band.getEmail(),
            description: band.getDescription(),
            password: band.getPassword(),
            authorization: band.getAuthorization()
        })
    }

    public async getBands(): Promise<Band[]> {
        const result = await db.collection('Band').get()

        return result.docs.map(band => ({
            id: band.data().id,
            name: band.data().name,
            nickname: band.data().nickname,
            email: band.data().email,
            authorization: band.data().authorization
        }))
    }

    public async getBandById(id: string): Promise<Band | undefined>{
        const result = await db.collection('Band').where('id', "==", id).get()

        const band = result.docs.map(band => ({
            ...band.data()
        }))

        return this.toModel(band[0])
    }

    public async loginBand(login: string): Promise<Band | undefined> {
        const result = await db.collection('Band').where('email', "==", login).get()

        const band =  result.docs.map(band => ({
            ...band.data()
        }))

        if(!band[0]){
            const nickname = await db.collection('Band').where('nickname', "==", login).get()

            const bandByNickname = nickname.docs.map(band => ({
                ...band.data()
            }))

            return bandByNickname
        }

        return this.toModel(band[0])
    }

    public async approveBand(id: string): Promise<void> {
        await db.collection("Band").doc(id).update({authorization: true})
    }
}