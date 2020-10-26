import json
import numpy as np

class WomensShoes(object):

    def __init__(self, base = '/Users/aritrb/Downloads/data', max_num_items=-1):

        self.items = np.load('{}/items.npy'.format(base))
        self.vex = np.load('{}/X.npy'.format(base))

        if max_num_items != -1:
            self.items = self.items[:max_num_items]
            self.vex = self.vex[:max_num_items]
        
        with open('{}/items_to_index.json'.format(base)) as f:
            self.items_to_index = json.load(f)



    def viz_data(self, items, num_columns=3):

        base_img = "https://images-na.ssl-images-amazon.com/images/I/{}.jpg"
        viz_mat = []
        temp = []
        for idx, img_id in enumerate(items):
            
            row = {'flipped' : False,
                   'img_to_show' : base_img.format(img_id),
                   'is_stacked': False}
            temp.append(row)
            
            if (idx + 1) % num_columns == 0:
                viz_mat.append(temp)            
                temp = []


        return viz_mat


    def pre_compute_exact_knn_kernel(self):
        pass