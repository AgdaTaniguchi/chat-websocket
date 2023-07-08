from datetime import datetime

class Client:
    def __init__(self, client_socket, nickname, color):
        self.client_socket = client_socket
        self.nickname = nickname
        self.color = color

    async def send(self, response):
        await self.client_socket.send(response)

    def to_json(self, message):
        return {
            "nickname": self.nickname,
            "color": self.color,
            "message": message,
            "time": datetime.now().strftime("%d/%m/%Y às %H:%M")
        }