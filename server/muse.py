import mxnet as mx
import numpy as np

class Muse(object):

    '''
    Muse algorithm object

    Class variables:
    * catalog : the dataset that we wish to recommend from
    * model   : the graph for muse computations

    '''
    def __init__(self, catalog, priors, max_pairs):

        self.max_pairs = 100
        self.catalog_size = catalog.shape[0]
        self.embedding_dimension = catalog.shape[1]
        self.catalog = mx.nd.array(catalog)
        self.model    = None
        self.posteriors =  np.zeros(len(catalog))
        self.likelihoods = np.zeros(len(catalog))        
        self.priors = priors
        
    def init_model(self, context='cpu'):

        cat     = mx.sym.Variable('catalog')
        winners = mx.sym.Variable('winners')
        losers  = mx.sym.Variable('losers')
        
        diff = winners - losers
        diffT = mx.sym.transpose(diff)
        
        winner_norms = mx.sym.sum_axis(winners*winners, axis=1).reshape((1, self.max_pairs))
        Winner_norms = mx.sym.broadcast_to(winner_norms, (self.catalog_size, self.max_pairs))
        Winner_norms = mx.sym.sqrt(Winner_norms)
        
        loser_norms = mx.sym.sum_axis(losers*losers, axis=1).reshape((1, self.max_pairs))
        Loser_norms = mx.sym.broadcast_to(loser_norms, (self.catalog_size, self.max_pairs))
        Loser_norms = mx.sym.sqrt(Loser_norms)
        
        linPart = mx.sym.dot(cat, diffT) - Winner_norms + Loser_norms
        network = -mx.sym.log(1 + mx.sym.exp(-linPart))
        # soln = mx.sym.sum_axis(network, axis=1)
        
        device= mx.gpu() if context == 'gpu' else mx.cpu()
        
        self.model = network.simple_bind(ctx=device,
                                      winners= (self.max_pairs, self.embedding_dimension),
                                      losers=(self.max_pairs, self.embedding_dimension),
                                      catalog= (self.catalog_size, self.embedding_dimension))

    def scores(self, likes, dislikes):
        
        assert len(likes) == len(dislikes) and len(likes) <= self.max_pairs
        num_true_likes = len(likes)
        
        if len(likes) <= self.max_pairs:
            diff = self.max_pairs - len(likes)
            likes = np.vstack((likes, np.zeros((diff, self.embedding_dimension))))
            dislikes = np.vstack((dislikes, np.zeros((diff, self.embedding_dimension))))
            
        self.model.forward(catalog=self.catalog,
                           winners=mx.nd.array(likes),
                           losers=mx.nd.array(dislikes))

        ######################################################
        # CPU LEVEL
        ######################################################
        self.likelihoods = self.model.outputs[0].asnumpy()
        self.likelihoods = np.sum(self.likelihoods[:, :num_true_likes], axis=1)

        self.likelihoods -= np.min(self.likelihoods)
        self.posteriors = self.priors + self.likelihoods

        return self.posteriors
