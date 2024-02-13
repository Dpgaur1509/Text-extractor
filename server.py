# app.py
from flask import Flask, request, jsonify;

from flask_pymongo import PyMongo
from PIL import Image
import pytesseract
import base64
from io import BytesIO
#imprort image model
from .models import db, User, Post

#from imageModel import Image 

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/image_database'
mongo = PyMongo(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        image_data = request.json['image']
        image = Image.open(BytesIO(base64.b64decode(image_data.split(',')[1])))
        text_content = pytesseract.image_to_string(image)
        bold_words = [word for word in text_content.split() if word.isalpha() and word.isupper()]

        data = {
            'image': image_data,
            'text_content': text_content,
            'bold_words': bold_words
        }

        # Use the Image model to save data to MongoDB
        image_object = Image(**data)
        image_object.save()

        return jsonify({'message': 'Image uploaded successfully!', 'text_content': text_content, 'bold_words': bold_words})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
