import yfinance as yf

from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

import json

import pandas as pd

#Set up REST API
app = Flask(__name__)
api = Api(app)
CORS(app)

class historical_data(Resource):
    def post(self):
        data = request.get_json()
        if(len(data) > 1):

            first = data[0]
            first = first[0]

            ticker = yf.Ticker(first)

            info = ticker.info

            return jsonify(info)
        else: 
            data = data[0]

            # Fetch historical data for ticker
            ticker = yf.Ticker(data)

            # Get historical closing price data
            hist = ticker.history(period="1mo")  

            # Convert the pandas DataFrame to a Python
            json_string = hist.to_json(orient='records')
            response = json.loads(json_string)

            # Show the JSON data
            return jsonify(response)

#Run the code above at the '/data' extension
api.add_resource(historical_data, '/data')

#Run API through local network, rather than local machine. 
#This allows you to test code from other devices, given they are connected to same network
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port = 5000)