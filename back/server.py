import websockets
import asyncio
import json
from Client import Client
from random import choice

all_clients = []

with open('random.json', 'r', encoding='utf-8') as file:
    random_data = json.load(file)

async def send_message(data):
    for client in all_clients:
        await client.send(data)

async def new_client_connected(client_socket, path):
    print("New client connected!")
    all_clients.append(client_socket)
    client = Client(client_socket, choice(random_data['nicks']), choice(random_data['colors']))

    try:
        while True:
            new_message =  await client_socket.recv()
            print(f"{client.nickname} sent: {new_message}")
            await send_message(json.dumps(client.to_json(new_message)))

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected!")
        all_clients.remove(client_socket)

async def start_server():
    print("Server started!")
    await websockets.serve(new_client_connected, "localhost", 8765)

if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()