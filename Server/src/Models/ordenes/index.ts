import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IOrdenes extends mongoose.Document{
   fecha: Date,
   cliente: string,
   contacto: string,//nombre de contacto
   cartel: Schema.Types.ObjectId, ref:'carteles',
   operacion:[string],
   lugardecolocacion:string,
   lugartraslado: string,
   seña: number,
   formadepago: [string],
   fechaentrega: Date,
   facturanum: number,
   observaciones:string
   
};

const ordenesSchema = new Schema(
    {
        fecha:
        {
            type: Date,
            required: true
        },
        cliente:
        {
            type:String,
            required:true

        },
        contacto://nombre de contacto
        {
            type:String,
            required:true

        },
        cartel:
        {
            type:Schema.Types.ObjectId, ref:'carteles',
            required: true
        },
        operacion:
        {
            type: [String],
            required:true
        },
        lugardecolocacion:
        {
            type:String,
            required:true
        },
        lugartraslado:
        {
            type: String,
            required:true
        },
        seña:
        {
            type:Number,
            required:true
        },
        formadepago:
        {
            type:[String],
            required: true
        },
        fechaentrega:
        {
            type:Date,
            required:true
        },
        facturanum:
        {
            type:Number,
            required:true
        },
        observaciones:
        {
            type:String,
            required:true
        }

    }
)


export default model<IOrdenes>("ordenes", ordenesSchema)