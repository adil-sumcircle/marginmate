import PaymentChart from './PaymentChart';
import {CalendarBlank,PencilSimple,ShareNetwork} from '@phosphor-icons/react';
import {calculate,money,savedDate,type SavedOrder,type AmountKey} from './calculator';

export default function SavedDetails({order,onBack,onEdit,onShare,notice}:{order?:SavedOrder;onBack:()=>void;onEdit:(order:SavedOrder)=>void;onShare:(order:SavedOrder)=>void;notice:string}){
 if(!order)return <section className="panel"><h1 className="text-xl font-bold">Calculation not found</h1><p className="hint mt-3">It may have been deleted, or saved in another browser or device.</p><button className="btn bg-lime mt-5" onClick={onBack}>Back to saved</button></section>;
 const result=calculate(order.v);
 const costPercent=result.revenue>0?result.cost/result.revenue*100:null;


 const costs:[AmountKey,string][]=[['product','Product cost'],['packaging','Packing'],['delivery','Courier'],['fees','Payment / platform fees'],['other','Other costs']];
 const payments:[AmountKey,string][]=[['price','Price before discount'],['discount','Discount'],['shipping','Customer delivery charge']];
 return <div className="saved-details">

  <section className="panel mb-5"><h1 className="text-2xl font-bold break-words">{order.name}</h1><p className="saved-date"><CalendarBlank size={14}/>{savedDate(order.savedAt)?<time dateTime={order.savedAt}>{savedDate(order.savedAt)}</time>:'Save date unavailable'}</p></section>
  <div className="details-grid">
   <section className="panel"><h2 className="text-lg font-bold mb-4">Your costs</h2>{costs.map(([key,label])=><div className="detail-row" key={key}><span>{label}</span><strong>{money(order.v[key])}</strong></div>)}<div className="total"><span>Total costs</span><strong>{money(result.cost)}</strong></div></section>
   <section className="panel"><h2 className="text-lg font-bold mb-4">What your customer pays</h2>{payments.map(([key,label])=><div className="detail-row" key={key}><span>{label}</span><strong>{key==='discount'?'− ':''}{money(order.v[key])}</strong></div>)}{order.v.price>0&&<p className="hint mt-3">Discount: {Number((order.v.discount/order.v.price*100).toFixed(2))}%</p>}<div className="total"><span>Customer pays in total</span><strong>{money(result.revenue)}</strong></div></section>
  </div>
  <PaymentChart key={order.id} costPercent={costPercent} margin={result.margin} profit={result.profit} revenue={result.revenue} cost={result.cost}/>
  <div className="detail-buttons mt-5"><button className="btn bg-lime" onClick={()=>onEdit(order)}><PencilSimple size={18}/>Edit calculation</button><button className="btn bg-white" onClick={()=>onShare(order)}><ShareNetwork size={18}/>Share summary</button></div>
  <p role="status" className="hint mt-3">{notice}</p>
 </div>;
}
