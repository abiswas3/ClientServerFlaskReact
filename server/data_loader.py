import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import normalize
class WomensShoes(object):

    def __init__(self, base = '/Users/aritrb/Downloads/data', max_num_items=-1):

        self.items = np.load('{}/items.npy'.format(base))
        print('Normalising')
        self.vex = normalize(np.load('{}/X.npy'.format(base)), norm='l2', axis=1, copy=True, return_norm=False)
        print(np.linalg.norm(self.vex[0]))
        self.num_columns = 3

        if max_num_items != -1:
            self.items = self.items[:max_num_items]
            self.vex = self.vex[:max_num_items]
        
        with open('{}/items_to_index.json'.format(base)) as f:
            self.items_to_index = json.load(f)

        self.nbr_cache = {}
        # self.pre_compute_exact_knn_kernel()

    def make_id_img(self, img_id):

        return "https://m.media-amazon.com/images/I/{}._AC_UL320_.jpg".format(img_id)

    def viz_data(self, items):

        num_columns= self.num_columns

        viz_mat = []
        temp = []
        for idx, img_id in enumerate(items):
            
            row = {'flipped' : False,
                   'img_to_show' : img_id,
                   'is_stacked': False if np.random.random() > 0.5 else True}
            temp.append(row)
            
            if (idx + 1) % num_columns == 0:
                viz_mat.append(temp)            
                temp = []


        return viz_mat

    def map_row_col_to_idx(self, row, col):
        
        num_columns= self.num_columns

        return num_columns*row + col

    def inds_to_flip(self, idx):

        inds_to_flip = []        
        num_columns= self.num_columns

        row, col =  idx//num_columns, idx % num_columns

        # upper left corner:
        if row == 0 and col == 0:
            inds_to_flip.append((row, col+1))
            inds_to_flip.append((row + 1, col))
            inds_to_flip.append((row + 1, col + 1))

        # upper right corner
        elif row == 0 and col == num_columns - 1:
            inds_to_flip.append((row, col-1))
            inds_to_flip.append((row + 1, col))
            inds_to_flip.append((row + 1, col - 1))

        # middle top row
        elif row == 0:
            inds_to_flip.append((row, col + 1))
            inds_to_flip.append((row , col - 1))
            inds_to_flip.append((row + 1, col))

        # bottom right
        elif row == len(self.items)//num_columns - 1 and col == num_columns - 1:
            inds_to_flip.append((row, col-1))
            inds_to_flip.append((row - 1, col))
            inds_to_flip.append((row - 1, col - 1))

        # bottom left
        elif row == len(self.items)//num_columns - 1 and col == 0:
            inds_to_flip.append((row, col + 1))
            inds_to_flip.append((row - 1, col))
            inds_to_flip.append((row - 1, col + 1))
            
        # left column
        elif col == 0:
            inds_to_flip.append((row + 1, col))
            inds_to_flip.append((row - 1 , col))
            inds_to_flip.append((row, col + 1))

        # right column
        elif col == num_columns - 1:
            inds_to_flip.append((row + 1, col))
            inds_to_flip.append((row - 1 , col))
            inds_to_flip.append((row, col - 1))

        # bottom row
        elif row == len(self.items)//num_columns - 1:
            inds_to_flip.append((row, col - 1))
            inds_to_flip.append((row, col + 1))
            inds_to_flip.append((row - 1, col))
            
        else:
            inds_to_flip.append((row, col - 1))
            inds_to_flip.append((row, col + 1))
            inds_to_flip.append((row - 1, col))
            inds_to_flip.append((row + 1, col))

        return inds_to_flip


    def pre_compute_exact_knn_kernel(self):
        print('CAching nearest nbrs')
        self.corr = self.vex @ self.vex.T
        print('CAching nearest nbrs done')

    def fast_nearest_nbr(self, index, num_nbrs=3):
        '''Using dot products instead of euclidean norms,
        this can be fixed and made fast.
        '''

        if index in self.nbr_cache:
            return

        temp = self.vex @ self.vex[index]

        nbr_inds = np.argsort(temp)[::-1][1:]

        for i in range(5):
            print(temp[nbr_inds[i]])
        print()
        print(temp.shape)
        self.nbr_cache[index] = nbr_inds[:num_nbrs]
