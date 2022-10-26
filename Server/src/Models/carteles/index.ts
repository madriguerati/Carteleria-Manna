import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICarteles extends mongoose.Document{
descripcion: string,
costo1faz: number,
consto2faz:number,
insumosArray: string

};


const cartelesSchema = new Schema(
    {
        insumosArray:{
            type: [String],
            request:true,
        },
        descripcion:{
            type: String,
            request: true
        },
        costo1faz:
        {
            type:Number,
            required: true
        },
        costo2faz:
        {
            type:Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<ICarteles>("carteles", cartelesSchema)