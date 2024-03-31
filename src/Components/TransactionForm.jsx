import { useEffect, useState } from "react";
function TransactionForm({addTransaction}){
    const [formData, setFormData]= useState({
        date:"",description:"",category:"",amount:""})

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }


    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:3000/transactions',{
                method:'POST',
                headers:{'content-Type':'application/json'},
                body:JSON.stringify(formData)

            })
            const newTransaction = response.json()
            addTransaction(newTransaction)
            setFormData({
                date:"",description:"",category:"",amount
            })

        }catch(error){
            console.error('failed',error)
        }
    }


        return(
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date">date</label>
                        <input type="date" placeholder="date" id="date" value={formData.date} onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="text" id="description" placeholder="description" value={formData.description} onChange={handleChange}/>
                        <input type="text" id="category" placeholder="category" value={formData.category} onChange={handleChange}/>
                        <input type="number" id="amount" placeholder="amount" value={formData.amount} onChange={handleChange}/>
                    </div>
                    <button type="submit">addTransaction</button>
                </form>
            </>
        )
}export default TransactionForm