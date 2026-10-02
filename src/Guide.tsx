import {Calculator,BookmarkSimple} from '@phosphor-icons/react';

export default function Guide({onAbout}:{onAbout:()=>void}){
 return <div className="guide-page">
  <div className="guide-intro"><h1 className="text-2xl font-bold">A little help with every order</h1><p>Learn how to calculate your profit and use MarginMitra.</p></div>
  <section className="panel guide-section" aria-labelledby="calculate-guide-title">
   <div className="guide-section-heading"><Calculator size={24} aria-hidden="true"/><h2 id="calculate-guide-title">Calculate your profit</h2></div>
   <ol className="guide-steps">
    <li><h3>Add your costs</h3><p>Enter what you spend to buy or make the product, pack it, and send it by courier. Use Extra costs for payment fees, labour, taxes or other expenses.</p></li>
    <li><h3>Add your selling price</h3><p>Enter the product price before discount. Then add the discount amount in rupees and the delivery charge your customer pays. Enter 0 for free delivery.</p></li>
    <li><h3>Check your result</h3><p>Your profit is what remains after all your costs. The discount percentage appears automatically.</p><div className="guide-formula">Customer pays − Your costs = Your profit</div><p>A negative result means you lose money. Profit margin shows how much of the customer payment you keep, as a percentage.</p></li>
    <li><h3>Plan your price, if you need to</h3><p>Open Plan your profit and enter how much you want to earn per order. The suggested product price uses your costs, discount and delivery charge. Compare similar products before choosing your final price.</p></li>
   </ol>
   <div className="guide-example"><h3>A simple example</h3><p>₹500 product price − ₹50 discount + ₹40 delivery = <strong>₹490 collected</strong>.</p><p>₹490 collected − ₹350 costs = <strong>₹140 profit</strong>.</p><p>You keep 28.6% of the customer payment.</p></div>
  </section>
  <section className="panel guide-section" aria-labelledby="app-guide-title">
   <div className="guide-section-heading"><BookmarkSimple size={24} aria-hidden="true"/><h2 id="app-guide-title">Use MarginMitra</h2></div>
   <ol className="guide-steps">
    <li><h3>Save your calculation</h3><p>Add a product name to find it easily later, then choose Save calculation. After saving, choose View details or New calculation.</p></li>
    <li><h3>Find saved orders</h3><p>Open Saved from the menu. Choose Details on a card to see its date, costs, customer payment and profit breakdown.</p></li>
    <li><h3>Edit a calculation</h3><p>On its Details page, choose Edit calculation. Change the amounts and choose Save changes. This updates the same entry and keeps its original save date.</p></li>
    <li><h3>Share the summary</h3><p>Choose Share or Share summary. Use your phone’s sharing options, or choose WhatsApp or Copy summary when the share popup appears.</p></li>
    <li><h3>Delete an entry</h3><p>Tap the trash icon in Saved. Confirm only if you want to remove that calculation. Deleted entries cannot be restored.</p></li>
   </ol>
   <div className="guide-storage"><strong>No account needed. Saved on this device.</strong><p>Your calculations stay in this browser. They do not automatically appear on another phone or browser. Clearing browser data may remove them. You can save up to 30 calculations.</p></div>
  </section>
  <a href="/about" className="guide-about-link" onClick={e=>{if(e.button===0&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onAbout();}}}>About MarginMitra →</a>
 </div>;
}
