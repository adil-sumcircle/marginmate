import {money} from './calculator';
import {useEffect,useRef,useState} from 'react';
import {animate,motion,useInView,useMotionValue,useMotionValueEvent,useReducedMotion,useTransform} from 'framer-motion';

function RollingPercentage({value,active}:{value:number|null;active:boolean}){
 const reduced=useReducedMotion();
 const text=value===null?'—':`${value.toFixed(1)}%`;
 return <strong className="rolling-percentage" aria-label={value===null?'Margin unavailable':`${value.toFixed(1)}%`}><span className="rolling-digits" aria-hidden="true">{Array.from(text).map((char,index)=>/[0-9]/.test(char)?<span className="rolling-digit" key={index}><motion.span className="digit-strip" initial={false} animate={{y:active?`-${(10+Number(char))*1.25}em`:'0em'}} transition={{duration:reduced?0:2.8,delay:reduced?0:index*0.12,ease:[0.45,0,0.15,1]}}>{Array.from({length:20},(_,digit)=><span key={digit}>{digit%10}</span>)}</motion.span></span>:<span key={index}>{char}</span>)}</span></strong>;
}

export default function PaymentChart({costPercent,margin,profit,revenue,cost}:{costPercent:number|null;margin:number|null;profit:number;revenue:number;cost:number}){
 const ref=useRef<HTMLElement>(null);
 const visible=useInView(ref,{once:true,amount:0.3});
 const reduced=useReducedMotion();
 const progress=useMotionValue(0);
 const [count,setCount]=useState(0);
 useMotionValueEvent(progress,'change',setCount);
 useEffect(()=>{if(!visible)return;const animation=animate(progress,1,{duration:reduced?0:2.8,ease:[0.45,0,0.15,1]});return()=>animation.stop();},[visible,reduced,progress]);
 const circumference=2*Math.PI*48;
 const costArc=Math.min(100,Math.max(0,costPercent||0));
 const profitArc=Math.min(100,Math.max(0,margin||0));
 const costLength=Math.max(0,costArc-(profitArc>0?1.2:0))/100*circumference;
 const profitLength=Math.max(0,profitArc-(costArc>0?1.2:0))/100*circumference;
 const costDash=useTransform(progress,p=>`${p*costLength} ${circumference}`);
 const profitDash=useTransform(progress,p=>`${p*profitLength} ${circumference}`);
 const costOpacity=useTransform(progress,p=>costArc>0&&p>0?1:0);
 const profitOpacity=useTransform(progress,p=>profitArc>0&&p>0?1:0);
 const percentage=(value:number|null)=>value===null?'—':`${(value*count).toFixed(1)}%`;
 return <section ref={ref} className="panel detail-chart-panel"><div className="combined-profit"><h2>{profit<0?'Your loss per order':'Your profit per order'}</h2><strong className={profit<0?'is-loss':''}>{money(Math.abs(profit))}</strong><p>{profit<0?`You lose ${money(-profit)} on this order.`:profit===0?'This order covers your costs.':`You keep ${money(profit)} from this order.`}</p></div><h3 className="payment-split-title">How the customer payment is split</h3><div className="detail-chart-content"><div className="detail-donut"><svg viewBox="0 0 120 120" role="img" aria-label={costPercent===null?'No customer payment to calculate percentages':`Costs ${costPercent.toFixed(1)}%, profit margin ${margin?.toFixed(1)}%`}><circle cx="60" cy="60" r="48" fill="none" stroke="#e6eee8" strokeWidth="10"/><g transform="rotate(-90 60 60)"><motion.circle cx="60" cy="60" r="48" fill="none" stroke="#6e9b86" strokeWidth="10" strokeLinecap="round" style={{strokeDasharray:costDash,opacity:costOpacity}}/>{profitArc>0&&<motion.circle cx="60" cy="60" r="48" fill="none" stroke="#c8f36a" strokeWidth="10" strokeLinecap="round" strokeDashoffset={-costArc/100*circumference} style={{strokeDasharray:profitDash,opacity:profitOpacity}}/>}</g></svg><div className="donut-center"><RollingPercentage value={margin} active={visible}/><span>Profit margin</span></div></div><div className="chart-legend"><div><i className="cost-dot"/><span>Costs</span><strong>{percentage(costPercent)}</strong></div><div><i className="profit-dot"/><span>{profit<0?'Loss margin':'Profit margin'}</span><strong>{percentage(margin)}</strong></div><p className="hint">{costPercent===null?'Add a customer payment to calculate percentages.':margin!==null&&margin<0?'Costs exceed the customer payment. The negative margin shows your loss.':`${money(revenue)} collected − ${money(cost)} costs = ${money(profit)} profit.`}</p></div></div></section>;
}
