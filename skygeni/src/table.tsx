import { useEffect, useState } from "react";

import "./table.css";

export default function Table({ api } :{api:string}) {
    const [tableData, setTableData] = useState<null | {
        topics: string[];
        count: number[];
        rightpercentage: number[];
        intermediate: number[];
      }>(null);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(api);
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } 
        };
    
        fetchData();
    }, []);

    if(tableData === null) {
        return <div>Loading...</div>;
    }

    const allData = tableData.topics.map((topic, index) => {
        const count = tableData.count[index];
        const right = tableData.rightpercentage[index];
        const inter = tableData.intermediate[index] ?? 100;
        return { topic, count, right, inter };
      });
    
    
    return (
        <table className="table widthfull">
           <thead className="">
                <tr>
                    <th>Stage</th>
                    <th>Came To Stage</th>
                    <th className="bgred text-white">Lost/ Disqualified from <br />stage</th>
                    <th className="bggreen text-white">Moved to next stage</th>
                    <th>Win Rate %</th>
                </tr>
            </thead>
            <tbody>
                {allData.map((row, index) => (
                    index === allData.length - 1 ? (
                    <tr key={index}>
                        <td className="text-left">{row.topic}</td>
                        <td className="bggreen text-white text-right">{row.count}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{row.right}%</td>
                    </tr>
                    ) : (
                    <tr key={index}>
                        <td className="text-left">{row.topic}</td>
                        <td>{row.count}</td>
                        <td>{row.count - allData[index+1].count}</td>
                        <td>{allData[index+1].count}</td>
                        <td>{row.right}%</td>
                    </tr>
                    )
                ))}
                        <tr>
                        <td>Total</td>
                        <td>-</td>
                        <td className="text-bold">{allData[0].count - allData[allData.length-1].count}</td>
                        <td>-</td>
                        <td>-</td>
                        </tr>
             </tbody>

        </table>
    );
    }