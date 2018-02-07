from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit


import random
import numpy as np

app = Flask(__name__)
app.config['SECRET_KEY'] = str(random.random())

socketio = SocketIO(app)

@socketio.on('connect', namespace='/interact')
def test_connect():
    print('Client connected')
    emit('my response', {'data': 'Connected'})

@socketio.on('search', namespace='/interact')
def test_connect(msg):
    emit('result', msg)
    
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
        socketio.run(app, debug=True, host='0.0.0.0')
