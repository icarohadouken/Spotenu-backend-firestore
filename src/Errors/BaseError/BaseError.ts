export abstract class BaseError extends Error {
    constructor(message: string, public errorCode: Number){
        super(message)
    }
}