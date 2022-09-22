import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IOrdenes extends mongoose.Document{
   fecha: Date,
   cliente: string,
   contacto: string,//nombre de contacto
   cartel: {type: mongoose.Types.ObjectId}
};


const ordenesSchema = new Schema(
    {
        faz:{
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


export default model<IOrdenes>("insumo", ordenesSchema)