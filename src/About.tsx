export default function About({onGuide}:{onGuide:()=>void}){
 return <div className="about-page"><section className="panel about-intro"><img src="/brand-character-trimmed.png" width="72" height="72" alt="MarginMitra mascot"/><h1>About MarginMitra</h1><p>A little clarity for every sale.</p></section>
 <section className="panel about-content"><h2>Made for small sellers</h2><p>MarginMitra helps you see what you earn from each order. Add your costs, selling price and discount to understand your profit before you sell.</p>
 <h2>Small costs matter</h2><p>Packing, courier charges and payment fees can reduce what you keep. We built MarginMitra to help you count these costs and make clearer pricing decisions.</p>
 <h2>Simple tools for every order</h2><p>Calculate your profit, check your discount percentage, plan a selling price, and save calculations to review later. Share a summary when you need to.</p>
 <h2>Your calculations stay on your device</h2><p>No account is needed. Saved calculations are stored in this browser on this device. They do not automatically sync to another phone or browser. Clearing browser data may remove them.</p>
 <h2>Good inputs make useful results</h2><p>Results are estimates based on the amounts you enter. Include taxes, labour, overheads and expected return costs when they apply. Compare similar products before setting your final price.</p>
 <div className="about-help"><h2>Need a hand?</h2><p>Our guide explains how to calculate your profit and use the app.</p><button className="btn bg-lime" onClick={onGuide}>Read the guide</button></div></section></div>;
}
