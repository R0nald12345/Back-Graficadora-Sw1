import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';


// Interfaz mejorada para manejar más información del cliente
interface ConnectedClient {
    socket: Socket;
    lastActivity: Date;
    projectId?: number;
}


@Injectable()
export class MessageWsService {

  // Usamos Map para un mejor manejo de los clientes
  private connectedClients = new Map<string, ConnectedClient>();

  // Registra un nuevo cliente
  registerClient(client: Socket) {
      // Verificamos si el cliente ya existe
      if (this.connectedClients.has(client.id)) {
          console.log(`Cliente ${client.id} ya está registrado`);
          // Actualizamos última actividad
          this.updateClientActivity(client.id);
          return;
      }

      // Registramos el nuevo cliente con timestamp
      this.connectedClients.set(client.id, {
          socket: client,
          lastActivity: new Date(),
      });

      console.log(`Nuevo cliente registrado: ${client.id}`);
      this.logConnectedClients();
  }

  // Actualiza la última actividad del cliente
  public updateClientActivity(clientId: string) {
      const client = this.connectedClients.get(clientId);
      if (client) {
          client.lastActivity = new Date();
      }
  }

  // Elimina un cliente
  removeClient(clientId: string) {
      // Verificamos si el cliente existe antes de eliminarlo
      if (this.connectedClients.has(clientId)) {
          this.connectedClients.delete(clientId);
          console.log(`Cliente eliminado: ${clientId}`);
          this.logConnectedClients();
      }
  }

  // Obtiene el número de clientes conectados
  getConnectedClients(): number {
      return this.connectedClients.size;
  }

  // Registra el estado actual de las conexiones
  private logConnectedClients() {
      console.log({
          conectados: this.getConnectedClients(),
          clientes: Array.from(this.connectedClients.keys())
      });
  }

  // Limpia conexiones inactivas (llamar periódicamente)
  cleanInactiveConnections() {
      const now = new Date();
      for (const [clientId, client] of this.connectedClients.entries()) {
          const inactiveTime = now.getTime() - client.lastActivity.getTime();
          if (inactiveTime > 3600000) { // 60 minutos de inactividad
              this.removeClient(clientId);
          }
      }
  }
}