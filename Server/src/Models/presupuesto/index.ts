import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IPresupuesto extends mongoose.Document{
  fecha: Date,
  //clientes: Schema.Types.ObjectId, ref:'clientes',
  clientes: string,
  contacto: string,
  carteles: Schema.Types.ObjectId, ref:'carteles',
  operacion:string,
  lugardecolocacion: string,
  lugartraslado:string,
  montototal: number,
  formadepago:string,
  plazodeentrega:number,
  fechavalida: Date,
  observaciones:string
   
};

const presupuestoSchema = new Schema(
    {
      fecha: {
        type: Date,
        required: true
      },
      cliente: {
        type: String,
        required: true,
      },
      contacto: //nombre de contacto
      {
        type: String,
        required: true
      },
      carteles:
      {
        type:Schema.Types.ObjectId, 
        ref:'carteles',
        required: true
      },
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
      lugartraslado:
      {
          type: String,
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
      montoTotal:
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

    }
)


export default model<IPresupuesto>("presupuesto", presupuestoSchema)