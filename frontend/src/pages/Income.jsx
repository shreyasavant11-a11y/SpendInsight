import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../api/axios';

const IncomeEntry =() => {
    const[title,setTitle] = useState('');
    const[amount,setAmount] = useState('');
    const[note, setNote] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading]=useState(false);

    const navigate = useNavigate();

    const handleEntry = async(e)=>{
        e.preventDefault()

        if(!title || !amount){
            setError('Title and amount are required');
            return;

        }

        setLoading(true);
        try{
            await API.post('/incomes',{title,amount:Number(amount),note});
            navigate('/dashboard');
        }catch(err){
            setError(err.response?.data?.error || 'Something went wrong');
        }finally{
            setLoading(false);
        }
    };
    return(
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Add income</h1>
            <div className ="bg-gray-700 rounded-xl p-8 w-full max-w-md">
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <input
                type="text"
                placeholder="Title(e.g. Salary)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-600 text-white rounded-lg p-3 mb-4"
                />
                <input
                type="number"
                placeholder="Amount(e.g.2000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-600 text-white rounded-lg p-3 mb-4"
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full bg-gray-600 text-white rounded-lg p-3 mb-4"
        />
        <button
          onClick={handleEntry}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg p-3"
        >
          {loading ? 'Adding...' : 'Add Income'}
        </button>
        </div>
        </Layout>
     );
};

export default Income;
