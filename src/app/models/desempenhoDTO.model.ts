
  export class DesempenhoDTO {
    public static readonly ALTO = new DesempenhoDTO(1, 'Alto');
    public static readonly LEVE = new DesempenhoDTO(2, 'Leve');
    public static readonly MEDIO = new DesempenhoDTO(3, 'Médio');
    constructor(public id: number, public label: string) {}
  
    public static valueOf(id: number): DesempenhoDTO {
      switch (id) {
        case 1:
          return this.ALTO;
        case 2:
          return this.LEVE;
        case 3:
          return this.MEDIO;
        default:
          return this.LEVE;
      }
    }
  }