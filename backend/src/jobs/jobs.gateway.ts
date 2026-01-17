import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class JobsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Simplified: Client sends userId in query or auth token
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(`user_${userId}`);
      console.log(`User ${userId} connected and joined room user_${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
     // Handle disconnect logic
  }

  notifyWorkersInArea(workerIds: string[], job: any) {
    workerIds.forEach((id) => {
      this.server.to(`user_${id}`).emit('notification', {
        type: 'NEW_JOB_NEARBY',
        message: `New job: ${job.title}`,
        data: job,
      });
    });
  }
}
