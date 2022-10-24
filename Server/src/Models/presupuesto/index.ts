import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IPresupuesto extends mongoose.Document{
  fecha: Date,
  clientes: Schema.Types.ObjectId,// que muestre nombre de contacto y telefono en el front
  //clientes: string,
  //contacto: string,
  carteles: Schema.Types.ObjectId,
  operacion:string,
  lugardecolocacion: string,//lugar de entrega colocación/entrega
  //lugartraslado:string,
  montototal: number,
  formadepago:string,
  plazodeentrega:number,
  fechavalida: Date,//presupuesto valido hasta 
  observaciones:string
   
};

const presupuestoSchema = new Schema(
    {
      fecha: {
        type: Date,
        required: true
      },

      clientes: [
        {
          type: Schema.Types.ObjectId,
          ref: "clientes",
        },
      ],
      carteles:[
        {
          type: Schema.Types.ObjectId,
          ref: "carteles",
        },
      ],
      operacion:
      {
        type: String,
        required: true
      },
      lugardecolocacion:
      {
          type:String,
          required:true
      },
      
      formadepago:
      {
          type:[String],
          required: true
      },
      fechavalida:
      {
          type:Date,
          required:true
      },
      montototal:
      {
        type: Number,
        required: true
      },
      plazodeentrega:
      {
        type: Number,
        required:true
      },
      observaciones:
      {
        type: String,
        required: true
      }

    },
    {
      timestamps: true,
      versionKey: false,
      }
)


export default model<IPresupuesto>("presupuesto", presupuestoSchema)