import io from "socket.io-client";

class Socket {
  private socket: any;

  constructor() {
    this.socket = io(process.env.NEXT_PUBLIC_BASEURL!, {
      forceNew: false,
    });
  }

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }

  public emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

export const socket = new Socket();
