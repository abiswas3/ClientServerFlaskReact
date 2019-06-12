from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, join_room, emit, send

import random
import numpy as np
import pprint as pp
import helpers

app = Flask(__name__)
app.config['SECRET_KEY'] = str(random.random())

socketio = SocketIO(app)

apprentice_queue = []
wizard_queue = []
wiz_to_app = {}
app_to_wiz = {}

@socketio.on('connect', namespace='/interact')
def test_connect():
    print('Client connected')
    # init_connection()


# Still need to put these guys in rooms and make sure they talk to
# only each other
@socketio.on('chat', namespace='/interact')
def chat(msg):
    print("Connected type", msg["type"])
    room = msg["room"]
    text =  msg["chat_history"] + [{"wizard": helpers.is_wizard(msg['type']), "text": msg["message"]}]

    print("Sending", text)
    data_to_send_over = {"chat_history": text}
    
    emit("server_chat", data_to_send_over, room=room)

@socketio.on('initial_choice', namespace='/interact')
def initial_choice(msg):

    page_type =  msg["type"]    
    exp_id = str(np.random.random())    
    data_to_send_over = {"experiment_id": exp_id,
                         "chat_history": [],
                         "available": True}
    
    if helpers.is_wizard(page_type):
        for client in apprentice_queue:
            if client["available"]:
                print("Idle apprentice found")
                data_to_send_over['available'] = False
                data_to_send_over['room'] = client['room']
                client["available"] = False                
                # At this point there is a match
                # I should prepare this for logging but we shall see
                # just use the partners room
                join_room(client['room'])
                emit("server_chat", data_to_send_over,
                     room = client['room'])

                pp.pprint(wizard_queue)
                print()
                pp.pprint(apprentice_queue)
                
                return 


        # I got here there is no partner
        # I need my own room
        wizard_queue.append(data_to_send_over)                    
        print("No partner for wizard")
        
        data_to_send_over["room"] = str(np.random.random())            
        join_room(data_to_send_over["room"])                
        emit('setup', data_to_send_over)

    else:
        for client in wizard_queue:
            if client["available"]:
                print("Idle wizard found")
                data_to_send_over['available'] = False
                data_to_send_over['room'] = client['room']
                client["available"] = False
                # At this point there is a match
                # I should prepare this for logging but we shall see
                # just use the partners room
                join_room(client['room'])
                emit("server_chat", data_to_send_over,
                     room = client['room'])

                pp.pprint(wizard_queue)
                print()
                pp.pprint(apprentice_queue)
                
                return 

        # I got here there is no partner
        # I need my own room
        apprentice_queue.append(data_to_send_over)
        print("No partner for apprentice")        
        data_to_send_over["room"] = str(np.random.random())            
        join_room(data_to_send_over["room"])                
        emit('setup', data_to_send_over)
        
    pp.pprint(wizard_queue)
    print()
    pp.pprint(apprentice_queue)

        
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
        socketio.run(app, debug=False, host='0.0.0.0')
