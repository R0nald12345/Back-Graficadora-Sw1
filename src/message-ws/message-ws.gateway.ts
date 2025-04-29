import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageWsService } from "./message-ws.service";
import { Socket,Server } from "socket.io";
import { Interval } from '@nestjs/schedule';

@WebSocketGateway({
  cors: {
      origin: '*',
  },
  // Configuración para mantener conexiones más estables
  pingInterval: 10000,
  pingTimeout: 5000,
  transports: ['websocket']
})
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
      private readonly messageWsService: MessageWsService,
  ) {}

  // Maneja nuevas conexiones
  handleConnection(client: Socket) {
      console.log('Cliente conectado:', client.id);
      this.messageWsService.registerClient(client);
  }

  // Maneja desconexiones
  handleDisconnect(client: Socket) {
      console.log('Cliente desconectado:', client.id);
      this.messageWsService.removeClient(client.id);
  }

  // Escucha actualizaciones del canvas
  // @SubscribeMessage('canvasUpdate')
  // handleCanvasUpdate(client: Socket, payload: any) {
  //       // Actualizar la última actividad (opcional)
  //       this.messageWsService.updateClientActivity(client.id); 
    
  //       // Reenviar actualización a otros clientes
  //       client.broadcast.emit('canvasUpdated', payload);
  // }

  // Limpia conexiones inactivas cada 30 segundos
  @Interval(30000)
  handleCleanup() {
      this.messageWsService.cleanInactiveConnections();
  }

  @SubscribeMessage('joinEditor')
  handleJoinEditor(client: Socket, payload: { proyectoId: number }) {
    // Unir al cliente a una sala específica del proyecto
    client.join(`proyecto_${payload.proyectoId}`);
    console.log(`Cliente ${client.id} unido al proyecto ${payload.proyectoId}`);
  }

  @SubscribeMessage('canvasUpdate')
  handleCanvasUpdate(client: Socket, payload: any) {
    const roomId = `proyecto_${payload.proyectoId}`;
    // Emitir solo a los clientes en la misma sala del proyecto
    client.to(roomId).emit('canvasUpdated', payload);
    this.messageWsService.updateClientActivity(client.id);
  }

  @SubscribeMessage('shapeSelected')
  handleShapeSelected(client: Socket, payload: any) {
    const roomId = `proyecto_${payload.proyectoId}`;
    client.to(roomId).emit('shapeSelected', payload);
  }

  @SubscribeMessage('shapeModified')
  handleShapeModified(client: Socket, payload: any) {
    const roomId = `proyecto_${payload.proyectoId}`;
    client.to(roomId).emit('shapeModified', payload);
  }

  @SubscribeMessage('shapeDeleted')
  handleShapeDeleted(client: Socket, payload: any) {
    const roomId = `proyecto_${payload.proyectoId}`;
    client.to(roomId).emit('shapeDeleted', payload);
  }
}