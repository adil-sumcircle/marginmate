export const keys = ['price','discount','product','packaging','delivery','shipping','fees','other','target'] as const;
export type AmountKey = typeof keys[number];
export type Amounts = Record<AmountKey, number>;
export type Form = Record<AmountKey, string>;
export interface SavedOrder { id?: string; name: string; v: Amounts; savedAt?: string }
export function createOrderId():string {
 if(typeof globalThis.crypto?.randomUUID==='function')return globalThis.crypto.randomUUID();
 const bytes=new Uint8Array(16);
 if(typeof globalThis.crypto?.getRandomValues==='function')globalThis.crypto.getRandomValues(bytes);
 else for(let i=0;i<bytes.length;i++)bytes[i]=Math.floor(Math.random()*256);
 return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
}
export const emptyForm = (): Form => Object.fromEntries(keys.map(k => [k,''])) as Form;
export const money = (n: number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
export function parse(form: Form): Amounts {
 const v = Object.fromEntries(keys.map(k => [k,form[k] === '' ? 0 : Number(form[k])])) as Amounts;
 if(keys.some(k => !Number.isFinite(v[k]) || v[k]<0 || v[k]>100000000)) throw new Error('Use amounts between ₹0 and ₹10 crore.');
 if(v.discount>v.price) throw new Error('Discount cannot be more than the selling price.');
 return v;
}
export function calculate(v: Amounts) {
 const revenue=v.price-v.discount+v.shipping, cost=v.product+v.packaging+v.delivery+v.fees+v.other;
 return {revenue,cost,profit:revenue-cost,margin:revenue>0?(revenue-cost)/revenue*100:null,suggested:Math.max(0,cost+v.target+v.discount-v.shipping),minimum:Math.max(0,cost+v.discount-v.shipping)};
}
export function loadSaved(): SavedOrder[] {
 try {const data: unknown=JSON.parse(localStorage.getItem('marginmate-calculations')||'[]');
 if(!Array.isArray(data)) return [];
 const valid=data.filter((x): x is SavedOrder => !!x && typeof x.name==='string' && !!x.v && keys.every(k=>Number.isFinite(x.v[k])&&x.v[k]>=0&&x.v[k]<=100000000)&&x.v.discount<=x.v.price).slice(0,30);
 const seen=new Set<string>();let migrated=false;
 const result=valid.map(order=>{let id=order.id;if(typeof id!=='string'||!id||seen.has(id)){id=createOrderId();migrated=true;}seen.add(id);return {...order,id};});
 if(migrated){try{localStorage.setItem('marginmate-calculations',JSON.stringify(result));}catch{}}
 return result;
 } catch {return [];}
}

export function savedDate(value?:string):string|null{
 if(!value)return null;
 const date=new Date(value);
 if(!Number.isFinite(date.getTime()))return null;
 return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'}).format(date);
}
