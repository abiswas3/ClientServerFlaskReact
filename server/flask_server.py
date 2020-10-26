from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit
import pprint as pp
import random
import numpy as np
import data_loader

app = Flask(__name__)
app.config['SECRET_KEY'] = str(random.random())

socketio = SocketIO(app)

womens_shoes = data_loader.WomensShoes(max_num_items=1000)

@socketio.on('connect', namespace='/')
def test_connect():
    print('Client connected')
    init_connection()


def init_connection():

    viz_mat = womens_shoes.viz_data(womens_shoes.items)
    
    data_to_send_over = {'all_likes': [],
                         'all_dislikes': [],
                         'chat_history': [{"wizard": False, "text": "str(np.random.random()"},
                                          {"wizard": True, "text": ""},
                                          {"wizard": False, "text": ""},
                                          {"wizard": True, "text": "str(np.random.random())"}],
                                          
                         'items': viz_mat
    }
    emit('result', data_to_send_over)

@socketio.on('bin_feedback', namespace='/')
def interaction(msg):

    print("Interaction", np.random.randint(10))
    pp.pprint(msg["payload"])

    for i, row in enumerate(msg['items']):
        for j, item in enumerate(row):
            if i == msg['payload']['type'] and j == msg['payload']['id']:
                continue
            item['is_flipped'] = True if np.random.random() < 0.5 else False

    old_likes = msg['all_likes']
    old_dislikes = msg['all_dislikes']

    # curr_id = msg['current_item']
    # label = msg['label']

    # if label == 1:
    #     old_likes.append(curr_id)
    # else:
    #     old_dislikes.append(curr_id)


    data_to_send_over = {'all_likes': [],
                         'all_dislikes': [],
                         'items': msg['items'],
                         'chat_history': msg['chat_history']}

    emit('result', data_to_send_over)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
        socketio.run(app, debug=True, host='0.0.0.0')
