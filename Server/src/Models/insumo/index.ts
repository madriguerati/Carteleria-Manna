import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IInsumos extends mongoose.Document{
    name: string,
    descripcion: string,
    unidad: Number,
    costo: Number,
    category: string
};


const insumoSchema = new Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        descripcion:
        {
            type: String,
            required: true
        },
        unidad:
        {
            type: String,
            required: true
        },
        costo:
        {
            type:Number,
            request: true
        },
        category:{
            type: [String],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<IInsumos>("insumo", insumoSchema)
