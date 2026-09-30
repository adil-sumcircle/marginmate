export const keys = ['price','discount','product','packaging','delivery','shipping','fees','other','target'] as const;
export type AmountKey = typeof keys[number];
export type Amounts = Record<AmountKey, number>;
export type Form = Record<AmountKey, string>;
export interface SavedOrder { name: string; v: Amounts }
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
 return data.filter((x): x is SavedOrder => !!x && typeof x.name==='string' && !!x.v && keys.every(k=>Number.isFinite(x.v[k])&&x.v[k]>=0&&x.v[k]<=100000000)&&x.v.discount<=x.v.price).slice(0,30);
 } catch {return [];}
}
