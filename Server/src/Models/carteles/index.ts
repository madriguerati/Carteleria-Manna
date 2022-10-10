import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICarteles extends mongoose.Document{
descripcion: string,
costo1: number,
consto2:number,
insumos: string

};


const cartelesSchema = new Schema(
    {
        insumos:{
        type:Schema.Types.ObjectId, 
        ref:'insumos',
        required: true
        },
        descripcion:{
            type: String,
            required: true
        },
        costo1:
        {
            type:Number,
            required: true
        },
        costo2:
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