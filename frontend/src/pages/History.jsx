import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const History= () => {

const[expenses,setExpenses]=useState([]);
const[editId,setEditId]=useState('');
const[editTitle,setEditTitle]=useState('');
const[editAmount,setEditAmount]=useState('');
const[editNote,setEditNote]=useState('');
const[loading,setLoading]=useState(true);

const fetchExpenses=async() =>{
    try{
        const response = await API.get('/expenses');
        setExpenses(response.data);
    }catch(error){
        console.error(error);
    }finally{
        setLoading(false);
    }
    };
     useEffect(() => {
        fetchExpenses();
     }, []);

     const handleDelete=async(id)=>{
        try{
    await API.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(e => e._id !== id));
        }catch(error){
            console.error(error);
        }
};

const handleEditClick = ( expense) =>{
    setEditId(expense._id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditNote(expense.note || '');
};

const handleUpdate=async (id)=>{
    try{
        await API.put(`/expenses/${id}`, {
            title:editTitle,
            amount:Number(editAmount),
            note:editNote
        });
        setEditId(null);
        fetchExpenses();
    }catch(error){
        console.error(error);
    }
};

const getMonthlyTotals = () => {
  const grouped = expenses.reduce((acc, expense) => {
    const monthKey = new Date(expense.date).toLocaleDateString('en-IN',{
      month:'long',
      year:'numeric'
    });
    acc[monthKey]=(acc[monthKey] || 0) + expense.amount;
    return acc;
  },{});

  return Object.entries(grouped);
};
  const monthlyTotals = getMonthlyTotals();

if(loading) return <p className ="text-white p-8">Loading....</p>;

 return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Expense History</h1>

      <div className="bg-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-gray-600">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Note</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-gray-400 text-center">
                  No expenses yet!
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense._id} className="border-t border-gray-600">

                  <td className="p-4">
                    {editId === expense._id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-gray-600 text-white rounded p-1 w-full"
                      />
                    ) : (
                      expense.title
                    )}
                  </td>

                  <td className="p-4">
                    {editId === expense._id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="bg-gray-600 text-white rounded p-1 w-24"
                      />
                    ) : (
                      <span className="text-red-400">₹{expense.amount}</span>
                    )}
                  </td>

                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(expense.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>

                  <td className="p-4">
                    {editId === expense._id ? (
                      <input
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="bg-gray-600 text-white rounded p-1 w-full"
                      />
                    ) : (
                      <span className="text-gray-400">{expense.note || '-'}</span>
                    )}
                  </td>

                  <td className="p-4">
                    {editId === expense._id ? (
                      <button
                        onClick={() => handleUpdate(expense._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(expense)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      
      </div>
    
      <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Monthly Expense </h2>
          <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl p-6 space-y-3">
        {monthlyTotals.map(([month, total]) => (
      <div key={month} className="flex justify-between py-2 border-b border-white/5">
        <p className="text-gray-300">{month}</p>
        <p className="text-red-400 font-bold">₹{total}</p>
      </div>
    ))}
          </div>

        </div>
      
    </Layout>
  );
};

export default History;