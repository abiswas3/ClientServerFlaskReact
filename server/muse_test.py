from muse import Muse
import numpy as np
from line_profiler import LineProfiler

def log_likelihood(w, winner, loser, alpha = 1):

    loser_norm = np.linalg.norm(loser)
    winner_norm = np.linalg.norm(winner)
    linear_part = np.dot(w, (winner-loser)) + loser_norm - winner_norm
    exponential = np.exp(-alpha*linear_part)
    return -np.log(1 + exponential)

def log_likelihood_pairs(w, pairs, alpha=1):
    likeli = [log_likelihood(w, winner, loser, alpha = alpha) for winner, loser in pairs]
    return sum(likeli)

def slow_likelihood(W, X_bar_data, alpha):
    likelihood = np.zeros(len(W))
    for i, w in enumerate(W):
        likelihood[i] = log_likelihood_pairs(w, X_bar_data, alpha=1)

    return likelihood


def unitTest():
    catalog = np.array([[1, 1],
                        [2, 2],
                        [3, 3],
                        [4, 4]])

    #Like -> dislike
    # [1,1] -> [3,3]
    # [2,2] -> [4,4]
    pos = np.array([catalog[0], catalog[1]])
    neg = np.array([catalog[2], catalog[3]])

    pairs = [[pos[i], neg[i]] for i in range(len(pos))]


    priors = np.zeros(4)

    model = Muse(catalog, priors, 25)
    model.init_model(context='cpu')

    rank = model.scores(pos, neg)

    s = slow_likelihood(catalog, pairs, 1)
    s -= np.min(s)

    print(rank)
    print(s)

if __name__ == '__main__':

    #####################################################
    # Example usage
    #####################################################
    # unitTest()

    dimension_size = 500
    num_pos_likes = 5
    num_neg_likes = 5
    num_asins_to_rank = 1000

    p = dimension_size  # dimension of vector
    n = num_asins_to_rank # number of asins in catalog you want to rank

    # create catalog i,e which asins do you want to rank
    catalog = np.random.random((n,p))

    # creat a prior score for each asin
    prior_prob = np.zeros(n)

    # Fake set of pairs(pos and neg of the same size)
    pos = catalog[np.random.choice(n, num_pos_likes*num_neg_likes)]
    neg = catalog[np.random.choice(n, num_pos_likes*num_neg_likes)]
    pairs = [[pos[i], neg[i]] for i in range(len(pos))]

    #------Only needs to be done ONCE---------
    model = Muse(catalog, prior_prob, 25)
    model.init_model(context='cpu')
    #-----------------------------------------

    # USAGE:
    # ranking_scores = model.scores(pos, neg)

    # Run 1
    lp = LineProfiler()
    lp_wrapper = lp(model.scores)
    rank = lp_wrapper(pos, neg)
    lp.print_stats()

    # Run 2
    lp = LineProfiler()
    lp_wrapper = lp(model.scores)
    rank = lp_wrapper(pos, neg)
    lp.print_stats()
