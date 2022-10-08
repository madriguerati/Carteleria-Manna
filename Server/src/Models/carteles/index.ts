import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICarteles extends mongoose.Document{
   cantidad: Number,
   cartel: [string],//tipo de cartel
   base: Number,
   altura: Number,
   medidas: Number,
   faz:[string],//simple o doble
   valor: Number,
   total: Number,
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
        carteles:{//tipo de cartel
            type: [String],
            required: true
        },
        base:
        {
            type:Number,
            required: true
        },
        altura:
        {
            type:Number,
            required: true
        },
        medidas:
        {
            type:Number,
            required: true
        },
        valor:
        {
            type:Number,
            required: true
        },
        cantidad:
        {
            type:Number,
            required: true
        },
        total:
        {
            type:Number,
            required: true
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
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<ICarteles>("carteles", cartelesSchema)