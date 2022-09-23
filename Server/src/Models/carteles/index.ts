import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICarteles extends mongoose.Document{
   cantidad: number,
   cartel: [string],//tipo de cartel
   base: number,
   altura: number,
   medidas: number,
   faz:[string],//simple o doble
   valor: number,
   total: number,
   estructura:string,
   archivo: string,
   otros:string
};


const cartelesSchema = new Schema(
    {
        faz:{
            type: [String],
            required: true
        },
        cartel:{//tipo de cartel
            type: [String],
            required: true
        },
        base:
        {
            type:Number,
            request: true
        },
        altura:
        {
            type:Number,
            request: true
        },
        medidas:
        {
            type:Number,
            request: true
        },
        valor:
        {
            type:Number,
            request: true
        },
        total:
        {
            type:Number,
            request: true
        },
        estructura:
        {
            type:String,
            required: true
        },
        archivo:
        {
            type:String,
            required: true
        },
        otros:
        {
            type:String,
            required: true
        }
    }
)


export default model<ICarteles>("carteles", cartelesSchema)