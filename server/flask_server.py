from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit
import pprint as pp
import random
import numpy as np
import data_loader
import copy

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
                         'old_ranking': viz_mat,
                         'chat_history': [{"wizard": False, "text": "str(np.random.random()"},
                                          {"wizard": True, "text": ""},
                                          {"wizard": False, "text": ""},
                                          {"wizard": True, "text": "str(np.random.random())"}],
                                          
                         'items': viz_mat
    }
    print('Sending over')
    emit('result', data_to_send_over)


@socketio.on('hover', namespace='/')
def hover(msg):

    payload = msg['payload']
    in_or_out = payload['inOrOut']

    copy_items = copy.deepcopy(msg['items'])

    item_pos_in_slate = womens_shoes.map_row_col_to_idx(payload['rowIndex'], payload['colIndex'])
    print('Position in slate ', item_pos_in_slate)
    inds_to_flips = womens_shoes.inds_to_flip(item_pos_in_slate)

    img_id = copy_items[payload['rowIndex']][payload['colIndex']]['img_to_show']
    item_idx = womens_shoes.items_to_index[img_id]
    print('Index of item in real index', item_idx)
    print()


    if in_or_out < 0:
        print('Revert')
        msg['items'] = msg['old_ranking']
        msg['old_ranking'] = copy_items
        data_to_send_over = {'all_likes': [],
                            'all_dislikes': [],
                            'items': msg['items'],
                            'old_ranking': copy_items,
                            'chat_history': msg['chat_history']}

        emit('result', data_to_send_over)
        return 


    womens_shoes.fast_nearest_nbr(item_idx, num_nbrs=4)
    nbrs = [womens_shoes.items[i] for i in womens_shoes.nbr_cache[item_idx]]

    count = 0

    for i, row in enumerate(msg['items']):
        for j, item in enumerate(row):
            for p, q in inds_to_flips:
                if i == p and j == q:
                    # inline update
                    msg['items'][i][j]['flipped'] = not item['flipped']
                    msg['items'][i][j]['img_to_show'] = nbrs[count]
                    count += 1
                    
    data_to_send_over = {'all_likes': [],
                         'all_dislikes': [],
                         'items': msg['items'],
                         'old_ranking': copy_items,
                         'chat_history': msg['chat_history']}

    print('*'*80)

    emit('result', data_to_send_over)


@socketio.on('bin_feedback', namespace='/')
def interaction(msg):

    print("Interaction", np.random.randint(10))
    pp.pprint(msg["payload"])



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
        socketio.run(app, debug=False, host='0.0.0.0')
