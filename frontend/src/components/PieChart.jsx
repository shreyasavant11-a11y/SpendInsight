import {useEffect , useRef} from 'react';
import { Chart,ArcElement,Tooltip,Legend,PieController} from 'chart.js';


Chart.register(ArcElement, Tooltip, Legend,PieController);

const PieChart=({expenses}) =>{
    const canvasRef =useRef(null);
    const chartRef = useRef(null);

    const grouped = expenses.reduce((acc,expense) => {
        acc[expense.title] =(acc[expense.title] || 0) + expense.amount;
        return acc;
    }, {});

    const labels =Object.keys(grouped);
    const amounts =Object.values(grouped);

    const colors = [
        '#ef4444', '#3b82f6', '#22c55e', '#f59e0b',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
        ];

        useEffect(() => {
    if (chartRef.current) {
        chartRef.current.destroy();
    }

    chartRef.current=new Chart(canvasRef.current,{
        type:'pie',
        data:{
            labels,
            datasets: [{
                data:amounts,
                backgroundColor:colors,
            }]
        },
        options:{
            plugins:{
                legend:{
                    labels:{
                        color:'white'
                    }
                }
            }
        }
    });
    

return()=>{
    if(chartRef.current){
        chartRef.current.destroy();
    }
};
 },[expenses]);
return <canvas ref={canvasRef} />;
};






export default PieChart;