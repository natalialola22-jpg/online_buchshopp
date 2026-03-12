"use client";
 
import { useState } from "react";
 
export default function BestsellerToggle({ data }: any) {
 
  const [show,setShow] = useState(false);
 
  return (
 
    <div className="bg-white p-6 rounded shadow">
 
      <button
        onClick={()=>setShow(!show)}
        className="bg-green-600 text-white px-4 py-2 rounded"
>
        Bestseller anzeigen
</button>
 
      {show && (
 
        <div className="mt-4 space-y-2">
 
          {data.map((b:any)=>(
<div key={b.titel} className="flex justify-between border-b py-2">
<span>{b.titel}</span>
<span>{b.verkauft}</span>
</div>
          ))}
 
        </div>
 
      )}
 
    </div>
 
  );
 
}