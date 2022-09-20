import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IClientes extends mongoose.Document{
    name: string,
    telefono: Number,
    cuit: Number,
    direccion: string,
    email: string,
    web: string
};


const clientesSchema = new Schema(
    {
        //nombre contacto
        name: 
        {
            type: String,
            required: true
        },
        telefono:
        {
            type: Number,
            required: true
        },
        cuit:
        {
            type: Number,
            required: true
        },
        direccion:
        {
            type:String,
            request: true
        },
        email:{
            type: String,
            required: true
        },
        condicioniva:{
            type: [String],
            required: true
        },
        razonsocial:{
            type: String,
            required: true
        }
    }
)


export default model<IClientes>("clientes", clientesSchema)