import {test, expect} from '@playwright/test';
test('api demo - GET', async ({request})=> {
    const startingTime = Date.now();
    const response = await request.get('/objects');

    let responseBody = await response.json();
    let responseHeader = response.headers();
    let responseSize = (await response.body()).byteLength;

    console.log(responseHeader);
    console.log(responseBody);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody).toHaveLength(13);
    expect(responseBody[0]).toEqual(
        {
            "id": "1",
            "name": "Google Pixel 6 Pro",
            "data": {
                "color": "Cloudy White",
                "capacity": "128 GB"
            }
        }
    );
    expect(responseBody[0].id).toEqual("1");
    expect(responseHeader['content-type']).toContain('application/json');

    const responseTime = Date.now() - startingTime;

    console.log(`Response time in ms: ${responseTime}`);
    console.log(`Response size in bytes: ${responseSize}`);
    
    expect(responseTime).toBeLessThan(2000);
    expect(responseSize).toBeLessThan(2000);
    expect(responseTime).toBeLessThan(1500);
})


test('api demo - Post', async({request})=> {
    const payload = 
    {
        "name": "Apple MacBook Pro 16",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }
    const response = await request.post('/objects', {
        data: payload
    });

    let responseBody = await response.json();
    expect(responseBody.id).toBeDefined();
    console.log(responseBody);
})


test('api demo - put', async({request}) => {
    const payload = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2025,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        };
    const response = await request.put('/objects/ff8081819782e69e0199e1ce6f9c386a', {
        data: payload
    })

    let responseBody = await response.json();
    console.log(responseBody);
    
    expect(response.status()).toBe(200);
    expect(responseBody.id).toEqual('ff8081819782e69e0199e1ce6f9c386a');
})


test('api demo - patch [partial update]', async({request}) => {
    const payload = {
            "name": "Apple MacBook Pro updated name",
        };
    const response = await request.patch('/objects/ff8081819782e69e0199e1ce6f9c386a', {
        data: payload
    })

    let responseBody = await response.json();
    console.log(responseBody);
    
    expect(response.status()).toBe(200);
    expect(responseBody.id).toEqual('ff8081819782e69e0199e1ce6f9c386a');
    expect(responseBody.name).toEqual('Apple MacBook Pro updated name');
})

test('api demo - delete', async({request}) => {
    const payload = 
    {
        "name": "Apple MacBook Pro 16",
        "data": {
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }
    const postResponse = await request.post('/objects', {
        data: payload
    });
    let postResponseBody = await postResponse.json();
    const response = await request.delete(`/objects/${postResponseBody.id}`);
    const deleteResponseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(deleteResponseBody.message).toEqual(`Object with id = ${postResponseBody.id} has been deleted.`);

})
