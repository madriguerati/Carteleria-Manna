import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IInsumos extends mongoose.Document{
    name: string,
    descripcion: string,
    unidad: Number,
    costo: Number
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
            type: Number,
            required: true
        },
        costo:
        {
            type:Number,
            request: true
        }
    }
)


export default model<IInsumos>("insumo", insumoSchema)
