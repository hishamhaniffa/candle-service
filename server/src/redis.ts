import { createClient } from 'redis';

const client = createClient({
    url: 'redis://redis1host:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

/**
 * Basic redis client implementation to write & read data from the cache
 */

export const connectToRedis = async () => {
    await client.connect();
}

export const setKey = async (key: string, value: string) => {
    await client.set(key, JSON.stringify(value));
}

export const getKey = async (key: string) => {

    const value = await client.get(key);

    if (value)
        return JSON.parse(value);

    return false;

}



