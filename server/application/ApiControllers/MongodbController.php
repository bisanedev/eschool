<?php
namespace App\ApiControllers;
use App\Utils\HeaderResponse;
use MongoDB\Client;

class MongodbController 
{
    public function __construct(Client $collection,HeaderResponse $response)
    {
        $this->collection = $collection->coba->data;
        $this->response = $response;
    }

    public function index()
    {        
        $cursor = $this->collection->find([],[]);              
        echo $this->response->json_response(200,iterator_to_array($cursor));
    }

    public function insert()
    {        
        $insertManyResult = $this->collection->insertMany([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'body' => 'Hahahhaha Wakakakak hheheheheh',
            ],
            [
                'name' => 'test tong',
                'email' => 'test@example.com',
                'body' => 'Hahahhaha Wakakakak hheheheheh',
            ],
        ]);

        printf("Inserted %d document(s)\n", $insertManyResult->getInsertedCount());

        var_dump($insertManyResult->getInsertedIds());
    }

}