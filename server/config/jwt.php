<?php
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;

return [     
    //jwt    
    Configuration::class => function() {    	
    	return Configuration::forSymmetricSigner(
            // You may use any HMAC variations (256, 384, and 512)
            new Sha256(),
            // replace the value below with a key of your own!            
            InMemory::base64Encoded('YXBsaWthc2lQZW51bmphbmdTZWtvbGFoTG9o')             
    	);
    },
    // end
];