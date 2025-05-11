from flask import Flask, render_template, jsonify, request
import boto3
import uuid
import datetime
import pytz;
import os


from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
CORS(app, resources={r"/api/*": {"origins": "https://healandrepair.github.io"}})

dynamodb = boto3.resource('dynamodb',
                          region_name='ap-southeast-2',
                          aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))  # Change region as needed
table = dynamodb.Table('quotes')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/api/quotes', methods=['GET'])
def allQuotes():
    response = table.scan()  # <-- This fetches ALL items in the table

    items = response.get('Items', [])

    return jsonify(items)

@app.route('/api/quotes', methods=['POST', 'OPTIONS'])
def addQuote():
    if request.method == 'OPTIONS':
        return '', 204

    user_id = str(uuid.uuid4())
    data = request.json

    hasQuote = data.get('quote', False)
    hasAuthor = data.get('author', False)
    if ((hasQuote and hasAuthor) == False):
        return jsonify({'message': 'Failure: quote or author does not exist'})
    item = {
        'quoteId': user_id,
        'quote': data.get('quote', ''),
        'author': data.get('author', ''),
        'source': data.get('source', ''),
        'timestamp': data.get('timestamp', datetime.datetime.now(pytz.timezone('Pacific/Auckland')).isoformat(),)    }

    table.put_item(Item=item)

    return jsonify({"message": "Quote created successfully", "quoteId": user_id}), 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
    # app.run(debug=True)