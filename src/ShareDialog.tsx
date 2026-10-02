import {useEffect,useRef,useState} from 'react';
import {WhatsappLogo,X} from '@phosphor-icons/react';
export default function ShareDialog({text,onClose}:{text:string;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),summary=useRef<HTMLTextAreaElement>(null);
 const [message,setMessage]=useState('');
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 async function copy(){
  try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(text);setMessage('Copied. Paste it into your message.');}
  catch{summary.current?.focus();summary.current?.select();summary.current?.setSelectionRange(0,text.length);try{if(document.execCommand('copy')){setMessage('Copied. Paste it into your message.');return;}}catch{}setMessage('Press and hold the selected text, then choose Copy.');}
 }
 return <dialog ref={dialog} className="delete-dialog share-dialog" aria-labelledby="share-title" onCancel={onClose}><div className="share-dialog-heading"><h2 id="share-title" className="text-xl font-bold">Share your calculation</h2><button type="button" className="share-close" aria-label="Close share popup" onClick={onClose}><X size={20} weight="bold" aria-hidden="true"/></button></div><p className="hint mt-2">Send it on WhatsApp or copy the summary.</p><textarea ref={summary} readOnly value={text} aria-label="Calculation summary" className="share-summary"/><div className="share-dialog-actions"><a className="btn bg-lime" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={20} aria-hidden="true"/>WhatsApp</a><button className="btn bg-[#f2f6f3]" onClick={copy}>Copy summary</button></div><p className="hint mt-3" role="status">{message}</p></dialog>;
}
