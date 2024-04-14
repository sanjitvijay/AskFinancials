import React, { useState, useEffect } from 'react';
import genAI from "../googleClient";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  Label } from 'recharts';
import { useAppContext } from '../context/AppProvider';


const DashboardCard = () => {
  const [obj, setObj] = useState('')
  const [dataprocessed, setDataprocessed] = useState(false)
  const [loading, setLoading] = useState()
  const [graphReady, setGraphReady] = useState(false)
  const [statsReady, setStatsReady] = useState(false)
  const [jsonobj, setJsonobj] = useState(null)
  const [minYValue, setMinYValue] = useState(null)
  const [maxYValue, setMaxYValue] = useState(null)
  const [upperlimit, setUpperlimit] = useState(0)
  const {embeddingPairs} = useAppContext()


  //MAKE THIS DYNAMIC BASED ON THE PROMPT 
  const data = ["AAPL"]
  const stats = "stats"

  const data1 = [data, stats]
  const [stockData, setStockData] = useState({})

  const [companyData, setCompanyData] = useState({})
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    }
  }

  //FOR GETTING STOCK INFO
  const requestOptions1 = {
    method: 'POST',
    body: JSON.stringify(data1),
    headers: {
      'Content-Type': 'application/json',
   }
  }


  const run = async (Object) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = `I need to use into ReCharts. The module requires data as an array of JSON objects that look like this: 
    Here is an example of data it requires to get fed in:
    {day: '1', close: 1000},
    {day: '2', close: 1170},
    {day: '3', close: 660},
    {day: '4', close: 1030}
    I need you to convert the data I send you into that format. The data I send you will also be an array of JSON objects.
    I want the first object in the array I send you to be labeled as day 1, second entry to be day 2, etc.
    I want only data for the first 20 JSON objects within the array. If there are more, you can discard the latter ones. 
    The second value in each array of the new data should be the value under the "close" key of that object. The "close" key is the first key of the object. Discard the values under the other keys in each object. 
    Make sure the day corresponds to its close value; it must be exactly correct. Only return the new data, no other text is desired. Lastly, make sure the last object DOES NOT have a comma afterwards`
    const result = await model.generateContent([prompt, Object])
    const response = await result.response
    let text = await response.text()
    console.log(text)
    return text
  }

  const getCompanyData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }, {apiVersion: "v1beta"})
    const prompt = `Based on this 10k for a company:` + `I want you to generate a JSON object with the following keys: "Company", "Ticker", "Overview", "Products", "Revenue", Risks". For "Company", please provide the company name. For "Ticker," provide the ticker symbol. For "Overview," provide a two to three sentence overview of the company and what it does. For "Products," list the primary products, and a short description of each product. For "Revenue", give a two to three sentence explanation of the company's business model and how it generates revenue. For "Risks," list a few risks and a brief explanation of each. Remember, your overall goal is to summarize the information as effectively as possible, while still being concise`

}


  const axisStyle = {
    stroke: 'green',
  };

  const tickStyle = {
    fill: 'green',
  };

  useEffect(() => {
    setDataprocessed(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (dataprocessed){
        const response = await fetch (`http://localhost:3001/data`, requestOptions)
        const data = await response.json()
        console.log(data)
        const jsontext = await run(JSON.stringify(data,null))
        const jsonObj = await JSON.parse(jsontext)
        setJsonobj(jsonObj);
        setMinYValue(Math.min(...jsonObj.map(item => item.Close)));
        setMaxYValue(Math.max(...jsonObj.map(item => item.Close)));
        setGraphReady(true)

        const response1 = await fetch (`http://localhost:3001/data`, requestOptions1)
        const data1 = await response1.json()
        console.log(data1)
        setStockData(data1)
      }
    }
    fetchData()
  }, [dataprocessed])

  
  return (
  
    <div className='card border border-primary shadow-md shadow-primary w-max p-3'>
        <div className='flex justify-between'>
            <h1 className='text-secondary font-bold text-2xl'>{stockData.shortName}</h1>
            <h1 className='text-secondary font-bold text-2xl'>{stockData.symbol}</h1>
        </div>
        {/* <h1 className='text-3xl text-primary font-bold'>Graph</h1> */}
        {graphReady ? (
          <LineChart width={700} height={300} data={jsonobj}
            margin={{ top: 5, right: 20, left: -35, bottom: 15 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
            <XAxis dataKey="day" stroke="white">
              <Label value="Past Twenty Days" offset={-10} position="insideBottom" /> 
            </XAxis>
            <YAxis domain={[minYValue, maxYValue]} stroke="white" tick={false}/>
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#0cce6b" />
        </LineChart>
        ) : (
          <p>No graph to display</p>
        )}

        <div className='flex justify-left px-10'>
            <h1 className='mr-16'>Sector: {stockData.sector}</h1>
            <h1>Industry: {stockData.industry}</h1>
        </div>

        <div className='flex justify-between px-10 mt-5'>
            <h1>Book Value: {stockData.bookValue}</h1>
            <h1>P/E: {stockData.trailingPE}</h1>
            <h1>52W H: {stockData.fiftyTwoWeekHigh} M</h1>
        </div>

        <div className='flex justify-between px-10 mt-5'>
            <h1>Market Cap: {stockData.marketCap}</h1>
            <h1>EPS: {stockData.trailingEps}</h1>
            <h1>52W L: {stockData.fiftyTwoWeekLow} M</h1>
        </div>
    </div>


  );

};

export default DashboardCard; 