import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IOrdenes extends mongoose.Document{
   fecha: Date,
   cliente: string,
   contacto: string,//nombre de contacto
   carteles: Schema.Types.ObjectId, ref:'carteles',
   operacion:string,
   lugardecolocacion:string,
   lugartraslado: string,
   seña: number,
   montototal:number,// info puede venir de presupuesto cuando se transforme 
   formadepago: string,
   fechaentrega: Date,
   facturanum: string,
   plazodeentrega:string,
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
        carteles:
        {
            type:Schema.Types.ObjectId, ref:'carteles',
            required: true
        },
        operacion:
        {
            type: String,
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
            type:String,
            required: true
        },
        fechaentrega:
        {
            type:Date,
            required:true
        },
        facturanum:
        {
            type:String,
            required:true
        },
        montototal:
        {
            type:Number,
            required:true
        },
        observaciones:
        {
            type:String,
            required:true
        }

    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<IOrdenes>("ordenes", ordenesSchema)