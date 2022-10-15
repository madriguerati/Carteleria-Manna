import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICarteles extends mongoose.Document{
descripcion: string,
costo1: number,
consto2:number,
insumos: string[]

};


const cartelesSchema = new Schema(
    {
        insumos:{
            type: [String],
            required: true
        },
        descripcion:{
            type: String,
            required: true
        },
        costo1faz:
        {
            type:Number,
            request: true
        },
        costo2faz:
        {
            type:Number,
            request: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<ICarteles>("carteles", cartelesSchema)