var ds = {              
         "id":"Root",
        "name": "Data Tables",
        "children":[
            
            {"Table":"Shirts",
             "name" :"Shirts",
			 "id" : "Shirts",
             "children": [{"name":"id"},{"name":"price"},{"name":"currency"},{"name":"material_id"},{"name":"size_id"}],
        "records": [
                                {"id":1,"price":500, "currency":"INR", "material_id":"MAT01", "size_id":"SZ0"},
                                {"id":2,"price":3500, "currency":"INR", "material_id":"MATX5", "size_id":"LZ2"},
                                {"id":3,"price":2500, "currency":"INR", "material_id":"MATA4", "size_id":"LZ1"},
                                {"id":4,"price":200, "currency":"INR", "material_id":"MATS9", "size_id":"SX0"}
        ]},
		
            {"Table":"Material",
             "name" :"Material",
			 "id" : "Material",
             "children": [{"name":"id"},{"name":"material_name"},{"name":"description"}],
        "records": [
                                {"id":1,"material_name":"LENIN", "description":"A full cotton with no blend"},
                                {"id":2,"material_name":"SATIN", "description":"A silky smooth cloth"},
                                {"id":3,"material_name":"10BLEND", "description":"A 10 per cotton blend "},
                                {"id":4,"material_name":"30BLEND", "description":"A soft cotton with 30 per blend"}

        ]}
            
        ]
};