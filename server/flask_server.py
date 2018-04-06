from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit

import random
import numpy as np

from COLORS import *

import pickle

with open('tv_show.pkl', 'rb') as f:
    temp = pickle.load(f)



shows = [temp[i]['name'] for i in temp]
feats = np.vstack([temp[i]['features'] for i in temp])
files = [temp[i]['file'] for i in temp]



app = Flask(__name__)
app.config['SECRET_KEY'] = str(random.random())

socketio = SocketIO(app)

@socketio.on('connect', namespace='/interact')
def test_connect():
    print('Client connected')
    init_connection()
    

def init_connection():

    left_ix, right_ix = np.random.choice(np.arange(len(files)), size=2, replace=False)

    
    data_to_send_over = {'history': [],
                         'left':  files[left_ix],
                         'right': files[right_ix],
                         'ranks': files}


    emit('result', data_to_send_over)
    
@socketio.on('bin_feedback', namespace='/interact')
def interaction(msg):

    print(msg)
    history = msg['history']
    ranks = msg['ranks']
    
    left = msg['left']
    right = msg['right']

    winner = msg['winner']

    if winner == 'left':
        history.append({'winner': left, 'left': left, 'right': right})
    else:
        history.append({'winner': right, 'left': left, 'right': right})

    ranks = train(history, shows, feats, files)
        
    left_ix, right_ix = np.random.choice(np.arange(len(files)), size=2, replace=False)
    
    data_to_send_over = {'history': history,
                         'left':  files[left_ix],
                         'right': files[right_ix],
                         'ranks': ranks}

    emit('result', data_to_send_over)
    
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
        socketio.run(app, debug=True, host='0.0.0.0')
