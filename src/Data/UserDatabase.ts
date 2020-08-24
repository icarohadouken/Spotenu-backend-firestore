import { db } from '../index'
import { User } from '../Model/User'

export class UserDatabase {

    private toModel(dbModel?: any): User | undefined {
        return (
            dbModel &&
            new User(
                dbModel.id,
                dbModel.name,
                dbModel.nickname,
                dbModel.email,
                dbModel.password,
                dbModel.role
            )
        );
    }

    public async createUser(user: User): Promise<void> {
        await db.collection('User').doc(user.getId()).set({
            id: user.getId(),
            name: user.getName(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        })
    }

    public async getUserByEmailOrNickname(emailOrNickname: string): Promise<User | undefined> {

        const users = db.collection('User')

        const results = await users.where('email', '==', emailOrNickname).get();

        const user =  results.docs.map(doc => ({
            ...doc.data()
        }))

        if(!user[0]){
            const nickname = await users.where('nickname', '==', emailOrNickname).get()
            const userByNickname = nickname.docs.map(doc => ({
                ...doc.data()
            }))

            return this.toModel(userByNickname[0])
        }

        return this.toModel(user[0])
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const users = db.collection('User')

        const results = await users.where('id', "==", id).get()

        const user = results.docs.map(doc => ({
            ...doc.data()
        }))

        return this.toModel(user[0])
    }
}