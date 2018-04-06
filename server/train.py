import numpy as np

def train(model, history, index):

    pos   = np.array([index[h['winner']] for h in history])
    neg   = np.array([index[h['loser']]  for h in history])
    
    ranking_scores = model.scores(pos, neg)
    
    return ranking_scores
