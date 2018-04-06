from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit

import random
import numpy as np

from COLORS import *
import pickle
from train import train
from muse import Muse

with open('tv_show.pkl', 'rb') as f:
    temp = pickle.load(f)

shows = [temp[i]['name'] for i in temp]
feats = np.vstack([temp[i]['features'] for i in temp])/10
files = np.array([temp[i]['file'] for i in temp])
mapping = {files[i]:feats[i] for i in range(len(shows))}

# create catalog i,e which asins do you want to rank
catalog = feats[:]
n,p = feats.shape

# creat a prior score for each asin
prior_prob = np.zeros(n)

#------Only needs to be done ONCE---------
model = Muse(catalog, prior_prob, 25)
model.init_model(context='cpu')
#-----------------------------------------


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
                         'ranks': files.tolist()}


    emit('result', data_to_send_over)
    
@socketio.on('bin_feedback', namespace='/interact')
def interaction(msg):

    history = msg['history']
    ranks = msg['ranks']
    
    left = msg['left']
    right = msg['right']

    winner = msg['winner']

    if winner == 'left':
        history.append({'winner': left, 'loser': right})
    else:
        history.append({'winner': right, 'loser': left})
        
    # print([h['winner'] for h in history])
    ranks = train(model, history, mapping).tolist()
    new_ranking = files[np.argsort(ranks)[::-1]]
    print(GREEN, ranks, RESET)
    
    left_ix, right_ix = np.random.choice(np.arange(len(files)), size=2, replace=False)
    
    data_to_send_over = {'history': history,
                         'left':  files[left_ix],
                         'right': files[right_ix],
                         'ranks': new_ranking.tolist()}

    emit('result', data_to_send_over)
    
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
        socketio.run(app, debug=True, host='0.0.0.0')
